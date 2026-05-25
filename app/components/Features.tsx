export default function Features() {
  const features = [
    {
      iconPath: 'M12 1C6.48 1 2 5.48 2 11v9c0 1.1.9 2 2 2h4v-8H6v-3c0-3.87 3.13-7 7-7s7 3.13 7 7v3h-2v8h4c1.1 0 2-.9 2-2v-9c0-5.52-4.48-10-10-10zm0 3c-3.87 0-7 3.13-7 7v3h14v-3c0-3.87-3.13-7-7-7z',
      title: 'Secure Payments',
      subtitle: 'All Variants, CCOs',
    },
    {
      iconPath: 'M18 6h-2c0-2.66-2.24-5-5-5s-5 2.34-5 5H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2c1.66 0 3 1.34 3 3h-6c0-1.66 1.34-3 3-3zm7 16H6V8h12v12zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z',
      title: '7-Day Delivery',
      subtitle: 'Pan India',
    },
    {
      iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
      title: 'Pay on Delivery',
      subtitle: 'All Options Max',
    },
    {
      iconPath: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z',
      title: 'Quality Assured',
      subtitle: 'Only Tested',
    },
    {
      iconPath: 'M10.5 1c-1.1 0-2 .9-2 2v2H3.12C2 5 1 6.12 1 7.5V20c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7.5C23 6.12 21.88 5 20.88 5H15.5V3c0-1.1-.9-2-2-2h-3zm3.5 9c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z',
      title: 'Easy Returns',
      subtitle: 'Day Policy',
    },
  ];

  return (
    <section className="bg-yellow-100 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-black mb-2 flex justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d={feature.iconPath} />
                </svg>
              </div>
              <h3 className="font-bold text-xs text-black">{feature.title}</h3>
              <p className="text-xs text-black">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
