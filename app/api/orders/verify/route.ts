import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/models/Order';
import { createShiprocketOrder } from '@/lib/shiprocket';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;

    // Verify Razorpay payment signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update order status to completed
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId },
      {
        razorpayPaymentId,
        status: 'paid',
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Trigger Shiprocket shipment creation
    let shiprocketData = null;
    try {
      const items = (order.products || []).map((p: any) => ({
        name: p.name,
        sku: p._id?.toString() || p.name,
        units: p.quantity,
        selling_price: p.price,
      }));

      shiprocketData = await createShiprocketOrder({
        orderId: order._id.toString(),
        orderDate: order.createdAt?.toISOString() || new Date().toISOString(),
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        shippingAddress: {
          street: order.shippingAddress?.street || '',
          city: order.shippingAddress?.city || '',
          state: order.shippingAddress?.state || '',
          pincode: order.shippingAddress?.pincode || '',
          country: order.shippingAddress?.country || 'India',
        },
        items,
        subTotal: order.totalAmount,
      });

      // Save Shiprocket order ID and shipment ID back to the order
      await Order.findByIdAndUpdate(order._id, {
        shiprocketOrderId: shiprocketData?.order_id,
        shiprocketShipmentId: shiprocketData?.shipment_id,
        status: 'processing',
      });
    } catch (shippingError: any) {
      // Don't fail the whole payment verify if Shiprocket fails
      console.error('Shiprocket order creation failed:', shippingError.message);
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: order._id,
        status: order.status,
        shiprocket: shiprocketData
          ? {
              orderId: shiprocketData.order_id,
              shipmentId: shiprocketData.shipment_id,
              awbCode: shiprocketData.awb_code,
              courierName: shiprocketData.courier_name,
            }
          : null,
      },
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
