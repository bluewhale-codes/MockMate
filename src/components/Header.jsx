import { useState } from 'react'
import SearchBar from './SearchBar'

const NAV_LINKS = [
  { label: 'Home', target: 'home' },
  { label: 'Products', target: 'products', dropdown: true },
  { label: 'About Us', target: 'why' },
  { label: 'Contact', target: 'contact' },
]

export default function Header({
  query, onSearch, onCartOpen, onNavigate,
  onOpenMobileNav, categories, onSelectCategory, count,
}) {
  const [active, setActive] = useState('home')

  const handleNav = (link) => {
    setActive(link.target)
    onNavigate(link.target)
  }

  const handleCategory = (c) => {
    setActive('products')
    onSelectCategory(c)
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand" onClick={() => handleNav(NAV_LINKS[0])} aria-label="MrSPA home">
          <span className="brand-logo">Mr<em>SPA</em></span>
          <span className="brand-tagline">HOME WELLNESS SERVICES</span>
        </button>

        <nav className="main-nav" aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div className="nav-item has-dropdown" key={link.label}>
                <button
                  className={`nav-link ${active === link.target ? 'active' : ''}`}
                  onClick={() => handleNav(link)}
                >
                  {link.label}
                  <svg className="chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="dropdown">
                  {categories.map((c) => (
                    <button key={c} onClick={() => handleCategory(c)}>
                      {c === 'All' ? 'All Products' : c}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                key={link.label}
                className={`nav-link ${active === link.target ? 'active' : ''}`}
                onClick={() => handleNav(link)}
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        <div className="header-actions">
          <div className="search-wrap">
            <SearchBar value={query} onChange={onSearch} />
          </div>
          <button className="icon-btn" onClick={onCartOpen} aria-label={`Open cart, ${count} items`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>
          <button className="icon-btn" aria-label="Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button className="icon-btn hamburger" onClick={onOpenMobileNav} aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}