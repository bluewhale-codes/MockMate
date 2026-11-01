import { PRODUCTS, CATEGORIES } from '../data/products'
import ProductCard from './ProductCard'

export default function ProductSection({ query, category, onSelectCategory }) {
  const q = query.trim().toLowerCase()
  const filtered = PRODUCTS.filter((p) => {
    const matchCategory = category === 'All' || p.category === category
    const matchQuery =
      !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    return matchCategory && matchQuery
  })

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Our Products</h2>
          <p className="section-subtitle">Complete Cleaning Range for Every Need</p>
        </div>

        <div className="category-pills">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`pill ${category === c ? 'active' : ''}`}
              onClick={() => onSelectCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="empty-state">No products found{q ? ` for "${query.trim()}"` : ''}.</p>
        ) : (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}