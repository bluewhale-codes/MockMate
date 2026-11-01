import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, ShoppingBag, Share2, Bookmark, ChevronLeft, X, ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "./Component/ui/dialog";
import { Button } from "./Component/ui/button";
import { Badge } from "./Component/ui/badge";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// LIFESTYLE GALLERY DATA
// ============================================
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=800&fit=crop",
    alt: "Hand holding phone close-up with colorful artistic skin",
    category: "lifestyle",
    height: "tall",
    likes: 2847,
    caption: "That grip tho 🔥",
    tags: ["#phonestyle", "#aesthetic"],
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    alt: "Desk setup with keyboard and AirPods",
    category: "setup",
    height: "short",
    likes: 1523,
    caption: "Workspace goals ✨",
    tags: ["#desksetup", "#minimal"],
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=900&fit=crop",
    alt: "Mirror selfie with phone covering face",
    category: "selfie",
    height: "tall",
    likes: 4102,
    caption: "Mirror mirror on the wall...",
    tags: ["#mirrorselfie", "#ootd"],
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=500&fit=crop",
    alt: "RGB gaming desk aesthetic",
    category: "gaming",
    height: "medium",
    likes: 3891,
    caption: "Gaming vibes 🎮",
    tags: ["#gaming", "#rgb"],
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=700&fit=crop",
    alt: "Coffee shop lifestyle shot",
    category: "cafe",
    height: "medium",
    likes: 2156,
    caption: "Coffee & cases ☕",
    tags: ["#coffeeshop", "#vibes"],
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&h=800&fit=crop",
    alt: "Neon purple lighting portrait shot",
    category: "neon",
    height: "tall",
    likes: 5620,
    caption: "Neon dreams 💜",
    tags: ["#neon", "#nightlife"],
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=450&fit=crop",
    alt: "Phone flat lay on marble",
    category: "flatlay",
    height: "short",
    likes: 1789,
    caption: "Details matter",
    tags: ["#flatlay", "#details"],
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=750&fit=crop",
    alt: "Street style phone shot",
    category: "street",
    height: "tall",
    likes: 3241,
    caption: "Street certified",
    tags: ["#streetwear", "#y2k"],
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&h=500&fit=crop",
    alt: "Phone on bed aesthetic",
    category: "cozy",
    height: "medium",
    likes: 1987,
    caption: "Cozy Sundays",
    tags: ["#cozy", "#sunday"],
  },
];

// ============================================
// SOCIAL PROOF BAR COMPONENT
// ============================================
const SocialProofBar = () => {
  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-y border-stone-200/50 py-3 px-4">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full border-2 border-white bg-stone-300 overflow-hidden"
            >
              <img
                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-3.5 h-3.5 text-amber-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-semibold text-stone-700">4.9</span>
          </div>
          <span className="text-[10px] text-stone-500">12.4k reviews</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// GALLERY IMAGE CARD COMPONENT
// ============================================
const GalleryCard = ({ image, index, onImageClick }) => {
  const cardRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 40,
        scale: 0.92,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 92%",
          toggleActions: "play none none none",
        },
        delay: index * 0.08,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === card) t.kill();
      });
    };
  }, [index]);

  const heightClass =
    image.height === "tall"
      ? "h-72 sm:h-80 md:h-96"
      : image.height === "medium"
      ? "h-56 sm:h-64 md:h-72"
      : "h-44 sm:h-52 md:h-60";

  return (
    <div
      ref={cardRef}
      className={`group relative ${heightClass} rounded-[20px] overflow-hidden cursor-pointer bg-stone-100`}
      onClick={() => onImageClick(image)}
    >
      {/* Image */}
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top Actions */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isSaved
              ? "bg-amber-500 text-white"
              : "bg-white/20 text-white hover:bg-white/40"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isLiked
              ? "bg-rose-500 text-white"
              : "bg-white/20 text-white hover:bg-white/40"
          }`}
        >
          <Heart className="w-3.5 h-3.5" fill={isLiked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-white/80" />
            <span className="text-xs text-white/90 font-medium">
              {image.likes.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-1">
            {image.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Border Glow on Hover */}
      <div className="absolute inset-0 rounded-[20px] border-2 border-white/0 group-hover:border-white/20 transition-all duration-300 pointer-events-none" />
    </div>
  );
};

// ============================================
// LIGHTBOX MODAL COMPONENT
// ============================================
const LightboxModal = ({ image, isOpen, onClose, onNext, onPrev }) => {
  const [isLiked, setIsLiked] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full p-0 bg-stone-950 border-none overflow-hidden rounded-3xl">
        <div ref={modalRef} className="relative">
          {/* Image */}
          <div className="relative aspect-[3/4] w-full">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors rotate-180"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Sheet */}
          <div className="bg-white rounded-t-3xl -mt-6 relative z-10 p-5">
            <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-4" />
            
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-stone-900">{image.caption}</h3>
                <div className="flex gap-2 mt-1">
                  {image.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-stone-100 text-stone-600 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 text-stone-500">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">{image.likes.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => setIsLiked(!isLiked)}
                variant="outline"
                className={`flex-1 rounded-xl h-11 ${
                  isLiked ? "border-rose-500 text-rose-500" : "border-stone-200"
                }`}
              >
                <Heart className="w-4 h-4 mr-2" fill={isLiked ? "currentColor" : "none"} />
                Like
              </Button>
              <Button className="flex-1 rounded-xl h-11 bg-stone-900 hover:bg-stone-800 text-white">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ============================================
// MAIN GALLERY COMPONENT
// ============================================
const Test4 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Header entrance animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  const handleNext = () => {
    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIndex]);
  };

  // Distribute images into 3 columns for masonry effect
  const columns = [[], [], []];
  galleryImages.forEach((img, i) => {
    columns[i % 3].push({ ...img, originalIndex: i });
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5]" ref={containerRef}>
      {/* Header */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-[#FAF8F5]/80 backdrop-blur-xl border-b border-stone-200/50"
      >
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">SS</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-stone-900 leading-tight">SKIN STUDIO</h1>
              <p className="text-[10px] text-stone-500 leading-tight">Premium Phone Skins</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-stone-100 transition-colors">
              <Share2 className="w-4 h-4 text-stone-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-stone-100 transition-colors relative">
              <ShoppingBag className="w-4 h-4 text-stone-600" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Social Proof Bar */}
      <SocialProofBar />

      {/* Product Info */}
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex items-start justify-between">
          <div>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-2 text-xs">
              Best Seller
            </Badge>
            <h2 className="text-xl font-bold text-stone-900 leading-tight">
              Abstract Paint Stroke
            </h2>
            <p className="text-sm text-stone-500 mt-1">Limited Edition Skin</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-stone-900">$29</p>
            <p className="text-xs text-stone-400 line-through">$45</p>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex gap-2 mt-3">
          {["#0066FF", "#FF6B00", "#FFD700", "#FF0040", "#9333EA", "#06B6D4"].map(
            (color) => (
              <div
                key={color}
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            )
          )}
        </div>
      </div>

      {/* Gallery Section Title */}
      <div className="max-w-lg mx-auto px-4 mb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-stone-800">Style Gallery</h3>
          <span className="text-xs text-stone-400">{galleryImages.length} photos</span>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-lg mx-auto px-2 pb-8">
        <div className="grid grid-cols-3 gap-2">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-2">
              {column.map((image) => (
                <GalleryCard
                  key={image.id}
                  image={image}
                  index={image.originalIndex}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-stone-200/50 p-3 z-40">
        <div className="max-w-lg mx-auto flex gap-3">
          <Button
            variant="outline"
            className="flex-1 rounded-xl h-12 border-stone-200 text-stone-700 font-semibold hover:bg-stone-50"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button className="flex-[2] rounded-xl h-12 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Cart — $29
          </Button>
        </div>
      </div>

      {/* Spacer for fixed CTA */}
      <div className="h-20" />

      {/* Lightbox */}
      <LightboxModal
        image={selectedImage}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default Test4;