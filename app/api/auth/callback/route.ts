import { NextRequest, NextResponse } from 'next/server';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || !state) {
    return NextResponse.redirect(new URL('/login?error=missing_code', req.url));
  }

  try {
    const wixClient = createClient({
      auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
    });

    // Generate visitor tokens first
    const visitorTokens = await wixClient.auth.generateVisitorTokens();
    wixClient.auth.setTokens(visitorTokens);

    // Retrieve stored oauth data from cookie
    const cookieStore = await cookies();
    const oauthDataRaw = cookieStore.get('wix_oauth_data')?.value;
    if (!oauthDataRaw) {
      return NextResponse.redirect(new URL('/login?error=no_oauth_data', req.url));
    }

    const oauthData = JSON.parse(decodeURIComponent(oauthDataRaw));
    const memberTokens = await wixClient.auth.getMemberTokens(code, state, oauthData);

    const response = NextResponse.redirect(new URL('/', req.url));

    // Save member tokens to cookie
    response.cookies.set('session', JSON.stringify(memberTokens), {
      httpOnly: false, // needs to be readable by client-side wixClient
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    // Clear the temporary oauth data cookie
    response.cookies.delete('wix_oauth_data');

    return response;
  } catch (error: any) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message || 'callback_failed')}`, req.url));
  }
}
