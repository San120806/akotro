'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function AccountPage() {
  const router = useRouter();
  const [member, setMember] = useState<{ email: string; name?: string } | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'cart' | 'wishlist' | 'wallet'>('orders');
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('akotro_wishlist');
      if (stored) setWishlistItems(JSON.parse(stored));
    } catch (_) {}
  }, []);

  const removeWishlistItem = (id: string) => {
    const updated = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updated);
    localStorage.setItem('akotro_wishlist', JSON.stringify(updated));
  };

  const addWishlistItemToCart = (item: any) => {
    const currentCart = JSON.parse(localStorage.getItem('akotro_cart') || '[]');
    const existing = currentCart.find((i: any) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      currentCart.push({
        id: item.id,
        name: item.name,
        price: typeof item.price === 'string' ? parseFloat(item.price.replace('₹', '')) : item.price,
        image: item.image,
        quantity: 1
      });
    }
    localStorage.setItem('akotro_cart', JSON.stringify(currentCart));
    alert('Added to cart!');
  };

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        if (!data.loggedIn) {
          router.push('/login');
        } else {
          setMember({ email: data.email, name: data.name });
          setOrderHistory(data.orderHistory || []);
          // Load cart from localStorage (same source as cart page)
          try {
            const stored = localStorage.getItem('akotro_cart');
            if (stored) setCartItems(JSON.parse(stored));
          } catch (_) {}
          setLoading(false);
        }
      })
      .catch(() => router.push('/login'));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffde8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#880808] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your account...</p>
        </div>
      </div>
    );
  }

  const displayName = member?.name || member?.email?.split('@')[0] || 'Member';
  const initials = displayName.slice(0, 2).toUpperCase();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const tabs = [
    { id: 'orders' as const, label: 'Orders' },
    { id: 'cart' as const, label: `Cart (${cartItems.length})` },
    { id: 'wishlist' as const, label: `Wishlist (${wishlistItems.length})` },
    { id: 'wallet' as const, label: 'My Wallet' },
  ];

  return (
    <div className="min-h-screen bg-[#fffde8]">
      {/* Header */}
      <div className="bg-[#880808] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white/80 hover:text-white text-sm font-medium">← Back to Home</Link>
          <button onClick={handleLogout} className="text-white/80 hover:text-white text-sm font-medium">Sign out</button>
        </div>
        <div className="max-w-4xl mx-auto mt-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-[#fdd835] rounded-full flex items-center justify-center text-[#880808] text-2xl font-black">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-black">{displayName}</h1>
            <p className="text-white/70 text-sm">{member?.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                activeTab === tab.id ? 'bg-[#880808] text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-black text-gray-900 mb-4">My Orders</h2>
            {orderHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4"></div>
                <p className="text-gray-500 font-medium">No orders yet</p>
                <Link href="/shop" className="mt-4 inline-block bg-[#880808] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#5a0505] transition-colors">
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orderHistory.map((order: any, i: number) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Payment ID: {order.razorpayPaymentId}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{order.items}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-[#880808]">₹{order.amount}</p>
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Paid</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === 'cart' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-black text-gray-900 mb-4">My Cart</h2>
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4"></div>
                <p className="text-gray-500 font-medium">Your cart is empty</p>
                <Link href="/shop" className="mt-4 inline-block bg-[#880808] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#5a0505] transition-colors">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100" />
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
                      </div>
                      <p className="font-bold text-[#880808]">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-4">
                  <span className="font-bold text-gray-900">Total ({cartItems.reduce((a, i) => a + i.quantity, 0)} items)</span>
                  <span className="text-xl font-black text-[#880808]">₹{subtotal}</span>
                </div>
                <Link href="/cart" className="block text-center bg-[#880808] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#5a0505] transition-colors">
                  Go to Cart & Checkout →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-black text-gray-900 mb-1">My Wishlist</h2>
            <p className="text-sm text-gray-500 mb-4">View favorite products you&apos;ve saved to your wishlist.</p>
            <div className="border-t border-gray-100 pt-6">
              {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 font-medium mb-4">You haven&apos;t added any products yet.</p>
                  <Link href="/shop" className="text-[#880808] font-bold text-sm hover:underline">
                    Start adding products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4 justify-between">
                      <div className="flex items-center gap-4">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">₹{item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            addWishlistItemToCart(item);
                            removeWishlistItem(item.id);
                          }}
                          className="bg-[#880808] text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#5a0505] transition-colors"
                        >
                          ADD TO CART
                        </button>
                        <button 
                          onClick={() => removeWishlistItem(item.id)}
                          className="text-xs text-red-500 font-semibold px-2 py-2 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Wallet Tab */}
        {activeTab === 'wallet' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-black text-gray-900 mb-1">Wallet</h2>
            <p className="text-sm text-gray-500 mb-4">Save your payment details for faster checkout.</p>
            <div className="border-t border-gray-100 pt-12 pb-16 text-center">
              <div className="text-5xl mb-4"></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">You haven&apos;t saved any payment methods yet</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">Securely save your payment details for faster checkout whenever you place an order.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
