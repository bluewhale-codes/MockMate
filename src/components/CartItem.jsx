import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart()

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-img" />
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p className="cart-item-price">{formatPrice(item.price)}</p>
        <div className="qty-controls">
          <button onClick={() => updateQty(item.id, -1)} aria-label={`Decrease quantity of ${item.name}`}>−</button>
          <span aria-live="polite">{item.qty}</span>
          <button onClick={() => updateQty(item.id, 1)} aria-label={`Increase quantity of ${item.name}`}>+</button>
        </div>
      </div>
      <div className="cart-item-right">
        <strong>{formatPrice(item.price * item.qty)}</strong>
        <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
      </div>
    </div>
  )
}