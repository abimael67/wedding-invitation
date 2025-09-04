import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

export const PhotoGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const photos = [
    {
      id: 1,
      title: "Nuestro Primer Encuentro",
      description:
        "El día que nuestros corazones se encontraron por primera vez",
      gradient: "from-pink-100 to-rose-200",
    },
    {
      id: 2,
      title: "La Propuesta",
      description: "El momento más especial de nuestras vidas",
      gradient: "from-blue-100 to-indigo-200",
    },
    {
      id: 3,
      title: "Preparando el Gran Día",
      description: "Cada detalle planeado con amor",
      gradient: "from-purple-100 to-pink-200",
    },
    {
      id: 4,
      title: "Sesión Pre-Boda",
      description: "Capturando nuestra felicidad",
      gradient: "from-green-100 to-emerald-200",
    },
    {
      id: 5,
      title: "Con Nuestras Familias",
      description: "Rodeados del amor de quienes más queremos",
      gradient: "from-yellow-100 to-orange-200",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 px-4 bg-vintage-cream relative">
      {/* Decorative elements */}
      <div className="absolute top-12 left-4 opacity-15">
        <Heart className="w-20 h-20 text-wedding-blue-300 transform rotate-45" />
      </div>
      <div className="absolute bottom-12 right-4 opacity-15">
        <Heart className="w-16 h-16 text-wedding-blue-400 transform -rotate-12" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
            Algunas Fotitos
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border-4 border-wedding-blue-100">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {photos.map((photo) => (
                <div key={photo.id} className="w-full flex-shrink-0 relative">
                  <div
                    className={`aspect-[4/3] bg-gradient-to-br ${photo.gradient} flex items-center justify-center p-8 relative overflow-hidden`}
                  >
                    {/* Empty square placeholder */}
                    <div className="w-32 h-32 border-4 border-white/30 border-dashed rounded-lg flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-wedding-blue-600 hover:text-wedding-blue-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-wedding-blue-600 hover:text-wedding-blue-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {photos.map((_, index) => (
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

        {/* Slide Counter */}
        <div className="mt-4 text-wedding-blue-600 font-medium">
          {currentSlide + 1} de {photos.length}
        </div>
      </div>
    </section>
  );
};
