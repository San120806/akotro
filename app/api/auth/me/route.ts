import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get('wix_member')?.value;
    if (!raw) return NextResponse.json({ loggedIn: false });
    const member = JSON.parse(raw);
    return NextResponse.json({
      loggedIn: true,
      email: member.email,
      name: member.name,
      orderHistory: member.orderHistory || [],
    });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}
