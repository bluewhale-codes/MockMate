import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "./Component/ui/Button";
import {
  ArrowRight, Heart, Play, Star, Check, Plus, X,
  Sparkles, Shield, Scissors, Layers, Grip, Droplets
} from "lucide-react";

const product = {
  name: "Carbon Fiber",
  collection: "Tech Collection",
  price: 599,
  image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&h=800&fit=crop",
};

const thumbnails = [
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=150&h=200&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=150&h=200&fit=crop",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=150&h=200&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=200&fit=crop",
];

const features = [
  { icon: Sparkles, title: "Bubble-free installation", color: "#A3E635", bg: "bg-[#A3E635]/[0.08]", border: "border-[#A3E635]/20" },
  { icon: Shield, title: "No glue residue", color: "#8B5CF6", bg: "bg-[#8B5CF6]/[0.06]", border: "border-[#8B5CF6]/20" },
  { icon: Scissors, title: "Precision cut", color: "#A3E635", bg: "bg-[#A3E635]/[0.08]", border: "border-[#A3E635]/20" },
  { icon: Layers, title: "Scratch resistant", color: "#8B5CF6", bg: "bg-[#8B5CF6]/[0.06]", border: "border-[#8B5CF6]/20" },
  { icon: Grip, title: "Matte finish", color: "#A3E635", bg: "bg-[#A3E635]/[0.08]", border: "border-[#A3E635]/20" },
  { icon: Droplets, title: "Waterproof vinyl", color: "#8B5CF6", bg: "bg-[#8B5CF6]/[0.06]", border: "border-[#8B5CF6]/20" },
];

const lifestylePhotos = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=400&fit=crop",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=250&fit=crop",
  "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=300&h=350&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=250&fit=crop",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=280&fit=crop",
];

const steps = ["Clean", "Align", "Apply", "Smooth", "Done ✨"];

const reviewPhotos = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=200&fit=crop",
  "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=150&h=200&fit=crop",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=150&h=200&fit=crop",
  "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=150&h=200&fit=crop",
];

const accessories = [
  { name: "AirPods Skin", price: 399, image: "https://images.unsplash.com/photo-1603351154351-5cfb3d04ef32?w=200&h=200&fit=crop" },
  { name: "Laptop Skin", price: 799, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
  { name: "Camera Protector", price: 349, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop" },
  { name: "Charger Wrap", price: 299, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&h=200&fit=crop" },
];

export default function SkinStudioProductDetailSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [saved, setSaved] = useState(false);
  const [reviewPhotoIdx, setReviewPhotoIdx] = useState(0);

  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: "auto" });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: "power3.out" });
      // Animate content stagger
      gsap.fromTo(".sidebar-section", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, delay: 0.3, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: "none" });
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    }
  }, [isOpen]);

  const openSidebar = () => {
    setIsOpen(true);
    setActiveTab("details");
    setSelectedThumb(0);
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#111111] font-sans selection:bg-[#8B5CF6] selection:text-white">
      {/* Demo Trigger Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={openSidebar}
          className="bg-gradient-to-r from-[#8B5CF6] to-[#A3E635] text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-shadow"
        >
          Open Product Sidebar
        </button>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/30 z-40 opacity-0 pointer-events-none"
        onClick={closeSidebar}
      />

      {/* ==================== SIDEBAR ==================== */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] lg:w-[440px] bg-[#FBF9F4] z-50 shadow-2xl transform translate-x-full overflow-hidden flex flex-col"
      >
        {/* Close Button (floating) */}
        <button
          onClick={closeSidebar}
          className="absolute top-3 right-3 z-50 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          {/* Product Preview */}
          <div className="sidebar-section relative px-5 pt-6 pb-4 flex justify-center">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }} />
            {/* Star doodle */}
            <div className="absolute top-4 right-8 w-6 h-6 z-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <polygon points="50,0 61,35 100,35 68,57 79,91 50,70 21,91 32,57 0,35 39,35" fill="#111" />
              </svg>
            </div>

            <div className="relative z-10 w-40 sm:w-44">
              <div className="bg-black rounded-[2.2rem] p-2 shadow-2xl">
                <div className="relative bg-white rounded-[1.8rem] overflow-hidden aspect-[9/19]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl z-20" />
                  <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute top-10 left-3 w-10 h-10 bg-black rounded-2xl z-20 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#333] col-span-2 mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="sidebar-section flex justify-center gap-2 px-5 mb-5">
            {thumbnails.map((thumb, i) => (
              <button
                key={i}
                onClick={() => setSelectedThumb(i)}
                className={`w-12 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedThumb === i ? "border-[#8B5CF6] shadow-md shadow-[#8B5CF6]/20" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={thumb} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Product Info */}
          <div className="sidebar-section px-5 mb-5">
            <h1 className="text-2xl font-black tracking-tight uppercase">{product.name}</h1>
            <p className="text-xs text-black/40 mt-1">{product.collection}</p>
            <p className="text-3xl font-black mt-2">₹{product.price}</p>
          </div>

          {/* CTAs */}
          <div className="sidebar-section px-5 mb-6 space-y-2.5">
            <Button className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#7B4FFF] hover:from-[#7B4FFF] hover:to-[#6a3eef] text-white rounded-xl h-12 text-xs font-bold tracking-wider uppercase shadow-lg shadow-[#8B5CF6]/25">
              Add to Cart <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setSaved(!saved)}
              className={`w-full rounded-xl h-11 text-xs font-bold tracking-wider uppercase transition-all ${saved ? "bg-black text-white border-black" : "bg-transparent text-black border-black/15 hover:border-black"}`}
            >
              Save Design <Heart className={`ml-2 w-4 h-4 ${saved ? "fill-white" : ""}`} />
            </Button>
          </div>

          {/* Tabs */}
          <div className="sidebar-section sticky top-0 bg-[#FBF9F4] z-20 px-5 border-b border-black/5">
            <div className="flex">
              {["details", "how to apply", "reviews"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-[11px] font-bold tracking-wider uppercase transition-colors relative ${activeTab === tab ? "text-[#8B5CF6]" : "text-black/30 hover:text-black/50"}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-[#8B5CF6] to-[#A3E635] rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="px-5 py-5">
            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Feature Grid */}
                <div className="sidebar-section grid grid-cols-2 gap-2">
                  {features.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={i}
                        className={`${f.bg} ${f.border} border rounded-xl p-3 flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
                      >
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: f.color + '18' }}>
                          <Icon className="w-3.5 h-3.5" style={{ color: f.color }} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-bold leading-tight">{f.title}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Lifestyle Gallery */}
                <div className="sidebar-section">
                  <h3 className="text-[10px] font-bold tracking-wider uppercase text-black/40 mb-3">Lifestyle</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {lifestylePhotos.map((p, i) => (
                      <div key={i} className={`rounded-xl overflow-hidden ${i === 0 || i === 3 ? "row-span-2" : ""}`}>
                        <img src={p} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video + Steps */}
                <div className="sidebar-section flex gap-3">
                  <div className="flex-1 relative rounded-xl overflow-hidden aspect-video bg-black group cursor-pointer">
                    <img src={product.image} alt="" className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-[#8B5CF6] ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="w-20 flex flex-col justify-between py-1">
                    {steps.map((s, i) => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0 ${i === 4 ? "bg-[#A3E635] text-black" : "bg-black/5 text-black/40"}`}>
                          {i === 4 ? "✨" : i + 1}
                        </div>
                        <span className="text-[9px] font-medium">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "how to apply" && (
              <div className="space-y-3">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-black/5">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 4 ? "bg-[#A3E635] text-black" : "bg-gradient-to-br from-[#8B5CF6] to-[#7B4FFF] text-white"}`}>
                      {i === 4 ? "✨" : i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{s.replace(" ✨", "")}</h4>
                      <p className="text-[10px] text-black/50 mt-0.5">{["Clean your device thoroughly","Align the skin with camera cutout","Apply from top to bottom","Smooth out bubbles with card","Enjoy your new look!"][i]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-5">
                {/* Review Card */}
                <div className="bg-white rounded-2xl p-4 border border-black/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden">
                      <img src="https://i.pravatar.cc/100?img=11" alt="Aryan" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">Aryan, Chandigarh</span>
                        <span className="flex items-center gap-0.5 text-[9px] text-[#8B5CF6] font-semibold"><Check className="w-3 h-3" /> Verified Buyer</span>
                      </div>
                      <div className="flex gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#8B5CF6] text-[#8B5CF6]" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-black/70 leading-relaxed">"Looks insane in real life. People literally asked where I bought it."</p>

                  {/* Review Photos */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {reviewPhotos.map((p, i) => (
                      <div key={i} className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={p} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-1.5 mt-2">
                    {[0,1,2].map(i => (
                      <button key={i} onClick={() => setReviewPhotoIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-colors ${reviewPhotoIdx === i ? "bg-[#8B5CF6]" : "bg-black/20"}`} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Match Your Setup */}
            <div className="mt-8 pt-6 border-t border-black/10">
              <h3 className="sidebar-section text-sm font-black tracking-tight uppercase mb-4">Match Your Setup</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {accessories.map(a => (
                  <div key={a.name} className="sidebar-section bg-white rounded-xl p-2.5 border border-black/5 hover:shadow-md transition-shadow">
                    <div className="aspect-square rounded-lg overflow-hidden bg-[#F5F0E8] mb-2">
                      <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-[10px] font-bold leading-tight">{a.name}</h4>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs font-bold">₹{a.price}</span>
                      <button className="w-6 h-6 bg-black rounded-full flex items-center justify-center hover:bg-[#8B5CF6] transition-colors">
                        <Plus className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Spacer */}
          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}