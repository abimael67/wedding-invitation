import { useState } from "react";
import { Heart, Grid, Play } from "lucide-react";
import { Carousel } from "../Shared/Carousel";
import { Collage } from "../Shared/Collage";

export const PhotoGallery = () => {
  const [viewMode, setViewMode] = useState<'carousel' | 'collage'>('carousel');

  const imageUrls = [
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2660.jpg",
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2767.jpg",
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2807.jpg",
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2818.jpg",
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2821.jpg",
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2849.jpg",
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2827.jpg",
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2861.jpg",
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_3211.jpg",
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_3214.jpg",
  ];

  const photos = imageUrls.map((url, index) => ({
    id: index + 1,
    src: url,
  }));

  const renderPhoto = (photo: { id: number; src: string }) => (
    <div className="aspect-[4/3] relative overflow-hidden">
      <img
        src={photo.src}
        alt={`Wedding photo ${photo.id}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );

  return (
    <section
      className="py-16 px-4 bg-vintage-cream relative"
      style={{
        backgroundImage: `url('https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/flowers%20bg.png')`,
        backgroundRepeat: "repeat",
        backgroundSize: "150px 200px",
        backgroundPosition: "center",
        opacity: 0.95,
      }}
    >
      <div className="absolute z-0 inset-0 bg-vintage-cream/80 pointer-events-none"></div>

      {/* Decorative elements */}
      <div className="absolute top-12 left-4 opacity-15">
        <Heart className="w-20 h-20 text-wedding-blue-300 transform rotate-45" />
      </div>
      <div className="absolute bottom-12 right-4 opacity-15">
        <Heart className="w-16 h-16 text-wedding-blue-400 transform -rotate-12" />
      </div>

      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Header */}
        <div className="mb-12 relative z-10">
          <div className="flex justify-center items-center mb-4">
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900 z-10">
            Algunas Fotitos
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 ${
                viewMode === 'carousel'
                  ? 'bg-wedding-blue-500 text-white shadow-lg'
                  : 'bg-white/80 text-wedding-blue-600 hover:bg-wedding-blue-100'
              }`}
            >
              <Play className="w-4 h-4 mr-2" />
              Carrusel
            </button>
            <button
              onClick={() => setViewMode('collage')}
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 ${
                viewMode === 'collage'
                  ? 'bg-wedding-blue-500 text-white shadow-lg'
                  : 'bg-white/80 text-wedding-blue-600 hover:bg-wedding-blue-100'
              }`}
            >
              <Grid className="w-4 h-4 mr-2" />
              Collage
            </button>
          </div>
        </div>

        {/* Photo Display */}
        {viewMode === 'carousel' ? (
          <Carousel
            items={photos}
            renderItem={renderPhoto}
            showIndicators={true}
            showCounter={true}
            showNavigation={true}
          />
        ) : (
          <Collage images={photos} />
        )}
      </div>
    </section>
  );
};
