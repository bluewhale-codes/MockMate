const FEATURES = [
  {
    title: 'Premium Quality',
    desc: 'Carefully formulated products that deliver a professional clean every time.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
        <path d="M2 9h20M9 3l3 6 3-6M12 9v12" />
      </svg>
    ),
  },
  {
    title: 'Safe & Effective',
    desc: 'Tough on stains, gentle on your home and the people in it.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Eco-Friendly Formula',
    desc: 'Thoughtfully chosen ingredients that are kinder to the planet.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-10-1 12-5 16-9 17z" />
        <path d="M4 21c4-6 8-9 12-11" />
      </svg>
    ),
  },
  {
    title: 'Dedicated Support',
    desc: 'Our team is always here to help you choose and use our products.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
      </svg>
    ),
  },
]

export default function WhyChooseUs() {
  return (
    <section className="why-section" id="why">
      <div className="container">
        <div className="section-head light">
          <h2 className="section-title">Why Choose MrSPA?</h2>
          <p className="section-subtitle">Smart Choice for a Cleaner &amp; Healthier Life</p>
        </div>
        <div className="why-grid">
          {FEATURES.map((f) => (
            <div className="why-card" key={f.title}>
              <div className="why-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}