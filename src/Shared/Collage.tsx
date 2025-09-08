import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface CollageProps {
  images: { id: number; src: string }[];
  className?: string;
}

export const Collage = ({ images, className = "" }: CollageProps) => {
  const [selectedImage, setSelectedImage] = useState<{ id: number; src: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationOrigin, setAnimationOrigin] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const openFullscreen = (image: { id: number; src: string }, event: React.MouseEvent<HTMLDivElement>) => {
    const imageIndex = images.findIndex(img => img.id === image.id);
    const rect = event.currentTarget.getBoundingClientRect();
    setAnimationOrigin({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    });
    setIsAnimating(true);
    setSelectedImage(image);
    setCurrentImageIndex(imageIndex);
    
    // Remove animation class after animation completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const goToPreviousImage = () => {
    const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  // Disable/enable body scroll when modal is open/closed
  useEffect(() => {
    if (selectedImage) {
      // Disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scroll
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to re-enable scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeFullscreen();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeFullscreen();
    } else if (e.key === "ArrowRight") {
      goToNextImage();
    } else if (e.key === "ArrowLeft") {
      goToPreviousImage();
    }
  };

  // Touch event handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNextImage();
    } else if (isRightSwipe) {
      goToPreviousImage();
    }
  };

  return (
    <>
      {/* Collage Grid */}
      <div className={`columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3 ${className}`}>
        {images.map((image, index) => {
           // Create truly random sizes for a less organized look
           const sizeVariants = [
             'h-40', // extra small
             'h-48', // small
             'h-56', // medium-small
             'h-64', // medium
             'h-72', // medium-large
             'h-80', // large
             'h-96', // extra large
             'h-52', // irregular 1
             'h-60', // irregular 2
             'h-68', // irregular 3
             'h-76', // irregular 4
             'h-44'  // irregular 5
           ];
           // Use a pseudo-random pattern based on image id for consistent but unpredictable sizing
           const pseudoRandom = (image.id * 7 + index * 3) % sizeVariants.length;
           const randomSize = sizeVariants[pseudoRandom];
          
          return (
            <div
              key={image.id}
              className={`break-inside-avoid cursor-pointer group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${randomSize}`}
              onClick={(e) => openFullscreen(image, e)}
            >
              <img
                src={image.src}
                alt={`Wedding photo ${image.id}`}
                className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className={`fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image view"
        >
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            aria-label="Close fullscreen view"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPreviousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black/30 rounded-full p-2 hover:bg-black/50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10 bg-black/30 rounded-full p-2 hover:bg-black/50"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Fullscreen Image */}
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={selectedImage.src}
              alt={`Wedding photo ${selectedImage.id} - Fullscreen view`}
              className={`w-auto h-auto max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] object-contain transition-all duration-300 ${
                isAnimating 
                  ? 'transform scale-0 opacity-0'
                  : 'transform scale-100 opacity-100'
              }`}
              style={isAnimating ? {
                transformOrigin: `${animationOrigin.x + animationOrigin.width/2}px ${animationOrigin.y + animationOrigin.height/2}px`
              } : {}}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};