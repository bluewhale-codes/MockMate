// import { useState , useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import { useDispatch , useSelector } from 'react-redux'
// import './App.css'
// import MockMateDashboard from './Component/MockMateDashboard'
// import CompactMockTest from './Component/CompactMockTest'
// import { sampleQuestions } from '../sampleQuestions'
// import { ThemeProvider } from './Component/ThemeProvider'
// import { getMocktest } from './Store/slice/mocktestSlice'
// function App() {
//   const [count, setCount] = useState(0)
//   const {questions,duration,username,currentQuestion,answers} = useSelector((state)=>state.mocktest);
//   const dispatch = useDispatch();
  

//   useEffect(()=>{
//    dispatch(getMocktest());
//   },[])

//   return (
//     <>
//       <ThemeProvider>
//       <CompactMockTest
//         questions={questions}
//         duration={duration}
//         userName={username}
//         CurrentQuestion={currentQuestion}
//         Answers={answers}
//         examTitle="MLT Mock Test - 01"
//       />
//     </ThemeProvider>
    
//     </>
//   )
// }

// export default App
import { useState } from 'react'
import { CartProvider, useCart } from './context/CartContext'
import { CATEGORIES } from './data/products'
import Header from './components/Header'
import MobileNavigation from './components/MobileNavigation'
import HeroSection from './components/HeroSection'
import ProductSection from './components/ProductSection'
import WhyChooseUs from './components/WhyChooseUs'
import OrderSection from './components/OrderSection'
import CheckoutPage from './components/CheckoutPage'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Toast from './components/Toast'
import AnnouncementBar from './components/AnnouncementBar'

function Storefront() {
  const { count } = useCart()
  const [view, setView] = useState('home') // 'home' | 'checkout'
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const navigate = (target) => {
    setView('home')
    setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  }

  const handleSearch = (value) => {
    setQuery(value)
    setView('home')
    if (value.trim()) {
      setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
      }, 60)
    }
  }

  const handleCategory = (c) => {
    setCategory(c)
    setView('home')
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  }

  const goCheckout = () => {
    setCartOpen(false)
    setMobileNavOpen(false)
    setView('checkout')
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="app">
       <AnnouncementBar />
      {/* Add padding-top: 38px to the element below so content isn't hidden */}
      <header style={{ paddingTop: 38 }}></header>
      <Header
        query={query}
        onSearch={handleSearch}
        onCartOpen={() => setCartOpen(true)}
        onNavigate={navigate}
        onOpenMobileNav={() => setMobileNavOpen(true)}
        categories={CATEGORIES}
        onSelectCategory={handleCategory}
        count={count}
      />

      {view === 'checkout' ? (
        <main className="checkout-view">
          <CheckoutPage onBack={() => navigate('products')} />
        </main>
      ) : (
        <main>
          <HeroSection />
          <ProductSection query={query} category={category} onSelectCategory={handleCategory} />
          <WhyChooseUs />
          <OrderSection onCheckout={goCheckout} />
        </main>
      )}

      <Footer onNavigate={navigate} />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={goCheckout} />
      <MobileNavigation
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onNavigate={navigate}
        categories={CATEGORIES}
        onSelectCategory={handleCategory}
      />
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  )
}
