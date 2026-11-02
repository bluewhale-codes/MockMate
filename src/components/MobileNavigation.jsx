import { useState } from 'react'

export default function MobileNavigation({ open, onClose, onNavigate, categories, onSelectCategory }) {
  const [showCategories, setShowCategories] = useState(false)

  const go = (target) => {
    onNavigate(target)
    onClose()
  }

  const pickCategory = (c) => {
    onSelectCategory(c)
    onClose()
  }

  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`mobile-nav ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mobile-nav-head">
          
          <button className="icon-btn" onClick={onClose} aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mobile-nav-links" aria-label="Mobile">
          <button onClick={() => go('home')}>Home</button>
          <button className="mobile-cat-toggle" onClick={() => setShowCategories((s) => !s)}>
            Products
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" style={{ transform: showCategories ? 'rotate(180deg)' : 'none' }} aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {showCategories && (
            <div className="mobile-cats">
              {categories.map((c) => (
                <button key={c} onClick={() => pickCategory(c)}>{c === 'All' ? 'All Products' : c}</button>
              ))}
            </div>
          )}
          <button onClick={() => go('why')}>About Us</button>
          <button onClick={() => go('contact')}>Contact</button>
        </nav>
      </aside>
    </>
  )
}