export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="brand-logo light">Mr<em>SPA</em></span>
          <p className="footer-tagline">HOME WELLNESS SERVICES</p>
          <p className="footer-about">
            Premium home-cleaning and wellness products for a cleaner, healthier home.
          </p>
          <div className="socials">
            <a href="#" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.7-1.6h1.5V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.7H7.8V14h2.7v8h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="#" aria-label="X (Twitter)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.5 22H3.4l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L7.6 3.9H5.8L17.8 20z"/></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.9-.5-5.6c-.3-1-1.1-1.8-2.1-2C18.6 4 12 4 12 4s-6.6 0-8.4.4c-1 .2-1.8 1-2.1 2C1 8.1 1 12 1 12s0 3.9.5 5.6c.3 1 1.1 1.8 2.1 2 1.8.4 8.4.4 8.4.4s6.6 0 8.4-.4c-1 0 1.8-1 2.1-2 .5-1.7.5-5.6.5-5.6zM9.8 15.5v-7l6.2 3.5-6.2 3.5z"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <button onClick={() => onNavigate('why')}>About Us</button>
          <button onClick={() => onNavigate('products')}>Products</button>
          <button onClick={() => onNavigate('home')}>Home</button>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <button onClick={() => onNavigate('contact')}>Contact Us</button>
          <button>Privacy Policy</button>
          <button>Terms &amp; Conditions</button>
        </div>

        <div className="footer-col">
          <h4>Get in Touch</h4>
          <p>support@mrspa.in</p>
          <p>+91 98XXX XXXXX</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MrSPA — Home Wellness Services. All rights reserved.
      </div>
    </footer>
  )
}