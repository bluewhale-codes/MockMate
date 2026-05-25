import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "./Component/ui/Button";
import { Input } from "./Component/ui/input";
import {
  Search, User, ShoppingCart, X, ArrowRight, Minus, Plus,
  Shield, RotateCcw, Headphones, Tag, ChevronRight, Check,
  AlertCircle, TicketPercent
} from "lucide-react";

const products = [
  { id: 1, name: "Minimal Lines", image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=300&h=400&fit=crop", model: "iPhone 15 Pro", price: 24.99 },
  { id: 2, name: "Art Splash", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&h=400&fit=crop", model: "iPhone 15 Pro Max", price: 24.99 },
  { id: 3, name: "Black Marble", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=400&fit=crop", model: "Galaxy S24 Ultra", price: 24.99 },
  { id: 4, name: "Concrete", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop", model: "iPhone 15 Pro", price: 24.99 },
  { id: 5, name: "Pastel Waves", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&h=400&fit=crop", model: "iPhone 15 Pro Max", price: 24.99 },
  { id: 6, name: "Neon Abstract", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&h=400&fit=crop", model: "Galaxy S24 Ultra", price: 24.99 },
];

const coupons = [
  { code: "WELCOME10", desc: "10% OFF on min. order $30", discount: 10, type: "percent", minOrder: 30 },
  { code: "SKINSTUDIO15", desc: "15% OFF on min. order $60", discount: 15, type: "percent", minOrder: 60 },
  { code: "FREESHIP", desc: "Free shipping on all orders", discount: 0, type: "shipping", minOrder: 0 },
  { code: "NEWUSER20", desc: "20% OFF on min. order $80", discount: 20, type: "percent", minOrder: 80 },
];

export default function Test3() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [couponStep, setCouponStep] = useState(1);
  const [selectedProduct] = useState(products[0]);
  const [qty, setQty] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const subtotal = selectedProduct.price * qty;
  const shipping = appliedCoupon?.code === "FREESHIP" || subtotal > 50 ? 0 : 5.99;
  const discountAmount = appliedCoupon?.type === "percent" ? (subtotal * appliedCoupon.discount / 100) : 0;
  const total = subtotal + shipping - discountAmount;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  useEffect(() => {
    gsap.from(".product-card", {
      opacity: 0, y: 30, duration: 0.5, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
    });
  }, []);

  const openSidebar = (step = 1) => {
    setCouponStep(step);
    setSidebarOpen(true);
    setError("");
  };

  const closeSidebar = () => setSidebarOpen(false);

  const transitionStep = (newStep) => {
    gsap.to(".sidebar-inner", { opacity: 0, x: 20, duration: 0.2, onComplete: () => {
      setCouponStep(newStep);
      gsap.fromTo(".sidebar-inner", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 });
    }});
  };

  const applyCoupon = (code) => {
    const coupon = coupons.find(c => c.code === code.toUpperCase());
    if (!coupon) {
      setError("Invalid coupon code. Please try a valid coupon code.");
      transitionStep(5);
      return;
    }
    if (subtotal < coupon.minOrder) {
      setError(`Minimum order of $${coupon.minOrder} required.`);
      transitionStep(5);
      return;
    }
    setAppliedCoupon(coupon);
    setCouponCode(code.toUpperCase());
    setError("");
    transitionStep(6);
  };

  const renderSidebar = () => {
    switch (couponStep) {
      case 1: // Cart + Apply Coupon
        return (
          <div className="sidebar-inner h-full flex flex-col">
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

              {/* Subtotal */}
              <div className="flex justify-between text-sm mb-4"><span className="text-black/60">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>

              {/* Coupon CTA Card */}
              <button onClick={() => transitionStep(2)} className="w-full flex items-center gap-3 p-4 mb-4 border border-dashed border-[#5B2EFF]/40 bg-[#5B2EFF]/[0.02] rounded-sm hover:bg-[#5B2EFF]/5 transition-colors text-left group">
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
              <Button className="w-full bg-gradient-to-r from-[#5B2EFF] to-[#7B4FFF] text-white rounded-lg h-11 text-xs font-bold tracking-wider uppercase shadow-lg shadow-[#5B2EFF]/20">
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

      case 2: // View Offers
        return (
          <div className="sidebar-inner h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 py-3 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-[0.15em] uppercase">Discount</h2>
              <button onClick={() => transitionStep(1)} className="p-1.5 hover:bg-black/5 rounded-full"><X className="w-4 h-4" /></button>
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

      case 3: // Enter Code
        return (
          <div className="sidebar-inner h-full flex flex-col">
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

      case 4: // Offers List
        return (
          <div className="sidebar-inner h-full flex flex-col">
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

      case 5: // Invalid Code
        return (
          <div className="sidebar-inner h-full flex flex-col">
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

      case 6: // Coupon Applied
        return (
          <div className="sidebar-inner h-full flex flex-col">
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
    <div className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-[#5B2EFF] selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.025]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat" }}
      />

      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-sm border-b border-black/5" : "bg-white/90 border-b border-black/5"}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between">
          <a href="#" className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">SKIN STUDIO</a>
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {["SHOP","COLLECTIONS","CUSTOM","ABOUT"].map(item => (
              <a key={item} href="#" className="text-[10px] lg:text-[11px] font-semibold tracking-[0.15em] uppercase text-black/60 hover:text-black transition-colors relative group">
                {item}<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#5B2EFF] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <button className="p-1.5 sm:p-2 hover:bg-black/5 rounded-full"><Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
            <button className="p-1.5 sm:p-2 hover:bg-black/5 rounded-full"><User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
            <button onClick={() => openSidebar(1)} className="p-1.5 sm:p-2 hover:bg-black/5 rounded-full transition-colors relative">
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#5B2EFF] text-white text-[9px] font-bold rounded-full flex items-center justify-center">1</span>
            </button>
          </div>
        </div>
      </header>
      <div className="h-14 sm:h-16" />

      {/* Demo Controls - Remove in production */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 pb-2">
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-bold tracking-wider uppercase text-black/40 mr-2 py-1">Demo Steps:</span>
          {[1,2,3,4,5,6].map(s => (
            <button key={s} onClick={() => openSidebar(s)} className={`px-3 py-1 text-[10px] font-semibold rounded-sm border transition-colors ${couponStep === s && sidebarOpen ? "bg-[#5B2EFF] text-white border-[#5B2EFF]" : "bg-white border-black/20 hover:border-[#5B2EFF]"}`}>
              Step {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main ref={contentRef} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 pb-16">
        <div className="mb-6 sm:mb-8">
          <p className="text-[10px] text-black/40 tracking-wider uppercase mb-2">HOME / SHOP</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.9]">
            <span className="block">ALL</span>
            <span className="block text-[#5B2EFF]">SKINS</span>
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map(p => (
            <div key={p.id} className="product-card group cursor-pointer" onClick={() => openSidebar(1)}>
              <div className="relative bg-[#F0EDE8] rounded-sm overflow-hidden aspect-[3/4] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-90 transition-opacity">
                  <div className="w-14 h-28 sm:w-16 sm:h-32 bg-black rounded-xl sm:rounded-2xl p-1 shadow-md transform rotate-[-2deg] group-hover:rotate-0 transition-transform">
                    <div className="w-full h-full bg-white rounded-lg sm:rounded-xl overflow-hidden">
                      <img src={p.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 px-0.5">
                <h3 className="text-[10px] sm:text-xs font-bold tracking-wide uppercase">{p.name}</h3>
                <p className="text-xs font-semibold mt-0.5">${p.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Overlay */}
      <div ref={overlayRef} className="fixed inset-0 bg-black/40 z-40 opacity-0 pointer-events-none" onClick={closeSidebar} />

      {/* Sidebar */}
      <div ref={sidebarRef} className="fixed top-0 right-0 h-full w-full sm:w-[380px] lg:w-[420px] bg-white z-50 shadow-2xl transform translate-x-full overflow-hidden">
        {renderSidebar()}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-10 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-3">SKIN STUDIO</h3>
              <p className="text-[10px] text-white/50 leading-relaxed">Premium back skins for the modern generation.</p>
            </div>
            {["SHOP","SUPPORT","SOCIAL"].map(s => (
              <div key={s}>
                <h4 className="text-[10px] font-bold tracking-wider uppercase mb-2">{s}</h4>
                <ul className="space-y-1.5">
                  {(s==="SHOP"?["All Skins","Collections","Custom","New Arrivals"]:s==="SUPPORT"?["FAQ","Shipping","Returns","Contact"]:["Instagram","Twitter","TikTok","YouTube"]).map(i => (
                    <li key={i}><a href="#" className="text-[10px] text-white/50 hover:text-white transition-colors">{i}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-[9px] text-white/30">© 2026 SKIN STUDIO</p>
            <div className="flex gap-4">
              {["PRIVACY","TERMS","COOKIES"].map(i => <a key={i} href="#" className="text-[9px] text-white/30 hover:text-white/60">{i}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}