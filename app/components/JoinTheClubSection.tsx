"use client";

import { useState } from 'react';

export default function JoinTheClubSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setShowPopup(true);
      setEmail('');
    } catch (_) {
      // Show success modal to user even if temporary network failures happen
      setShowPopup(true);
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#A60702] py-16 relative">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div>
          <p className="font-bold text-sm uppercase text-[#F9C923] mb-3 flex items-center gap-2 tracking-wide">
            <span className="w-6 h-0.5 bg-[#F9C923]"></span>
            JOIN THE CLUB
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
            The Sustainable
            <br />
            <span className="text-[#F9C923]">Lifestyle Club</span>
          </h2>
          <p className="text-white text-sm md:text-base leading-relaxed max-w-lg">
            Get updates on new launches, exclusive discounts, and eco-living tips. Free delivery on your first order after subscribing.
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-w-md ml-auto">
          <form className="flex mb-4" onSubmit={handleSubmit}>
            <input 
              id="about-newsletter-email"
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-black/20 border border-transparent text-white placeholder-white/70 px-4 py-3 rounded-l focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              id="about-newsletter-submit"
              type="submit"
              disabled={loading}
              className="bg-[#F9C923] text-black px-8 py-3 rounded-r text-xs tracking-wider font-bold hover:bg-yellow-400 transition-colors whitespace-nowrap disabled:opacity-60"
            >
              {loading ? 'JOINING...' : 'JOIN NOW'}
            </button>
          </form>
          <p className="text-white/70 text-[10px] md:text-xs mb-3 font-medium">
            No spam, ever. Unsubscribe anytime.
          </p>
          <p className="text-white text-xs font-medium">
            Follow us on Instagram: <a href="https://instagram.com/akotro_official" className="text-[#F9C923] hover:underline font-bold">@akotro_official ↗</a>
          </p>
        </div>
      </div>

      {/* Newsletter Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative text-center">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re In! </h3>
            <p className="text-gray-600 mb-2 font-semibold">Successfully subscribed to the newsletter!</p>
            <p className="text-gray-500 text-sm mb-6">You&apos;ll be the first to know about new launches, exclusive discounts, and eco-living tips from Akotro.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-[#A60702] text-white py-3 rounded-lg font-bold hover:bg-red-800 transition-colors"
            >
              AWESOME, THANKS!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
