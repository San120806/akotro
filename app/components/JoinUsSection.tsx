import Image from 'next/image';

export default function JoinUsSection() {
  return (
    <section className="bg-[#FDF4BE] py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div>
          <p className="font-bold text-sm uppercase text-[#A60702] mb-3 flex items-center gap-2 tracking-wide">
            <span className="w-6 h-0.5 bg-[#A60702]"></span>
            JOIN US
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black leading-tight mb-4 tracking-tight">
            Join the Sustainable
            <br />
            <span className="text-[#A60702]">Lifestyle Club</span>
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
            We're building a community of conscious consumers across India. Follow us on Instagram for behind-the-scenes from our workshop, eco-living tips, and new product drops. Tag us in your Akotro moments.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://instagram.com/akotro_official" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#A60702] text-white px-6 py-3 rounded text-xs tracking-wider font-bold flex items-center gap-2 hover:bg-red-800 transition-colors"
            >
              @AKOTRO_OFFICIAL
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
            <a 
              href="/shop"
              className="bg-black text-[#F9C923] px-6 py-3 rounded text-xs tracking-wider font-bold hover:bg-gray-800 transition-colors"
            >
              SHOP PRODUCTS
            </a>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="grid grid-cols-2 gap-2 bg-[#F9C923] border-4 border-[#F9C923] rounded-lg overflow-hidden h-[400px] md:h-[500px]">
          {/* Left tall image */}
          <div className="relative h-full w-full bg-white">
            <Image
              src="/images/brwnpwncil.avif"
              alt="Brown pencils"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Right stacked images */}
          <div className="grid grid-rows-2 gap-2 h-full">
            <div className="relative w-full h-full bg-white">
              <Image
                src="/images/colourpaperpencil.avif"
                alt="Colorful paper pencils"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-full bg-white">
              <Image
                src="/images/84c7b6_a149e7aaeb5847268fb467ce26b25d53~mv2.avif"
                alt="Akotro pencil making"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
