import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const INITIAL = { name: '', mobile: '', email: '', address: '', city: '', state: '', pincode: '' }

export default function CheckoutPage({ onBack }) {
  const { items, total, clearCart } = useCart()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | confirmed
  const [orderId, setOrderId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Full name is required'
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim()))
      er.mobile = 'Enter a valid 10-digit mobile number'
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      er.email = 'Enter a valid email address'
    if (!form.address.trim()) er.address = 'Delivery address is required'
    if (!form.city.trim()) er.city = 'City is required'
    if (!form.state.trim()) er.state = 'State is required'
    if (!/^\d{6}$/.test(form.pincode.trim()))
      er.pincode = 'Enter a valid 6-digit pincode'
    return er
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (items.length === 0) return
    const er = validate()
    if (Object.keys(er).length > 0) {
      setErrors(er)
      return
    }
    setStatus('submitting')
    // ------------------------------------------------------------------
    // TODO: connect to your backend / order-management API here.
    // ------------------------------------------------------------------
    setTimeout(() => {
      setOrderId(`MRSPA-${Date.now().toString().slice(-8)}`)
      setStatus('confirmed')
      clearCart()
    }, 1200)
  }

  if (status === 'confirmed') {
    return (
      <div className="container checkout-page">
        <div className="order-confirmation">
          <div className="check-circle" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h1>Order Placed Successfully!</h1>
          <p>
            Thank you, {form.name.trim().split(' ')[0]}. Your order{' '}
            <strong>{orderId}</strong> has been received.
          </p>
          <p className="muted">We will contact you on {form.mobile} to confirm delivery details.</p>
          <button className="btn btn-primary btn-lg" onClick={onBack}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container checkout-page">
        <div className="order-confirmation">
          <h1>Your cart is empty</h1>
          <p className="muted">Add some products before checking out.</p>
          <button className="btn btn-primary btn-lg" onClick={onBack}>
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container checkout-page">
      <button className="btn btn-link back-btn" onClick={onBack}>← Back to shop</button>
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Delivery Details</h2>

          <div className="field">
            <label htmlFor="name">Full Name *</label>
            <input id="name" name="name" value={form.name} onChange={handleChange}
              className={errors.name ? 'invalid' : ''} autoComplete="name" />
            {errors.name && <small className="field-error">{errors.name}</small>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="mobile">Mobile Number *</label>
              <input id="mobile" name="mobile" inputMode="numeric" maxLength="10"
                value={form.mobile} onChange={handleChange}
                className={errors.mobile ? 'invalid' : ''} autoComplete="tel" />
              {errors.mobile && <small className="field-error">{errors.mobile}</small>}
            </div>
            <div className="field">
              <label htmlFor="email">Email Address <span className="optional">(optional)</span></label>
              <input id="email" name="email" type="email" value={form.email}
                onChange={handleChange} className={errors.email ? 'invalid' : ''}
                autoComplete="email" />
              {errors.email && <small className="field-error">{errors.email}</small>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="address">Complete Delivery Address *</label>
            <textarea id="address" name="address" rows="3" value={form.address}
              onChange={handleChange} className={errors.address ? 'invalid' : ''}
              autoComplete="street-address" />
            {errors.address && <small className="field-error">{errors.address}</small>}
          </div>

          <div className="field-row three">
            <div className="field">
              <label htmlFor="city">City *</label>
              <input id="city" name="city" value={form.city} onChange={handleChange}
                className={errors.city ? 'invalid' : ''} autoComplete="address-level2" />
              {errors.city && <small className="field-error">{errors.city}</small>}
            </div>
            <div className="field">
              <label htmlFor="state">State *</label>
              <input id="state" name="state" value={form.state} onChange={handleChange}
                className={errors.state ? 'invalid' : ''} autoComplete="address-level1" />
              {errors.state && <small className="field-error">{errors.state}</small>}
            </div>
            <div className="field">
              <label htmlFor="pincode">Pincode *</label>
              <input id="pincode" name="pincode" inputMode="numeric" maxLength="6"
                value={form.pincode} onChange={handleChange}
                className={errors.pincode ? 'invalid' : ''} autoComplete="postal-code" />
              {errors.pincode && <small className="field-error">{errors.pincode}</small>}
            </div>
          </div>

          <button className="btn btn-primary btn-block btn-lg" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Placing Order…' : `Place Order · ${formatPrice(total)}`}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          <ul className="order-summary-list">
            {items.map((i) => (
              <li key={i.id}>
                <span>{i.name} × {i.qty}</span>
                <span>{formatPrice(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="cart-total-row grand">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
        </aside>
      </div>
    </div>
  )
}