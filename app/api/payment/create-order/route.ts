import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const { amount, currency = 'INR', cartItems } = await req.json();

    // Verify user is logged in
    const cookieStore = await cookies();
    const memberRaw = cookieStore.get('wix_member')?.value;
    if (!memberRaw) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }
    const member = JSON.parse(memberRaw);

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        email: member.email,
        items: cartItems?.map((i: any) => i.name).join(', ') || '',
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error('Razorpay create order error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
