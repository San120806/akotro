"use client";

import { Shield, Users, Clock, Heart, Star, DollarSign } from 'lucide-react';

export default function CoreValuesSection() {
  const values = [
    {
      icon: Shield,
      title: "Environmental Responsibility",
      description: "Every material decision — from paper sourcing to packaging — is made with environmental impact as the primary consideration. No compromises."
    },
    {
      icon: Users,
      title: "Community First",
      description: "We prioritise locally produced, conscious alternatives. The best businesses are those that lift the communities around them — ours starts in Mumbai."
    },
    {
      icon: Clock,
      title: "Radical Transparency",
      description: "We are open about how our products are made, who makes them, and where every rupee goes. Trust is built through honesty, not marketing."
    },
    {
      icon: Heart,
      title: "Made with Intention",
      description: "Nothing at Akotro is accidental. Every product exists because it solves a problem, replaces something harmful, and does it beautifully."
    },
    {
      icon: Star,
      title: "Quality Without Compromise",
      description: "Eco-friendly means nothing if the product fails. We obsess over writing quality, grip, sharpening ease — every functional detail matters."
    },
    {
      icon: DollarSign,
      title: "Accessible Sustainability",
      description: "Doing good shouldn't cost a premium. We price our products so that anyone — student, office, school — can choose sustainable without sacrifice."
    }
  ];

  return (
    <section className="bg-[#fffde8] flex flex-col">
      <div className="w-full max-w-7xl mx-auto px-4 pt-16 pb-12 flex-1">
        <div className="mb-8">
          <p className="font-bold text-sm uppercase text-[#A60702] mb-2 flex items-center gap-2 tracking-wide">
            <span className="w-6 h-0.5 bg-[#A60702]"></span>
            WHAT DRIVES US
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight">
            Our <span className="text-[#A60702]">Core Values</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#fdd835] border border-[#fdd835] rounded-md overflow-hidden">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index} 
                className="p-8 bg-white flex flex-col"
              >
                <div className="mb-6">
                  <Icon className="w-7 h-7 text-[#A60702]" strokeWidth={2} />
                </div>
                <h3 className="font-bold text-lg text-black mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="bg-[#1A1A1A] border-t-4 border-[#fdd835]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-8 text-center flex flex-col items-center justify-center">
              <div className="text-[#fdd835] text-4xl md:text-5xl font-black mb-2">18</div>
              <div className="text-white text-xs font-bold tracking-[0.2em] uppercase">ECO PRODUCTS</div>
            </div>
            <div className="py-8 text-center flex flex-col items-center justify-center">
              <div className="text-[#fdd835] text-4xl md:text-5xl font-black mb-2">100%</div>
              <div className="text-white text-xs font-bold tracking-[0.2em] uppercase">RECYCLED PAPER</div>
            </div>
            <div className="py-8 text-center flex flex-col items-center justify-center">
              <div className="text-[#fdd835] text-4xl md:text-5xl font-black mb-2">0</div>
              <div className="text-white text-xs font-bold tracking-[0.2em] uppercase">PLASTIC USED</div>
            </div>
            <div className="py-8 text-center flex flex-col items-center justify-center">
              <div className="text-[#fdd835] text-4xl md:text-5xl font-black mb-2">2023</div>
              <div className="text-white text-xs font-bold tracking-[0.2em] uppercase">FOUNDED MUMBAI</div>
            </div>
            <div className="py-8 text-center flex flex-col items-center justify-center col-span-2 md:col-span-1">
              <div className="text-[#fdd835] text-4xl md:text-5xl font-black mb-2 flex items-center justify-center gap-1">
                5<svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
              </div>
              <div className="text-white text-xs font-bold tracking-[0.2em] uppercase">AVG. RATING</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
