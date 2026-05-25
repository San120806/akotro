import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/models/Order';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const { products, customerName, customerEmail, customerPhone, shippingAddress, totalAmount } = body;

    // Create order in Razorpay
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });

    // Create order in database
    const order = await Order.create({
      products,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: order._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
