import Link from 'next/link';

export default function AboutHeroSection() {
  return (
    <section style={{ backgroundColor: '#F0D23C' }} className="py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-black">
            एकत्र —
            <br />
            <span className="text-red-600">Together.</span>
          </h1>
          <p className="text-black mb-8 text-sm leading-relaxed">
            We are passionate about protecting the environment while providing top-quality paper stationery. Crafted from recycled paper by women artisans in Mumbai — changing spending patterns, one pen at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-0 w-full">
            <Link href="/shop" className="flex-1 flex">
              <button className="w-full bg-black text-white px-4 py-3 sm:py-2 rounded font-medium hover:bg-gray-800 shadow-md whitespace-nowrap text-center">
                SHOP OUR PRODUCTS →
              </button>
            </Link>
            <button className="flex-1 w-full bg-red-600 text-white px-4 py-3 sm:py-2 rounded font-medium hover:bg-red-700 shadow-md whitespace-nowrap text-center">
              BULK & CORPORATE
            </button>
          </div>
          <div className="flex flex-wrap gap-3 mt-8 text-xs">
            <span className="bg-yellow-200 text-black px-3 py-1 rounded-full shadow-sm whitespace-nowrap">7-Day Delivery</span>
            <span className="bg-yellow-200 text-black px-3 py-1 rounded-full shadow-sm whitespace-nowrap">Woman-led</span>
            <span className="bg-yellow-200 text-black px-3 py-1 rounded-full shadow-sm whitespace-nowrap">1.5M Recycled</span>
            <span className="bg-yellow-200 text-black px-3 py-1 rounded-full shadow-sm whitespace-nowrap">+ 5K Inspired</span>
          </div>
        </div>

        {/* Right Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 md:mt-0">
          <div className="relative bg-gray-800 rounded-lg overflow-hidden h-80 flex items-center justify-center">
            <img 
              src="/images/sangitadas.avif" 
              alt="Sangita Das" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <p className="text-white font-bold text-sm">FOUNDER & OWNER</p>
              <p className="text-yellow-400 font-bold">Sangita Das</p>
            </div>
          </div>
          <div className="relative bg-gray-800 rounded-lg overflow-hidden h-80 flex items-center justify-center">
            <img 
              src="/images/devanshidas.avif" 
              alt="Devanshi Das" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <p className="text-white font-bold text-sm">CO-FOUNDER</p>
              <p className="text-yellow-400 font-bold">Devanshi Das</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
