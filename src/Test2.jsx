import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../src/Component/ui/button";
import { Input } from "../src/Component/ui/input";
import { Label } from "../src/Component/ui/label";
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
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   SKIN STUDIO - Product Browser + Configurator Sidebar
   Tech: React + Tailwind CSS + shadcn/ui + GSAP
   ============================================================ */

const ALL_PRODUCTS = [
  { id: 1, name: "Minimal Lines", category: "Minimal", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779652440/Gemini_Generated_Image_e3ah18e3ah18e3ah_1_kriqgw.png", price: "$24.99" },
  { id: 2, name: "Art Splash", category: "Artistic", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779650793/Gemini_Generated_Image_eflbkgeflbkgeflb_1_1_phclay.png", price: "$29.99" },
  { id: 3, name: "Black Marble", category: "Textured", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779651078/Gemini_Generated_Image_nmk1qinmk1qinmk1_1_iv2v4k.png", price: "$27.99" },
  { id: 4, name: "Concrete", category: "Industrial", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779650608/Gemini_Generated_Image_9rp5cn9rp5cn9rp5_r3iude.png", price: "$22.99" },
  { id: 5, name: "Pastel Waves", category: "Abstract", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779647194/Gemini_Generated_Image_g7ujdeg7ujdeg7uj_jqncif.png", price: "$26.99" },
  { id: 6, name: "Neon Abstract", category: "Streetwear", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779647044/Gemini_Generated_Image_r256mgr256mgr256_bj7qtn.png", price: "$28.99" },
  { id: 7, name: "Carbon Fiber", category: "Tech", image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779635006/Gemini_Generated_Image_60qfr960qfr960qf_1_mbvgdz.png", price: "$32.99" },
  { id: 8, name: "Wood Grain", category: "Natural", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=500&fit=crop", price: "$25.99" },
  { id: 9, name: "Geometric Black", category: "Minimal", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=500&fit=crop", price: "$23.99" },
  { id: 10, name: "Urban Camo", category: "Streetwear", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=500&fit=crop", price: "$26.99" },
  { id: 11, name: "Purple Matte", category: "Solid", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=500&fit=crop", price: "$24.99" },
  { id: 12, name: "White Marble", category: "Luxury", image: "https://images.unsplash.com/photo-1566228451963-19e6e1d06e8c?w=400&h=500&fit=crop", price: "$29.99" },
  { id: 13, name: "Electric Grid", category: "Tech", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop", price: "$31.99" },
  { id: 14, name: "Rose Gold", category: "Luxury", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=500&fit=crop", price: "$34.99" },
  { id: 15, name: "Tropical Leaf", category: "Natural", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=500&fit=crop", price: "$25.99" },
  { id: 16, name: "Cyber Punk", category: "Streetwear", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&h=500&fit=crop", price: "$30.99" },
  { id: 17, name: "Sandstone", category: "Textured", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop", price: "$23.99" },
  { id: 18, name: "Ocean Blue", category: "Abstract", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=500&fit=crop", price: "$26.99" },
  { id: 19, name: "Leather Brown", category: "Luxury", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=500&fit=crop", price: "$35.99" },
  { id: 20, name: "Matrix Code", category: "Tech", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop", price: "$29.99" },
  { id: 21, name: "Sunset Gradient", category: "Abstract", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=500&fit=crop", price: "$27.99" },
  { id: 22, name: "Brushed Metal", category: "Industrial", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop", price: "$33.99" },
  { id: 23, name: "Floral Pattern", category: "Artistic", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=500&fit=crop", price: "$24.99" },
  { id: 24, name: "Matte Black", category: "Solid", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=500&fit=crop", price: "$21.99" },
];

const PRODUCTS_PER_PAGE = 12;

const brands = [
  { value: "apple", label: "Apple", icon: "🍎" },
  { value: "samsung", label: "Samsung", icon: "📱" },
  { value: "oneplus", label: "OnePlus", icon: "📲" },
  { value: "pixel", label: "Pixel", icon: "📳" },
];

const models = {
  apple: ["iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro", "iPhone 14"],
  samsung: ["Galaxy S24 Ultra", "Galaxy S24", "Galaxy Z Flip 5"],
  oneplus: ["OnePlus 12", "OnePlus 11", "OnePlus Open"],
  pixel: ["Pixel 8 Pro", "Pixel 8", "Pixel 7a"],
};

export default function Test2() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("apple");
  const [selectedModel, setSelectedModel] = useState("iPhone 15 Pro");
  const [saved, setSaved] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(ALL_PRODUCTS.slice(0, PRODUCTS_PER_PAGE));
  const [isLoading, setIsLoading] = useState(false);
  const [totalProducts] = useState(ALL_PRODUCTS.length);
  
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

  const openSidebar = (product) => {
    setSelectedProduct(product);
    setSidebarOpen(true);
    setSaved(false);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card group cursor-pointer"
                onClick={() => openSidebar(product)}
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
                  <p className="text-xs sm:text-sm font-semibold mt-1">{product.price}</p>
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

            <div className="flex-1 px-4 sm:px-6 py-6">
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