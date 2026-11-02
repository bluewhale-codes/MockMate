import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice, discountPercent } from '../data/products'

export default function ProductModal({ product, onClose }) {
  const { addToCart, notify } = useCart()
  const [imgIndex, setImgIndex] = useState(0)
  const [qty, setQty] = useState(1)

  const discount = product ? discountPercent(product) : 0

  // Lock body scroll + close on Escape while modal is open
  useEffect(() => {
    if (!product) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [product, onClose])

  if (!product) return null

  const gallery = product.gallery?.length ? product.gallery : [product.image]

  const handleAdd = () => {
    if (product.price == null) {
      notify('Please contact us for pricing on this product')
      return
    }
    for (let i = 0; i < qty; i++) addToCart(product)
    notify(`${product.name} added to cart`)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={product.name}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-gallery">
          <div className="modal-main-img">
            <img src={gallery[imgIndex]} alt={product.name} />
            {discount > 0 && <span className="badge badge-discount">{discount}% OFF</span>}
            {product.tag && <span className="badge badge-tag">{product.tag}</span>}
          </div>
          {gallery.length > 1 && (
            <div className="modal-thumbs">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  className={`thumb ${i === imgIndex ? 'active' : ''}`}
                  onClick={() => setImgIndex(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-info">
          <span className="modal-category">{product.category}</span>
          <h2 className="modal-name">{product.name}</h2>

          <div className="product-rating">
            <span className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="15" height="15" viewBox="0 0 24 24"
                  fill={i <= Math.round(product.rating) ? '#F5A623' : 'none'}
                  stroke="#F5A623" strokeWidth="1.5" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
              ))}
            </span>
            <span className="rating-num">{product.rating}</span>
            <span className="reviews-num">({product.reviews} reviews)</span>
          </div>

          <div className="modal-price-row">
            <span className="product-price modal-price">{formatPrice(product.price)}</span>
            {product.mrp != null && product.mrp > product.price && (
              <span className="product-mrp">₹{product.mrp}</span>
            )}
            {discount > 0 && <span className="save-text">You save {discount}%</span>}
          </div>

          <p className="modal-desc">{product.longDescription || product.description}</p>

          <div className="modal-actions">
            <div className="qty-selector">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn btn-primary btn-lg" onClick={handleAdd}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}