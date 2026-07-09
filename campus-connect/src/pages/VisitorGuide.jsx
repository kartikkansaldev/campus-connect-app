export default function VisitorGuide() {
  const guideCategories = [
    { icon: '🏫', title: 'Campus Tour', desc: 'Guided tours and self-guided maps.' },
    { icon: '🅿', title: 'Parking', desc: 'Visitor parking zones and permits.' },
    { icon: '🍔', title: 'Nearby Restaurants', desc: 'Top food spots just outside campus.' },
    { icon: '🏨', title: 'Hotels', desc: 'Recommended accommodations for guests.' },
    { icon: '🚖', title: 'Transport', desc: 'Shuttle schedules and taxi stands.' },
    { icon: '🏥', title: 'Medical', desc: 'Nearest hospitals and pharmacies.' },
    { icon: '🖨', title: 'Printing', desc: 'Stationery and print shops on campus.' },
    { icon: '🛒', title: 'Grocery', desc: 'Supermarkets and daily needs.' },
    { icon: '📍', title: 'Important Places', desc: 'Admin block, library, and auditoriums.' },
    { icon: '☎', title: 'Emergency', desc: 'Security, ambulance, and helpline numbers.' },
  ];

  return (
    <div className="animate-in">
      <div className="neo-card-static p-8 bg-[var(--color-text)] text-[var(--color-bg)] mb-8">
        <h1 className="text-4xl font-extrabold font-heading mb-3">Welcome to Chitkara!</h1>
        <p className="text-[var(--color-bg)] opacity-80 max-w-xl font-medium leading-relaxed">
          Whether you're a prospective student, parent, or guest lecturer, we've compiled everything you need to navigate our 200-acre campus effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {guideCategories.map((item, i) => (
          <div key={i} className="neo-card-static p-5 bg-white hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-card)] border-2 border-[var(--color-border-light)] flex items-center justify-center text-2xl mb-4 group-hover:border-[var(--color-text)] transition-colors">
              {item.icon}
            </div>
            <h3 className="font-extrabold text-lg mb-1">{item.title}</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
