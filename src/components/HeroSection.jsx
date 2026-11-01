const FALLBACK_HERO =
  'https://placehold.co/900x680/F8F2E7/064B38?text=MrSPA+Home+Wellness&font=playfair-display'

export default function HeroSection() {
  const scrollToProducts = () =>
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">
            A <span className="text-green">Cleaner</span> Home,
            <br />
            A <span className="text-green">Healthier</span> You
          </h1>
          <p className="hero-subtitle">
            Premium Cleaning Solutions
            <br />
            by MrSPA
          </p>
          <button className="btn btn-primary btn-lg" onClick={scrollToProducts}>
            Shop Now <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="hero-media">
          <img
            src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1793555917/Gemini_Generated_Image_gpbswmgpbswmgpbs_wh0k0u.png"
            alt="Clean, bright kitchen interior with MrSPA home-cleaning products"
            loading="eager"
            onError={(e) => { e.currentTarget.src = FALLBACK_HERO }}
          />
        </div>
      </div>
    </section>
  )
}