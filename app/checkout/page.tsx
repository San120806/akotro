'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCart();
    loadScript();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  };

  const loadScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 100;
    const tax = subtotal * 0.05;
    return subtotal + shipping + tax;
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.pincode) {
      alert('Please fill in all required fields');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      // Create order in backend
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: cartItems,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: 'India',
          },
          totalAmount: calculateTotal(),
        }),
      });

      const orderData = await response.json();

      if (!orderData.success) {
        alert('Failed to create order');
        setLoading(false);
        return;
      }

      // Open Razorpay payment gateway
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: 'Akotro',
        description: 'Eco-friendly products purchase',
        order_id: orderData.data.razorpayOrderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/orders/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              localStorage.removeItem('cart');
              alert('Payment successful! Order confirmed.');
              router.push('/');
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Error verifying payment');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#dc2626',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing payment');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Header />
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
        </div>
        <Footer />
      </div>
    );
  }

  const total = calculateTotal();

  return (
    <div>
      <Header />

      <section className="bg-yellow-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">CHECKOUT</h1>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">SHIPPING DETAILS</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>

              <h2 className="text-2xl font-bold mb-6 mt-8">PAYMENT METHOD</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                  <span className="font-medium">Razorpay (Credit/Debit Card, UPI, Wallet)</span>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-6 rounded-lg h-fit">
              <h2 className="text-2xl font-bold mb-6">ORDER SUMMARY</h2>

              <div className="space-y-4 mb-6 border-b border-gray-300 pb-6">
                {cartItems.map(item => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 border-b border-gray-300 pb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) > 500 ? 'FREE' : '₹100'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (5%)</span>
                  <span>₹{(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.05).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-xl mb-6">
                <span>Total</span>
                <span className="text-red-600">₹{total.toFixed(2)}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `PAY ₹${total.toFixed(2)}`}
              </button>

              <p className="text-xs text-gray-600 text-center mt-4">
                Your payment is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
