'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function ShippingReturnsPage() {
  return (
    <div style={{ background: '#FDF4BE', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }

        /* ── Hero ── */
        .policy-hero {
          background: #A60702;
          padding: 64px 28px 56px;
          text-align: center;
        }
        .policy-hero-eyebrow {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .15em;
          color: #FDD734;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .policy-hero-title {
          font-size: clamp(32px, 6vw, 64px);
          font-weight: 900;
          color: #fff;
          line-height: 1.05;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }
        .policy-hero-title span { color: #FDD734; }
        .policy-hero-sub {
          font-size: 15px;
          color: rgba(255,255,255,.55);
          margin: 0;
          font-weight: 400;
        }

        /* ── Policy Body ── */
        .policy-body {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 20px 100px;
        }

        .policy-section {
          background: #FFFDE8;
          border: 1px solid #E5DFB3;
          border-radius: 8px;
          padding: 32px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,.03);
        }

        .policy-section-title {
          font-size: 24px;
          font-weight: 900;
          color: #111;
          margin: 0 0 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #FDD734;
        }

        .policy-subsection-title {
          font-size: 16px;
          font-weight: 800;
          color: #C0392B;
          margin: 32px 0 16px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        
        .policy-section-title + .policy-subsection-title {
          margin-top: 0;
        }

        .policy-text {
          font-size: 14px;
          line-height: 1.8;
          color: #444;
          margin-bottom: 16px;
        }
        
        .policy-text:last-child {
          margin-bottom: 0;
        }

        .policy-text strong {
          color: #111;
          font-weight: 700;
        }

        .policy-list {
          margin: 16px 0;
          padding-left: 24px;
          list-style-type: disc;
        }

        .policy-list li {
          font-size: 14px;
          line-height: 1.8;
          color: #444;
          margin-bottom: 8px;
        }

        @media (max-width: 600px) {
          .policy-section {
            padding: 24px 20px;
          }
          .policy-section-title {
            font-size: 20px;
          }
          .policy-subsection-title {
            font-size: 14px;
          }
          .policy-text, .policy-list li {
            font-size: 13px;
          }
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
      <div className="policy-hero">
        <p className="policy-hero-eyebrow">HELP CENTRE</p>
        <h1 className="policy-hero-title">
          Shipping & <span>Returns</span>
        </h1>
        <p className="policy-hero-sub">Everything you need to know about deliveries and returns.</p>
      </div>

      {/* ── Policy Body ── */}
      <div className="policy-body">
        
        {/* Shipping Policy Section */}
        <div className="policy-section">
          <h2 className="policy-section-title">Shipping Policy</h2>
          
          <h3 className="policy-subsection-title">Shipping Returns</h3>
          <p className="policy-text">
            To return your product, please send us an email at <strong>support@akotro.com</strong>.
          </p>
          <p className="policy-text">
            Upon receipt of your email, we will initiate a shipping return using our preferred shipping partner. In the instance that our shipping partner does not have service in your pin-code area, we would request you to ship the product to the below mentioned address, and upon receipt of returned product, we will refund the shipping cost borne by the customer.
          </p>
          
          <h3 className="policy-subsection-title">Delivery Details</h3>
          <p className="policy-text">
            Order are dispatched within 24 hours and delivered within 7 to 10 days.
          </p>
          <p className="policy-text">
            Free Shipping on order above Rs. 999/-.
          </p>
          <p className="policy-text">
            Cash on delivery orders are dispatched post call verification.
          </p>
          <p className="policy-text">
            There may be a delay in rare case due to restrictions in some zones.
          </p>
        </div>

        {/* Return & Exchange Policy Section */}
        <div className="policy-section">
          <h2 className="policy-section-title">Return & Exchange Policy</h2>
          
          <h3 className="policy-subsection-title">Overview</h3>
          <p className="policy-text">
            Our refund and returns policy lasts 10 days. If 10 days have passed since your purchase (or 7 days since receiving shipment), whichever is earlier, we can't offer you a full refund or exchange. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
          </p>
          <p className="policy-text">
            Several types of goods are exempt from being returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.
          </p>
          <p className="policy-text">
            To complete your return, we require a receipt or proof of purchase. Please do not send your purchase back to the manufacturer.
          </p>

          <h3 className="policy-subsection-title">Refunds</h3>
          <p className="policy-text">
            Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
          </p>
          <p className="policy-text">
            If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
          </p>

          <h3 className="policy-subsection-title">Late or missing refunds</h3>
          <p className="policy-text">
            If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted.
          </p>
          <p className="policy-text">
            Next contact your bank. There is often some processing time before a refund is posted. If you've done all of this and you still have not received your refund yet, please contact us at <strong>support@akotro.com</strong>.
          </p>

          <h3 className="policy-subsection-title">Exchanges</h3>
          <p className="policy-text">
            We only replace items if they are defective, damaged or customer requires a different size. If you need to exchange it for the same item, send us an email at <strong>support@akotro.com</strong> and we will initiate an exchange using our preferred shipping partner.
          </p>
        </div>

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
