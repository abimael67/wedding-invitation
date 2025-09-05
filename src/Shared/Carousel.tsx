import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps<T = unknown> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  containerClassName?: string;
  showIndicators?: boolean;
  showCounter?: boolean;
  showNavigation?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const Carousel = <T,>({
  items,
  renderItem,
  className = "",
  containerClassName = "relative overflow-hidden rounded-2xl bg-white shadow-2xl border-4 border-wedding-blue-100",
  showIndicators = true,
  showCounter = true,
  showNavigation = true,
  autoPlay = false,
  autoPlayInterval = 3000,
}: CarouselProps<T>) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && items.length > 1) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, items.length]);

  if (!items || items.length === 0) {
    return <div className="text-center text-gray-500">No items to display</div>;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Carousel */}
      <div className={containerClassName}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-wedding-blue-600 hover:text-wedding-blue-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-wedding-blue-600 hover:text-wedding-blue-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next item"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="flex justify-center mt-8 space-x-3 z-10 relative">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-wedding-blue-500 scale-125"
                  : "bg-wedding-blue-200 hover:bg-wedding-blue-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {showCounter && items.length > 1 && (
        <div className="mt-4 text-wedding-blue-600 font-medium z-10 relative text-center">
          {currentSlide + 1} de {items.length}
        </div>
      )}
    </div>
  );
};