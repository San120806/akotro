export default function MissionSection() {
  return (
    <section className="bg-[#A40000] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Reduce. Reuse.
              <br />
              <span className="text-yellow-400">Recycle.</span>
            </h2>
            <p className="text-sm mb-6 leading-relaxed">
              Anukra (ARPL) → Together in one place, we believed the object you hold every day while 
              daring to grow where sustai...
            </p>
            <button className="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-800 text-sm">
              OUR STORY →
            </button>
          </div>

          {/* Right - Stats */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="font-bold mb-2 text-black">#1 – WOMEN-LED CRAFTSMANSHIP</h3>
              <p className="text-sm text-black">
                Products handcrafted by talented rural women artisans, turning traditional skills into sustainable livelihoods.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="font-bold mb-2 text-black">#2 – RECYCLED WITH PURPOSE</h3>
              <p className="text-sm text-black">
                Made from recycled materials and crafted by hand, giving waste a second life while reducing environmental impact.
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow-sm">
              <h3 className="font-bold mb-2 text-black">#3 – EMPOWERING COMMUNITIES</h3>
              <p className="text-sm text-black">
                Every purchase supports women entrepreneurs, strengthens rural communities, and helps create a more sustainable future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
