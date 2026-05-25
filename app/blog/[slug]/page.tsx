'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState, use, useEffect } from 'react';

const blogData: Record<string, {
  title: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: React.ReactNode;
}> = {
  'shop-black-paper-pencils': {
    title: 'Shop Black Paper Pencils Online Today: Your Guide to Creative Eco-Friendly Art',
    author: 'Devanshi Das',
    date: 'Apr 28, 2025',
    readTime: '3 min read',
    image: '/images/blackpaperpencil.avif',
    content: (
      <>
        <p>Are you on the lookout for unique art supplies that align with your eco-conscious values? If so, look no further than black paper pencils. These are not your ordinary pencils from your local stationery store. They are something truly special, crafted with meticulous care and passion, and they carry a message of sustainability with every stroke. At Akotro, we believe in the power of mindful choices, and our black paper pencils are a testament to that belief.</p>

        <p>In this blog post, we will explore what makes our black paper pencils special, how to use them for drawing art, and where you can find the best ones online. So, get ready to elevate your artistic journey with these eco-friendly masterpieces!</p>

        <h2>Why Choose Online Black Paper Pencils?</h2>

        <p>In today's world, our choices carry weight beyond just personal preference. When you opt for Akotro's black paper pencils, you are not just choosing a drawing tool, you are choosing a story of sustainability. These pencils are made from recycled black paper, which means each one is a small act of environmental responsibility.</p>

        <p>Beyond the environmental impact, black paper pencils offer a unique aesthetic. The dark barrel provides a striking contrast to the silver or coloured tips, making them visually distinctive. When used for art, they produce smooth, rich lines that are both expressive and precise. They are perfect for artists who appreciate a touch of the unconventional in their tools.</p>

        <img
          src="/images/blackpaperpencil.avif"
          alt="Black Paper Pencils"
          className="w-full rounded-lg my-6 object-cover"
          style={{ maxHeight: '300px' }}
        />

        <h2>How to Use Black Paper Pencils for Drawing Art</h2>

        <p>Using Akotro's black paper pencils for drawing is both an art and a science. Here are some tips to help you get the most out of them:</p>

        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Choose the right paper:</strong> Black paper pencils work best on white or light-coloured paper, where the contrast can be fully appreciated.</li>
          <li><strong>Experiment with pressure:</strong> Like with any pencil, the pressure you apply affects the intensity and thickness of the line. Try varying your pressure to see the range of effects you can achieve.</li>
          <li><strong>Blending:</strong> Once you have drawn a line, you can blend it with your finger or a blending stump to create softer, more textured effects.</li>
          <li><strong>Layering colours:</strong> Use black paper pencils as a base layer for other colours to add depth and dimension to your artwork.</li>
        </ol>

        <p>Remember, the key to mastering any art tool is practice. Do not be afraid to experiment and make mistakes. Each drawing is a learning experience that brings you one step closer to mastery.</p>

        <h2>Which pencil is darker, 2B or 4B or 6B?</h2>

        <p>If you are into pencil art, understanding pencil grades is crucial. The grading system for pencils is straightforward:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>2B pencils have a softer lead than HB pencils, creating darker lines ideal for sketching and shading.</li>
          <li>4B pencils are even softer and darker, perfect for deep shadows and intense areas of your artwork.</li>
          <li>6B pencils are among the softest and darkest available, excellent for the very deepest shadows and for creating bold, expressive marks.</li>
        </ul>

        <p>In summary, as the B number increases, the pencil lead gets softer and darker. At Akotro, our black paper pencils align with these characteristics, offering you the versatility to choose the right grade for your artistic needs.</p>

        <img
          src="/images/brwnpwncil.avif"
          alt="Pencils on Dark Background"
          className="w-full rounded-lg my-6 object-cover"
          style={{ maxHeight: '300px' }}
        />

        <h2>Where to Find the Best Black Paper Pencil Online</h2>

        <p>Finding quality black paper pencils online can be a bit of a challenge, but here are a few places to look:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Akotro.com:</strong> Our online store offers a range of black paper pencils crafted from 100% recycled materials. We are committed to eco-friendly practices and high-quality products.</li>
          <li><strong>IndiaMart:</strong> This platform can sometimes carry our products or similar eco-friendly stationery.</li>
          <li><strong>Etsy marketplaces:</strong> Various eco-conscious sellers often offer handcrafted paper pencils similar to ours.</li>
          <li><strong>Amazon India:</strong> A broad marketplace where eco-friendly stationery is increasingly available.</li>
        </ul>

        <p>It is always best to check our official website at{' '}
          <Link href="/shop" className="text-blue-600 hover:underline">akotro.com</Link>{' '}
          for the most authentic and sustainably made black paper pencils. We ensure that every product meets our high standards of quality and environmental responsibility.
        </p>

        <h2>Tips for Caring for Your Black Paper Pencils</h2>

        <p>Taking care of your black paper pencils ensures they last longer and perform at their best. Here are some tips:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Store them properly:</strong> Keep your pencils in a cool, dry place to prevent the paper from warping or the lead from breaking.</li>
          <li><strong>Sharpen gently:</strong> Use a sharpener designed for fragile pencils or sharpen by hand to avoid breaking the delicate paper barrel.</li>
          <li><strong>Avoid excessive moisture:</strong> The paper barrel can be susceptible to moisture, so avoid using them in damp conditions or storing them in humid environments.</li>
          <li><strong>Use a soft touch:</strong> Apply only as much pressure as needed. Excessive force can cause the pencil to crack or the lead to snap.</li>
        </ul>

        <h2>Ready to Elevate Your Art with Black Paper Pencils?</h2>

        <p>Caring for your black paper pencils is essential to maintain their quality and prolong their life. By storing them properly, sharpening gently, keeping them dry, and using a gentle touch, you can enjoy your eco-friendly art tools for much longer. These small acts of care not only preserve your pencils but also reflect your commitment to sustainable living.</p>

        <p>Remember, every choice you make matters. Choosing Akotro's black paper pencils is not just about art; it is a statement about the world you want to live in. Happy drawing!</p>
      </>
    ),
  },
  'akotro-pencil-pricing': {
    title: 'Cost Insights for Akotro Pencil Pricing: What You Need to Know',
    author: 'Devanshi Das',
    date: 'Apr 13, 2025',
    readTime: '3 min read',
    image: '/images/colourpaperpencil.avif',
    content: (
      <>
        <p>Understanding the pricing of eco-friendly products can often be confusing. At Akotro, we believe in complete transparency. This guide breaks down our pencil pricing and explains exactly what you are paying for when you choose Akotro.</p>

        <h2>What Makes Akotro Pencils Worth the Price?</h2>
        <p>Every Akotro pencil is handcrafted by women artisans in Mumbai using 100% recycled paper. The materials, the labour, and the love that goes into each pencil make them truly special. When you buy from Akotro, you are investing in people and the planet.</p>

        <img src="/images/colourpaperpencil.avif" alt="Colour Paper Pencils" className="w-full rounded-lg my-6 object-cover" style={{ maxHeight: '300px' }} />

        <h2>Our Pricing Breakdown</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Newspaper Pencil: ₹110 (original ₹185) — 40% OFF</li>
          <li>Brown Paper Pen: ₹115 (original ₹140) — 15% OFF</li>
          <li>Colour Paper Pencil Set: From ₹120 per set</li>
          <li>Plantable Pencils: ₹130 with seed embedded</li>
        </ul>

        <p>We regularly offer discounts to make sustainable stationery accessible to everyone. Bulk corporate orders receive additional discounts. Reach out to us for custom pricing.</p>
      </>
    ),
  },
  'bulk-eco-friendly-paper-pens': {
    title: 'Bulk Eco-Friendly Paper Pens: Your Ultimate Buying Guide',
    author: 'Devanshi Das',
    date: 'Apr 6, 2025',
    readTime: '4 min read',
    image: '/images/brownpaperpen.avif',
    content: (
      <>
        <p>Looking to buy eco-friendly paper pens in bulk for your office, event, or NGO? This comprehensive guide walks you through everything you need to know about bulk purchasing from Akotro.</p>

        <h2>Why Buy in Bulk?</h2>
        <p>Bulk orders offer significant cost savings and help you make a larger environmental impact. Whether you are a school, a corporation, or an event organiser, switching your stationery to eco-friendly alternatives sends a powerful message.</p>

        <img src="/images/brownpaperpen.avif" alt="Brown Paper Pens" className="w-full rounded-lg my-6 object-cover" style={{ maxHeight: '300px' }} />

        <h2>Minimum Order Quantities</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Standard bulk: 50+ units</li>
          <li>Corporate bulk: 200+ units with custom branding</li>
          <li>Event packs: Custom quantities available</li>
        </ul>

        <p>Contact us at support@akotro.com or WhatsApp us at +91 79001 79710 to get a custom quote for your bulk order.</p>
      </>
    ),
  },
  'top-eco-friendly-pens-india': {
    title: 'Top Eco-Friendly Pens in India: Your Guide to Sustainable Writing',
    author: 'Devanshi Das',
    date: 'Mar 31, 2025',
    readTime: '4 min read',
    image: '/images/pens.avif',
    content: (
      <>
        <p>India is home to a growing movement of conscious consumers choosing sustainable alternatives to plastic. In this guide, we explore the top eco-friendly pens available in India and why Akotro stands out from the crowd.</p>

        <h2>The Problem with Plastic Pens</h2>
        <p>Billions of plastic pens are discarded every year across India. They are non-biodegradable and end up in landfills and oceans. Making the switch to paper-based pens is one of the simplest changes you can make.</p>

        <img src="/images/pens.avif" alt="Eco Friendly Pens" className="w-full rounded-lg my-6 object-cover" style={{ maxHeight: '300px' }} />

        <h2>Top Picks for Eco-Friendly Pens</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Akotro Brown Paper Pen</strong> — 100% recycled paper barrel, smooth ballpoint ink</li>
          <li><strong>Akotro Newspaper Pen</strong> — Made from recycled newspapers, bold and unique</li>
          <li><strong>Akotro Plantable Pen</strong> — Plant it when done, grows into herbs or flowers</li>
        </ul>

        <p>All Akotro pens are made by women artisans in Mumbai, supporting local livelihoods while protecting the environment. Shop now at akotro.com.</p>
      </>
    ),
  },
};

const relatedPosts = [
  { slug: 'akotro-pencil-pricing', title: 'Cost Insights for Akotro Pencil Pricing: What You Need to Know', image: '/images/colourpaperpencil.avif', views: 3, comments: 0 },
  { slug: 'bulk-eco-friendly-paper-pens', title: 'Bulk Eco-Friendly Paper Pens: Your Ultimate Buying Guide', image: '/images/brownpaperpen.avif', views: 2, comments: 0 },
  { slug: 'top-eco-friendly-pens-india', title: 'Top Eco-Friendly Pens in India: Your Guide to Sustainable Writing', image: '/images/pens.avif', views: 2, comments: 0 },
];

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogData[slug];
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [commentsList, setCommentsList] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [nlEmail, setNlEmail] = useState('');
  const [nlSuccess, setNlSuccess] = useState(false);
  const [nlLoading, setNlLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlEmail) return;
    setNlLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: nlEmail }),
      });
      setNlSuccess(true);
      setNlEmail('');
    } catch (_) {
      setNlSuccess(true);
      setNlEmail('');
    } finally {
      setNlLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetch(`/api/blog/comments?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCommentsList(data.comments);
          }
        })
        .catch((err) => console.error('Fetch comments error:', err));
    }
  }, [slug]);

  const handlePostComment = async () => {
    if (!name.trim() || !comment.trim()) {
      alert('Please enter your name and comment.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, comment }),
      });
      const data = await res.json();
      if (data.success) {
        setCommentsList((prev) => [...prev, data.comment]);
        setComment('');
        setName('');
      } else {
        alert('Failed to post comment: ' + data.error);
      }
    } catch (err: any) {
      alert('Error posting comment: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FEFBD8]">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Post not found</h1>
          <Link href="/blog" className="text-red-600 hover:underline mt-4 inline-block">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const filtered = relatedPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FEFBD8]">
      <Header />

      {/* Article */}
      <article className="max-w-xl mx-auto px-4 py-8">

        {/* Author bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-black text-black">DD</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800 leading-tight">{post.author}</p>
              <p className="text-xs text-gray-500">{post.date} · {post.readTime}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-700 text-xl">⋮</button>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Body */}
        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4
          [&>h2]:text-base [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-6 [&>h2]:mb-2
          [&>p]:text-sm [&>p]:leading-relaxed
          [&>ul]:text-sm [&>ul]:space-y-1
          [&>ol]:text-sm [&>ol]:space-y-1
          [&>img]:rounded-lg [&>img]:w-full
        ">
          {post.content}
        </div>

        {/* Like / Share bar */}
        <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-200 text-gray-500 text-xs">
          <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Like
          </button>
          <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>

        {/* Comments */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-xs font-black text-black uppercase tracking-wide mb-4">Comments ({commentsList.length})</p>
          
          {/* Comments List */}
          <div className="space-y-4 mb-6">
            {commentsList.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              commentsList.map((c, i) => (
                <div key={i} className="bg-yellow-50/70 p-3 rounded-lg border border-yellow-100/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-900">{c.name}</span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(c.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 leading-normal">{c.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Comment Form */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Leave a Comment</p>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-yellow-400 placeholder-black text-black"
            />
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Leave a comment..."
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none placeholder-black text-black"
            />
            <button
              onClick={handlePostComment}
              disabled={isSubmitting}
              className="mt-2 bg-[#A40000] text-white text-xs font-bold px-4 py-2 rounded hover:bg-red-800 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? 'POSTING...' : 'POST COMMENT'}
            </button>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-10">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Related Posts</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {filtered.map(rp => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className="block group">
                <div className="relative rounded overflow-hidden h-20 mb-1">
                  <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <p className="text-xs text-gray-700 leading-snug line-clamp-2 font-medium">{rp.title}</p>
                <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                  <span className="flex items-center gap-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {rp.views}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {rp.comments}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* Join the Club */}
      <form onSubmit={handleNewsletterSubmit} className="bg-[#A40000] text-white text-center py-6 px-4 mt-4">
        <p className="text-xs font-black tracking-widest uppercase mb-1">Join the Sustainable Lifestyle Club</p>
        <p className="text-xs opacity-80 mb-3">Get eco-tips, product drops and offers — straight to your inbox.</p>
        <div className="flex justify-center gap-2">
          <input
            id="blog-newsletter-email"
            type="email"
            placeholder="Your email address"
            value={nlEmail}
            onChange={(e) => setNlEmail(e.target.value)}
            className="px-3 py-2 text-xs text-black bg-white rounded-l w-52 focus:outline-none placeholder-gray-500"
            required
          />
          <button 
            id="blog-newsletter-submit"
            type="submit"
            disabled={nlLoading}
            className="bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-r hover:bg-yellow-300 transition-colors disabled:opacity-60"
          >
            {nlLoading ? 'JOINING...' : 'JOIN'}
          </button>
        </div>
      </form>

      <Footer />

      {/* Newsletter Success Popup */}
      {nlSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative text-center">
            <button
              onClick={() => setNlSuccess(false)}
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
              onClick={() => setNlSuccess(false)}
              className="w-full bg-[#A40000] text-white py-3 rounded-lg font-bold hover:bg-red-800 transition-colors"
            >
              AWESOME, THANKS!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
