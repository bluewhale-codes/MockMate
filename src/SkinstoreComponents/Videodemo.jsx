import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2 } from "lucide-react";

// ================================================================
//  PREMIUM INSTALLATION TUTORIAL SECTION
//  Gen-Z Phone Skin Ecommerce UI
// ================================================================

const STEPS = [
  { id: 1, label: "Clean", desc: "Wipe your device with the included cloth" },
  { id: 2, label: "Align", desc: "Position the skin using camera cutout as guide" },
  { id: 3, label: "Apply", desc: "Press down from center to edges gently" },
  { id: 4, label: "Smooth", desc: "Use the squeegee to remove any bubbles" },
  { id: 5, label: "Done", desc: "Admire your new look", isLast: true },
];

export default function Videodemo({
  // --- Video Config ---
  videoPoster = "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&h=600&fit=crop",
  videoSrc = "",
  
  // --- Layout ---
  className = "",
  direction = "horizontal",
  
  // --- Styling ---
  bgColor = "#FAFAF7",
  cardBg = "#FFFFFF",
  accentColor = "#7C3AED",
  
  // --- Timeline ---
  activeStep = 1,
  onStepClick = null,
  
  // --- Animation ---
  enableAnimations = true,
  
  // --- Responsive ---
  mobileDirection = "vertical",
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(33);
  const [currentTime, setCurrentTime] = useState("1:23");
  const [duration] = useState("3:45");
  const [hoveredStep, setHoveredStep] = useState(null);
  const [screenSize, setScreenSize] = useState("desktop");
  const videoRef = useRef(null);
  const progressInterval = useRef(null);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 768) setScreenSize("mobile");
      else if (w < 1024) setScreenSize("tablet");
      else setScreenSize("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isMobile = screenSize === "mobile";
  const layoutDirection = isMobile ? mobileDirection : direction;
  const isHorizontal = layoutDirection === "horizontal";

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const totalSeconds = 3 * 60 + 45;
          const currentSeconds = Math.floor((p / 100) * totalSeconds);
          const mins = Math.floor(currentSeconds / 60);
          const secs = currentSeconds % 60;
          setCurrentTime(`${mins}:${secs.toString().padStart(2, "0")}`);
          return p + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(progressInterval.current);
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = (x / rect.width) * 100;
    setProgress(pct);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div
      className={`w-full ${className}`}
      style={{ backgroundColor: bgColor,marginTop:"20px" }}
    >
      <div
        className={`flex ${isHorizontal ? "flex-row" : "flex-col"} gap-2`}
      >
        {/* === LEFT: VIDEO PLAYER === */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative overflow-hidden ${isHorizontal ? "flex-[1.4]" : "w-full"}`}
          style={{
            borderRadius: "14px",
            backgroundColor: "#0a0a0a",
            boxShadow: "0 20px 60px -15px rgba(0,0,0,0.15), 0 8px 20px -10px rgba(0,0,0,0.1)",
          }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ borderRadius: "14px" }}>
            {videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={videoPoster}
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
                onClick={togglePlay}
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={videoPoster}
                  alt="Installation tutorial"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
              </div>
            )}

            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-2xl"
                  >
                    <Play size={12} className="text-white ml-1" fill="white" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMuted(!isMuted)}
                className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center"
              >
                {isMuted ? (
                  <VolumeX size={14} className="text-white" />
                ) : (
                  <Volume2 size={14} className="text-white" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center"
              >
                <Maximize2 size={14} className="text-white" />
              </motion.button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div
                className="relative h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer mb-3"
                onClick={handleProgressClick}
              >
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${accentColor}, #A855F7)`,
                  }}
                  layout
                />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg"
                  style={{ left: `calc(${progress}% - 6px)` }}
                  layout
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
                  >
                    {isPlaying ? (
                      <Pause size={14} className="text-white" />
                    ) : (
                      <Play size={14} className="text-white ml-0.5" />
                    )}
                  </motion.button>
                  <span className="text-white/80 text-xs font-medium tabular-nums">
                    {currentTime} / {duration}
                  </span>
                </div>
                <span className="text-white/50 text-[10px] font-medium uppercase tracking-wider">
                  Easy Install
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* === RIGHT: TIMELINE CARD === */}
        <motion.div
          initial={enableAnimations ? { opacity: 0, x: 30 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${isHorizontal ? "flex-1" : "w-full"}`}
          style={{
            backgroundColor: cardBg,
            borderRadius: "14px",
            boxShadow: "0 4px 24px -8px rgba(0,0,0,0.08), 0 1px 4px -1px rgba(0,0,0,0.04)",
          }}
        >
          <div className="p-3 h-full flex flex-col">
            <div className="mb-3">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.15em] mb-1">
                How To Apply
              </h3>
              <p className="text-xs text-gray-400 font-medium">
                Under 2 minutes · No bubbles · No stress
              </p>
            </div>

            {/* <div className="flex-1 flex flex-col justify-center">
              {STEPS.map((step, index) => {
                const isActive = step.id === activeStep;
                const isCompleted = step.id < activeStep;
                const isHovered = hoveredStep === step.id;

                return (
                  <motion.div
                    key={step.id}
                    custom={index}
                    initial={enableAnimations ? "hidden" : false}
                    animate="visible"
                    variants={stepVariants}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                    onClick={() => onStepClick?.(step.id)}
                    className={`relative flex items-start gap-4 cursor-pointer group ${
                      index !== STEPS.length - 1 ? "pb-5" : ""
                    }`}
                  >
                    {index !== STEPS.length - 1 && (
                      <div className="absolute left-[18px] top-[36px] w-[2px] h-[calc(100%-20px)]">
                        <div className="absolute inset-0 border-l-2 border-dashed border-gray-200" />
                        {isCompleted && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="absolute top-0 left-0 w-[2px] border-l-2 border-violet-400"
                          />
                        )}
                      </div>
                    )}

                    <motion.div
                      whileHover={enableAnimations ? { scale: 1.15 } : {}}
                      className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-200"
                          : isCompleted
                          ? "bg-violet-100 text-violet-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={10} />
                      ) : (
                        <span className="text-sm font-bold">{step.id}</span>
                      )}
                    </motion.div>

                    <div className="pt-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold transition-colors duration-300 ${
                            isActive
                              ? "text-gray-900"
                              : isCompleted
                              ? "text-gray-700"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </span>
                        {step.isLast && (
                          <Sparkles size={10} className="text-amber-400" />
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {(isActive || isHovered) && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-[11px] text-gray-400 mt-1 leading-relaxed max-w-[200px]"
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div> */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="border-t border-gray-100"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-medium">
                  Includes: Cloth · Squeegee · Guide
                </span>
                {/* <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                >
                  Watch Full Guide
                </motion.div> */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}