import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const FALLBACK_IMG =
  'https://placehold.co/800x600/F8F2E7/064B38?text=MrSPA&font=playfair-display'

export default function OrderSection({ onCheckout }) {
  const { items, count, total } = useCart()

  const scrollToProducts = () =>
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="order-section">
      <div className="container order-grid">
        <div className="order-media">
          <img
            src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1793556937/Gemini_Generated_Image_mh1p6pmh1p6pmh1p_r5eqd9.png"
            alt="Bright, clean home interior"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = FALLBACK_IMG }}
          />
        </div>

        <div className="order-cta">
          <h2>Ready to Order?</h2>
          <p>Add your favourite products to cart and enjoy a cleaner tomorrow!</p>
          <button className="btn btn-primary btn-lg" onClick={onCheckout}>
            Proceed to Checkout <span aria-hidden="true">→</span>
          </button>
        </div>

        <aside className="order-summary-card" aria-label="Cart summary">
          <h3>Your Cart ({count} {count === 1 ? 'item' : 'items'})</h3>
          {items.length === 0 ? (
            <p className="muted">Your cart is empty — add some products to get started.</p>
          ) : (
            <ul className="order-summary-list">
              {items.map((i) => (
                <li key={i.id}>
                  <span>{i.name} × {i.qty}</span>
                  <span>{formatPrice(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="cart-total-row">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <button className="btn btn-outline btn-block" onClick={scrollToProducts}>
            Continue Shopping
          </button>
        </aside>
      </div>
    </section>
  )
}