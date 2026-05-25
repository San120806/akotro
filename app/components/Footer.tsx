import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content - 2 Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          {/* Left Section - Logo & Description */}
          <div>
            <div className="mb-6 flex flex-col items-start">
              <Image
                src="/images/WhatsApp_Image_2026-04-29_at_18.08.40-removebg-preview.png"
                alt="Akotro Logo"
                width={80}
                height={80}
                className="mb-2"
                priority
              />
              <h3 className="text-lg font-bold">AKOTRO</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Eco-friendly stationery crafted from recycled paper by women artisans in Mumbai. Replacing plastic — one pen at a time.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">100% RECYCLED</span>
              <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">MADE IN INDIA</span>
              <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">WOMEN-LED</span>
              <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">PLASTIC-FREE</span>
              <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">PAY ON DELIVERY</span>
            </div>
          </div>

          {/* Right Section - Links */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-6">
              {/* Shop */}
              <div>
                <h4 className="font-bold mb-4 uppercase text-yellow-400 text-sm">SHOP</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/shop" className="text-gray-300 hover:text-yellow-400">All Products</Link></li>
                  <li><Link href="/shop" className="text-gray-300 hover:text-yellow-400">Biotic Stationery</Link></li>
                  <li><Link href="/shop" className="text-gray-300 hover:text-yellow-400">Organic Apparel</Link></li>
                  <li><Link href="/shop" className="text-gray-300 hover:text-yellow-400">Plantable Range</Link></li>
                </ul>
              </div>

              {/* Help */}
              <div>
                <h4 className="font-bold mb-4 uppercase text-yellow-400 text-sm">HELP</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/faq" className="text-gray-300 hover:text-yellow-400">FAQ</Link></li>
                  <li><Link href="/privacy-policy" className="text-gray-300 hover:text-yellow-400">Privacy Policy</Link></li>
                  <li><Link href="/shipping-returns" className="text-gray-300 hover:text-yellow-400">Shipping & Returns</Link></li>
                  <li><Link href="#" className="text-gray-300 hover:text-yellow-400">Track Order</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-bold mb-4 uppercase text-yellow-400 text-sm">CONTACT</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="mailto:support@akotro.com" className="text-gray-300 hover:text-yellow-400">support@akotro.com</Link></li>
              <li><Link href="tel:+917900179710" className="text-gray-300 hover:text-yellow-400">+91 79001 79710</Link></li>
              <li className="text-gray-400">Mumbai, India</li>
              <li className="text-gray-400">Mon-Sat: 11am-6pm IST</li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <Link href="https://www.instagram.com/akotro_official/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 text-sm">Instagram</Link>
          <Link href="https://wa.me/917900179710" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 text-sm">WhatsApp</Link>
          <Link href="https://www.facebook.com/people/Akotro/61551014469085/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 text-sm">Facebook</Link>
        </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400 text-center sm:text-left">
            <p>&copy; 2024 Akotro. All rights reserved.</p>
            <p>Crafted with Intent · Made in India ❤</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
