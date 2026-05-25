import { NextResponse } from 'next/server';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { authentication } from '@wix/members';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const wixClient = createClient({
      modules: { authentication },
      auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! })
    });

    const tokens = await wixClient.auth.generateVisitorTokens();
    wixClient.auth.setTokens(tokens);

    const response = await wixClient.authentication.register(email, password, {
      contactInfo: {
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || ''
      }
    });

    console.log('Wix Register Response:', JSON.stringify(response, null, 2));

    const sessionToken = (response as any).session?.token || (response as any).session?.sessionToken || (response as any).sessionToken || (response as any).token;
    const isSuccess = (response as any).loginState === 'SUCCESS' || (response as any).status === 'SUCCESS' || (response as any).status === 'PENDING' || (response as any).member || sessionToken;

    if (!isSuccess) {
      return NextResponse.json({ success: false, error: `Registration failed: ${JSON.stringify(response)}` }, { status: 400 });
    }

    // Store session in httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('wix_member', JSON.stringify({ email, name, sessionToken }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true, email, name });

  } catch (error: any) {
    console.error('Wix Register Error:', error);
    const errorString = typeof error === 'string' ? error : (error.message || JSON.stringify(error));

    if (errorString.includes('Already exists') || errorString.includes('already exists') || errorString.includes('MEMBER_EXISTS')) {
      return NextResponse.json({ success: false, error: 'An account with this email already exists. Please sign in instead.' }, { status: 409 });
    }

    return NextResponse.json({ success: false, error: 'Failed to create account. Please try again.' }, { status: 500 });
  }
}
