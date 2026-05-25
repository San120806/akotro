'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { myWixClient } from '@/lib/wixClient';

// Helper to convert Wix image URL
function getImageUrl(wixUrl: string | undefined) {
  if (!wixUrl) return '/images/pencil.jpg';
  if (wixUrl.startsWith('http')) return wixUrl;
  if (wixUrl.startsWith('wix:image://v1/')) {
    const wixImageId = wixUrl.split('wix:image://v1/')[1].split('/')[0];
    return `https://static.wixstatic.com/media/${wixImageId}`;
  }
  return wixUrl;
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const [addedProduct, setAddedProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        // Fetch all products to find this one and related ones
        const res = await myWixClient.products.queryProducts().find();
        const items = res.items;
        
        const found = items.find((p: any) => p._id === id);
        
        if (found) {
          const mappedProduct = {
            id: found._id,
            name: found.name,
            description: found.description ? found.description.replace(/<[^>]*>?/gm, '') : '',
            price: found.priceData?.formatted?.price || `₹${found.priceData?.price || 0}`,
            rawPrice: found.priceData?.price || 0,
            originalPrice: undefined, // Wix usually handles this inside priceData.discountedPrice
            category: found.collectionIds && found.collectionIds.length > 0 ? 'Plantable' : 'Pencils',
            sku: found.sku || 'N/A',
            badge: undefined,
            save: undefined,
            images: found.media?.items?.map((i: any) => getImageUrl(i.image?.url)) || [getImageUrl(found.media?.mainMedia?.image?.url)],
            image: getImageUrl(found.media?.mainMedia?.image?.url),
            tags: ['Eco-Friendly', '100% Recycled', 'Zero Plastic'],
            specs: [
              { label: 'Material', value: 'Recycled Paper' },
              { label: 'Lead Type', value: '2B Extra Dark' }
            ],
            keyFeatures: ['100% Recycled Material', 'Comfortable Grip', 'Dark 2B Lead'],
            whyAkotro: ['Women Artisans', 'Zero Plastic', 'Plantable']
          };
          setProduct(mappedProduct);
          
          // Set related
          const rel = items.filter((p: any) => p._id !== id).slice(0, 3).map((p: any) => ({
            id: p._id,
            name: p.name,
            price: p.priceData?.formatted?.price || `₹${p.priceData?.price || 0}`,
            image: getImageUrl(p.media?.mainMedia?.image?.url),
            category: p.collectionIds && p.collectionIds.length > 0 ? 'Plantable' : 'Pencils',
            label: p.name
          }));
          setRelated(rel);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    const currentCart = JSON.parse(localStorage.getItem('akotro_cart') || '[]');
    const existing = currentCart.find((i: any) => i.id === product.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      currentCart.push({
        id: product.id,
        name: product.name || product.title,
        price: product.rawPrice || 0,
        image: product.image,
        quantity: qty
      });
    }
    localStorage.setItem('akotro_cart', JSON.stringify(currentCart));
    setAddedProduct(product);
  };

  if (isLoading) return (
    <div style={{ background: '#FDF4BE', minHeight: '100vh' }}>
      <Header />
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <p style={{ fontSize: 18, marginBottom: 16 }}>Loading product...</p>
      </div>
      <Footer />
    </div>
  );

  if (!product) return (
    <div style={{ background: '#FDF4BE', minHeight: '100vh' }}>
      <Header />
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <p style={{ fontSize: 18, marginBottom: 16 }}>Product not found.</p>
        <Link href="/shop" style={{ color: '#C0392B', fontWeight: 700 }}>← Back to Shop</Link>
      </div>
      <Footer />
    </div>
  );


  return (
    <div style={{ background: '#FDF4BE', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }

        .bc { background: #FDF4BE; padding: 15px 0; border-bottom: 2px solid #FDD734; }
        .bc-inner { max-width: 1200px; margin: 0 auto; padding: 0 28px; font-size: 11px; color: #999; display: flex; gap: 8px; align-items: center; letter-spacing: .05em; font-weight: 500; }
        .bc-inner a { color: #999; text-decoration: none; }
        .bc-inner a:hover { color: #111; }

        .pdp { max-width: 1200px; margin: 0 auto; padding: 40px 28px; display: grid; grid-template-columns: 460px 1fr; gap: 60px; align-items: start; }
        @media(max-width: 900px) { .pdp { grid-template-columns: minmax(0, 1fr); gap: 32px; max-width: 500px; } }

        .img-main { position: relative; width: 100%; aspect-ratio: 1 / 1; background: transparent; overflow: hidden; border-radius: 4px; }
        .img-main img { width:100%; height:100%; object-fit:cover; }
        .img-eco-badge { position: absolute; top: 16px; left: 16px; background: rgba(0,0,0,.7); color: #fff; font-size: 9px; font-weight: 800; padding: 5px 12px; border-radius: 4px; letter-spacing: .1em; z-index: 2; }
        .img-sale-badge { position: absolute; top: 16px; right: 16px; background: #C0392B; color: #fff; font-size: 9px; font-weight: 800; padding: 5px 12px; border-radius: 4px; z-index: 2; }
        .img-back { position: absolute; bottom: 16px; right: 16px; background: rgba(255,255,255,.9); border: none; font-size: 10px; font-weight: 700; padding: 6px 12px; cursor: pointer; border-radius: 4px; color: #555; z-index: 2; }
        .thumbs { display: flex; gap: 12px; margin-top: 12px; }
        .thumb { position: relative; width: 70px; height: 70px; background: transparent; overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: border-color .2s; border-radius: 4px; }
        .thumb.active { border-color: #FDD734; }

        .pdp-cat-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .pdp-cat { font-size: 12px; font-weight: 800; letter-spacing: .1em; color: #C0392B; text-transform: uppercase; }
        .pdp-sku { font-size: 10px; color: #999; letter-spacing: .05em; }
        .pdp-name { font-size: 36px; font-weight: 400; color: #111; line-height: 1.1; margin: 0 0 12px; letter-spacing: -0.02em; }
        .stars { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
        .stars-icons { color: #C0392B; font-size: 14px; letter-spacing: 1px; }
        .stars-score { font-size: 12px; font-weight: 800; color: #111; }
        .stars-reviews { font-size: 12px; color: #777; }
        .stars-link { font-size: 12px; color: #C0392B; text-decoration: underline; cursor: pointer; }

        .price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 6px; }
        .pdp-price { font-size: 26px; font-weight: 400; color: #111; }
        .pdp-orig { font-size: 16px; color: #aaa; text-decoration: line-through; }
        .save-pill { background: #FDE8E8; color: #C0392B; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 4px; letter-spacing: .05em; }
        .pdp-delivery { font-size: 11px; color: #777; margin: 0 0 24px; }

        .tags-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        .tag-pill { background: #fff; border: 1px solid #E5DFB3; border-radius: 4px; font-size: 9px; font-weight: 800; color: #C0392B; padding: 6px 12px; letter-spacing: .05em; display: flex; align-items: center; gap: 5px; }
        .tag-pill::before { content: '●'; font-size: 8px; color: #C0392B; }

        .qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
        .qty-label { font-size: 10px; font-weight: 800; color: #777; letter-spacing: .1em; text-transform: uppercase; }
        .qty-ctrl { display: flex; align-items: center; background: #fff; border: 1px solid #E5DFB3; }
        .qty-btn { width: 32px; height: 32px; border: none; background: transparent; font-size: 16px; cursor: pointer; color: #111; }
        .qty-val { width: 40px; text-align: center; font-size: 13px; font-weight: 800; color: #111; border-left: 1px solid #E5DFB3; border-right: 1px solid #E5DFB3; height: 32px; line-height: 32px; }
        .qty-pack { font-size: 10px; color: #999; }

        .btn-atc { width: 100%; background: #A90000; color: #fff; border: none; font-size: 12px; font-weight: 800; padding: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px; letter-spacing: .1em; }
        .btn-buy { width: 100%; background: #F6EDB1; color: #111; border: 1px solid #E5DFB3; font-size: 11px; font-weight: 800; padding: 16px; cursor: pointer; margin-bottom: 12px; letter-spacing: .1em; }
        .btn-bulk { width: 100%; background: #F6EDB1; color: #555; border: 1px solid #E5DFB3; font-size: 10px; font-weight: 700; padding: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; letter-spacing: .05em; }

        .trust-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; margin-top: 24px; background: #E5DFB3; border: 1px solid #E5DFB3; }
        @media(max-width: 600px) {
          .trust-row { grid-template-columns: repeat(2,1fr); }
        }
        .trust-item { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; padding: 16px 8px; background: #FDF4BE; }
        .trust-item svg { width: 20px; height: 20px; color: #C0392B; }
        .trust-item-label { font-size: 9px; font-weight: 800; color: #111; text-align: center; line-height: 1.2; }
        .trust-item-sub { font-size: 8px; color: #999; text-align: center; }

        .specs-section { max-width: 1200px; margin: 0 auto; padding: 20px 28px 0; }
        .specs-title { font-size: 10px; font-weight: 800; letter-spacing: .1em; color: #999; text-transform: uppercase; margin-bottom: 16px; }
        .specs-table { width: 100%; border-collapse: collapse; }
        .specs-table tr { border-bottom: 1px solid #E5DFB3; }
        .specs-table td { padding: 14px 0; font-size: 12px; color: #333; }
        .specs-table td:first-child { font-size: 9px; font-weight: 800; letter-spacing: .1em; color: #777; text-transform: uppercase; width: 200px; }
        @media(max-width: 600px) {
          .specs-table td:first-child { width: 120px; }
        }

        .tabs-section { max-width: 1200px; margin: 40px auto 0; padding: 0 28px; border-top: 1px solid #E5DFB3; }
        .tabs-bar { display: flex; gap: 40px; }
        .tab-btn { background: none; border: none; font-size: 11px; font-weight: 800; color: #999; padding: 20px 0; cursor: pointer; border-bottom: 2px solid transparent; margin-top: -1px; transition: all .2s; letter-spacing: .05em; }
        .tab-btn.active { color: #111; border-bottom-color: #111; }
        .tab-content { padding: 40px 0 60px; border-top: 1px solid #E5DFB3; margin-top: -1px; }
        .tab-desc-lead { font-size: 16px; font-weight: 600; color: #333; line-height: 1.6; margin-bottom: 40px; max-width: 600px; }
        .feat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        @media(max-width:600px) { .feat-grid { grid-template-columns: 1fr; } }
        .feat-col-title { font-size: 9px; font-weight: 800; letter-spacing: .1em; color: #999; text-transform: uppercase; margin-bottom: 16px; }
        .feat-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .feat-list li { font-size: 11.5px; color: #444; line-height: 1.6; padding-left: 12px; position: relative; }
        .feat-list li::before { content: '●'; position: absolute; left: 0; color: #C0392B; font-size: 6px; top: 6px; }

        .reviews-list { display: flex; flex-direction: column; gap: 28px; max-width: 700px; }
        .review-card { border-bottom: 1px solid #E5DFB3; padding-bottom: 28px; }
        .review-card:last-child { border-bottom: none; }
        .review-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .review-stars { color: #C0392B; font-size: 14px; letter-spacing: 2px; }
        .review-date { font-size: 11px; color: #999; }
        .review-text { font-size: 14px; color: #333; line-height: 1.6; margin: 0 0 12px; font-style: italic; }
        .review-author { font-size: 11px; font-weight: 800; color: #111; display: flex; align-items: center; gap: 8px; }
        .review-author span { color: #25D366; font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 4px; }

        .related-section { background: #fff; padding: 60px 0; border-top: 1px solid #eee; }
        .related-inner { max-width: 1200px; margin: 0 auto; padding: 0 28px; }
        .related-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; flex-wrap: wrap; gap: 16px; }
        .related-eyebrow { font-size: 9px; font-weight: 800; letter-spacing: .1em; color: #999; text-transform: uppercase; margin-bottom: 8px; }
        .related-title { font-size: 32px; font-weight: 400; color: #111; margin-bottom: 0; }
        .related-title em { font-style: italic; }
        .related-view { font-size: 10px; font-weight: 800; color: #C0392B; text-decoration: none; letter-spacing: .1em; }
        .related-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        @media(max-width:700px) { .related-grid { grid-template-columns: 1fr; } }
        .rcard { border-radius: 8px; overflow: hidden; border: 1px solid rgba(0,0,0,.05); background: #fff; cursor: pointer; display: flex; flex-direction: column; transition: transform .2s, box-shadow .2s; }
        .rcard:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.08); }
        .rcard-img { height: 220px; position: relative; background: #f8f8f8; }
        .rcard-img img { object-fit: cover; }
        .rcard-badge { position: absolute; top: 12px; left: 12px; font-size: 8px; font-weight: 800; padding: 4px 8px; border-radius: 4px; color: #fff; background: #C0392B; letter-spacing: .05em; }
        .rcard-off { position: absolute; top: 12px; right: 12px; background: #C0392B; color: #fff; font-size: 8px; font-weight: 800; padding: 4px 8px; border-radius: 4px; letter-spacing: .05em; }
        .rcard-body { padding: 16px; flex: 1; display: flex; flex-direction: column; }
        .rcard-cat { font-size: 8px; font-weight: 800; color: #C0392B; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 6px; }
        .rcard-name { font-size: 14px; font-weight: 700; color: #111; margin-bottom: 16px; flex: 1; }
        .rcard-foot { display: flex; justify-content: space-between; align-items: flex-end; }
        .rcard-price { font-size: 16px; font-weight: 800; color: #111; }
        .rcard-orig { font-size: 11px; color: #aaa; text-decoration: line-through; margin-left: 6px; font-weight: 500; }
        .rcard-btn { width: 28px; height: 28px; background: #FDD734; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: #111; }
        
        .floating-whatsapp { position: fixed; bottom: 30px; right: 30px; width: 56px; height: 56px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4); cursor: pointer; z-index: 99; transition: transform .2s; }
        .floating-whatsapp:hover { transform: scale(1.1); }
        @media (max-width: 767px) {
          .floating-whatsapp { bottom: 90px; right: 16px; }
          .pdp {
            grid-template-columns: minmax(0, 1fr) !important;
            max-width: 100% !important;
            overflow-x: hidden;
          }
          .bc {
            max-width: 100% !important;
            overflow-x: hidden;
          }
          .bc-inner {
            flex-wrap: wrap;
            gap: 4px 8px;
          }
          .pdp-name {
            font-size: 24px !important;
            line-height: 1.2 !important;
            word-wrap: break-word;
            word-break: break-word;
          }
          .stars {
            flex-wrap: wrap;
            gap: 6px 10px;
          }
          .price-row {
            flex-wrap: wrap;
            gap: 8px;
          }
          .qty-row {
            flex-wrap: wrap;
            gap: 12px;
          }
          .btn-atc, .btn-buy, .btn-bulk {
            white-space: normal !important;
            text-align: center;
          }
          .thumbs {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 8px;
            scrollbar-width: thin;
            -webkit-overflow-scrolling: touch;
          }
          .tabs-bar {
            gap: 16px;
            flex-wrap: wrap;
          }
        }
      `}</style>

      <Header />

      {/* Breadcrumb */}
      <div className="bc">
        <div className="bc-inner">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/shop">Shop</Link><span>/</span>
          <Link href="/shop">Basic Stationery</Link><span>/</span>
          <span style={{ color: '#111', fontWeight: 500 }}>{product.name}</span>
        </div>
      </div>

      {/* Main PDP */}
      <div className="pdp">
        {/* Left: Images */}
        <div>
          <div className="img-main">
            <Image src={product.images[activeImg] || product.image} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="600px" />
            <span className="img-eco-badge">ECO FRIENDLY</span>
            {product.badge && <span className="img-sale-badge">{product.badge} · {product.save}</span>}
            <Link href="/shop"><button className="img-back">← Back to Shop</button></Link>
          </div>
          <div className="thumbs">
            {product.images.map((img: string, i: number) => (
              <div key={i} className={`thumb${activeImg === i ? ' active' : ''}`} onClick={() => setActiveImg(i)}>
                <Image src={img} alt="" fill style={{ objectFit: 'cover' }} sizes="60px" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="pdp-right">
          <div className="pdp-cat-row">
            <span className="pdp-cat">{product.category}</span>
            <span className="pdp-sku">{product.sku}</span>
          </div>
          <h1 className="pdp-name">{product.name}</h1>

          <div className="stars">
            <span className="stars-icons">★★★★★</span>
            <span className="stars-score">5.0</span>
            <span className="stars-reviews">5 Verified Reviews</span>
            <span className="stars-link" onClick={() => { setTab('reviews'); document.getElementById('tabs-section')?.scrollIntoView({ behavior: 'smooth' }); }}>(Read all →)</span>
          </div>

          <div className="price-row">
            <span className="pdp-price">{product.price}</span>
            {product.originalPrice && <span className="pdp-orig">₹{product.originalPrice}</span>}
            {product.save && <span className="save-pill">+ {product.save}</span>}
          </div>
          <p className="pdp-delivery">Taxes included. Free delivery all over India in 7 days.</p>

          <div className="tags-row">
            {product.tags.map((t: string) => <span key={t} className="tag-pill">{t}</span>)}
          </div>

          <div className="qty-row">
            <span className="qty-label">Quantity</span>
            <div className="qty-ctrl">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="qty-val">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <span className="qty-pack">Pack of 10 pencils</span>
          </div>

          <button className="btn-atc w-full mt-4 flex items-center justify-center gap-2" onClick={addToCart}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            ADD TO CART
          </button>
          <button className="btn-buy">BUY NOW — {product.price}</button>
          <button className="btn-bulk">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            ENQUIRE FOR BULK ORDERS (50+ UNITS)
          </button>

          <div className="trust-row">
            {[
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Secure Payment', sub: 'UPI · Cards · COD' },
              { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: '7-Day Delivery', sub: 'Pan India' },
              { icon: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6', label: '10-Day Returns', sub: 'Easy Process' },
              { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', label: 'Women-Made', sub: 'handmade with love' },
            ].map(t => (
              <div key={t.label} className="trust-item">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={t.icon} /></svg>
                <span className="trust-item-label">{t.label}</span>
                <span className="trust-item-sub">{t.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="specs-section">
        <p className="specs-title">Product Specifications</p>
        <table className="specs-table">
          <tbody>
            {product.specs.map((s: any) => (
              <tr key={s.label}>
                <td>{s.label}</td>
                <td>{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabs */}
      <div id="tabs-section" className="tabs-section">
        <div className="tabs-bar">
          {['description', 'reviews', 'shipping'].map(t => (
            <button key={t} className={`tab-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
              {t === 'description' ? 'DESCRIPTION' : t === 'reviews' ? 'REVIEWS (5)' : 'SHIPPING & RETURNS'}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {tab === 'description' && (
            <>
              <p className="tab-desc-lead">
                A pencil that's as kind to the planet as it is to your hand. Made from 100% recycled paper — no trees cut, no plastic, no compromise on quality.
              </p>
              <div className="feat-grid">
                <div>
                  <p className="feat-col-title">Key Features</p>
                  <ul className="feat-list">
                    {product.keyFeatures.map((f: string) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="feat-col-title">Why Akotro?</p>
                  <ul className="feat-list">
                    {product.whyAkotro.map((f: string) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              </div>
            </>
          )}
          {tab === 'reviews' && (
            <div className="reviews-list">
              {[
                { n: 'Rahul S.', d: '2 days ago', r: 'Amazing quality! Writing feels so smooth and I love the earthy look. Will buy again.', s: 5 },
                { n: 'Anjali P.', d: '1 week ago', r: 'Very happy with these pencils. Bought them for my kids and they love the concept of planting them later.', s: 5 },
                { n: 'Vikram K.', d: '2 weeks ago', r: 'Great initiative. The pencils are surprisingly sturdy, the lead is dark, and the grip is perfect for long writing.', s: 5 },
                { n: 'Priya M.', d: '1 month ago', r: 'Perfect gift for eco-conscious friends. The packaging was completely plastic-free and beautiful!', s: 5 },
                { n: 'Sneha R.', d: '1 month ago', r: 'Excellent product. They sharpen easily and the lead doesn\'t break inside. Highly recommend Akotro!', s: 5 },
              ].map((rev, i) => (
                <div key={i} className="review-card">
                  <div className="review-head">
                    <span className="review-stars">{'★'.repeat(rev.s)}</span>
                    <span className="review-date">{rev.d}</span>
                  </div>
                  <p className="review-text">"{rev.r}"</p>
                  <p className="review-author">{rev.n} <span>✓ Verified Buyer</span></p>
                </div>
              ))}
            </div>
          )}
          {tab === 'shipping' && (
            <div style={{ padding: '20px 0', fontSize: 14, color: '#333', lineHeight: 1.7 }}>
              <p><strong>Free Delivery</strong> — All over India within 7 days.</p>
              <p><strong>Returns</strong> — 10-day hassle-free return policy.</p>
              <p><strong>Packaging</strong> — 100% plastic-free, eco-friendly packaging.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      <div className="related-section">
        <div className="related-inner">
          <div className="related-header">
            <div>
              <p className="related-eyebrow">You may also like</p>
              <h2 className="related-title">More <em>Eco Pencils</em></h2>
            </div>
            <Link href="/shop" className="related-view">VIEW ALL PRODUCTS →</Link>
          </div>
          <div className="related-grid">
            {related.map(p => (
              <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                <div className="rcard">
                  <div className="rcard-img">
                    <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="400px" />
                    {p.label && <span className="rcard-badge" style={{ background: '#C0392B' }}>{p.label}</span>}
                    {p.badge && <span className="rcard-off">{p.badge}</span>}
                  </div>
                  <div className="rcard-body">
                    <div className="rcard-cat">{p.category}</div>
                    <div className="rcard-name">{p.name}</div>
                    <div className="rcard-foot">
                      <div>
                        <span className="rcard-price">{p.price}</span>
                        {p.originalPrice && <span className="rcard-orig">₹{p.originalPrice}</span>}
                      </div>
                      <button className="rcard-btn" onClick={e => e.preventDefault()}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <a 
        href="https://wa.me/917900179710" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp"
      >
        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      <Footer />

      {/* Cart Popup Modal */}
      {addedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity" style={{ zIndex: 9999 }}>
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
                  className="flex-1 px-6 py-3 bg-[#A40000] text-white font-bold rounded-lg hover:bg-red-800 transition-colors shadow-md"
                >
                  VIEW CART
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
