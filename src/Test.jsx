import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../src/Component/ui/Button";
import { Search, User, ShoppingCart, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   SKIN STUDIO - Premium Mobile Back Skin eCommerce Landing Page
   Tech: React + Tailwind CSS + shadcn/ui + GSAP
   ============================================================ */

export default function Test() {
  const heroRef = useRef(null);
  const collectionsRef = useRef(null);
  const customRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.from(".hero-tag", { opacity: 0, y: 20, duration: 0.8, delay: 0.2, ease: "power3.out" });
      gsap.from(".hero-title-1", { opacity: 0, y: 40, duration: 1, delay: 0.4, ease: "power3.out" });
      gsap.from(".hero-title-2", { opacity: 0, y: 40, duration: 1, delay: 0.6, ease: "power3.out" });
      gsap.from(".hero-desc", { opacity: 0, y: 20, duration: 0.8, delay: 0.8, ease: "power3.out" });
      gsap.from(".hero-cta", { opacity: 0, y: 20, duration: 0.8, delay: 1, ease: "power3.out" });
      gsap.from(".hero-social", { opacity: 0, y: 20, duration: 0.8, delay: 1.2, ease: "power3.out" });
      gsap.from(".hero-phone", { opacity: 0, x: 60, rotation: 5, duration: 1.2, delay: 0.6, ease: "power3.out" });
      gsap.from(".hero-curved-text", { opacity: 0, rotation: -30, duration: 1.4, delay: 1, ease: "power3.out" });
      gsap.from(".hero-blob", { opacity: 0, scale: 0.8, duration: 1.2, delay: 0.8, ease: "power3.out" });
      gsap.from(".hero-star", { opacity: 0, scale: 0, rotation: -180, duration: 1, delay: 1.4, ease: "back.out(1.7)" });

      // Feature strip animation
      gsap.from(".feature-item", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
        },
      });

      // Collections animation
      gsap.from(".collections-header", { opacity: 0, x: -40, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: collectionsRef.current, start: "top 80%" } });
      gsap.from(".collection-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: collectionsRef.current, start: "top 75%" },
      });

      // Custom section animation
      gsap.from(".custom-image", { opacity: 0, x: -60, duration: 1, ease: "power3.out", scrollTrigger: { trigger: customRef.current, start: "top 75%" } });
      gsap.from(".custom-content", { opacity: 0, x: 40, duration: 1, ease: "power3.out", scrollTrigger: { trigger: customRef.current, start: "top 75%" } });
      gsap.from(".custom-star", { opacity: 0, scale: 0, rotation: 180, duration: 1, delay: 0.5, ease: "back.out(1.7)", scrollTrigger: { trigger: customRef.current, start: "top 75%" } });
    });

    return () => ctx.revert();
  }, []);

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

      {/* ==================== HEADER / NAVBAR ==================== */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/5">
        <nav className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-sm font-bold tracking-[0.2em] uppercase">
            SKIN STUDIO
          </a>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {["SHOP", "COLLECTIONS", "CUSTOM", "ABOUT"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] font-semibold tracking-[0.15em] uppercase text-black/70 hover:text-black transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#6C4DFF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors duration-300">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors duration-300">
              <User className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors duration-300 relative">
              <ShoppingCart className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#6C4DFF] rounded-full" />
            </button>
          </div>
        </nav>
      </header>

      {/* ==================== HERO SECTION ==================== */}
      <section ref={heroRef} className="relative max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <p className="hero-tag text-[#6C4DFF] text-xs font-bold tracking-[0.2em] uppercase mb-6">
              DESIGN IT. PROTECT IT.
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight">
              <span className="hero-title-1 block">EXPRESS YOUR</span>
              <span className="hero-title-1 block">STYLE.</span>
              <span className="hero-title-2 block text-[#6C4DFF] mt-2">BEYOND THE</span>
              <span className="hero-title-2 block text-[#6C4DFF]">SCREEN.</span>
            </h1>

            <p className="hero-desc mt-8 text-sm text-black/60 max-w-sm leading-relaxed">
              Premium back skins for your phone.
              <br />
              Style that sticks. Quality that lasts.
            </p>

            <div className="hero-cta mt-8">
              <Button
                variant="outline"
                className="group border-2 border-black bg-transparent text-black hover:bg-black hover:text-white rounded-none px-8 py-6 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
              >
                SHOP NOW
                <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </div>

            {/* Customer Avatars */}
            <div className="hero-social mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[#F5F5F0] bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="Customer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-xs font-semibold text-black/70">
                10K+ Happy Customers
              </span>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Neon Yellow Blob */}
            <div className="hero-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] z-0">
              <svg viewBox="0 0 500 500" className="w-full h-full">
                <path
                  d="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99.5,339Q40,271,62.5,190.5Q85,110,163.5,74.5Q242,39,317,71.5Q392,104,426.5,177Q461,250,440.5,320.5Z"
                  fill="#D9FF00"
                />
              </svg>
            </div>

            {/* Grid Pattern Background */}
            <div className="absolute inset-0 z-0 opacity-20">
              <svg width="100%" height="100%" className="absolute top-0 right-0 w-96 h-96">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="black" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Curved Text */}
            <div className="hero-curved-text absolute -top-4 right-8 lg:right-16 z-20 w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[7px] font-bold uppercase tracking-[0.3em] fill-black">
                  <textPath href="#circlePath">
                    QUALITY • PREMIUM • PERFECT FIT • 
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Starburst */}
            <div className="hero-star absolute bottom-20 left-10 lg:left-20 z-20 w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,0 61,35 100,35 68,57 79,91 50,70 21,91 32,57 0,35 39,35" fill="black" />
              </svg>
            </div>

            {/* Scribble Elements */}
            <svg className="absolute top-10 right-0 w-24 h-24 z-10 opacity-60" viewBox="0 0 100 100">
              <path d="M10,50 Q30,20 50,50 T90,50" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M20,60 Q40,30 60,60 T100,60" fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" />
            </svg>

            {/* Phone Mockup */}
            <div className="hero-phone relative z-10 w-[280px] sm:w-[320px] lg:w-[360px] transform rotate-[-8deg] hover:rotate-[-6deg] transition-transform duration-500">
              <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl shadow-black/20">
                {/* Phone Frame */}
                <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-20" />

                  {/* Screen Content - Statue with Purple Brush Stroke */}
                  <div className="relative w-full h-full bg-[#E8E8E8]">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-30">
                      <svg width="100%" height="100%">
                        <defs>
                          <pattern id="phoneGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#999" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#phoneGrid)" />
                      </svg>
                    </div>

                    {/* Statue Image */}
                    <img
                      src="https://images.unsplash.com/photo-1549813069-f4f3c55636f9?w=600&h=800&fit=crop&crop=face"
                      alt="Classical Statue"
                      className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
                    />

                    {/* Purple Brush Stroke */}
                    <div className="absolute top-[35%] left-0 right-0 z-10">
                      <svg viewBox="0 0 400 80" className="w-full" preserveAspectRatio="none">
                        <path
                          d="M0,40 Q50,10 100,35 T200,30 T300,45 T400,25 L400,55 Q350,70 300,50 T200,55 T100,60 T0,50Z"
                          fill="#6C4DFF"
                        />
                      </svg>
                    </div>

                    {/* Camera Cutout */}
                    <div className="absolute top-14 left-6 w-16 h-16 bg-black rounded-2xl z-20 flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#1a1a1a] ring-1 ring-[#333]" />
                        <div className="w-5 h-5 rounded-full bg-[#1a1a1a] ring-1 ring-[#333]" />
                        <div className="w-5 h-5 rounded-full bg-[#1a1a1a] ring-1 ring-[#333] col-span-2 mx-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURE STRIP ==================== */}
      <section ref={featuresRef} className="bg-black text-white py-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "PREMIUM QUALITY",
                desc: "Long lasting prints",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                ),
                title: "PERFECT FIT",
                desc: "Precision cut skins",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "EASY TO APPLY",
                desc: "Bubble-free application",
              },
              {
                icon: (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "SAME DAY DISPATCH",
                desc: "Order before 2PM",
              },
            ].map((feature, i) => (
              <div key={i} className="feature-item flex items-start gap-4">
                <div className="text-white/90 mt-0.5">{feature.icon}</div>
                <div>
                  <h3 className="text-xs font-bold tracking-[0.15em] uppercase">{feature.title}</h3>
                  <p className="text-[11px] text-white/50 mt-1">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COLLECTIONS SECTION ==================== */}
      <section ref={collectionsRef} className="py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            {/* Left Header */}
            <div className="collections-header lg:w-1/4 flex-shrink-0">
              <h2 className="text-4xl lg:text-5xl font-black leading-[0.95] tracking-tight">
                EXPLORE
                <br />
                <span className="text-[#6C4DFF]">COLLECTIONS</span>
              </h2>
              <Button
                variant="outline"
                className="group mt-8 border-2 border-black bg-transparent text-black hover:bg-black hover:text-white rounded-none px-6 py-5 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
              >
                VIEW ALL COLLECTIONS
                <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </div>

            {/* Right Cards */}
            <div className="lg:w-3/4 grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: "MINIMAL",
                  desc: "Clean. Simple. Timeless.",
                  bg: "bg-[#F0EDE8]",
                  image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779647194/Gemini_Generated_Image_g7ujdeg7ujdeg7uj_jqncif.png",
                  overlay: "bg-white/80",
                },
                {
                  title: "ARTISTIC",
                  desc: "Bold design for creative minds.",
                  bg: "bg-[#F0EDE8]",
                  image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779647044/Gemini_Generated_Image_r256mgr256mgr256_bj7qtn.png",
                  overlay: "bg-white/80",
                },
                {
                  title: "TEXTURED",
                  desc: "Feel the texture. See the difference.",
                  bg: "bg-[#F0EDE8]",
                  image: "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779635006/Gemini_Generated_Image_60qfr960qfr960qf_1_mbvgdz.png",
                  overlay: "bg-white/80",
                },
              ].map((collection, i) => (
                <div
                 
                  className={`collection-card group ${collection.bg} rounded-sm overflow-hidden cursor-pointer hover:shadow-xl `}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Phone Mockup Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-64 bg-black rounded-[2rem] p-1.5 shadow-lg transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500">
                        <div className="w-full h-full bg-white rounded-[1.7rem] overflow-hidden">
                          <img
                            src={collection.image}
                            alt={collection.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold tracking-[0.1em] uppercase">{collection.title}</h3>
                    <p className="text-xs text-black/50 mt-1">{collection.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex justify-end gap-3 mt-8 lg:hidden">
            <button className="w-10 h-10 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== CUSTOM SKIN SECTION ==================== */}
      <section ref={customRef} className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Hand Holding Phone */}
            <div className="custom-image relative">
              {/* Purple Paint Background */}
              <div className="absolute -left-10 -top-10 w-[120%] h-[120%] z-0">
                <svg viewBox="0 0 600 600" className="w-full h-full">
                  <path
                    d="M50,300 Q150,100 300,150 T500,250 T550,400 T400,500 T200,450 T50,300Z"
                    fill="#6C4DFF"
                    opacity="0.9"
                  />
                </svg>
              </div>

              {/* Torn Paper Texture */}
              <div className="absolute inset-0 z-0 opacity-40">
                <svg width="100%" height="100%" className="absolute top-0 left-0">
                  <filter id="torn">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                  </filter>
                  <rect width="100%" height="100%" fill="#E8E4DC" filter="url(#torn)" />
                </svg>
              </div>

              {/* Hand + Phone Mockup */}
              <div className="relative z-10 flex justify-center">
                <div className="relative w-[300px] lg:w-[360px]">
                  {/* Hand silhouette placeholder - using styled div */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-64 bg-gradient-to-t from-[#C4B9A8] to-[#E8E4DC] rounded-t-full opacity-80" />

                  {/* Phone */}
                  <div className="relative z-10 mx-auto w-48 bg-black rounded-[2.5rem] p-2 shadow-2xl">
                    <div className="relative bg-white rounded-[2rem] overflow-hidden aspect-[9/16]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl z-20" />

                      {/* Grid Pattern Skin */}
                      <div className="absolute inset-0 bg-[#F5F5F0]">
                        <svg width="100%" height="100%">
                          <defs>
                            <pattern id="customGrid" width="15" height="15" patternUnits="userSpaceOnUse">
                              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#DDD" strokeWidth="0.5" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#customGrid)" />
                        </svg>
                      </div>

                      {/* Camera */}
                      <div className="absolute top-10 left-4 w-12 h-12 bg-black rounded-xl z-20 flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#1a1a1a] ring-1 ring-[#333]" />
                          <div className="w-3.5 h-3.5 rounded-full bg-[#1a1a1a] ring-1 ring-[#333]" />
                          <div className="w-3.5 h-3.5 rounded-full bg-[#1a1a1a] ring-1 ring-[#333] col-span-2 mx-auto" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="custom-content relative">
              <p className="text-[#6C4DFF] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                MAKE IT YOURS
              </p>

              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-[0.95] tracking-tight">
                CUSTOM SKIN,
                <br />
                <span className="text-[#6C4DFF]">MADE BY YOU.</span>
              </h2>

              <p className="mt-8 text-sm text-black/60 max-w-sm leading-relaxed">
                Upload your design or photo and
                <br />
                we&apos;ll turn it into a custom skin.
              </p>

              <div className="mt-8">
                <Button
                  variant="outline"
                  className="group border-2 border-black bg-transparent text-black hover:bg-black hover:text-white rounded-none px-8 py-6 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
                >
                  CREATE YOUR OWN
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Starburst */}
        <div className="custom-star absolute bottom-20 right-20 lg:right-32 w-20 h-20 z-0">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,0 61,35 100,35 68,57 79,91 50,70 21,91 32,57 0,35 39,35" fill="black" />
          </svg>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-6">SKIN STUDIO</h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Premium back skins for the modern generation. Express yourself beyond the screen.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-[0.15em] uppercase mb-4">SHOP</h4>
              <ul className="space-y-3">
                {["All Skins", "Collections", "Custom", "New Arrivals"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-white/50 hover:text-white transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-[0.15em] uppercase mb-4">SUPPORT</h4>
              <ul className="space-y-3">
                {["FAQ", "Shipping", "Returns", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-white/50 hover:text-white transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-[0.15em] uppercase mb-4">SOCIAL</h4>
              <ul className="space-y-3">
                {["Instagram", "Twitter", "TikTok", "YouTube"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-white/50 hover:text-white transition-colors duration-300">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-white/30 tracking-wider">© 2026 SKIN STUDIO. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              {["PRIVACY", "TERMS", "COOKIES"].map((item) => (
                <a key={item} href="#" className="text-[10px] text-white/30 hover:text-white/60 transition-colors duration-300 tracking-wider">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}