import { NextResponse } from 'next/server';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { authentication } from '@wix/members';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const wixClient = createClient({
      modules: { authentication },
      auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! })
    });

    const visitorTokens = await wixClient.auth.generateVisitorTokens();
    wixClient.auth.setTokens(visitorTokens);

    const response = await wixClient.authentication.login(email, password);
    console.log('Wix Login Response:', JSON.stringify(response, null, 2));

    const loginState = (response as any).loginState || (response as any).state;
    const sessionToken = (response as any).sessionToken || (response as any).session?.token || (response as any).session?.sessionToken || (response as any).token;

    if (loginState === 'FAILURE' || loginState === 'failure') {
      return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 });
    }

    // Store session in an httpOnly cookie — simple and reliable
    const cookieStore = await cookies();
    cookieStore.set('wix_member', JSON.stringify({ email, sessionToken }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true, email });
  } catch (error: any) {
    console.error('Wix Login Error:', error);
    const msg = error.message || JSON.stringify(error);
    if (msg.includes('Invalid email') || msg.includes('password') || msg.includes('WRONG')) {
      return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 });
    }
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
