import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, BadgeCheck, ChevronLeft, ChevronRight, Heart, MessageCircle, Share2 } from "lucide-react";

// ================================================================
//  PREMIUM GEN-Z CUSTOMER REVIEW CARD
//  Luxury Phone Skin Ecommerce UI
// ================================================================

const REVIEWS = [
  {
    id: 1,
    name: "Aryan",
    location: "Chandigarh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Looks insane in real life.\\nPeople literally asked where\\nI bought it.",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb8c2e18be9?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=200&h=200&fit=crop",
    ],
    likes: 234,
    comments: 18,
    verified: true,
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Priya",
    location: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The quality is unreal.\\nBest skin I have ever bought.\\nWorth every rupee.",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
    ],
    likes: 189,
    comments: 12,
    verified: true,
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Rohan",
    location: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Got so many compliments\\nat college. Everyone wants\\nthe link now.",
    images: [
      "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb8c2e18be9?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
    ],
    likes: 312,
    comments: 24,
    verified: true,
    date: "3 days ago",
  },
];

export default function Test5({
  // --- Data ---
  reviews = REVIEWS,
  initialIndex = 0,
  
  // --- Styling ---
  bgColor = "#FAFAF7",
  cardBg = "#FFFFFF",
  accentColor = "#7C3AED",
  
  // --- Layout ---
  className = "",
  
  // --- Animation ---
  enableAnimations = true,
  
  // --- Interactive ---
  onReviewChange = null,
  onImageClick = null,
  onLike = null,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [liked, setLiked] = useState(false);
  const [direction, setDirection] = useState(1);

  const review = reviews[currentIndex];

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % reviews.length);
    onReviewChange?.((currentIndex + 1) % reviews.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + reviews.length) % reviews.length);
    onReviewChange?.((currentIndex - 1 + reviews.length) % reviews.length);
  };

  const handleLike = () => {
    setLiked(!liked);
    onLike?.(review.id, !liked);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <div
      className={`w-full ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="px-1">
       

        {/* Main Card */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundColor: cardBg,
            borderRadius: "24px",
            boxShadow: "0 4px 24px -8px rgba(0,0,0,0.06), 0 1px 4px -1px rgba(0,0,0,0.03)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={review.id}
              custom={direction}
              variants={enableAnimations ? slideVariants : {}}
              initial={enableAnimations ? "enter" : false}
              animate="center"
              exit={enableAnimations ? "exit" : false}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="p-5"
            >
              {/* Top Section: Profile + Verified */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar with purple border */}
                  <div
                    className="w-11 h-11 rounded-full overflow-hidden"
                    style={{
                      border: "2px solid " + accentColor,
                      padding: "2px",
                    }}
                  >
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">
                      {review.name}
                      <span className="text-gray-400 font-normal">, {review.location}</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{review.date}</p>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <BadgeCheck size={16} className="text-violet-500" />
                  <span className="text-[10px] font-bold text-violet-500 uppercase tracking-wider">
                    Verified
                  </span>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={enableAnimations ? { scale: 0, rotate: -180 } : false}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3, type: "spring" }}
                  >
                    <Star
                      size={18}
                      className={i < review.rating ? "text-violet-500" : "text-gray-200"}
                      fill={i < review.rating ? "#8B5CF6" : "none"}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Review Quote */}
              <div className="mb-5">
                <p className="text-base font-semibold text-gray-800 leading-relaxed whitespace-pre-line">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {review.images.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={enableAnimations ? { opacity: 0, y: 10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                    whileHover={enableAnimations ? { scale: 1.05, zIndex: 10 } : {}}
                    onClick={() => onImageClick?.(src, i)}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={src}
                      alt={"review-photo-" + i}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {i === 3 && review.images.length > 4 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">+{review.images.length - 4}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Heart
                      size={16}
                      className={liked ? "fill-red-500 text-red-500" : ""}
                    />
                    {review.likes + (liked ? 1 : 0)}
                  </motion.button>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-violet-500 transition-colors">
                    <MessageCircle size={16} />
                    {review.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-violet-500 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows (hover) */}
          {reviews.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10"
              >
                <ChevronLeft size={16} className="text-gray-700" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight size={16} className="text-gray-700" />
              </motion.button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {reviews.length > 1 && (
          <div className="flex flex-col items-center mt-4 gap-2">
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              More reviews on this product
            </p>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                    onReviewChange?.(i);
                  }}
                  className="relative"
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "bg-violet-500 w-5"
                        : "bg-gray-300 hover:bg-gray-400 w-2"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}