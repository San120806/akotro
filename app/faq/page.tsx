'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const CATEGORIES = [
  'ALL',
  'GENERAL QUERIES',
  'PAYMENTS',
  'CANCELLATION, RETURN / EXCHANGE & REFUND',
  'PRODUCT INFORMATION',
];

const FAQS = [
  {
    id: '01',
    category: 'PAYMENTS',
    question: 'IS CASH ON DELIVERY (COD) AVAILABLE?',
    answer:
      'Yes! Cash on Delivery (COD) is available across most pin codes in India. You can select COD as your payment method during checkout. Please note that COD orders above ₹999 may require a partial prepayment. For any issues, reach out to us at support@akotro.com.',
  },
  {
    id: '02',
    category: 'CANCELLATION, RETURN / EXCHANGE & REFUND',
    question: 'HOW TO PLACE A RETURN / EXCHANGE REQUEST?',
    answer:
      'Visit the Shipping & Returns / Return & Exchange Policy section on the website or raise a return/exchange request by emailing support@akotro.com.\n\n• Submit the required details as prompted.\n• Select the item(s) you would want to Return/Exchange.\n\nPlease note that the Return/Exchange request needs to be raised within 7 days of the delivery date. There\'s no reverse pickup — you need to send us back the product with the original receipt of purchase. Once we receive the product, we\'ll get in touch with you to confirm your request.\n\nAll returned products must be unused, unwashed, and undamaged, and must be returned with the original packing and tags. Items without tags will not be accepted.',
  },
  {
    id: '03',
    category: 'CANCELLATION, RETURN / EXCHANGE & REFUND',
    question: 'Are there any extra costs for returns or exchanges?',
    answer:
      'No, there are no additional charges for returns or exchanges. We aim to make the process as smooth and cost-free as possible for you!',
  },
  {
    id: '04',
    category: 'GENERAL QUERIES',
    question: 'HOW LONG WILL MY ORDER TAKE TO ARRIVE?',
    answer:
      'Your order usually takes 7–10 working days to reach all metros and Tier I cities. For some pin codes it might take a little more time. In case of delay, please write to us at support@akotro.com and we\'ll sort it out right away.',
  },
  {
    id: '05',
    category: 'GENERAL QUERIES',
    question: 'HOW WOULD I KNOW IF MY ORDER IS PLACED?',
    answer:
      'You will get a confirmation of the placed order on your registered email ID and phone number. We will further notify you once it is dispatched from our warehouse — so keep an eye on your inbox!',
  },
  {
    id: '06',
    category: 'GENERAL QUERIES',
    question: 'What can I do if my order is delayed?',
    answer:
      'If your order hasn\'t arrived within 7–10 working days, don\'t worry! Just send us an email at support@akotro.com, and we\'ll sort it out for you right away.',
  },
  {
    id: '07',
    category: 'GENERAL QUERIES',
    question: 'Are there any extra shipping charges?',
    answer:
      'Nope, no hidden shipping charges here! Everything\'s included in the product price — simple and transparent. Free delivery all over India.',
  },
  {
    id: '08',
    category: 'GENERAL QUERIES',
    question: 'Can you deliver outside India?',
    answer:
      'Right now, we deliver only within India. But here\'s the good news — you can place an order from anywhere as long as the shipping address is in India. Stay tuned, we\'re working on expanding our delivery options!',
  },
  {
    id: '09',
    category: 'PRODUCT INFORMATION',
    question: 'What are Akotro pencils made from?',
    answer:
      'Every Akotro pencil is handcrafted from 100% recycled paper — newspapers, brown paper, or coloured paper — by women artisans in Mumbai. No trees are cut, no plastic is used. Just waste paper given a beautiful second life.',
  },
  {
    id: '10',
    category: 'PRODUCT INFORMATION',
    question: 'What are plantable pencils and how do they work?',
    answer:
      'Our plantable pencils contain embedded seeds at the tip. Once your pencil is too short to use, simply place the stub in a small pot of soil, water it regularly, and watch it grow into herbs or flowers! It\'s our way of giving back to the planet — zero waste, zero stub.',
  },
  {
    id: '11',
    category: 'PRODUCT INFORMATION',
    question: 'Are the pencils durable? Will they break easily?',
    answer:
      'Yes! Our pencils are engineered to be just as strong as regular wood pencils. The recycled paper barrel is tightly wound for a sturdy, comfortable grip. The lead is 2B Extra Dark — smooth, consistent, and break-resistant with normal use.',
  },
  {
    id: '12',
    category: 'PRODUCT INFORMATION',
    question: 'Can I sharpen Akotro pencils with a regular sharpener?',
    answer:
      'Absolutely! All our pencils are compatible with standard pencil sharpeners. The recycled paper barrel sharpens cleanly and smoothly — just like a regular wooden pencil.',
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered =
    activeCategory === 'ALL'
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <div style={{ background: '#FDF4BE', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }

        /* ── Hero ── */
        .faq-hero {
          background: #A60702;
          padding: 64px 28px 56px;
          text-align: center;
        }
        .faq-hero-eyebrow {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .15em;
          color: #FDD734;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .faq-hero-title {
          font-size: clamp(32px, 6vw, 64px);
          font-weight: 900;
          color: #fff;
          line-height: 1.05;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }
        .faq-hero-title span { color: #FDD734; }
        .faq-hero-sub {
          font-size: 15px;
          color: rgba(255,255,255,.55);
          margin: 0;
          font-weight: 400;
        }

        /* ── Category tabs ── */
        .faq-tabs-wrap {
          background: #fff;
          border-bottom: 2px solid #FDD734;
          position: sticky;
          top: 0;
          z-index: 30;
        }
        .faq-tabs {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .faq-tabs::-webkit-scrollbar { display: none; }
        .faq-tab {
          flex-shrink: 0;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          padding: 16px 18px;
          font-size: 9px;
          font-weight: 800;
          color: #999;
          cursor: pointer;
          letter-spacing: .1em;
          text-transform: uppercase;
          transition: all .2s;
          white-space: nowrap;
          margin-bottom: -2px;
        }
        .faq-tab:hover { color: #111; }
        .faq-tab.active { color: #C0392B; border-bottom-color: #C0392B; }

        /* ── FAQ list ── */
        .faq-body {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 20px 100px;
        }
        .faq-group-label {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .15em;
          color: #C0392B;
          text-transform: uppercase;
          margin: 40px 0 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #E5DFB3;
        }
        .faq-group-label:first-child { margin-top: 0; }

        .faq-item {
          border: 1px solid #E5DFB3;
          border-radius: 4px;
          margin-bottom: 10px;
          background: #FFFDE8;
          overflow: hidden;
          transition: box-shadow .2s;
        }
        .faq-item:hover { box-shadow: 0 4px 20px rgba(0,0,0,.07); }
        .faq-item.open { background: #FFFDE8; border-color: #C0392B; }

        .faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-align: left;
        }

        .faq-num {
          min-width: 80px;
          height: 72px;
          background: #C0392B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 900;
          color: rgba(255,255,255,.45);
          letter-spacing: .05em;
          font-style: italic;
          flex-shrink: 0;
          transition: background .2s;
        }
        .faq-item.open .faq-num { background: #A90000; }

        .faq-q {
          flex: 1;
          padding: 20px 20px 20px 24px;
          font-size: 12px;
          font-weight: 700;
          color: #111;
          letter-spacing: .04em;
          line-height: 1.4;
        }

        .faq-chevron {
          width: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 18px;
          transition: transform .25s;
          padding-right: 16px;
        }
        .faq-item.open .faq-chevron {
          transform: rotate(180deg);
          color: #C0392B;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height .35s ease, padding .25s ease;
        }
        .faq-answer.open {
          max-height: 600px;
        }
        .faq-answer-inner {
          padding: 0 24px 24px 104px;
          font-size: 13px;
          color: #444;
          line-height: 1.8;
          white-space: pre-wrap;
          border-top: 1px solid #E5DFB3;
          padding-top: 20px;
        }
        @media (max-width: 600px) {
          .faq-num { min-width: 60px; font-size: 13px; }
          .faq-q { font-size: 11px; padding: 16px 12px 16px 16px; }
          .faq-answer-inner { padding: 16px 16px 20px 16px; }
        }

        /* ── Still need help banner ── */
        .faq-help {
          background: #111;
          border-radius: 12px;
          padding: 40px 32px;
          text-align: center;
          margin-top: 48px;
        }
        .faq-help h3 {
          font-size: 22px;
          font-weight: 900;
          color: #fff;
          margin: 0 0 8px;
        }
        .faq-help p {
          font-size: 13px;
          color: rgba(255,255,255,.55);
          margin: 0 0 24px;
        }
        .faq-help-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .faq-help-wa {
          background: #25D366;
          color: #fff;
          font-size: 12px;
          font-weight: 800;
          padding: 13px 28px;
          border-radius: 8px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: .05em;
          transition: background .2s;
        }
        .faq-help-wa:hover { background: #1ebe5d; }
        .faq-help-mail {
          background: #FDD734;
          color: #111;
          font-size: 12px;
          font-weight: 800;
          padding: 13px 28px;
          border-radius: 8px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: .05em;
          transition: background .2s;
        }
        .faq-help-mail:hover { background: #f5c800; }
      `}</style>

      <Header />

      {/* ── Hero ── */}
      <div className="faq-hero">
        <p className="faq-hero-eyebrow">HELP CENTRE</p>
        <h1 className="faq-hero-title">
          Frequently Asked <span>Questions</span>
        </h1>
        <p className="faq-hero-sub">Looking for something? We've got answers.</p>
      </div>

      {/* ── Category Tabs ── */}
      <div className="faq-tabs-wrap">
        <div className="faq-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`faq-tab${activeCategory === cat ? ' active' : ''}`}
              onClick={() => { setActiveCategory(cat); setOpenId(null); }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── FAQ Items ── */}
      <div className="faq-body">

        {/* Group by category when ALL is selected */}
        {activeCategory === 'ALL' ? (
          (() => {
            let globalIdx = 0;
            return CATEGORIES.filter(c => c !== 'ALL').map((cat) => {
              const items = FAQS.filter(f => f.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat}>
                  <p className="faq-group-label">{cat}</p>
                  {items.map((faq) => {
                    const currentIdx = globalIdx++;
                    return (
                      <FAQItem key={faq.id} faq={faq} index={currentIdx} isOpen={openId === faq.id} onToggle={() => toggle(faq.id)} />
                    );
                  })}
                </div>
              );
            });
          })()
        ) : (
          filtered.map((faq, idx) => (
            <FAQItem key={faq.id} faq={faq} index={idx} isOpen={openId === faq.id} onToggle={() => toggle(faq.id)} />
          ))
        )}

        {/* ── Still Need Help ── */}
        <div className="faq-help">
          <h3>Still need help?</h3>
          <p>Our team is available Mon–Sat, 9am–6pm IST. We usually respond within 24 hours.</p>
          <div className="faq-help-btns">
            <a href="https://wa.me/917900179710" target="_blank" rel="noopener noreferrer" className="faq-help-wa">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WHATSAPP US
            </a>
            <a href="mailto:support@akotro.com" className="faq-help-mail">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              EMAIL US
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ── Accordion Item Component ── */
function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { id: string; question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const displayId = String(index + 1).padStart(2, '0');
  
  return (
    <div className={`faq-item${isOpen ? ' open' : ''}`}>
      <button className="faq-trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span className="faq-num">{displayId}</span>
        <span className="faq-q">{faq.question}</span>
        <span className="faq-chevron">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`faq-answer${isOpen ? ' open' : ''}`}>
        <div className="faq-answer-inner">{faq.answer}</div>
      </div>
    </div>
  );
}
