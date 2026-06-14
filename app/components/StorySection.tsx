export default function StorySection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section 1: How It Started */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div className="bg-gray-800 rounded-lg overflow-hidden h-80 flex items-center justify-center">
            <img 
              src="/images/brwnpwncil.avif" 
              alt="How It Started" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div>
            <p className="text-[#880808] font-bold text-xs uppercase mb-2">HOW IT STARTED</p>
            <h2 className="text-3xl font-bold text-black mb-4">A simple question: Why is stationery not sustainable?</h2>
            <p className="text-black text-sm leading-relaxed mb-6">
              We started with a simple question: Why aren't stationary products being made with environmental consciousness? Most of the stationery we use today is made from virgin plastic, contributing to pollution and waste. We realized that even small everyday items like pens and pencils could be redesigned to be sustainable without compromising on quality or aesthetics.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-[#fdd835] text-black text-xs px-3 py-1 rounded font-bold">SUSTAINABLE</span>
              <span className="bg-[#fdd835] text-black text-xs px-3 py-1 rounded font-bold">ZERO WASTE</span>
              <span className="bg-[#fdd835] text-black text-xs px-3 py-1 rounded font-bold">ECO-FRIENDLY</span>
            </div>
          </div>
        </div>

        {/* Section 2: How We Make It */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <div>
            <p className="text-[#880808] font-bold text-xs uppercase mb-2">HOW WE MAKE IT</p>
            <h2 className="text-3xl font-bold text-black mb-4">Paper collected. Pencils hand-rolled.</h2>
            <p className="text-black text-sm leading-relaxed mb-6">
              Every Akotro product starts with waste paper — discarded newspapers, kraft offcuts, and colored sheets that would otherwise end up in landfills. We collect these materials and transform them into beautiful, functional stationery. Our skilled artisans hand-roll each pencil with precision, ensuring quality and sustainability in every step of the process.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-[#fdd835] text-black text-xs px-3 py-1 rounded font-bold">HANDMADE</span>
              <span className="bg-[#fdd835] text-black text-xs px-3 py-1 rounded font-bold">ARTISAN-CRAFTED</span>
              <span className="bg-[#fdd835] text-black text-xs px-3 py-1 rounded font-bold">UPCYCLED</span>
            </div>
          </div>
          
          {/* Image */}
          <div className="bg-gray-800 rounded-lg overflow-hidden h-80 flex items-center justify-center">
            <img 
              src="/images/pens.avif" 
              alt="How We Make It" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Section 3: Why It Matters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="bg-gray-800 rounded-lg overflow-hidden h-80 flex items-center justify-center">
            <img 
              src="/images/84c7b6_a149e7aaeb5847268fb467ce26b25d53~mv2.avif" 
              alt="Why It Matters" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div>
            <p className="text-[#880808] font-bold text-xs uppercase mb-2">WHY IT MATTERS</p>
            <h2 className="text-3xl font-bold text-black mb-4">Every pen supports a livelihood.</h2>
            <p className="text-black text-sm leading-relaxed mb-6">
              Beyond environmental impact, our mission is to create meaningful opportunities for artisan communities. Every product sold directly supports the women and artisans who craft them, enabling them to build sustainable livelihoods. By choosing Akotro, you're not just making an eco-conscious choice — you're supporting people and building a more equitable, sustainable future.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-[#fdd835] text-black text-xs px-3 py-1 rounded font-bold">WOMEN-EMPOWERED</span>
              <span className="bg-[#fdd835] text-black text-xs px-3 py-1 rounded font-bold">COMMUNITY</span>
              <span className="bg-[#fdd835] text-black text-xs px-3 py-1 rounded font-bold">IMPACT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
