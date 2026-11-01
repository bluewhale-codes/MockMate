import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import CartItem from './CartItem'

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { items, total } = useCart()

  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-head">
          <h2>Your Cart</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <button className="btn btn-outline" onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="cart-foot">
              <div className="cart-total-row">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button className="btn btn-primary btn-block" onClick={onCheckout}>
                Proceed to Checkout
              </button>
              <button className="btn btn-link btn-block" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}