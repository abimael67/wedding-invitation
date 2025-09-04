import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-wedding-blue-900 text-white py-12 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 opacity-20">
        <Heart className="w-12 h-12 text-white transform rotate-12" />
      </div>
      <div className="absolute bottom-4 right-4 opacity-20">
        <Heart className="w-8 h-8 text-white transform -rotate-45" />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
        <Heart className="w-32 h-32 text-white" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-0.5 bg-white opacity-50"></div>
            <Heart className="w-6 h-6 text-white mx-4" />
            <div className="w-16 h-0.5 bg-white opacity-50"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Gracias por Acompañarnos
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div className="w-16 h-0.5 bg-white opacity-50"></div>
            <Heart className="w-6 h-6 text-white mx-4" />
            <div className="w-16 h-0.5 bg-white opacity-50"></div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg md:text-xl font-light leading-relaxed mb-4">
            "El amor es la fuerza más humilde, pero la más poderosa de que
            dispone el mundo."
          </p>
          <p className="text-sm opacity-75">- Mahatma Gandhi</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Ceremonia</h3>
            <p className="text-sm opacity-75">3:00 PM</p>
            <p className="text-sm opacity-75">Iglesia Adventista Libertad</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recepción</h3>
            <p className="text-sm opacity-75">5:00 PM</p>
            <p className="text-sm opacity-75">Gazebo, Vista Loma</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Código de Vestimenta</h3>
            <p className="text-sm opacity-75">Formal Elegante</p>
            <p className="text-sm opacity-75">Evitar tonos azules oscuros</p>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 pt-8">
          <div className="flex justify-center items-center mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm opacity-75 mb-2">
            Con todo nuestro amor y gratitud
          </p>
          <p className="font-serif text-xl">Winnifer & Abimael</p>
          <p className="text-xs opacity-50 mt-4">© 2025 - Invitación de Boda</p>
        </div>
      </div>
    </footer>
  );
};
