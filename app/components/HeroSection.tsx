'use client';

import Link from 'next/link';
import { useState } from 'react';
import BulkOrderModal from './BulkOrderModal';

export default function HeroSection() {
  const [showBulkModal, setShowBulkModal] = useState(false);

  return (
    <>
      <section style={{ backgroundColor: '#F0D23C' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-black">
              Re-Imagine.
              <br />
              Re-Create.
              <br />
              <span className="text-[#880808]">Re-Use.</span>
            </h1>
            <p className="text-black mb-8 text-sm leading-relaxed">
              Eco-friendly pencils &amp; pens made from recycled paper by artisans in Moradabad. Every product 
              has zero plastic. Some even glow in dark!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-0 w-full">
              <Link href="/shop" className="flex-1 flex">
                <button className="w-full bg-black text-white px-4 py-3 sm:py-2 rounded font-medium hover:bg-gray-800 shadow-md whitespace-nowrap text-center">
                  SHOP ALL PRODUCTS →
                </button>
              </Link>
              <button
                onClick={() => setShowBulkModal(true)}
                className="flex-1 w-full bg-[#880808] text-white px-4 py-3 sm:py-2 rounded font-medium hover:bg-[#6b0606] shadow-md whitespace-nowrap text-center"
              >
                BULK &amp; CORPORATE
              </button>
            </div>
            <div className="flex flex-wrap gap-3 mt-8 text-xs">
              <span className="bg-[#fdd835]/60 text-black px-3 py-1 rounded-full shadow-sm whitespace-nowrap">7-Day Delivery</span>
              <span className="bg-[#fdd835]/60 text-black px-3 py-1 rounded-full shadow-sm whitespace-nowrap">Pay on Delivery</span>
              <span className="bg-[#fdd835]/60 text-black px-3 py-1 rounded-full shadow-sm whitespace-nowrap">Women-Led</span>
            </div>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 md:mt-0">
            <div className="relative bg-gray-800 rounded-lg overflow-hidden h-80 flex items-center justify-center">
              <img src="/images/brwnpwncil.avif" alt="Brown Pencils" className="w-full h-full object-cover" />
              <span className="absolute bottom-3 left-3 bg-[#fdd835] text-black px-2 py-1 rounded text-xs font-bold shadow-md whitespace-nowrap">
                BROWN PENCIL
              </span>
            </div>
            <div className="relative bg-gray-800 rounded-lg overflow-hidden h-80 flex items-center justify-center">
              <img src="/images/pens.avif" alt="Colored Pencils" className="w-full h-full object-cover" />
              <span className="absolute bottom-3 left-3 bg-[#fdd835] text-black px-2 py-1 rounded text-xs font-bold shadow-md whitespace-nowrap">
                SEED PENCIL
              </span>
            </div>
          </div>
        </div>
      </section>

      {showBulkModal && <BulkOrderModal onClose={() => setShowBulkModal(false)} />}
    </>
  );
}
