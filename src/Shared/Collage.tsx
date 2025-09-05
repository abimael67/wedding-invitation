import { useState } from "react";
import { X } from "lucide-react";

interface CollageProps {
  images: { id: number; src: string }[];
  className?: string;
}

export const Collage = ({ images, className = "" }: CollageProps) => {
  const [selectedImage, setSelectedImage] = useState<{ id: number; src: string } | null>(null);

  const openFullscreen = (image: { id: number; src: string }) => {
    setSelectedImage(image);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeFullscreen();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeFullscreen();
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
              onClick={() => openFullscreen(image)}
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
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
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

          {/* Fullscreen Image */}
          <div className="max-w-full max-h-full flex items-center justify-center">
            <img
              src={selectedImage.src}
              alt={`Wedding photo ${selectedImage.id} - Fullscreen view`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};