import Link from 'next/link';

export default function TeamSection() {
  return (
    <section className="py-0 flex flex-col md:flex-row w-full">
      {/* Left - Yellow Background */}
      <div className="flex-1 bg-yellow-100 py-16">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-red-600 font-bold text-sm mb-2">— ABOUT AKOTRO</p>
          <h2 className="text-4xl font-bold mb-6 text-black">
            एकत्र — Together.
          </h2>
          <p className="text-sm text-black leading-relaxed mb-6">
            Akotro is your premier destination for sustainable solutions. Top-quality paper stationery crafted from 100% recycled paper by women artisans in Mumbai.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-white rounded">
              <p className="font-bold text-sm text-black">RECYCLED PAPER PRODUCTS</p>
              <p className="text-xs text-black">Made from recycled paper waste, transforming discarded materials into sustainable stationery with purpose.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-white rounded">
              <p className="font-bold text-sm text-black">HANDCRAFTED BY RURAL WOMEN</p>
              <p className="text-xs text-black">Created by talented women artisans from rural communities, preserving traditional skills while building economic independence.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-white rounded">
              <p className="font-bold text-sm text-black">PLANTABLE & BIODEGRADABLE</p>
              <p className="text-xs text-black">Embedded with seeds and designed to return to nature, creating life long after the last word is written.</p>
            </div>
          </div>

          <Link href="/about" className="block w-full">
            <button className="w-full bg-red-700 text-white px-6 py-3 rounded font-medium hover:bg-red-800 text-sm">
              READ OUR FULL STORY →
            </button>
          </Link>
        </div>
      </div>

      {/* Yellow Divider - Full Height */}
      <div className="w-1 bg-yellow-400"></div>

      {/* Right - White Background */}
      <div className="flex-1 bg-white py-16">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-red-600 font-bold text-sm mb-2">— MEET THE TEAM</p>
          <h2 className="text-3xl font-bold mb-8">
            <span className="text-black">The People Behind </span><span className="text-red-600">Akotro</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border-2 border-yellow-400 overflow-hidden flex flex-col">
              <div className="h-64 md:h-80 w-full overflow-hidden flex items-center justify-center">
                <img src="/images/sangitadas.avif" alt="Sangita Das" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1">
                <p className="text-red-600 font-bold text-xs mb-1">FOUNDER & OWNER</p>
                <h4 className="font-bold text-sm text-black mb-2">Sangita Das</h4>
                <p className="text-xs text-black">Sustainability advocate. Founded Akotro to replace plastic and empower local women.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-yellow-400 overflow-hidden flex flex-col">
              <div className="h-64 md:h-80 w-full overflow-hidden flex items-center justify-center">
                <img src="/images/devanshidas.avif" alt="Devaanshi Das" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1">
                <p className="text-red-600 font-bold text-xs mb-1">ECO WARRIOR</p>
                <h4 className="font-bold text-sm text-black mb-2">Devaanshi Das</h4>
                <p className="text-xs text-black">Student & eco-warrior leading production and sustainable innovation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
