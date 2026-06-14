'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import BulkOrderModal from './BulkOrderModal';

export default function MobileStickyFooter() {
  const pathname = usePathname();
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Do not show on admin or API routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return null;
  }

  const isHome = pathname === '/';

  return (
    <>
      {/* 
        Visibility is controlled via .mobile-sticky-footer CSS class in globals.css.
        display:none on desktop (≥768px), display:flex on mobile (<768px).
        We do NOT use Tailwind md:hidden here to avoid breakpoint class-generation issues.
      */}
      <div className="mobile-sticky-footer">
        <div className="flex gap-2 w-full">
          {!isHome && (
            <Link
              href="/"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FFFEEA',
                border: '1px solid #E5DFB3',
                color: '#000',
                fontWeight: 800,
                textTransform: 'uppercase',
                borderRadius: '12px',
                fontSize: '11px',
                letterSpacing: '0.05em',
                height: '48px',
                textDecoration: 'none',
                userSelect: 'none',
                cursor: 'pointer',
              }}
            >
              ← HOME
            </Link>
          )}

          <Link
            href="/shop"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fdd835',
              color: '#000',
              fontWeight: 800,
              textTransform: 'uppercase',
              borderRadius: '12px',
              fontSize: '11px',
              letterSpacing: '0.05em',
              height: '48px',
              textDecoration: 'none',
              userSelect: 'none',
              cursor: 'pointer',
            }}
          >
            SHOP NOW
          </Link>

          <button
            onClick={() => setShowBulkModal(true)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#880808',
              color: '#fff',
              fontWeight: 800,
              textTransform: 'uppercase',
              borderRadius: '12px',
              fontSize: '11px',
              letterSpacing: '0.05em',
              height: '48px',
              border: 'none',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            BULK ORDERS
          </button>
        </div>
      </div>

      {showBulkModal && <BulkOrderModal onClose={() => setShowBulkModal(false)} />}
    </>
  );
}
