'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductShowcaseSection() {
  const [activeTab, setActiveTab] = useState('hero');
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
    try {
      const existing = JSON.parse(localStorage.getItem('akotro_cart') || '[]');
      const idx = existing.findIndex((i: any) => i.id === String(product.id));
      if (idx > -1) {
        existing[idx].quantity += 1;
      } else {
        existing.push({ id: String(product.id), name: product.name, price: product.price, image: product.image, quantity: 1 });
      }
      localStorage.setItem('akotro_cart', JSON.stringify(existing));
      setAddedIds(prev => [...prev, product.id]);
      setTimeout(() => setAddedIds(prev => prev.filter(id => id !== product.id)), 1500);
    } catch (_) {}
  };

  const products = [
    {
      id: 1,
      badge: 'HERO #1',
      image: '/images/newspaperpencil.avif',
      name: 'News Paper Pencil',
      description: 'Our most beloved product - crafted from recycled newspapers, giving waste paper a beautiful second life. Smooth 2B lead, perfect everyday pencil. Loved by artists, students, and eco-conscious souls.',
      price: 110,
      originalPrice: 185,
      discount: 40,
      save: 75,
    },
    {
      id: 2,
      badge: 'HERO #2',
      image: '/images/brownpaperpen.avif',
      name: 'Brown Paper Pen',
      description: 'Smooth ballpoint in a 100% recycled brown paper barrel. Comfortable grip, consistent ink flow, and a warm earthy look that stands apart from plastic pens. The perfect everyday pen – and ideal for everyday eco-warriors.',
      price: 115,
      originalPrice: 140,
      discount: 15,
      save: 25,
    },
    {
      id: 3,
      badge: 'NEW ARRIVAL',
      image: '/images/brwnpwncil.avif',
      name: 'Plantable Brown Paper Pen',
      description: 'Eco-friendly plantable pencil with seeds embedded in the barrel. After use, plant it and watch it grow! Perfect for environmentally conscious users who want to make a lasting impact. Every pencil creates new growth.',
      price: 115,
      originalPrice: 145,
      discount: 20,
      save: 30,
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div className="mb-4 md:mb-0">
            <p className="text-red-600 font-bold text-sm mb-2">OUR PRODUCTS</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-black">Made from Recycled Paper.</span> <span className="text-red-600 block md:inline">Zero Plastic.</span>
            </h2>
          </div>
          <Link href="/shop" className="text-red-600 font-bold text-sm hover:underline">
            VIEW ALL 18 →
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <button
            onClick={() => setActiveTab('hero')}
            className="px-6 py-3 rounded-full bg-red-600 text-white text-sm font-bold hover:bg-red-700 shadow-md transition-colors whitespace-nowrap"
          >
             OUR HERO PRODUCTS
          </button>
          <span className="text-gray-700 text-sm font-bold">
            Bestsellers - Start here
          </span>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col">
              {/* Image Container */}
              <div className="relative h-64 bg-gray-100 overflow-hidden flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block bg-yellow-300 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {product.badge}
                  </span>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                    {product.discount}% OFF
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-sm mb-2 text-black">{product.name}</h3>
                
                {product.description && (
                  <p className="text-xs text-black mb-3 line-clamp-3 flex-grow">{product.description}</p>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-lg text-black">₹{product.price}</span>
                  <span className="text-xs text-black line-through">₹{product.originalPrice}</span>
                </div>

                {/* Save Info */}
                <p className="text-xs text-red-600 font-bold mb-4">Save ₹{product.save}</p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                  className={`w-full px-4 py-3 rounded-lg text-xs font-bold shadow-md transition-colors whitespace-nowrap mt-auto ${
                    addedIds.includes(product.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {addedIds.includes(product.id) ? '✓ ADDED TO CART!' : 'ADD TO CART'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
