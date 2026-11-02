import { useState, useEffect, useCallback } from 'react'

const FALLBACK_HERO =
  'https://placehold.co/900x680/F8F2E7/064B38?text=MrSPA+Home+Wellness&font=playfair-display'

const SLIDES = [
  {
    src: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793555917/Gemini_Generated_Image_gpbswmgpbswmgpbs_wh0k0u.png',
    alt: 'Clean, bright kitchen interior with MrSPA home-cleaning products',
  },
  {
    src: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556937/Gemini_Generated_Image_mh1p6pmh1p6pmh1p_r5eqd9.png',
    alt: 'Sparkling clean bathroom',
  },
  {
    src: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556170/Gemini_Generated_Image_gebftrgebftrgebf_uxgp91.png',
    alt: 'Fresh, tidy living room',
  },
  {
    src: 'https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556174/Gemini_Generated_Image_tq1j6tq1j6tq1j6t_rgtj0y.png',
    alt: 'Fresh, tidy living room',
  },
]

const AUTO_SWIPE_MS = 4000

export default function HeroSection() {
  const [index, setIndex] = useState(0)

  const scrollToProducts = () =>
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })

  const goTo = useCallback(
    (i) => setIndex((i + SLIDES.length) % SLIDES.length),
    []
  )

  const next = useCallback(() => goTo(index + 1), [index, goTo])
  const prev = () => goTo(index - 1)

  // Auto-swipe
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, AUTO_SWIPE_MS)
    return () => clearInterval(timer)
  }, [])

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

        <div className="hero-media hero-carousel">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map((slide, i) => (
              <div className="carousel-slide" key={i}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onError={(e) => { e.currentTarget.src = FALLBACK_HERO }}
                />
              </div>
            ))}
          </div>

          <button className="carousel-btn prev" onClick={prev} aria-label="Previous image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="carousel-btn next" onClick={next} aria-label="Next image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          <div className="carousel-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}