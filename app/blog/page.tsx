import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    author: 'Devanshi Das',
    date: 'Apr 28',
    readTime: '3 min read',
    title: 'Shop Black Paper Pencils Online Today: Your Guide to Creative Eco-Friendly Art',
    image: '/images/blackpaperpencil.avif',
    views: 2,
    comments: 0,
    slug: 'shop-black-paper-pencils',
  },
  {
    id: 2,
    author: 'Devanshi Das',
    date: 'Apr 13',
    readTime: '3 min read',
    title: 'Cost Insights for Akotro Pencil Pricing: What You Need to Know',
    image: '/images/colourpaperpencil.avif',
    views: 3,
    comments: 0,
    slug: 'akotro-pencil-pricing',
  },
  {
    id: 3,
    author: 'Devanshi Das',
    date: 'Apr 6',
    readTime: '4 min read',
    title: 'Bulk Eco-Friendly Paper Pens: Your Ultimate Buying Guide',
    image: '/images/brownpaperpen.avif',
    views: 2,
    comments: 0,
    slug: 'bulk-eco-friendly-paper-pens',
  },
  {
    id: 4,
    author: 'Devanshi Das',
    date: 'Mar 31',
    readTime: '4 min read',
    title: 'Top Eco-Friendly Pens in India: Your Guide to Sustainable Writing',
    image: '/images/pens.avif',
    views: 2,
    comments: 0,
    slug: 'top-eco-friendly-pens-india',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FEFBD8]">
      <Header />

      {/* Hero Title */}
      <div className="pt-10 pb-6 text-center px-4">
        <h1
          className="text-3xl md:text-5xl font-black tracking-[0.2em] uppercase"
          style={{ color: '#880808', fontFamily: 'serif' }}
        >
          Akotro E-Paper Blog
        </h1>
      </div>

      {/* Blog Grid — 2 columns, 2 cards fully visible in viewport */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
              <div
                className="relative rounded-lg overflow-hidden cursor-pointer"
                style={{ height: '38vh', minHeight: '260px', maxHeight: '320px' }}
              >
                {/* Background image */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                {/* Top meta — author, date, options */}
                <div className="absolute top-3 left-0 right-0 px-4 flex justify-between items-start">
                  <div className="text-center">
                    <p className="text-white text-xs font-semibold leading-tight">{post.author}</p>
                    <p className="text-gray-300 text-xs">{post.date} · {post.readTime}</p>
                  </div>
                  <button className="text-white opacity-70 hover:opacity-100 text-lg leading-none">⋮</button>
                </div>

                {/* Bottom — title + stats */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                  <h2 className="text-yellow-300 font-bold text-sm md:text-base leading-snug mb-3">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-white text-xs opacity-80">
                    <span className="flex items-center gap-1">
                      {/* Eye icon */}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {post.views}
                    </span>
                    <span className="flex items-center gap-1">
                      {/* Comment icon */}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.comments}
                    </span>
                    <span className="ml-auto">
                      {/* Heart icon */}
                      <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
