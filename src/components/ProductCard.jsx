import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function ProductCard({ product }) {
  const { addToCart, notify } = useCart()

  const handleAdd = () => {
    if (product.price == null) {
      notify('Please contact us for pricing on this product')
      return
    }
    addToCart(product)
  }

  return (
    <article className="product-card">
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" className="product-img" />
      </div>
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-foot">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button className="btn btn-primary btn-add" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}