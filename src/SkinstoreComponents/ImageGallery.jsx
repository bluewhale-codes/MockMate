import React, { useState, useEffect } from "react";

// ─── Responsive Masonry Grid with Dynamic Image Loading ─────────────────

const defaultImages = [
  // Column 1
  [
    "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779799775/Screenshot_2026-05-26_181723_fqx18v.png",
    "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779799774/Screenshot_2026-05-26_181737_et2h7i.png",
  ],
  // Column 2
  [
    "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779799774/Screenshot_2026-05-26_181807_s1t5yq.png",
    "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779799774/Screenshot_2026-05-26_181707_monatj.png",
  ],
  // Column 3
  [
    "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779799774/Screenshot_2026-05-26_181750_jq53ee.png",
    "https://res.cloudinary.com/dycjjaxsk/image/upload/v1779652440/Gemini_Generated_Image_e3ah18e3ah18e3ah_1_kriqgw.png",
  ],
];

// Alternate split patterns for visual variety
const splitPatterns = [
  [0.6, 0.4], // 60/40
  [0.4, 0.6], // 40/60
  [0.55, 0.45], // 55/45
  [0.45, 0.55], // 45/55
  [0.5, 0.5],   // 50/50
];

export default function ImageGallery({
  images = defaultImages,
  containerClassName = "",
  gap = 12, // in pixels
  borderRadius = 16, // in pixels
  hoverScale = 1.1,
  transitionDuration = 500, // in ms
  pattern = "alternating", // "alternating" | "60-40" | "40-60" | "50-50" | "random"
  aspectRatio = "auto", // "auto" | "square" | "portrait" | "landscape" | number
  maxHeight = null, // e.g. "600px" or "80vh"
  minHeight = null, // e.g. "200px"
  onImageClick = null,
  loading = "lazy",
  objectFit = "cover",
  enableHover = true,
  showOverlay = false,
  overlayContent = null,
}) {
  const [loadedImages, setLoadedImages] = useState({});
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = React.useRef(null);

  // Track container width for responsive calculations
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Get split pattern for a column based on pattern prop
  const getColumnPattern = (colIndex) => {
    switch (pattern) {
      case "60-40":
        return [0.6, 0.4];
      case "40-60":
        return [0.4, 0.6];
      case "50-50":
        return [0.5, 0.5];
      case "random":
        return splitPatterns[Math.floor(Math.random() * splitPatterns.length)];
      case "alternating":
      default:
        return colIndex % 2 === 0 ? [0.6, 0.4] : [0.4, 0.6];
    }
  };

  // Calculate aspect ratio styles
  const getAspectStyles = () => {
    if (aspectRatio === "square") return { aspectRatio: "1 / 1" };
    if (aspectRatio === "portrait") return { aspectRatio: "3 / 4" };
    if (aspectRatio === "landscape") return { aspectRatio: "4 / 3" };
    if (typeof aspectRatio === "number") return { aspectRatio: `${aspectRatio}` };
    return {};
  };

  // Handle image load
  const handleImageLoad = (colIndex, imgIndex) => {
    setLoadedImages((prev) => ({
      ...prev,
      [`${colIndex}-${imgIndex}`]: true,
    }));
  };

  // Calculate responsive container height
  const getContainerHeight = () => {
    if (maxHeight && containerWidth > 768) return { maxHeight };
    if (minHeight) return { minHeight };
    return {};
  };

  return (
    <div style={{
        marginTop:"20px"
    }}>
       <div
      ref={containerRef}
      className={`w-full ${containerClassName}`}
      style={{
        ...getAspectStyles(),
        ...getContainerHeight(),
      }}
    >
      <div
        className="grid grid-cols-3 h-full"
        style={{ gap: `${gap}px` }}
      >
        {images.map((column, colIndex) => {
          const split = getColumnPattern(colIndex);
          const totalGap = gap; // one gap between 2 images
          const availableHeight = `calc(100% - ${totalGap}px)`;

          return (
            <div
              key={colIndex}
              className="flex flex-col h-full"
              style={{ gap: `${gap}px` }}
            >
              {column.map((src, imgIndex) => {
                const heightPercent = split[imgIndex];
                const isLoaded = loadedImages[`${colIndex}-${imgIndex}`];

                return (
                  <div
                    key={imgIndex}
                    className="relative overflow-hidden"
                    style={{
                      height: `${heightPercent * 100}%`,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    {/* Skeleton loader */}
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    )}

                    {/* Image */}
                    <img
                      src={src}
                      alt={`img-${colIndex}-${imgIndex}`}
                      loading={loading}
                      onLoad={() => handleImageLoad(colIndex, imgIndex)}
                      onClick={() => onImageClick?.(src, colIndex, imgIndex)}
                      className={`
                        w-full h-full
                        ${objectFit === "cover" ? "object-cover" : "object-contain"}
                        transition-all duration-${transitionDuration}
                        ${enableHover ? "cursor-pointer" : ""}
                        ${isLoaded ? "opacity-100" : "opacity-0"}
                      `}
                      style={{
                        borderRadius: `${borderRadius}px`,
                        transitionDuration: `${transitionDuration}ms`,
                        transform: enableHover ? undefined : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (enableHover) {
                          e.currentTarget.style.transform = `scale(${hoverScale})`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (enableHover) {
                          e.currentTarget.style.transform = "scale(1)";
                        }
                      }}
                    />

                    {/* Optional overlay */}
                    {showOverlay && (
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-end p-3">
                        {overlayContent?.(src, colIndex, imgIndex)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}