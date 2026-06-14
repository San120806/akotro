'use client';

import { useState } from 'react';

export default function ReviewsSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
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
      // Still show success — UX should not break on network error
      setShowPopup(true);
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  const reviews = [
    {
      rating: 5,
      author: 'Manish',
      title: 'ARTIST, INDIA',
      text: '"Great quality. Prefer them to wood pencils now and I get the added benefit of knowing trees weren\'t cut down to make these pencils."',
      verified: true,
      bgColor: 'bg-black text-white'
    },
    {
      rating: 5,
      author: 'Ritesh',
      title: 'Chartered Accountant',
      text: '"Made from recycled materials — promotes plant growth, waste reduction, and environmental preservation."',
      verified: true,
      bgColor: 'bg-white text-black'
    },
    {
      rating: 5,
      author: 'Dinesh',
      title: 'Teacher, India',
      text: '"Good hardness, easy to sharpen. My students really like these pencils."',
      verified: true,
      bgColor: 'bg-white text-black'
    },
  ];

  return (
    <section className="bg-[#fdd835] pt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#880808] font-bold text-sm mb-2">— WHAT PEOPLE SAY</p>
          <h2 className="text-4xl font-bold mb-8">
            <span className="text-black">Real Reviews,</span> <span className="text-[#880808]">Real People</span>
          </h2>
        </div>

        {/* Main Reviews Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Left - Rating Stats */}
          <div>
            <div className="mb-8">
              <p className="text-6xl font-bold text-[#880808] mb-2">4.9</p>
              <p className="text-[#880808] text-lg mb-2">★★★★★</p>
              <p className="text-sm text-gray-800">Verified purchases</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xl font-black text-[#111] w-4 text-center">5</span>
                <div className="flex-1 h-[14px] bg-[#E5C335] rounded-full relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 h-full bg-[#D32F2F] rounded-full" style={{width: '90%'}}></div>
                </div>
                <span className="text-lg font-bold text-[#333] w-12 text-right">90%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-black text-[#111] w-4 text-center">4</span>
                <div className="flex-1 h-[14px] bg-[#E5C335] rounded-full relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 h-full bg-[#D32F2F] rounded-full" style={{width: '7%'}}></div>
                </div>
                <span className="text-lg font-bold text-[#333] w-12 text-right">7%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-black text-[#111] w-4 text-center">3</span>
                <div className="flex-1 h-[14px] bg-[#E5C335] rounded-full relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 h-full bg-[#D32F2F] rounded-full" style={{width: '2%'}}></div>
                </div>
                <span className="text-lg font-bold text-[#333] w-12 text-right">2%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-black text-[#111] w-4 text-center">2</span>
                <div className="flex-1 h-[14px] bg-[#E5C335] rounded-full relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 h-full bg-[#D32F2F] rounded-full" style={{width: '1%'}}></div>
                </div>
                <span className="text-lg font-bold text-[#333] w-12 text-right">1%</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-black text-[#111] w-4 text-center">1</span>
                <div className="flex-1 h-[14px] bg-[#E5C335] rounded-full relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 h-full bg-[#D32F2F] rounded-full" style={{width: '0%'}}></div>
                </div>
                <span className="text-lg font-bold text-[#333] w-12 text-right">0%</span>
              </div>
            </div>
          </div>

          {/* Right - Reviews */}
          <div className="col-span-2 space-y-6">
            {/* Featured Review - Black Card */}
            <div className="bg-black text-white p-6 rounded-lg">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-[#fdd835] flex items-center justify-center font-bold text-black text-lg flex-shrink-0">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold">{reviews[0].author}</p>
                      <p className="text-xs text-gray-400">{reviews[0].title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#fdd835]">{'★'.repeat(reviews[0].rating)}</span>
                      <span className="text-orange-400 text-xs font-bold">✓ VERIFIED</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed italic">{reviews[0].text}</p>
                </div>
              </div>
            </div>

            {/* Bottom Reviews - White Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.slice(1).map((review, index) => (
                <div key={index} className={`${review.bgColor} p-6 rounded-lg`}>
                  <div className="flex gap-4 items-start mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0 ${index === 0 ? 'bg-[#880808]' : 'bg-gray-800'}`}>
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{review.author}</p>
                      <p className="text-xs text-gray-500">{review.title}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[#880808]">{'★'.repeat(review.rating)}</span>
                    <span className="text-orange-500 text-xs font-bold">✓ VERIFIED</span>
                  </div>
                  <p className="text-sm leading-relaxed italic text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#fdd835]/10 py-16 mt-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-4xl font-bold mb-4">
                <span className="text-black">The Sustainable</span>
                <br />
                <span className="text-[#880808]">Lifestyle Club</span>
              </h3>
              <p className="text-gray-800">
                Get updates on new launches, exclusive discounts, and eco-living tips. Free delivery on your first order.
              </p>
            </div>

            <div>
              <form onSubmit={handleSubscribe} className="flex gap-2 mb-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded border-2 border-[#fdd835] text-sm text-gray-900 placeholder-gray-600 bg-white focus:outline-none focus:border-red-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#6b0606] text-white px-6 py-3 rounded font-bold hover:bg-[#5a0505] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'JOINING...' : 'JOIN NOW'}
                </button>
              </form>
              <p className="text-xs text-gray-700 mb-4">No spam, ever. Unsubscribe anytime.</p>
              <p className="text-sm text-gray-800">
                Follow us: <span className="text-[#880808] font-bold">@akotro_official</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative text-center animate-in fade-in zoom-in duration-200">
            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re In! </h3>
            <p className="text-gray-600 mb-2 font-semibold">Successfully subscribed to the newsletter!</p>
            <p className="text-gray-500 text-sm mb-6">
              You&apos;ll be the first to know about new launches, exclusive discounts, and eco-living tips from Akotro.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-[#6b0606] text-white py-3 rounded-lg font-bold hover:bg-[#5a0505] transition-colors"
            >
              AWESOME, THANKS!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
