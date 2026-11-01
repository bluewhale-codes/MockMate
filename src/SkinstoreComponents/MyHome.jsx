import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingCart, Search, User, ArrowRight, Star, Shield, Sparkles, Gem, Heart, ArrowUpRight, X, Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG DECORATIONS ─── */
const PaintStroke = ({ className, color = "#1748FF" }) => (
  <svg viewBox="0 0 300 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 40C30 15 80 5 150 8C220 11 270 20 290 35C295 38 292 45 285 48C260 58 200 65 150 68C80 72 30 62 12 48C5 43 5 42 10 40Z" fill={color} />
  </svg>
);

const Scribble = ({ className, color = "#111111" }) => (
  <svg viewBox="0 0 100 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 10C15 2 30 18 45 8C60 2 75 16 90 10C95 8 98 12 95 14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const DoodleStar = ({ className, color = "#FF2D6F" }) => (
  <svg viewBox="0 0 40 40" className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 0L23 15L38 20L23 25L20 40L17 25L2 20L17 15L20 0Z" />
  </svg>
);

const DoodleCross = ({ className, color = "#111111" }) => (
  <svg viewBox="0 0 30 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5L25 25M25 5L5 25" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const DoodleArrow = ({ className, color = "#111111" }) => (
  <svg viewBox="0 0 60 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 20C20 5 35 35 50 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M45 15L50 20L45 25" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HalftoneDots = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="halftone" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="2" fill="#111111" opacity="0.08" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#halftone)" />
  </svg>
);

const SprayTexture = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
    <rect width="200" height="200" filter="url(#noise)" opacity="0.15" />
  </svg>
);

const CircularStamp = ({ text, className }) => (
  <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <path id="circlePath" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
    </defs>
    <circle cx="60" cy="60" r="55" fill="none" stroke="#111111" strokeWidth="2" strokeDasharray="4 4" />
    <text fill="#111111" fontSize="11" fontWeight="700" letterSpacing="3">
      <textPath href="#circlePath">{text}</textPath>
    </text>
    <circle cx="60" cy="60" r="20" fill="#111111" />
    <path d="M52 60L58 66L70 54" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── DATA ─── */
const collections = [
  { name: "Minimal", count: "18+", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=500&fit=crop", color: "#F5F5F5", accent: "#111" },
  { name: "Anime", count: "24+", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=500&fit=crop", color: "#FF2D6F", accent: "#fff" },
  { name: "Marble", count: "20+", image: "https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?w=400&h=500&fit=crop", color: "#1748FF", accent: "#fff" },
  { name: "Gaming", count: "30+", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=500&fit=crop", color: "#111111", accent: "#fff" },
  { name: "Abstract", count: "28+", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=500&fit=crop", color: "#FFD700", accent: "#111" },
];

const bestsellers = [
  { name: "Black Marble", device: "iPhone 15 Pro", price: "₹499", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=380&fit=crop", isNew: true },
  { name: "Neon Waves", device: "iPhone 15 Pro Max", price: "₹499", image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=300&h=380&fit=crop", isNew: true },
  { name: "Carbon Fiber", device: "OnePlus 12", price: "₹499", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=380&fit=crop", isNew: true },
  { name: "Pastel Swirl", device: "Galaxy S24 Ultra", price: "₹499", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&h=380&fit=crop", isNew: true },
  { name: "Graffiti Pop", device: "iPhone 14 Pro", price: "₹499", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=300&h=380&fit=crop", isNew: true },
];

const features = [
  { icon: Shield, title: "Premium Quality", desc: "High-grade vinyl that lasts." },
  { icon: Sparkles, title: "Easy To Apply", desc: "Bubble-free installation." },
  { icon: Gem, title: "Scratch & Fade Resistant", desc: "Built for everyday protection." },
  { icon: Heart, title: "Made In India", desc: "Designed with ♥, crafted with pride." },
];

/* ─── PHONE MOCKUP COMPONENT ─── */
const PhoneMockup = ({ skinUrl, className, style }) => (
  <div className={`relative ${className}`} style={style}>
    <div className="relative w-48 h-96 md:w-56 md:h-[28rem] bg-black rounded-[2.5rem] p-2 shadow-2xl">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
      <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
        <img src={skinUrl} alt="Phone skin" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full" />
    </div>
  </div>
);

/* ─── ANIMATED SECTION WRAPPER ─── */
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── MAIN COMPONENT ─── */
export default function MyHome() {
  const [cartCount, setCartCount] = useState(2);
  const heroRef = useRef(null);
  const phone1Ref = useRef(null);
  const phone2Ref = useRef(null);
  const featuresRef = useRef(null);
  const collectionsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero phones float animation
      gsap.to(phone1Ref.current, {
        y: -15,
        rotation: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(phone2Ref.current, {
        y: -20,
        rotation: -2,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // Features scroll animation
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // Collections scroll animation
      gsap.from(".collection-card", {
        scrollTrigger: {
          trigger: collectionsRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const addToCart = () => setCartCount((c) => c + 1);

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#111111] font-sans overflow-x-hidden">
      {/* ─── NAVBAR ─── */}
      <nav className="sticky top-0 z-50 bg-[#F8F7F3]/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="bg-[#111] text-white font-black text-xs px-3 py-2 rounded-lg transform -rotate-2 border-2 border-[#FF2D6F]">
                  SKIN<br />STUDIO
                </div>
                <DoodleStar className="absolute -top-2 -right-2 w-4 h-4" color="#1748FF" />
              </div>
            </div>

            {/* Center Nav */}
            <div className="hidden md:flex items-center gap-8">
              {["Shop", "Collections", "Custom Skins", "About Us", "Track Order"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\\s/g, "-")}`}
                  className="text-sm font-semibold tracking-wide hover:text-[#1748FF] transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1748FF] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3 md:gap-5">
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors hidden sm:block">
                <User className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 bg-[#111] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#1748FF] transition-colors">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">CART</span>
                <span className="bg-[#FF2D6F] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section ref={heroRef} className="relative overflow-hidden py-12 md:py-20 lg:py-28">
        {/* Background Decorations */}
        <HalftoneDots className="absolute top-20 right-10 w-32 h-32 opacity-40" />
        <HalftoneDots className="absolute bottom-20 left-10 w-24 h-24 opacity-30" />
        <DoodleCross className="absolute top-32 right-1/3 w-6 h-6 opacity-30" />
        <DoodleStar className="absolute bottom-40 left-1/4 w-5 h-5 opacity-40" color="#1748FF" />
        <Scribble className="absolute top-10 left-1/2 w-20 opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative"
            >
              {/* New Drop Badge */}
              <div className="inline-flex items-center gap-2 bg-[#111] text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 transform -rotate-1">
                <span className="w-2 h-2 bg-[#FF2D6F] rounded-full animate-pulse" />
                NEW DROP
              </div>

              {/* Headline */}
              <div className="relative mb-8">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter">
                  DESIGN.
                  <br />
                  PROTECT.
                  <br />
                  <span className="relative inline-block">
                    <PaintStroke className="absolute -inset-3 w-[120%] h-[140%] -z-10" color="#1748FF" />
                    <span className="text-white relative z-10">EXPRESS.</span>
                  </span>
                </h1>
                <DoodleArrow className="absolute -right-4 top-0 w-12 h-8 opacity-60" />
                <DoodleCross className="absolute -left-6 top-1/2 w-5 h-5" color="#FF2D6F" />
              </div>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-black/70 max-w-md mb-8 leading-relaxed">
                Premium mobile skins made to match your vibe.
                <br />
                Style your device. <span className="text-[#FF2D6F] font-bold underline decoration-2 underline-offset-4">Your way.</span>
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#1748FF] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider flex items-center gap-2 shadow-lg shadow-[#1748FF]/30 hover:shadow-xl hover:shadow-[#1748FF]/40 transition-shadow"
                >
                  SHOP NOW
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border-2 border-[#111] text-[#111] px-8 py-4 rounded-full font-bold text-sm tracking-wider flex items-center gap-2 hover:bg-[#111] hover:text-white transition-colors"
                >
                  EXPLORE
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Doodles around text */}
              <Scribble className="absolute -bottom-4 left-20 w-16 opacity-40" color="#FF2D6F" />
            </motion.div>

            {/* RIGHT SIDE - PHONES */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative flex justify-center items-center min-h-[400px] md:min-h-[500px]"
            >
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }} />
              </div>

              {/* Phone 1 - Blue Marble */}
              <div ref={phone1Ref} className="absolute left-4 md:left-8 top-8 z-20">
                <PhoneMockup
                  skinUrl="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=800&fit=crop"
                  className="transform -rotate-6"
                />
                <div className="absolute -top-4 -right-4 bg-[#FF2D6F] text-white text-xs font-black px-3 py-1 rounded-full transform rotate-12">
                  HOT
                </div>
              </div>

              {/* Phone 2 - Black Graffiti */}
              <div ref={phone2Ref} className="absolute right-4 md:right-8 top-16 z-10">
                <PhoneMockup
                  skinUrl="https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=800&fit=crop"
                  className="transform rotate-6"
                />
                <div className="absolute -bottom-2 -left-6 bg-[#111] text-white text-[10px] font-bold px-2 py-1 rounded border-2 border-[#FF2D6F] transform -rotate-6">
                  STREET ART
                </div>
              </div>

              {/* Paint Splashes */}
              <div className="absolute top-0 right-1/4 w-24 h-24 bg-[#1748FF] rounded-full blur-3xl opacity-20" />
              <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-[#FF2D6F] rounded-full blur-3xl opacity-20" />

              {/* Sticker Badge */}
              <div className="absolute bottom-4 right-8 transform rotate-12">
                <div className="bg-white border-2 border-[#111] px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-[10px] font-black tracking-widest">NOT JUST A SKIN.</p>
                  <p className="text-xs font-black">IT'S YOUR STYLE.</p>
                </div>
              </div>

              {/* Circular Stamp */}
              <div className="absolute top-4 right-1/4">
                <CircularStamp text="BUILT TO PROTECT • MADE TO EXPRESS • " className="w-20 h-20 animate-spin" style={{ animationDuration: "20s" }} />
              </div>

              {/* Doodles */}
              <DoodleStar className="absolute top-1/4 left-0 w-6 h-6" color="#FF2D6F" />
              <DoodleCross className="absolute bottom-1/4 right-0 w-5 h-5" />
              <DoodleArrow className="absolute top-0 left-1/3 w-10 h-6 transform rotate-45" color="#1748FF" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURE BAR ─── */}
      <section ref={featuresRef} className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-black/5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="feature-card flex items-start gap-4 group">
                  <div className={`p-3 rounded-2xl ${
                    idx === 0 ? "bg-[#1748FF]/10 text-[#1748FF]" :
                    idx === 1 ? "bg-[#FF2D6F]/10 text-[#FF2D6F]" :
                    idx === 2 ? "bg-[#111]/10 text-[#111]" :
                    "bg-[#FFD700]/10 text-[#FFD700]"
                  }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base mb-1">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-black/60 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS SECTION ─── */}
      <section ref={collectionsRef} className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10 md:mb-14">
              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                  EXPLORE <span className="text-[#1748FF]">COLLECTIONS</span>
                </h2>
                <DoodleArrow className="absolute -right-8 -top-2 w-8 h-5" color="#FF2D6F" />
              </div>
              <a href="#" className="hidden md:flex items-center gap-2 text-sm font-bold hover:text-[#1748FF] transition-colors group">
                VIEW ALL
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {collections.map((col, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                className="collection-card group cursor-pointer"
              >
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[3/4] mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-black text-lg md:text-xl">{col.name}</h3>
                    <p className="text-white/80 text-xs md:text-sm font-medium">{col.count} Skins</p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BESTSELLERS SECTION ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10 md:mb-14">
              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                  BESTSELLERS
                </h2>
                <Scribble className="absolute -right-6 bottom-0 w-12" color="#FF2D6F" />
              </div>
              <a href="#" className="hidden md:flex items-center gap-2 text-sm font-bold hover:text-[#1748FF] transition-colors group">
                VIEW ALL
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {bestsellers.map((product, idx) => (
              <AnimatedSection key={idx}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#F8F7F3] aspect-[3/4] mb-3 shadow-sm group-hover:shadow-lg transition-shadow">
                    {product.isNew && (
                      <div className="absolute top-3 left-3 z-10 bg-[#FF2D6F] text-white text-[10px] font-black px-2 py-1 rounded-full">
                        NEW
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={addToCart}
                      className="absolute bottom-3 right-3 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 hover:bg-[#1748FF] hover:text-white"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="px-1">
                    <h3 className="font-bold text-sm md:text-base mb-0.5">{product.name}</h3>
                    <p className="text-xs text-black/50 mb-1.5">{product.device}</p>
                    <p className="font-black text-sm md:text-base">{product.price}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CUSTOM SKIN SECTION ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-[#1748FF]">
              <SprayTexture className="absolute inset-0 w-full h-full opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1748FF] via-[#1748FF] to-[#0a2eb5]" />

              <div className="relative grid lg:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16">
                {/* LEFT */}
                <div className="flex flex-col justify-center">
                  <div className="relative inline-block mb-4">
                    <DoodleStar className="absolute -top-4 -left-4 w-6 h-6" color="#FFD700" />
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
                      CREATE
                      <br />
                      YOUR OWN
                      <br />
                      <span className="relative inline-block">
                        <span className="relative z-10">CUSTOM SKIN</span>
                        <div className="absolute bottom-1 left-0 w-full h-3 bg-[#FF2D6F] -z-0" />
                      </span>
                    </h2>
                  </div>
                  <p className="text-white/80 text-lg md:text-xl mb-8 max-w-sm">
                    Your phone. Your design. Your vibe.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#111] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider flex items-center gap-2 w-fit shadow-lg hover:bg-white hover:text-[#111] transition-colors"
                  >
                    START CUSTOMIZING
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* RIGHT - Phone Mockup with Toolbar */}
                <div className="relative flex justify-center items-center">
                  <div className="relative">
                    {/* Phone */}
                    <div className="relative w-44 h-88 md:w-52 md:h-[26rem] bg-black rounded-[2.5rem] p-2 shadow-2xl transform rotate-3">
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
                      <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-white">
                        <div className="w-full h-full" style={{
                          background: "repeating-conic-gradient(#111 0% 25%, #fff 0% 50%) 50% / 20px 20px"
                        }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border-4 border-[#1748FF] flex items-center justify-center">
                            <SmileIcon className="w-8 h-8 text-[#1748FF]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Toolbar */}
                    <div className="absolute -right-4 top-1/4 bg-white rounded-2xl p-3 shadow-xl space-y-3">
                      {[
                        { icon: "T", label: "TEXT" },
                        { icon: <Star className="w-4 h-4" />, label: "STICKERS" },
                        { icon: <HexagonIcon className="w-4 h-4" />, label: "SHAPES" },
                        { icon: <Plus className="w-4 h-4" />, label: "UPLOAD" },
                      ].map((tool, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 cursor-pointer hover:text-[#1748FF] transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-[#F8F7F3] flex items-center justify-center text-xs font-bold">
                            {tool.icon}
                          </div>
                          <span className="text-[8px] font-bold">{tool.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Color Swatches */}
                    <div className="absolute -right-2 bottom-1/4 flex flex-col gap-2">
                      {["#111111", "#1748FF", "#FF2D6F", "#FFD700", "#FFFFFF"].map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-125 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* 100% UNIQUE Badge */}
                    <div className="absolute -bottom-4 -right-8 transform -rotate-12">
                      <div className="bg-[#FF2D6F] text-white px-4 py-3 rounded-2xl shadow-lg relative">
                        <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#FF2D6F] rounded-full" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#FF2D6F] rounded-full" />
                        <p className="text-xl font-black leading-none">100%</p>
                        <p className="text-sm font-black">UNIQUE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#111] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="bg-white text-[#111] font-black text-xs px-3 py-2 rounded-lg transform -rotate-2 border-2 border-[#FF2D6F] inline-block mb-4">
                SKIN<br />STUDIO
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Premium mobile skins designed to protect and express your unique style.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm tracking-wider">SHOP</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">All Skins</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Skins</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bestsellers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm tracking-wider">SUPPORT</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm tracking-wider">CONNECT</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs">© 2026 Skin Studio. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-white/40">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── ICON HELPERS ─── */
function SmileIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function HexagonIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  );
}