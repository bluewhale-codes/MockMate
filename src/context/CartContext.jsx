import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'mrspa-cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  // Persist cart across refreshes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const notify = (message) => {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }

  // Adds a product, or increments quantity if it already exists
  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...product, qty: 1 }]
    })
    notify(`${product.name} added to cart`)
  }

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    )
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    notify('Item removed from cart')
  }

  const clearCart = () => setItems([])

  const { count, total } = useMemo(
    () => ({
      count: items.reduce((sum, i) => sum + i.qty, 0),
      total: items.reduce((sum, i) => sum + (i.price ?? 0) * i.qty, 0),
    }),
    [items]
  )

  return (
    <CartContext.Provider
      value={{ items, count, total, addToCart, updateQty, removeItem, clearCart, notify, toast }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)