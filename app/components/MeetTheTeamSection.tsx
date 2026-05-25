export default function MeetTheTeamSection() {
  return (
    <section className="bg-[#FDF4BE] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-12">
          <div>
            <p className="text-red-600 font-bold text-xs uppercase mb-2">MEET THE TEAM</p>
            <h2 className="text-4xl font-bold text-black mb-4">
              The People Behind
              <br />
              <span className="text-red-600">Akotro</span>
            </h2>
          </div>
          <div>
            <p className="text-black text-sm leading-relaxed">
              Team Akotro creates eco-friendly stationery from recycled paper, prioritizing sustainability in every product. We are a small, passionate team driven by the belief that everyday objects can carry extraordinary meaning — and that business can be a force for good.
            </p>
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Sangita Das */}
          <div className="border-4 border-yellow-300 rounded-lg p-6 bg-white">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="/images/sangitadas.avif" 
                  alt="Sangita Das" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-red-600 font-bold text-xs uppercase">FOUNDER & OWNER</p>
                <h3 className="text-xl font-bold text-black">Sangita Das</h3>
                <p className="text-black text-xs">अकोत्र का</p>
              </div>
            </div>
            <p className="text-black text-sm leading-relaxed mb-4">
              Sangita is a passionate advocate for green, sustainable living. As the owner and founder of Akotro, she leads this organization dedicated to producing eco-friendly recycled pens. Her mission is to inspire others to embrace sustainable practices while providing high-quality, environmentally conscious products.
            </p>
            <p className="text-black text-sm leading-relaxed mb-4">
              A Mumbai-based entrepreneur, Sangita saw an opportunity not just to build a sustainable business, but to create meaningful employment for women in the community — combining environmental purpose with social impact.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-yellow-200 text-black text-xs px-2 py-1 rounded font-bold">SUSTAINABILITY</span>
              <span className="bg-yellow-200 text-black text-xs px-2 py-1 rounded font-bold">ENTREPRENEURSHIP</span>
              <span className="bg-yellow-200 text-black text-xs px-2 py-1 rounded font-bold">IMPACT</span>
              <span className="bg-yellow-200 text-black text-xs px-2 py-1 rounded font-bold">WOMEN EMPOWERMENT</span>
            </div>
          </div>

          {/* Card 2: Devanshi Das */}
          <div className="border-4 border-yellow-300 rounded-lg p-6 bg-white">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="/images/devanshidas.avif" 
                  alt="Devanshi Das" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-red-600 font-bold text-xs uppercase">ECO WARRIOR</p>
                <h3 className="text-xl font-bold text-black">Devanshi Das</h3>
                <p className="text-black text-xs">ईको वारियर</p>
              </div>
            </div>
            <p className="text-black text-sm leading-relaxed mb-4">
              Devanshi is a student committed to promoting green, sustainable living. As Eco Warrior of Akotro, she spearheads the production of eco-friendly recycled pens. Her commitment doesn't only drive her own actions but inspires others to embrace eco-conscious choices through Akotro's innovative products.
            </p>
            <p className="text-black text-sm leading-relaxed mb-4">
              Young, driven, and deeply committed to the cause — Devanshi represents the next generation of climate-conscious Indians who believe business can be a force for environmental good.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-yellow-200 text-black text-xs px-2 py-1 rounded font-bold">STUDENT</span>
              <span className="bg-yellow-200 text-black text-xs px-2 py-1 rounded font-bold">ECO WARRIOR</span>
              <span className="bg-yellow-200 text-black text-xs px-2 py-1 rounded font-bold">PRODUCTION HEAD</span>
              <span className="bg-yellow-200 text-black text-xs px-2 py-1 rounded font-bold">CHANGE MAKER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
