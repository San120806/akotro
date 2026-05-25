'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  featured?: boolean;
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data.slice(0, 4)); // Show first 4 products
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  if (products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">OUR PRODUCTS</h2>
            <p className="text-gray-600">
              Made from Recycled Paper. <span className="font-bold text-red-600">Zero Plastic.</span>
            </p>
            <Link href="/shop" className="text-red-600 font-bold text-sm mt-2 inline-block">
              VIEW ALL →
            </Link>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">No products available yet. Check back soon!</p>
            <Link href="/admin/products" className="text-red-600 font-bold mt-4 inline-block">
              Add products from admin panel →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">OUR PRODUCTS</h2>
          <p className="text-gray-600">
            Made from Recycled Paper. <span className="font-bold text-red-600">Zero Plastic.</span>
          </p>
          <Link href="/shop" className="text-red-600 font-bold text-sm mt-2 inline-block">
            VIEW ALL →
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <div className="group cursor-pointer">
                {/* Product Image */}
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 h-64 shadow-md">
                  <img
                    src={product.image || 'https://via.placeholder.com/300x300'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-3 left-3 bg-yellow-300 text-black px-2 py-1 rounded text-xs font-bold shadow-sm whitespace-nowrap">
                    {product.featured ? 'FEATURED' : 'NEW'}
                  </span>
                </div>

                {/* Product Info */}
                <h3 className="font-bold text-sm mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                {/* Price and Button */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">₹{product.price}</span>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-700 shadow-md whitespace-nowrap">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
