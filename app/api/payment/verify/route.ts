import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { orders } from '@wix/ecom';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      totalAmount,
    } = body;

    // 1. Verify Razorpay signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Payment verification failed' }, { status: 400 });
    }

    // 2. Get logged-in member info
    const cookieStore = await cookies();
    const memberRaw = cookieStore.get('wix_member')?.value;
    const member = memberRaw ? JSON.parse(memberRaw) : null;

    // 3. Save order to Wix eCommerce (if member is logged in with sessionToken)
    let wixOrderId = null;
    if (member?.sessionToken) {
      try {
        const wixClient = createClient({
          modules: { orders },
          auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
        });
        const visitorTokens = await wixClient.auth.generateVisitorTokens();
        wixClient.auth.setTokens(visitorTokens);

        const lineItems = (cartItems || []).map((item: any) => ({
          productName: { original: item.name },
          quantity: item.quantity,
          price: { amount: String(item.price), formattedAmount: `₹${item.price}` },
        }));

        // Create order in Wix
        const createdOrder = await wixClient.orders.createOrder({
          channelType: 'WEB',
          lineItems,
          buyerInfo: { email: member.email },
          priceSummary: {
            subtotal: { amount: String(totalAmount), formattedAmount: `₹${totalAmount}` },
            total: { amount: String(totalAmount), formattedAmount: `₹${totalAmount}` },
          },
          paymentStatus: 'PAID',
        } as any);
        wixOrderId = createdOrder._id;
      } catch (wixErr: any) {
        console.warn('Wix order creation failed (non-critical):', wixErr.message);
      }
    }

    // 4. Store payment record in member cookie (for wallet history)
    if (member) {
      const paymentRecord = {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        wixOrderId,
        amount: totalAmount,
        date: new Date().toISOString(),
        items: cartItems?.map((i: any) => i.name).join(', '),
      };
      const history = member.orderHistory || [];
      history.push(paymentRecord);
      cookieStore.set('wix_member', JSON.stringify({ ...member, orderHistory: history }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return NextResponse.json({
      success: true,
      razorpayPaymentId: razorpay_payment_id,
      wixOrderId,
    });
  } catch (error: any) {
    console.error('Payment verify error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
