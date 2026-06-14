'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => setIsLoggedIn(data.loggedIn))
      .catch(() => setIsLoggedIn(false));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Infinitely scrolling red banner */}
      <div className="bg-[#6b0606] text-white text-sm py-3 px-4 overflow-hidden">
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .scrolling-text {
            animation: scroll 10s linear infinite;
            display: inline-block;
            white-space: nowrap;
          }
        `}</style>
        <div className="flex items-center w-full overflow-hidden">
          <div className="scrolling-text">
             FREE DELIVERY ALL OVER INDIA - 7 DAYS &nbsp;&nbsp;• &nbsp;&nbsp;100% RECYCLED · ZERO PLASTIC &nbsp;&nbsp;• &nbsp;&nbsp; FREE DELIVERY ALL OVER INDIA - 7 DAYS &nbsp;&nbsp;• &nbsp;&nbsp;100% RECYCLED · ZERO PLASTIC &nbsp;&nbsp;• &nbsp;&nbsp; FREE DELIVERY ALL OVER INDIA - 7 DAYS &nbsp;&nbsp;• &nbsp;&nbsp;100% RECYCLED · ZERO PLASTIC &nbsp;&nbsp;• &nbsp;&nbsp; FREE DELIVERY ALL OVER INDIA - 7 DAYS &nbsp;&nbsp;• &nbsp;&nbsp;100% RECYCLED · ZERO PLASTIC &nbsp;&nbsp;• &nbsp;&nbsp; 
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex items-center z-10">
            <img src="/images/akotrofaviconlogo.png" alt="Akotro Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="text-sm font-medium text-black hover:text-[#fdd835]">HOME</Link>
            <Link href="/shop" className="text-sm font-medium text-black hover:text-[#fdd835]">SHOP</Link>
            <Link href="/about" className="text-sm font-medium text-black hover:text-[#fdd835]">ABOUT</Link>
            <Link href="/blog" className="text-sm font-medium text-black hover:text-[#fdd835]">BLOG</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
            <button className="text-black hover:text-[#fdd835]" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-2">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black placeholder-gray-500 focus:outline-none focus:border-red-500 bg-white"
                    autoFocus
                  />
                  <button type="submit" className="bg-[#880808] text-white px-3 py-2 rounded text-sm hover:bg-[#6b0606]">Go</button>
                </form>
              </div>
            )}

            <Link href="/cart" className="text-black hover:text-[#fdd835]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>

            <div className="hidden lg:block">
              {isLoggedIn ? (
                <Link href="/account" className="flex items-center gap-1.5 text-xs font-bold text-[#880808] hover:text-red-800 transition-colors whitespace-nowrap">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  MY ACCOUNT
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="text-xs font-bold text-gray-700 hover:text-[#880808] transition-colors whitespace-nowrap">LOGIN</Link>
                  <Link href="/signup" className="text-xs font-bold bg-gray-900 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors whitespace-nowrap">SIGN UP</Link>
                </div>
              )}
            </div>

            {/* Hamburger Button */}
            <button 
              className="lg:hidden text-black hover:text-[#fdd835] focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-inner z-50 relative">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-gray-800 hover:text-[#fdd835] border-b border-gray-50"
            >
              HOME
            </Link>
            <Link 
              href="/shop" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-gray-800 hover:text-[#fdd835] border-b border-gray-50"
            >
              SHOP
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-gray-800 hover:text-[#fdd835] border-b border-gray-50"
            >
              ABOUT
            </Link>
            <Link 
              href="/blog" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-gray-800 hover:text-[#fdd835] border-b border-gray-50"
            >
              BLOG
            </Link>
            <div className="pt-2">
              {isLoggedIn ? (
                <Link 
                  href="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-bold text-[#880808] hover:text-red-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  MY ACCOUNT
                </Link>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link 
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center py-2 text-sm font-bold text-gray-700 hover:text-[#880808] border border-gray-200 rounded-lg"
                  >
                    LOGIN
                  </Link>
                  <Link 
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center py-2 text-sm font-bold bg-gray-900 text-white rounded-lg hover:bg-gray-700"
                  >
                    SIGN UP
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
