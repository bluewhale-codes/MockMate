import { useCart } from '../context/CartContext'
import { formatPrice, discountPercent } from '../data/products'

function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? '#F5A623' : 'none'}
          stroke="#F5A623"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </span>
  )
}

export default function ProductCard({ product, onView }) {
  const { addToCart, notify } = useCart()
  const discount = discountPercent(product)

  const handleAdd = (e) => {
    e.stopPropagation()
    if (product.price == null) {
      notify('Please contact us for pricing on this product')
      return
    }
    addToCart(product)
  }

  return (
    <article className="product-card" onClick={() => onView(product)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onView(product)}>
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" className="product-img" />

        {discount > 0 && <span className="badge badge-discount">{discount}% OFF</span>}
        {product.tag && (
          <span className={`badge badge-tag ${product.tag === 'New' ? 'tag-new' : ''}`}>
            {product.tag}
          </span>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-rating">
          <Stars rating={product.rating} />
          <span className="rating-num">{product.rating}</span>
          <span className="reviews-num">({product.reviews} reviews)</span>
        </div>

        <div className="product-foot">
          <div className="price-block">
            <span className="product-price">{formatPrice(product.price)}</span>
            {product.mrp != null && product.mrp > product.price && (
              <span className="product-mrp">₹{product.mrp}</span>
            )}
            {discount > 0 && <span className="save-text">Save {discount}%</span>}
          </div>
          <button className="btn btn-primary btn-add" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}