import { Flower } from "lucide-react";
import { Collage } from "../Shared/Collage";

export const PhotoGallery = () => {
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

      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Header */}
        <div className="mb-12 relative z-10">
          <div className="flex justify-center items-center mb-4">
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            <Flower className="w-8 h-8 text-wedding-blue-400 mx-4" />
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900 z-10">
            Algunas Fotitos
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            <Flower className="w-8 h-8 text-wedding-blue-400 mx-4" />
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
          </div>

          <Collage images={photos} />
        </div>
      </div>
    </section>
  );
};
