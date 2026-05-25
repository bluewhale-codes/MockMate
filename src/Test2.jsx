import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../src/Component/ui/Button";
import { Input } from "../src/Component/ui/input";
import { Label } from "../src/Component/ui/label";
import { Checkbox } from "./Component/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../src/Component/ui/select";
import {
  Search,
  User,
  ShoppingCart,
  ArrowUpRight,
  X,
  ChevronDown,
  Heart,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
Tag,
TicketPercent,
   ArrowRight, Minus, Plus,
  Shield, RotateCcw, Headphones, Check, CreditCard, Wallet,
  Landmark, Banknote, Smartphone, 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   SKIN STUDIO - Product Browser + Configurator Sidebar
   Tech: React + Tailwind CSS + shadcn/ui + GSAP
   ============================================================ */

const ALL_PRODUCTS = [
  { id: 1, name: "Minimal Lines", category: "Minimal", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779652440/Gemini_Generated_Image_e3ah18e3ah18e3ah_1_kriqgw.png", price: 199 },
  { id: 2, name: "Art Splash", category: "Artistic", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779650793/Gemini_Generated_Image_eflbkgeflbkgeflb_1_1_phclay.png", price: 299 },
  { id: 3, name: "Black Marble", category: "Textured", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779651078/Gemini_Generated_Image_nmk1qinmk1qinmk1_1_iv2v4k.png", price: 149 },
  { id: 4, name: "Concrete", category: "Industrial", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779650608/Gemini_Generated_Image_9rp5cn9rp5cn9rp5_r3iude.png", price: 99 },
  { id: 5, name: "Pastel Waves", category: "Abstract", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779647194/Gemini_Generated_Image_g7ujdeg7ujdeg7uj_jqncif.png", price: 499 },
  { id: 6, name: "Neon Abstract", category: "Streetwear", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779647044/Gemini_Generated_Image_r256mgr256mgr256_bj7qtn.png", price: 199 },
  { id: 7, name: "Carbon Fiber", category: "Tech", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779635006/Gemini_Generated_Image_60qfr960qfr960qf_1_mbvgdz.png", price:599 },
  { id: 8, name: "Wood Grain", category: "Natural", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=500&fit=crop", price: 25.99 },
  { id: 9, name: "Geometric Black", category: "Minimal", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=500&fit=crop", price: 23.99 },
  { id: 10, name: "Urban Camo", category: "Streetwear", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=500&fit=crop", price: 26.99 },
  { id: 11, name: "Purple Matte", category: "Solid", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=500&fit=crop", price: 24.99 },
  { id: 12, name: "White Marble", category: "Luxury", image: "https://images.unsplash.com/photo-1566228451963-19e6e1d06e8c?w=400&h=500&fit=crop", price: 29.99 },
  { id: 13, name: "Electric Grid", category: "Tech", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop", price: 31.99 },
  { id: 14, name: "Rose Gold", category: "Luxury", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=500&fit=crop", price: 34.99 },
  { id: 15, name: "Tropical Leaf", category: "Natural", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=500&fit=crop", price: 25.99 },
  { id: 16, name: "Cyber Punk", category: "Streetwear", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=500&fit=crop", price: 30.99 },
  { id: 17, name: "Sandstone", category: "Textured", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop", price: 23.99 },
  { id: 18, name: "Ocean Blue", category: "Abstract", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=500&fit=crop", price: 26.99 },
  { id: 19, name: "Leather Brown", category: "Luxury", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=500&fit=crop", price: 35.99 },
  { id: 20, name: "Matrix Code", category: "Tech", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop", price: 29.99 },
  { id: 21, name: "Sunset Gradient", category: "Abstract", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=500&fit=crop", price: 27.99 },
  { id: 22, name: "Brushed Metal", category: "Industrial", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop", price: 33.99 },
  { id: 23, name: "Floral Pattern", category: "Artistic", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=500&fit=crop", price: 24.99 },
  { id: 24, name: "Matte Black", category: "Solid", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=500&fit=crop", price: 21.99 },
];

const PRODUCTS_PER_PAGE = 12;

const brands = [
  { value: "apple", label: "Apple", icon: "🍎" },
  { value: "samsung", label: "Samsung", icon: "📱" },
  { value: "oneplus", label: "OnePlus", icon: "📲" },
  { value: "pixel", label: "Pixel", icon: "📳" },
];
const paymentMethods = [
  { id: "upi", name: "UPI", desc: "Pay using any UPI app", icon: <Smartphone className="w-5 h-5" />, recommended: true },
  { id: "cards", name: "Cards", desc: "Debit / Credit Card", icon: <CreditCard className="w-5 h-5" /> },
  { id: "netbanking", name: "Net Banking", desc: "All Indian banks", icon: <Landmark className="w-5 h-5" /> },
  { id: "wallets", name: "Wallets", desc: "PhonePe, Paytm, etc.", icon: <Wallet className="w-5 h-5" /> },
  { id: "cod", name: "Cash on Delivery", desc: "Pay when you receive", icon: <Banknote className="w-5 h-5" /> },
];


const models = {
  apple: ["iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "iPhone 14"],
  samsung: ["Galaxy S24 Ultra", "Galaxy S24", "Galaxy Z Flip 5"],
  oneplus: ["OnePlus 12", "OnePlus 11", "OnePlus Open"],
  pixel: ["Pixel 8 Pro", "Pixel 8", "Pixel 7a"],
};

const coupons = [
  { code: "WELCOME10", desc: "10% OFF on min. order $30", discount: 10, type: "percent", minOrder: 30 },
  { code: "SKINSTUDIO15", desc: "15% OFF on min. order $60", discount: 15, type: "percent", minOrder: 60 },
  { code: "FREESHIP", desc: "Free shipping on all orders", discount: 0, type: "shipping", minOrder: 0 },
  { code: "NEWUSER20", desc: "20% OFF on min. order $80", discount: 20, type: "percent", minOrder: 80 },
];






export default function Test2() {
  const [step, setStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(ALL_PRODUCTS[0]);
   const [selectedPayment, setSelectedPayment] = useState("upi");
  const [selectedBrand, setSelectedBrand] = useState("apple");
  const [selectedModel, setSelectedModel] = useState("iPhone 15 Pro");
  const [saved, setSaved] = useState(false);
  const [qty, setQty] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(ALL_PRODUCTS.slice(0, PRODUCTS_PER_PAGE));
  const [isLoading, setIsLoading] = useState(false);
  const [totalProducts] = useState(ALL_PRODUCTS.length);
  const [orderNumber] = useState("#SKN" + Math.floor(100000 + Math.random() * 900000));
  const [error, setError] = useState("");
  




  // Coupon logic
  

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCoupon,setIsCoupon] = useState(false);

  const subtotal = selectedProduct.price * qty;
  const shipping = appliedCoupon?.code === "FREESHIP" || subtotal > 50 ? 0 : 5.99;
  const discountAmount = appliedCoupon?.type === "percent" ? (subtotal * appliedCoupon.discount / 100) : 0;
  const total = subtotal + shipping - discountAmount;


  // Scroll-aware navbar state
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const gridRef = useRef(null);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const paginationRef = useRef(null);
  const navRef = useRef(null);

  // Scroll handler for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);
      
      // Calculate scroll progress (0 to 1)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transitionStep = (newStep) => {

     

      gsap.to(".sidebar-content", { opacity: 0, x: 20, duration: 0.2, onComplete: () => {
        setStep(newStep);

       
        gsap.fromTo(".sidebar-content", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 });
      }});
    };

    const applyCoupon = (code) => {

      console.log(code);
    const coupon = coupons.find(c => c.code === code.toUpperCase());
    if (!coupon) {
      setError("Invalid coupon code. Please try a valid coupon code.");
      transitionStep(10);
      return;
    }
    if (subtotal < coupon.minOrder) {
      setError(`Minimum order of $${coupon.minOrder} required.`);
      transitionStep(10);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponCode(code.toUpperCase());
    setError("");
    setIsCoupon(true);
    transitionStep(2);
  };

  const fetchProducts = useCallback(async (page) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const newProducts = ALL_PRODUCTS.slice(start, end);
    
    setProducts(newProducts);
    setIsLoading(false);
    
    setTimeout(() => {
      gsap.from(".product-card", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      });
    }, 50);
  }, []);

  const handlePageChange = (page) => {
    if (page === currentPage || isLoading) return;
    setCurrentPage(page);
    fetchProducts(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-header", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" });
      gsap.from(".breadcrumb", { opacity: 0, y: 10, duration: 0.6, delay: 0.2, ease: "power3.out" });
      
      gsap.from(".product-card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: "auto" });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: "none" });
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    }
  }, [sidebarOpen]);

  const openSidebar = (product,initialStep = 1) => {
    setSelectedProduct(product);
    setStep(initialStep);
    setQty(1);
    setSidebarOpen(true);
    setSaved(false);
    
  };

 const closeSidebar = () => setSidebarOpen(false);


  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  
   const nextStep = () => {
   
    gsap.to(".sidebar-content", { opacity: 0, x: 20, duration: 0.2, onComplete: () => {
      setStep(s => Math.min(s + 1, 6));
      gsap.fromTo(".sidebar-content", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 });
    }});
  };



  const renderSidebarContent = () => {
    switch (step) {
      case 1: // Select Skin
        return (
           // Render here 
              <div className="sidebar-content flex-1 px-4 sm:px-6 py-6">
              <div className="mb-5 sm:mb-6">
                <Label className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-black/60 mb-2 block">
                  Brand
                </Label>
                <Select value={selectedBrand} onValueChange={(val) => { setSelectedBrand(val); setSelectedModel(models[val][0]); }}>
                  <SelectTrigger className="w-full rounded-none border-black/20 h-10 sm:h-12 text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.value} value={brand.value} className="text-xs sm:text-sm">
                        <span className="mr-2">{brand.icon}</span>
                        {brand.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6 sm:mb-8">
                <Label className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-black/60 mb-2 block">
                  Model
                </Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-full rounded-none border-black/20 h-10 sm:h-12 text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models[selectedBrand]?.map((model) => (
                      <SelectItem key={model} value={model} className="text-xs sm:text-sm">
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative mb-6 sm:mb-8 flex justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 z-0">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <path d="M180,130Q170,170 130,180Q90,190 60,160Q30,130 40,90Q50,50 90,40Q130,30 160,60Q190,90 180,130Z" fill="#D9FF00" />
                  </svg>
                </div>

                <div className="absolute inset-0 opacity-10 z-0">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="previewGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#previewGrid)" />
                  </svg>
                </div>

                <div className="absolute -top-2 right-4 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 z-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon points="50,0 61,35 100,35 68,57 79,91 50,70 21,91 32,57 0,35 39,35" fill="black" />
                  </svg>
                </div>

                <div className="relative z-10 w-36 sm:w-44">
                  <div className="bg-black rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl">
                    <div className="relative bg-white rounded-[1.7rem] sm:rounded-[2rem] overflow-hidden aspect-[9/19]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-5 sm:h-6 bg-black rounded-b-xl z-20" />
                      
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      <div className={`absolute top-10 sm:top-12 left-3 sm:left-4 bg-black rounded-xl sm:rounded-2xl z-20 flex items-center justify-center ${selectedModel.includes("Pro") ? "w-10 h-10 sm:w-12 sm:h-12" : "w-8 h-8 sm:w-10 sm:h-10"}`}>
                        <div className={`grid gap-0.5 ${selectedModel.includes("Pro") ? "grid-cols-2" : "grid-cols-1"}`}>
                          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#333]" />
                          {selectedModel.includes("Pro") && (
                            <>
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#333]" />
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#333] col-span-2 mx-auto" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                {["Front", "Side", "Angle", "Edge"].map((view, i) => (
                  <div
                    key={view}
                    className={`w-12 h-16 sm:w-14 sm:h-20 bg-[#F0EDE8] rounded-sm overflow-hidden cursor-pointer border-2 transition-all duration-300 ${i === 0 ? "border-[#6C4DFF]" : "border-transparent hover:border-black/20"}`}
                  >
                    <img
                      src={selectedProduct.image}
                      alt={view}
                      className="w-full h-full object-cover"
                      style={{ transform: `rotate(${i * 15}deg) scale(1.2)` }}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-black tracking-tight uppercase">{selectedProduct.name}</h3>
                <p className="text-xs sm:text-sm text-black/50 mt-1">{selectedProduct.category} Collection</p>
                <p className="text-xl sm:text-2xl font-bold mt-2">{selectedProduct.price}</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={()=>nextStep()}
                  className="w-full bg-[#6C4DFF] hover:bg-[#5a3fd9] text-white rounded-none h-12 sm:h-14 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300"
                >
                  ADD TO CART
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setSaved(!saved)}
                  
                  className={`w-full rounded-none h-10 sm:h-12 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 ${saved ? "bg-black text-white border-black" : "bg-transparent text-black border-black/20 hover:border-black"}`}
                >
                  {saved ? "SAVED" : "SAVE DESIGN"}
                  <Heart className={`ml-2 w-4 h-4 ${saved ? "fill-white" : ""}`} />
                </Button>
              </div>
            </div>
        );

      case 2: // Mini Cart
        return (
         <div className="sidebar-content h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase">Your Cart</h2>
              <button onClick={closeSidebar} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 px-4 sm:px-5 py-4 overflow-y-auto">
              {/* Product */}
              <div className="flex gap-3 mb-4 pb-4 border-b border-black/10">
                <div className="w-16 h-20 bg-[#F0EDE8] rounded-sm overflow-hidden flex-shrink-0">
                  <img src={selectedProduct.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold">{selectedProduct.name}</h3>
                  <p className="text-[10px] text-black/50 mt-0.5">{selectedProduct.model}</p>
                  <span className="inline-block mt-1.5 text-[9px] font-semibold tracking-wider uppercase bg-black/5 px-1.5 py-0.5 rounded-sm">Matte Finish</span>
                  <p className="text-sm font-bold mt-2">${subtotal.toFixed(2)}</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-black/60">Quantity</span>
                <div className="flex items-center border border-black/20">
                  <button onClick={() => setQty(Math.max(1, qty-1))} className="w-8 h-8 flex items-center justify-center hover:bg-black/5"><Minus className="w-3 h-3" /></button>
                  <span className="w-8 h-8 flex items-center justify-center text-xs font-semibold border-x border-black/20">{qty}</span>
                  <button onClick={() => setQty(qty+1)} className="w-8 h-8 flex items-center justify-center hover:bg-black/5"><Plus className="w-3 h-3" /></button>
                </div>
              </div>

              {/* Updated Pricing */}
              <div className="space-y-2 text-xs mb-4 pb-4 border-b border-black/10">
                <div className="flex justify-between"><span className="text-black/60">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
                {isCoupon &&  <div className="flex justify-between text-green-600"><span>Discount ({appliedCoupon?.discount}%)</span><span className="font-semibold">-${discountAmount.toFixed(2)}</span></div>}
                <div className="flex justify-between"><span className="text-black/60">Shipping</span><span className={`font-semibold ${shipping === 0 ? "text-green-600" : ""}`}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between pt-2 border-t border-black/5"><span className="font-bold">Total</span><span className="text-lg font-black">${total.toFixed(2)}</span></div>
              </div>

            
              {/* <div className="flex justify-between text-sm mb-4"><span className="text-black/60">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div> */}

              {/* Coupon CTA Card */}
              <button onClick={() => transitionStep(7)} className="w-full flex items-center gap-3 p-4 mb-4 border border-dashed border-[#5B2EFF]/40 bg-[#5B2EFF]/[0.02] rounded-sm hover:bg-[#5B2EFF]/5 transition-colors text-left group">
                <div className="w-10 h-10 bg-[#5B2EFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Tag className="w-5 h-5 text-[#5B2EFF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold">Apply coupon code</p>
                  <p className="text-[10px] text-black/50 mt-0.5">Get exciting discounts!</p>
                </div>
                <ChevronRight className="w-4 h-4 text-black/30 group-hover:text-[#5B2EFF] transition-colors" />
              </button>

              {/* Free shipping */}
              <div className="flex items-start gap-2 mb-4 p-2.5 bg-[#5B2EFF]/5 rounded-sm">
                <ShoppingCart className="w-3.5 h-3.5 text-[#5B2EFF] mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-[#5B2EFF] font-semibold">You are $25.01 away from free shipping!</p>
              </div>

              {/* CTAs */}
              <Button onClick={nextStep} className="w-full bg-gradient-to-r from-[#5B2EFF] to-[#7B4FFF] text-white rounded-lg h-11 text-xs font-bold tracking-wider uppercase shadow-lg shadow-[#5B2EFF]/20">
                Buy Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full mt-2 rounded-lg h-10 text-xs font-bold tracking-wider uppercase border-black/20">
                View Cart
              </Button>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-black/10">
                {[{icon:<Shield className="w-3.5 h-3.5"/>,t:"Secure",d:"Checkout"},{icon:<RotateCcw className="w-3.5 h-3.5"/>,t:"Money-Back",d:"Guarantee"},{icon:<Headphones className="w-3.5 h-3.5"/>,t:"24/7",d:"Support"}].map(t => (
                  <div key={t.t} className="text-center"><div className="flex justify-center mb-1 text-black/40">{t.icon}</div><p className="text-[9px] font-semibold">{t.t}</p><p className="text-[8px] text-black/40">{t.d}</p></div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3: // Shipping Address
        return (
          <div className="sidebar-content h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase">Shipping Details</h2>
              <button onClick={closeSidebar} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 px-4 sm:px-5 py-4 overflow-y-auto">
              <div className="space-y-3">
                {[{label:"FULL NAME",placeholder:"Enter your full name"},{label:"PHONE NUMBER",placeholder:"Enter your phone number"},{label:"ADDRESS",placeholder:"House / Street / Area"},{label:"CITY",placeholder:"Enter your city"},{label:"PIN CODE",placeholder:"Enter pin code"}].map(field => (
                  <div key={field.label}>
                    <Label className="text-[9px] font-bold tracking-wider uppercase text-black/50 mb-1 block">{field.label}</Label>
                    <Input placeholder={field.placeholder} className="rounded-none border-black/20 h-10 text-xs focus-visible:ring-[#5B2EFF] focus-visible:ring-1" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Checkbox id="save" className="rounded-none border-black/30 data-[state=checked]:bg-[#5B2EFF] data-[state=checked]:border-[#5B2EFF]" />
                <label htmlFor="save" className="text-[10px] text-black/60">Save this address for next time</label>
              </div>
              <Button onClick={nextStep} className="w-full mt-5 bg-[#5B2EFF] hover:bg-[#4a1ee0] text-white rounded-none h-11 text-xs font-bold tracking-wider uppercase">
                Proceed to Payment <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 4: // Proceed to Payment (confirmation)
        return (
          <div className="sidebar-content h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase">Shipping Details</h2>
              <button onClick={closeSidebar} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 px-4 sm:px-5 py-4 overflow-y-auto">
              <div className="space-y-3 mb-5">
                {[{l:"Full Name",v:"Rahul Sharma"},{l:"Phone Number",v:"9876543210"},{l:"Address",v:"123, Sector 17, Chandigarh"},{l:"City",v:"Chandigarh"},{l:"Pin Code",v:"160017"}].map(f => (
                  <div key={f.l} className="pb-3 border-b border-black/5">
                    <p className="text-[9px] font-bold tracking-wider uppercase text-black/40">{f.l}</p>
                    <p className="text-xs font-semibold mt-1">{f.v}</p>
                  </div>
                ))}
              </div>
              <Button onClick={nextStep} className="w-full bg-[#5B2EFF] hover:bg-[#4a1ee0] text-white rounded-none h-11 text-xs font-bold tracking-wider uppercase">
                Proceed to Payment <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 5: // Payment Method
        return (
          <div className="sidebar-content h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase">Payment Method</h2>
              <button onClick={closeSidebar} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 px-4 sm:px-5 py-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-black/10">
                <span className="text-xs text-black/60">Amount to pay</span>
                <span className="text-sm font-bold">${(24.99 * qty).toFixed(2)}</span>
              </div>

              <p className="text-[9px] font-bold tracking-wider uppercase text-black/40 mb-2">Recommended</p>
              <div className="space-y-2 mb-4">
                {paymentMethods.map(pm => (
                  <button
                    key={pm.id}
                    onClick={() => setSelectedPayment(pm.id)}
                    className={`w-full flex items-center gap-3 p-3 border rounded-sm transition-all text-left ${selectedPayment === pm.id ? "border-[#5B2EFF] bg-[#5B2EFF]/5" : "border-black/10 hover:border-black/30"}`}
                  >
                    <div className={`${selectedPayment === pm.id ? "text-[#5B2EFF]" : "text-black/40"}`}>{pm.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold">{pm.name}</span>
                        {pm.recommended && <span className="text-[8px] bg-[#5B2EFF] text-white px-1.5 py-0.5 rounded-sm font-semibold">RECOMMENDED</span>}
                      </div>
                      <p className="text-[10px] text-black/50">{pm.desc}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${selectedPayment === pm.id ? "text-[#5B2EFF]" : "text-black/20"}`} />
                  </button>
                ))}
              </div>

              <p className="text-[9px] text-black/30 text-center mb-3">Secured by Razorpay</p>
              <Button onClick={nextStep} className="w-full bg-[#5B2EFF] hover:bg-[#4a1ee0] text-white rounded-none h-11 text-xs font-bold tracking-wider uppercase">
                Pay ${(24.99 * qty).toFixed(2)} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );

      case 6: // Success
        return (
          <div className="sidebar-content h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase">Order Confirmed</h2>
              <button onClick={closeSidebar} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 px-4 sm:px-5 py-6 overflow-y-auto text-center">
              {/* Success Animation */}
              <div className="relative w-20 h-20 mx-auto mb-5">
                <div className="absolute inset-0 bg-[#D9FF00] rounded-full" />
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-[#5B2EFF]" strokeWidth={3} />
                </div>
                {/* Confetti dots */}
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: ["#5B2EFF", "#D9FF00", "black", "#5B2EFF"][i % 4],
                      top: `${20 + Math.sin(i * 0.8) * 35}%`,
                      left: `${20 + Math.cos(i * 0.8) * 35}%`,
                    }}
                  />
                ))}
              </div>

              <h3 className="text-xl font-black tracking-tight mb-1">ORDER PLACED!</h3>
              <p className="text-xs text-black/50 mb-5">Thank you! Your order has been placed successfully.</p>

              <div className="text-left space-y-3 mb-6 p-4 bg-[#F5F5F0] rounded-sm">
                <div><p className="text-[9px] font-bold tracking-wider uppercase text-black/40">Order ID</p><p className="text-sm font-bold mt-0.5">{orderNumber}</p></div>
                <div><p className="text-[9px] font-bold tracking-wider uppercase text-black/40">Estimated Delivery</p><p className="text-sm font-bold mt-0.5">May 20 – May 23</p></div>
              </div>

              <Button onClick={() => { setStep(1); closeSidebar(); }} className="w-full bg-[#5B2EFF] hover:bg-[#4a1ee0] text-white rounded-none h-11 text-xs font-bold tracking-wider uppercase mb-2">
                Continue Shopping
              </Button>
              <Button variant="outline" className="w-full rounded-none h-10 text-xs font-bold tracking-wider uppercase border-black/20">
                View Order
              </Button>
            </div>
          </div>
        );
      case 7: // View Offers
        return (
          <div className="sidebar-content h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase">Discount</h2>
              <button onClick={() => transitionStep(2)} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 px-4 sm:px-5 py-4 overflow-y-auto">
              {/* Input */}
              <div className="flex gap-2 mb-5">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={e => { setCouponCode(e.target.value); setError(""); }}
                  className="flex-1 rounded-lg border-black/20 h-10 text-xs focus-visible:ring-[#5B2EFF] focus-visible:ring-1"
                />
                <Button onClick={() => applyCoupon(couponCode)} className="bg-[#5B2EFF] hover:bg-[#4a1ee0] text-white rounded-lg h-10 px-4 text-xs font-bold">
                  Apply
                </Button>
              </div>

              <p className="text-[10px] font-bold tracking-wider uppercase text-black/40 mb-3">Available Offers</p>
              <div className="space-y-2">
                {coupons.map(c => (
                  <div key={c.code} className="p-3 border border-black/10 rounded-lg hover:border-[#5B2EFF]/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <TicketPercent className="w-4 h-4 text-[#5B2EFF]" />
                        <span className="text-xs font-bold tracking-wide">{c.code}</span>
                      </div>
                      <button onClick={() => { setCouponCode(c.code); applyCoupon(c.code); }} className="text-[10px] font-bold text-[#5B2EFF] hover:underline">Apply</button>
                    </div>
                    <p className="text-[10px] text-black/50">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 8: // Enter Code
        return (
          <div className="sidebar-content h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase">Discount</h2>
              <button onClick={() => transitionStep(1)} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 px-4 sm:px-5 py-4 overflow-y-auto">
              <div className="flex gap-2 mb-5">
                <Input
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className="flex-1 rounded-lg border-[#5B2EFF] h-10 text-xs font-semibold tracking-wide focus-visible:ring-[#5B2EFF] focus-visible:ring-2 bg-[#5B2EFF]/[0.03]"
                  placeholder="Enter coupon code"
                />
                <Button onClick={() => applyCoupon(couponCode)} className="bg-[#5B2EFF] hover:bg-[#4a1ee0] text-white rounded-lg h-10 px-4 text-xs font-bold">
                  Apply
                </Button>
              </div>

              <p className="text-[10px] font-bold tracking-wider uppercase text-black/40 mb-3">Available Offers</p>
              <div className="space-y-2">
                {coupons.map(c => (
                  <div key={c.code} className={`p-3 border rounded-lg transition-colors ${c.code === "WELCOME10" ? "border-[#5B2EFF] bg-[#5B2EFF]/[0.04]" : "border-black/10"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <TicketPercent className={`w-4 h-4 ${c.code === "WELCOME10" ? "text-[#5B2EFF]" : "text-black/30"}`} />
                        <span className={`text-xs font-bold tracking-wide ${c.code === "WELCOME10" ? "text-[#5B2EFF]" : ""}`}>{c.code}</span>
                      </div>
                      <button onClick={() => { setCouponCode(c.code); }} className="text-[10px] font-bold text-[#5B2EFF]">
                        {c.code === "WELCOME10" ? "Selected" : "Apply"}
                      </button>
                    </div>
                    <p className="text-[10px] text-black/50">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 9: // Offers List
        return (
          <div className="sidebar-content h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase">Available Offers</h2>
              <button onClick={() => transitionStep(1)} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 px-4 sm:px-5 py-4 overflow-y-auto">
              <div className="space-y-3">
                {coupons.map((c, i) => (
                  <div key={c.code} className="relative p-4 border border-black/10 rounded-lg hover:border-[#5B2EFF]/30 transition-all">
                    {i === 1 && (
                      <span className="absolute -top-2 left-4 bg-[#5B2EFF] text-white text-[8px] font-bold px-2 py-0.5 rounded-sm tracking-wider">BEST DEAL</span>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#5B2EFF]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <TicketPercent className="w-5 h-5 text-[#5B2EFF]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold">{c.code}</h4>
                        <p className="text-[10px] text-black/50 mt-0.5">{c.desc}</p>
                        <button onClick={() => { setCouponCode(c.code); applyCoupon(c.code); }} className="mt-2 text-[10px] font-bold text-[#5B2EFF] border border-[#5B2EFF] px-3 py-1 rounded-sm hover:bg-[#5B2EFF] hover:text-white transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-black/10">
                <p className="text-[10px] font-bold tracking-wider uppercase text-black/40 mb-2">Have a coupon code?</p>
                <div className="flex gap-2">
                  <Input placeholder="Enter code" className="flex-1 rounded-lg border-black/20 h-10 text-xs" />
                  <Button className="bg-[#5B2EFF] hover:bg-[#4a1ee0] text-white rounded-lg h-10 px-4 text-xs font-bold">Apply</Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 10: // Invalid Code
        return (
          <div className="sidebar-content h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase">Discount</h2>
              <button onClick={() => transitionStep(1)} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 px-4 sm:px-5 py-4 overflow-y-auto">
              {/* Error Card */}
              <div className="p-4 mb-4 border border-red-300 bg-red-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-red-700">Invalid coupon code</p>
                    <p className="text-[10px] text-red-500 mt-0.5">{error || "Please try a valid coupon code."}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-5">
                <Input
                  value={couponCode}
                  onChange={e => { setCouponCode(e.target.value); setError(""); }}
                  className="flex-1 rounded-lg border-red-300 h-10 text-xs focus-visible:ring-red-400"
                  placeholder="Try another code"
                />
                <Button onClick={() => applyCoupon(couponCode)} className="bg-[#5B2EFF] hover:bg-[#4a1ee0] text-white rounded-lg h-10 px-4 text-xs font-bold">
                  Apply
                </Button>
              </div>

              <p className="text-[10px] font-bold tracking-wider uppercase text-black/40 mb-3">Try these offers</p>
              <div className="space-y-2">
                {coupons.map(c => (
                  <button key={c.code} onClick={() => { setCouponCode(c.code); applyCoupon(c.code); }} className="w-full flex items-center justify-between p-3 border border-black/10 rounded-lg hover:border-[#5B2EFF]/30 transition-colors text-left">
                    <div>
                      <span className="text-xs font-bold">{c.code}</span>
                      <p className="text-[10px] text-black/50">{c.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-black/20" />
                  </button>
                ))}
              </div>

              {/* Keep cart buttons */}
              <div className="mt-5 pt-4 border-t border-black/10">
                <Button className="w-full bg-gradient-to-r from-[#5B2EFF] to-[#7B4FFF] text-white rounded-lg h-11 text-xs font-bold tracking-wider uppercase">
                  Buy Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full mt-2 rounded-lg h-10 text-xs font-bold tracking-wider uppercase border-black/20">
                  View Cart
                </Button>
              </div>
            </div>
          </div>
        );

      case 11: // Coupon Applied
        return (
          <div className="sidebar-content h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase">Your Cart</h2>
              <button onClick={closeSidebar} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 px-4 sm:px-5 py-4 overflow-y-auto">
              {/* Success Card */}
              <div className="p-4 mb-4 border border-green-300 bg-green-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-700">{appliedCoupon?.code}</p>
                    <p className="text-[10px] text-green-600 mt-0.5">{appliedCoupon?.discount}% OFF applied</p>
                  </div>
                </div>
              </div>

              {/* Product */}
              <div className="flex gap-3 mb-4 pb-4 border-b border-black/10">
                <div className="w-16 h-20 bg-[#F0EDE8] rounded-sm overflow-hidden flex-shrink-0">
                  <img src={selectedProduct.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold">{selectedProduct.name}</h3>
                  <p className="text-[10px] text-black/50 mt-0.5">{selectedProduct.model}</p>
                  <span className="inline-block mt-1.5 text-[9px] font-semibold tracking-wider uppercase bg-black/5 px-1.5 py-0.5 rounded-sm">Matte Finish</span>
                </div>
              </div>

              {/* Updated Pricing */}
              <div className="space-y-2 text-xs mb-4 pb-4 border-b border-black/10">
                <div className="flex justify-between"><span className="text-black/60">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-green-600"><span>Discount ({appliedCoupon?.discount}%)</span><span className="font-semibold">-${discountAmount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-black/60">Shipping</span><span className={`font-semibold ${shipping === 0 ? "text-green-600" : ""}`}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between pt-2 border-t border-black/5"><span className="font-bold">Total</span><span className="text-lg font-black">${total.toFixed(2)}</span></div>
              </div>

              {/* CTAs */}
              <Button className="w-full bg-gradient-to-r from-[#5B2EFF] to-[#7B4FFF] text-white rounded-lg h-11 text-xs font-bold tracking-wider uppercase shadow-lg shadow-[#5B2EFF]/20">
                Buy Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full mt-2 rounded-lg h-10 text-xs font-bold tracking-wider uppercase border-black/20">
                View Cart
              </Button>

              <button onClick={() => { setAppliedCoupon(null); setCouponCode(""); transitionStep(2); }} className="w-full text-center mt-3 text-[10px] text-black/40 hover:text-[#5B2EFF] transition-colors">
                Remove coupon
              </button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-[#6C4DFF] selection:text-white overflow-x-hidden">
      {/* Grain Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ==================== STICKY HEADER / NAVBAR ==================== */}
      <header 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5" 
            : "bg-white/90 backdrop-blur-md border-b border-black/5"
        }`}
      >
        {/* Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-[#6C4DFF] transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
        
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between">
          <a href="#" className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
            SKIN STUDIO
          </a>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {["SHOP", "COLLECTIONS", "CUSTOM", "ABOUT"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] lg:text-[11px] font-semibold tracking-[0.15em] uppercase text-black/70 hover:text-black transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#6C4DFF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="p-1.5 sm:p-2 hover:bg-black/5 rounded-full transition-colors duration-300">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button className="p-1.5 sm:p-2 hover:bg-black/5 rounded-full transition-colors duration-300">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button className="p-1.5 sm:p-2 hover:bg-black/5 rounded-full transition-colors duration-300 relative">
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#6C4DFF] rounded-full" />
            </button>
          </div>
        </nav>
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-14 sm:h-16" />

      {/* ==================== PAGE HEADER ==================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="breadcrumb text-[10px] sm:text-xs text-black/40 tracking-wider uppercase mb-3 sm:mb-4">
          HOME / SHOP
        </div>
        
        <div className="page-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tight">
              <span className="block">ALL</span>
              <span className="block text-[#6C4DFF]">SKINS</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-black/50">
              Showing {products.length} of {totalProducts} products
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs text-black/40 uppercase tracking-wider">Sort by:</span>
            <button className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider border border-black/20 px-3 sm:px-4 py-2 hover:border-black transition-colors duration-300">
              Newest
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT GRID ==================== */}
      <section ref={gridRef} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-6 sm:pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#6C4DFF]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card group cursor-pointer"
                onClick={() => openSidebar(product,1)}
              >
                <div className="relative bg-[#F0EDE8] rounded-sm overflow-hidden aspect-[3/4] hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-40 sm:w-24 sm:h-48 lg:w-28 lg:h-56 bg-black rounded-[1.2rem] sm:rounded-[1.5rem] p-1 sm:p-1.5 shadow-lg transform rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500">
                      <div className="w-full h-full bg-white rounded-[1rem] sm:rounded-[1.3rem] overflow-hidden relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-3 sm:h-4 bg-black rounded-b-lg z-10" />
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 sm:top-5 left-2 sm:left-2.5 w-5 h-5 sm:w-6 sm:h-6 bg-black rounded-md sm:rounded-lg z-10 flex items-center justify-center">
                          <div className="grid grid-cols-2 gap-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                
                <div className="mt-2 sm:mt-3 px-1">
                  <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase">{product.name}</h3>
                  <p className="text-[10px] sm:text-xs text-black/40 mt-0.5">{product.category}</p>
                  <p className="text-xs sm:text-sm font-semibold mt-1">₹ {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ==================== PAGINATION ==================== */}
      <section ref={paginationRef} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/10">
          <p className="text-[10px] sm:text-xs text-black/40 tracking-wider">
            Page {currentPage} of {totalPages} — {totalProducts} products total
          </p>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xs text-black/40">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page)}
                    disabled={isLoading}
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                      currentPage === page
                        ? "bg-[#6C4DFF] text-white border-[#6C4DFF]"
                        : "border-black/20 hover:border-black hover:bg-black hover:text-white"
                    } disabled:opacity-50`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-black"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== SLIDING SIDEBAR OVERLAY ==================== */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 z-40 opacity-0 pointer-events-none"
        onClick={closeSidebar}
      />

      {/* ==================== RIGHT SLIDING SIDEBAR ==================== */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] lg:w-[480px] bg-white z-50 shadow-2xl transform translate-x-full overflow-y-auto"
      >
        {selectedProduct && (
          <div className="h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-6 py-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs sm:text-sm font-bold tracking-[0.15em] uppercase">
                Select Your Device
              </h2>
              <button
                onClick={closeSidebar}
                className="p-2 hover:bg-black/5 rounded-full transition-colors duration-300"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
             {renderSidebarContent()}
          </div>
        )}
      </div>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-black text-white py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-4 sm:mb-6">SKIN STUDIO</h3>
              <p className="text-[10px] sm:text-xs text-white/50 leading-relaxed">
                Premium back skins for the modern generation. Express yourself beyond the screen.
              </p>
            </div>
            
            <div>
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase mb-3 sm:mb-4">SHOP</h4>
              <ul className="space-y-2 sm:space-y-3">
                {["All Skins", "Collections", "Custom", "New Arrivals"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[10px] sm:text-xs text-white/50 hover:text-white transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase mb-3 sm:mb-4">SUPPORT</h4>
              <ul className="space-y-2 sm:space-y-3">
                {["FAQ", "Shipping", "Returns", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[10px] sm:text-xs text-white/50 hover:text-white transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase mb-3 sm:mb-4">SOCIAL</h4>
              <ul className="space-y-2 sm:space-y-3">
                {["Instagram", "Twitter", "TikTok", "YouTube"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[10px] sm:text-xs text-white/50 hover:text-white transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-[9px] sm:text-[10px] text-white/30 tracking-wider">© 2026 SKIN STUDIO. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4 sm:gap-6">
              {["PRIVACY", "TERMS", "COOKIES"].map((item) => (
                <a key={item} href="#" className="text-[9px] sm:text-[10px] text-white/30 hover:text-white/60 transition-colors duration-300 tracking-wider">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}