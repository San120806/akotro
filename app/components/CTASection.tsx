import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-[#6b0606] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-4">
          Every Purchase
          <br />
          <span className="text-[#fdd835]">Plants a Future</span>
        </h2>
        <p className="text-base mb-12 text-gray-100">
          One pen. One pencil. One small choice that says no to plastic and yes to a greener India
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/shop">
            <button className="bg-black text-[#fdd835] px-8 py-3 rounded font-bold hover:bg-gray-800">
              SHOP ALL PRODUCTS →
            </button>
          </Link>
          <Link href="#about">
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded font-bold hover:bg-white hover:text-red-700">
              BULK & CORPORATE
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
