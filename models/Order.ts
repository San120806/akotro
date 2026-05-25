import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'failed', 'cancelled'],
    default: 'pending',
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  // Shiprocket fields — populated after payment verification
  shiprocketOrderId: {
    type: String,
  },
  shiprocketShipmentId: {
    type: String,
  },
  awbCode: {
    type: String,
  },
  courierName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order =
  mongoose.models.Order || mongoose.model('Order', orderSchema);
