'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  useEffect(() => {
    setIsClient(true);
    const storedCart = localStorage.getItem('akotro_cart');
    if (storedCart) {
      try { setCartItems(JSON.parse(storedCart)); } catch (_) {}
    }
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updated = cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item);
    setCartItems(updated);
    localStorage.setItem('akotro_cart', JSON.stringify(updated));
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('akotro_cart', JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Check if user is logged in
      const meRes = await fetch('/api/auth/me');
      const meData = await meRes.json();
      if (!meData.loggedIn) {
        router.push('/login');
        return;
      }

      // Load Razorpay script
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert('Failed to load payment gateway. Please try again.');
        setIsProcessing(false);
        return;
      }

      // Create Razorpay order on backend
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: subtotal, currency: 'INR', cartItems }),
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert(orderData.error || 'Failed to create order.');
        setIsProcessing(false);
        return;
      }

      // Open Razorpay modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Akotro',
        description: `${cartItems.length} item(s)`,
        image: '/images/akotrofaviconlogo.png',
        order_id: orderData.orderId,
        prefill: {
          email: meData.email,
          name: meData.name || meData.email,
        },
        theme: { color: '#A40000' },
        handler: async (response: any) => {
          // Verify payment on backend
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems,
              totalAmount: subtotal,
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            // Clear cart on success
            localStorage.removeItem('akotro_cart');
            setCartItems([]);
            setPaymentStatus('success');
          } else {
            setPaymentStatus('failed');
          }
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => {
        setPaymentStatus('failed');
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert(err.message || 'Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!isClient) return null;

  // Success screen
  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#FEFBD8] flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-3">Order Placed! 🎉</h1>
            <p className="text-gray-500 mb-8">Thank you for shopping with Akotro. Your order is confirmed and will be delivered within 7 days.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/account" className="bg-[#A40000] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-red-800 transition-colors">
                View My Orders
              </Link>
              <Link href="/shop" className="bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFBD8] flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">YOUR CART</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded-lg text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Your cart is currently empty.</h2>
            <Link href="/shop">
              <button className="bg-[#A40000] text-white px-8 py-3 font-bold rounded hover:bg-red-800 transition-colors">
                CONTINUE SHOPPING
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 items-center">
                      <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                        <div className="w-20 h-20 relative bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">₹{item.price}</p>
                          <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 font-semibold mt-1 hover:underline">Remove</button>
                        </div>
                      </div>

                      <div className="col-span-1 sm:col-span-3 flex justify-start sm:justify-center">
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100">−</button>
                          <span className="w-10 text-center text-sm font-bold text-black bg-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100">+</button>
                        </div>
                      </div>

                      <div className="col-span-1 sm:col-span-3 text-left sm:text-right">
                        <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Order Summary</h2>

                <div className="mb-4 pb-4 border-b border-gray-100">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Items Added</h3>
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-2">
                      <span className="truncate pr-4">{item.quantity}x {item.name}</span>
                      <span className="font-medium text-gray-900 shrink-0">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span className="font-semibold text-gray-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-black text-[#A40000]">₹{subtotal}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">✓ Tax included in price.</p>
                    <p className="text-xs text-gray-500">✓ Free zero-plastic shipping across Pan India.</p>
                    <p className="text-xs text-gray-500">✓ 100% recycled &amp; eco-friendly packaging.</p>
                  </div>
                </div>

                {paymentStatus === 'failed' && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg font-medium">
                    Payment failed. Please try again.
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-[#A40000] text-white py-4 font-bold rounded-md hover:bg-red-800 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'CHECKOUT WITH RAZORPAY'
                  )}
                </button>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs text-gray-500 font-medium">Secure Payment via Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
