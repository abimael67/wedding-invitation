import { Heart } from "lucide-react";

export const PhotoGallery = () => {
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
        <div className="mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
            Nuestra Historia
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
            <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-lg p-6 border-2 border-wedding-blue-100 hover:border-wedding-blue-300 transition-colors relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 opacity-20">
                <Heart className="w-6 h-6 text-wedding-blue-300" />
              </div>
              <div className="aspect-square bg-gradient-to-br from-wedding-blue-100 to-vintage-cream rounded-lg mb-4 flex items-center justify-center border-4 border-white shadow-md">
                <Heart className="w-12 h-12 text-wedding-blue-400" />
              </div>
              <p className="text-sm text-wedding-blue-700 font-medium">
                Foto pre-boda {i}
              </p>
              <div className="absolute bottom-2 left-2 opacity-20">
                <Heart className="w-4 h-4 text-wedding-blue-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};