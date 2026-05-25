export default function StatsSection() {
  const stats = [
    {
      number: '18',
      label: 'ECO PRODUCTS',
    },
    {
      number: '100%',
      label: 'RECYCLED PAPER',
    },
    {
      number: '0',
      label: 'PLASTIC USED',
    },
    {
      number: '7',
      label: 'DAY DELIVERY',
    },
    {
      number: '24/7',
      label: 'SUPPORT',
    },
  ];

  return (
    <section className="bg-yellow-400 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-3xl font-bold mb-1 text-red-600">{stat.number}</h3>
              <p className="text-xs font-bold text-black">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
