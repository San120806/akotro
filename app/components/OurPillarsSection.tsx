"use client";

import { useState } from "react";

export default function OurPillarsSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const togglePillar = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const pillars = [
    {
      icon: "‍",
      title: "Empowering Women",
      subtitle: "SOCIAL IMPACT · WOMEN ARTISANS",
      description: "At the heart of Akotro's mission lies a steadfast commitment to empowering women. Through the employment of women from nearby localities, the company not only provides them with a steady income but also imparts valuable skills and training in stationery production and crafting. These women are integral to every stage of manufacturing — from collecting recycled paper to assembling finished products."
    },
    {
      icon: "",
      title: "Sustainable Production",
      subtitle: "ZERO PLASTIC · 100% RECYCLED PAPER",
      description: "Every product starts with waste — turning discarded materials into beautiful, functional stationery. Our eco-conscious manufacturing process ensures that sustainability is embedded in every step, from collection to crafting, creating products that are kind to the planet."
    },
    {
      icon: "",
      title: "Community Impact",
      subtitle: "EDUCATION · OUTREACH · WORKSHOPS",
      description: "We believe in creating lasting impact beyond business. Through education initiatives, community outreach, and workshops, we work to foster a culture of sustainability and conscious consumption in the communities we serve."
    },
    {
      icon: "",
      title: "Quality Without Compromise",
      subtitle: "ECO-FRIENDLY · PREMIUM PERFORMANCE",
      description: "Sustainability doesn't mean sacrificing quality. Our products are crafted to perform at the highest level while remaining kind to the environment, proving that eco-consciousness and excellence can go hand in hand."
    }
  ];

  return (
    <section className="bg-[#A60702] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section */}
          <div>
            <p className="font-bold text-xs uppercase mb-2 text-[#fdd835]">OUR FOUR PILLARS</p>
            <h2 className="text-4xl font-extrabold mb-6">
              What We
              <br />
              <span className="text-[#fdd835]">Stand For</span>
            </h2>
            <p className="text-white text-sm leading-relaxed mb-8">
              Every decision at Akotro — from which paper to source, to which community to partner with — is guided by our core pillars. These are the principles behind everything we make.
            </p>
            <a href="/shop" className="inline-block">
              <button className="bg-[#fdd835] text-black px-6 py-2 rounded font-bold hover:bg-[#fdd835] transition-colors text-sm">
                SHOP OUR PRODUCTS →
              </button>
            </a>
          </div>

          {/* Right Section - Pillars Accordion */}
          <div className="space-y-4">
            {pillars.map((pillar, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="flex gap-4 cursor-pointer group pb-4 border-b border-red-800/50 last:border-b-0"
                  onClick={() => togglePillar(index)}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-[#fdd835] flex items-center justify-center text-lg font-bold text-black shadow-sm">
                      {String.fromCharCode(64 + index + 1)}
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-white group-hover:text-[#fdd835] transition-colors">{pillar.title}</h3>
                      <span className="text-[#fdd835] text-xl font-light ml-4">
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>

                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="text-xs text-[#fdd835] uppercase mb-2 mt-1 font-medium tracking-wide">{pillar.subtitle}</p>
                        <p className="text-xs text-white/90 leading-relaxed pb-2">{pillar.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
