'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { myWixClient } from '@/lib/wixClient';

// Helper to convert Wix image URL to standard URL
function getImageUrl(wixUrl: string | undefined) {
  if (!wixUrl) return '/images/pencil.jpg'; // fallback
  if (wixUrl.startsWith('http')) return wixUrl;
  if (wixUrl.startsWith('wix:image://v1/')) {
    const wixImageId = wixUrl.split('wix:image://v1/')[1].split('/')[0];
    return `https://static.wixstatic.com/media/${wixImageId}`;
  }
  return wixUrl;
}

const CATEGORIES = ['All Products', 'Pencils', 'Pens', 'Plantable', 'Limited Edition'];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Pencils': ['pencil'],
  'Pens': ['pen'],
  'Plantable': ['plantable'],
  'Limited Edition': ['limited'],
};

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';
  
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [addedProduct, setAddedProduct] = useState<any>(null);
  const [wixProducts, setWixProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nlEmail, setNlEmail] = useState('');
  const [nlLoading, setNlLoading] = useState(false);
  const [nlSuccess, setNlSuccess] = useState(false);

  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('akotro_wishlist');
      if (stored) setWishlist(JSON.parse(stored));
    } catch (_) {}
  }, []);

  const toggleWishlist = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const isFav = wishlist.some((item: any) => item.id === product.id);
    let updated: any[];
    if (isFav) {
      updated = wishlist.filter((item: any) => item.id !== product.id);
    } else {
      updated = [...wishlist, {
        id: product.id,
        name: product.name || product.title,
        price: product.rawPrice !== undefined ? product.rawPrice : (typeof product.price === 'string' ? parseFloat(product.price.replace('₹', '')) : product.price),
        image: product.image || product.img
      }];
    }
    setWishlist(updated);
    localStorage.setItem('akotro_wishlist', JSON.stringify(updated));
  };

  const isFavorite = (productId: string) => {
    return wishlist.some((item: any) => item.id === productId);
  };

  // Fetch products from Wix
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await myWixClient.products.queryProducts().find();
        
        // Map Wix products to our app's structure
        const mappedProducts = res.items.map((p) => {
          const origPrice = p.priceData?.price || 0;
          const salePrice = p.priceData?.discountedPrice || origPrice;
          const hasDiscount = salePrice < origPrice;
          const discountPct = hasDiscount ? Math.round(((origPrice - salePrice) / origPrice) * 100) : 0;
          const save = hasDiscount ? origPrice - salePrice : 0;
          return {
            id: p._id,
            name: p.name,
            description: p.description ? p.description.replace(/<[^>]*>?/gm, '') : '',
            price: `₹${salePrice}`,
            rawPrice: salePrice,
            originalPrice: hasDiscount ? origPrice : null,
            discount: hasDiscount ? discountPct : null,
            save: hasDiscount ? save : null,
            category: p.collectionIds && p.collectionIds.length > 0 ? 'Plantable' : 'Pencils',
            label: p.name,
            image: getImageUrl(p.media?.mainMedia?.image?.url),
            link: `/shop/${p._id}`
          };
        });
        
        setWixProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to fetch Wix products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // First filter by category
  let filtered = activeCategory === 'All Products'
    ? wixProducts
    : wixProducts.filter(p => {
        if (activeCategory === 'Limited Edition') {
          const limitedEditionNames = [
            'Black Paper Pencil',
            'Brown Paper Pencil',
            'Plantable White Paper Pencil',
            'Plantable Black Paper Pencil',
          ];
          return limitedEditionNames.includes(p.name);
        }
        const keywords = CATEGORY_KEYWORDS[activeCategory] ?? [];
        const combined = p.category.toLowerCase() + ' ' + p.name.toLowerCase();
        if (activeCategory === 'Pens') return combined.includes('pen') && !combined.includes('pencil');
        return keywords.some(kw => combined.includes(kw));
      });
      
  // Then filter by search query if it exists
  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery) || 
      p.description.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    );
  }

  // Sort products according to user requested order
  const PRODUCT_ORDER = [
    'Color Paper Pencil',
    'Color Lead News Paper Pencil',
    'Plantable Color Lead Paper Pencil',
    'Plantable Color Paper Pencil',
    'Color Lead Color Paper Pencil',
    'Plantable News Paper Pencil',
    'News Paper Pencil',
    'Black Paper Pencil',
    'Brown Paper Pencil',
    'Plantable White Paper Pencil',
    'Plantable Black Paper Pencil',
  ];

  filtered = [...filtered].sort((a, b) => {
    const idxA = PRODUCT_ORDER.indexOf(a.name);
    const idxB = PRODUCT_ORDER.indexOf(b.name);
    
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    
    return wixProducts.indexOf(a) - wixProducts.indexOf(b);
  });

  const addToCart = (product: any, e: any) => {
    e.preventDefault();
    const currentCart = JSON.parse(localStorage.getItem('akotro_cart') || '[]');
    const existing = currentCart.find((i: any) => i.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      currentCart.push({
        id: product.id,
        name: product.name || product.title || product.id,
        price: product.rawPrice || 0,
        image: product.image,
        quantity: 1
      });
    }
    localStorage.setItem('akotro_cart', JSON.stringify(currentCart));
    setAddedProduct(product);
  };

  return (
    <div style={{ backgroundColor: '#fffde8', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }

        /* Hero Products */
        .hero-products { max-width:1280px; margin:0 auto; padding:40px 28px 0; }
        .hero-products-header { display:flex; align-items:center; gap:14px; margin-bottom:18px; }
        .hero-products-badge { display:inline-flex; align-items:center; gap:6px; background:#880808; color:#fff; font-size:11px; font-weight:700; letter-spacing:.05em; padding:6px 14px; border-radius:999px; }
        .hero-products-sub { font-size:13px; color:#555; font-style:italic; }
        .hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        @media(max-width:700px){ .hero-grid{grid-template-columns:1fr;} }
        .hero-card { background:#fff; border-radius:14px; border:2px solid #fdd835; overflow:hidden; display:flex; min-height:220px; }
        .hero-card-img { width:220px; min-width:220px; position:relative; overflow:hidden; }
        @media(max-width:700px) {
          .hero-card { flex-direction: column; min-height: auto; }
          .hero-card-img { width: 100%; min-width: 100%; height: 240px; }
        }
        .hero-card-body { padding:18px 20px; display:flex; flex-direction:column; justify-content:space-between; flex:1; }
        .hero-card-badges { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
        .hbadge-num { background:#fdd835; color:#111; font-size:10px; font-weight:800; padding:3px 10px; border-radius:999px; }
        .hbadge-off { background:#880808; color:#fff; font-size:10px; font-weight:800; padding:3px 10px; border-radius:999px; }
        .hero-card-cat { font-size:9.5px; font-weight:700; letter-spacing:.08em; color:#880808; margin-bottom:5px; text-transform:uppercase; }
        .hero-card-name { font-size:20px; font-weight:900; color:#111; margin-bottom:8px; line-height:1.1; }
        .hero-card-desc { font-size:12.5px; color:#444; line-height:1.6; margin-bottom:12px; flex:1; }
        .hero-card-foot { display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
        .hero-price-wrap { display:flex; flex-direction:column; gap:2px; }
        .hero-price { font-size:20px; font-weight:900; color:#111; }
        .hero-price-orig { font-size:12px; color:#aaa; text-decoration:line-through; }
        .hero-save { background:#fdd835; color:#111; font-size:10px; font-weight:800; padding:2px 8px; border-radius:4px; margin-top:2px; width:fit-content; }
        .hero-atc { background:#880808; color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:700; padding:10px 20px; cursor:pointer; display:flex; align-items:center; gap:7px; transition:background .2s; }
        .hero-atc:hover { background:#6b0606; }

        /* Product grid */
        .grid-wrap { max-width:1280px; margin:0 auto; padding:40px 28px 60px; }
        .filter-tabs { display:flex; justify-content:center; gap:12px; margin-bottom:24px; flex-wrap:wrap; }
        .filter-btn { background:#fff; border:1px solid rgba(0,0,0,0.1); border-radius:999px; padding:8px 20px; font-size:13px; font-weight:600; color:#444; cursor:pointer; transition:all 0.2s; }
        .filter-btn:hover { border-color:#fdd835; color:#111; }
        .filter-btn.active { background:#fdd835; border-color:#fdd835; color:#111; }
        .grid-count { font-size:13px; font-weight:700; color:#555; text-align:center; margin-bottom:28px; letter-spacing:0.05em; text-transform:uppercase; }
        .prod-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        @media(max-width:900px){ .prod-grid{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:600px){ .prod-grid{grid-template-columns:1fr;} }

        .pcard { background:#fff; border-radius:12px; overflow:hidden; border:1px solid rgba(0,0,0,.07); transition:transform .2s,box-shadow .2s; cursor:pointer; display:flex; flex-direction:column; }
        .pcard:hover { transform:translateY(-4px); box-shadow:0 14px 36px rgba(0,0,0,.1); }
        .pcard-img { position:relative; height:240px; background:#f4f4f4; overflow:hidden; }
        .pcard-img img { width:100%; height:100%; object-fit:cover; transition:transform .3s; }
        .pcard:hover .pcard-img img { transform:scale(1.05); }
        
        .pcard-badge-left { position:absolute; top:9px; left:9px; font-size:9.5px; font-weight:800; letter-spacing:.05em; padding:3px 9px; border-radius:4px; color:#fff; background:#111; z-index: 10; }
        .pcard-badge-right { position:absolute; top:9px; right:48px; font-size:9.5px; font-weight:800; padding:3px 9px; border-radius:4px; color:#fff; background:#880808; z-index: 10; }

        .pcard-wishlist {
          position: absolute;
          top: 9px;
          right: 9px;
          z-index: 20;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          border: none;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }
        .pcard-wishlist:hover {
          transform: scale(1.15);
          background: #fff;
        }
        .pcard-wishlist svg {
          width: 14px;
          height: 14px;
          transition: fill 0.2s, color 0.2s;
        }
        
        .pcard-body { padding:14px 16px 18px; flex:1; display:flex; flex-direction:column; }
        .pcard-cat { font-size:10px; font-weight:700; letter-spacing:.08em; color:#880808; margin-bottom:5px; text-transform:uppercase; }
        .pcard-name { font-size:14px; font-weight:700; color:#111; margin-bottom:auto; line-height:1.3; min-height: 36px; }
        .pcard-foot { display:flex; justify-content:space-between; align-items:flex-end; margin-top:14px; }
        .pcard-price { font-size:18px; font-weight:900; color:#111; }
        .pcard-orig { font-size:12px; color:#999; text-decoration:line-through; margin-left:5px; font-weight:500; }
        .cart-btn { width:32px; height:32px; background:#fdd835; border:none; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .2s; }
        .cart-btn:hover { background:#f5c800; }
        .cart-btn svg { width:16px; height:16px; color:#111; }

        /* Bulk */
        .bulk-card { background:#fffde8; border:2px solid #fdd835; border-radius:12px; padding:32px 28px; display:flex; flex-direction:column; justify-content:center; }
        .bulk-title { font-size:24px; font-weight:900; color:#111; margin:0 0 6px; }
        .bulk-subtitle { font-size:15px; font-weight:800; color:#111; margin:0 0 12px; }
        .bulk-desc { font-size:13px; color:#555; margin:0 0 24px; line-height:1.5; }
        .bulk-btn { display:inline-flex; align-items:center; gap:8px; background:#880808; color:#fff; font-size:12px; font-weight:700; padding:12px 24px; border-radius:8px; border:none; cursor:pointer; width:fit-content; }
        .bulk-btn:hover { background:#6b0606; }

        /* Newsletter */
        .nl-wrap { max-width:1280px; margin:0 auto; padding:0 28px 40px; }
        .nl-card { background:#fffde8; border:1px solid #E5DFB3; border-radius:12px; padding:24px 32px; display:flex; align-items:center; gap:24px; flex-wrap:wrap; justify-content:space-between; }
        .nl-title { font-size:14px; font-weight:800; color:#111; display:flex; align-items:center; gap:8px; margin-bottom:4px; }
        .nl-sub { font-size:12.5px; color:#666; }
        .nl-form { display:flex; gap:10px; flex:1; min-width:300px; max-width:500px; }
        .nl-input { flex:1; border:1px solid #ddd; border-radius:8px; padding:12px 16px; font-size:13px; outline:none; background:#fff; color:#111; }
        .nl-input::placeholder { color:#555; }
        .nl-input:focus { border-color:#fdd835; }
        .nl-submit { background:#880808; color:#fff; border:none; border-radius:8px; font-size:13px; font-weight:700; padding:12px 28px; cursor:pointer; white-space:nowrap; transition:background .2s; }
        .nl-submit:hover { background:#6b0606; }
        .nl-submit:disabled { opacity:.6; cursor:not-allowed; }



        @media(max-width:600px) {
          .nl-card { flex-direction: column; align-items: stretch; padding: 20px 16px; gap: 16px; }
          .nl-form { flex-direction: column; min-width: 0; max-width: 100%; width: 100%; gap: 10px; }
          .nl-input { width: 100%; border-radius: 8px; }
          .nl-submit { width: 100%; border-radius: 8px; padding: 12px; }
        }

      `}</style>

      <Header />

      {/* Hero Products */}
      <div className="hero-products">
        <div className="hero-products-header">
          <span className="hero-products-badge"> OUR SIGNATURE COLLECTION</span>
          <span className="hero-products-sub">Bestsellers • Most Loved Products</span>
        </div>
        <div className="hero-grid">
          {[
            { img: '/images/newspaperpencil.avif', num: 'MOST LOVED', off: '55% OFF', cat: ' BESTSELLER · NEWSPAPER PENCIL', name: 'News Paper Pencil', desc: 'Our most beloved product — crafted from recycled newspapers, giving waste paper a beautiful second life. Smooth 2B lead, earthy texture, perfect everyday pencil.', price: '₹115', orig: '₹180', save: 'Save ₹65', id: '1' },
            { img: '/images/brownpaperpen.avif', num: 'MOST LOVED', off: '18% OFF', cat: ' RECYCLED · NEW ARRIVAL · ECO PEN', name: 'Brown Paper Pen', desc: 'Smooth ballpoint in a 100% recycled brown paper barrel. Comfortable grip, consistent ink flow, and a warm earthy look that stands apart from plastic pens.', price: '₹115', orig: '₹140', save: 'Save ₹25', id: '2' },
          ].map(h => (
            <div key={h.id} className="hero-card">
              <div className="hero-card-img relative">
                <Image src={h.img} alt={h.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:700px) 100vw, 220px" />
                <button 
                  className="pcard-wishlist" 
                  onClick={(e) => toggleWishlist({ id: h.id, name: h.name, price: h.price, image: h.img }, e)}
                  title={isFavorite(h.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <svg 
                    fill={isFavorite(h.id) ? "#880808" : "none"} 
                    stroke="#880808" 
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </button>
              </div>
              <div className="hero-card-body">
                <div>
                  <div className="hero-card-badges">
                    <span className="hbadge-num"> {h.num}</span>
                    <span className="hbadge-off">{h.off}</span>
                  </div>
                  <div className="hero-card-cat">{h.cat}</div>
                  <div className="hero-card-name">{h.name}</div>
                  <div className="hero-card-desc">{h.desc}</div>
                </div>
                <div className="hero-card-foot">
                  <div className="hero-price-wrap">
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span className="hero-price">{h.price}</span>
                      <span className="hero-price-orig">{h.orig}</span>
                    </div>
                    <span className="hero-save">{h.save}</span>
                  </div>
                  <Link href="/cart">
                    <button className="hero-atc" onClick={(e) => addToCart({ id: h.id, name: h.name, price: h.price, image: h.img }, e)}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      ADD TO CART
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid-wrap">
        <p className="grid-count">All Products ({filtered.length})</p>
        <div className="filter-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="prod-grid">
          {filtered.slice(0, 3).map(p => (
            <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
              <div className="pcard">
                <div className="pcard-img">
                  <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:600px) 100vw, 33vw" />
                  {p.label && <span className="pcard-badge-left" style={{ background: p.badgeColor || '#111' }}>{p.label.split('·')[0].trim()}</span>}
                  {p.discount && <span className="pcard-badge-right">{p.discount}% OFF</span>}
                  <button 
                    className="pcard-wishlist" 
                    onClick={(e) => toggleWishlist(p, e)}
                    title={isFavorite(p.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <svg 
                      fill={isFavorite(p.id) ? "#880808" : "none"} 
                      stroke="#880808" 
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  </button>
                </div>
                <div className="pcard-body">
                  <div className="pcard-cat">{p.category}</div>
                  <div className="pcard-name">{p.name}</div>
                  <div className="pcard-foot">
                    <div>
                      <span className="pcard-price">{p.price}</span>
                      {p.originalPrice && <span className="pcard-orig">₹{p.originalPrice}</span>}
                    </div>
                    <button className="cart-btn" onClick={e => addToCart(p, e)} title="Add to cart">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Bulk Orders Card (Index 3) */}
          <div className="bulk-card">
            <h2 className="bulk-title">BULK ORDERS</h2>
            <h3 className="bulk-subtitle">Need 50+ Pieces?</h3>
            <p className="bulk-desc">Corporate gifting, schools, events — we do bulk at special rates.</p>
            <a 
              href="https://wa.me/917900179710" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bulk-btn"
              style={{ textDecoration: 'none' }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              WHATSAPP US
            </a>
          </div>

          {filtered.slice(3).map(p => (
            <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
              <div className="pcard">
                <div className="pcard-img">
                  <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:600px) 100vw, 33vw" />
                  {p.label && <span className="pcard-badge-left" style={{ background: p.badgeColor || '#111' }}>{p.label.split('·')[0].trim()}</span>}
                  {p.discount && <span className="pcard-badge-right">{p.discount}% OFF</span>}
                  <button 
                    className="pcard-wishlist" 
                    onClick={(e) => toggleWishlist(p, e)}
                    title={isFavorite(p.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <svg 
                      fill={isFavorite(p.id) ? "#880808" : "none"} 
                      stroke="#880808" 
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  </button>
                </div>
                <div className="pcard-body">
                  <div className="pcard-cat">{p.category}</div>
                  <div className="pcard-name">{p.name}</div>
                  <div className="pcard-foot">
                    <div>
                      <span className="pcard-price">{p.price}</span>
                      {p.originalPrice && <span className="pcard-orig">₹{p.originalPrice}</span>}
                    </div>
                    <button className="cart-btn" onClick={e => addToCart(p, e)} title="Add to cart">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="nl-wrap">
        <div className="nl-card">
          <div>
            <div className="nl-title">
              <span style={{fontSize:'16px'}}></span> Join the Sustainable Lifestyle Club
            </div>
            <div className="nl-sub">Get new launches, exclusive discounts, and eco-living tips.</div>
          </div>
          <form className="nl-form" onSubmit={async (e) => {
            e.preventDefault();
            if (!nlEmail) return;
            setNlLoading(true);
            try {
              await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: nlEmail }),
              });
              setNlSuccess(true);
              setNlEmail('');
            } catch (_) {
              setNlSuccess(true);
              setNlEmail('');
            } finally {
              setNlLoading(false);
            }
          }}>
            <input
              className="nl-input"
              type="email"
              placeholder="Enter your email address"
              value={nlEmail}
              onChange={e => setNlEmail(e.target.value)}
              required
            />
            <button className="nl-submit" type="submit" disabled={nlLoading}>
              {nlLoading ? 'JOINING...' : 'JOIN NOW'}
            </button>
          </form>
        </div>
      </div>

      <Footer />

      {/* Cart Popup Modal */}
      {addedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setAddedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Added to Cart!</h3>
              <p className="text-gray-600 mb-6">
                <span className="font-semibold text-gray-900">{addedProduct.name || addedProduct.title}</span> has been added to your cart successfully.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button 
                  onClick={() => setAddedProduct(null)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  CONTINUE
                </button>
                <button 
                  onClick={() => router.push('/cart')}
                  className="flex-1 px-6 py-3 bg-[#880808] text-white font-bold rounded-lg hover:bg-[#5a0505] transition-colors shadow-md"
                >
                  VIEW CART
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Success Popup */}
      {nlSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full relative text-center">
            <button
              onClick={() => setNlSuccess(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re In! </h3>
            <p className="text-gray-600 mb-2 font-semibold">Successfully subscribed to the newsletter!</p>
            <p className="text-gray-500 text-sm mb-6">You&apos;ll be the first to know about new launches, exclusive discounts, and eco-living tips from Akotro.</p>
            <button
              onClick={() => setNlSuccess(false)}
              className="w-full bg-[#6b0606] text-white py-3 rounded-lg font-bold hover:bg-[#5a0505] transition-colors"
            >
              AWESOME, THANKS!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fffde8] flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
