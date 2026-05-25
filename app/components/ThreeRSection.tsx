export default function ThreeRSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* 3R Mission */}
        <div className="mb-16">
          <div className="flex items-start gap-8">
            {/* Yellow Circle Badge */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center">
                <span className="text-4xl font-bold text-red-600">3R</span>
              </div>
            </div>
            
            {/* Mission Text */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4 text-black">
                Our mission is to <span className="text-red-600">change people's spending patterns</span> for their lifestyle commodities — one recycled pen at a time.
              </h2>
              <p className="text-black text-sm leading-relaxed">
                Akotro values community and authenticity. We prioritize locally produced, conscientious alternatives for a sustainable lifestyle at home and beyond. Join us in this collective movement to drive change in consumer behaviour towards a greener future.
              </p>
            </div>
          </div>
        </div>

        {/* Three R Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Reduce Card */}
          <div className="bg-yellow-100 p-8 rounded-lg">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m0 0l8 4m-8-4v10l8 4m0-10l8 4m-8-4l8 4M7 11v4m0 0h6" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">Reduce</h3>
            <p className="text-black text-sm leading-relaxed">
              We believe in minimising impact on sustainability by reducing consumption. Our products are designed to last, to be used fully, and when done, to return to the earth. Minimal packaging, maximum purpose at every product discretionary choice.
            </p>
          </div>

          {/* Reuse Card */}
          <div className="bg-yellow-100 p-8 rounded-lg">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">Reuse</h3>
            <p className="text-black text-sm leading-relaxed">
              Every Akotro product begins its life as waste paper — newspapers, kraft offcuts, colour sheets that would otherwise go to landfill. We give discarded materials a second, meaningful life so something you hold every day. Waste is a stationery out choice unnecessarily.
            </p>
          </div>

          {/* Recycle Card */}
          <div className="bg-yellow-100 p-8 rounded-lg">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-3">Recycle</h3>
            <p className="text-black text-sm leading-relaxed">
              Our pioneering range helps take recycling further — wildflower seeds use embedded in the tip of each pencil. Pencil becomes a flower. The pen becomes a tree. The end is a new beginning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
