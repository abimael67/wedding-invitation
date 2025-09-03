import { Heart, Shirt, Gift } from "lucide-react";

export const DressCodeAndGifts = () => {
  return (
    <section className="py-16 px-4 bg-vintage-cream relative">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 opacity-10">
        <Heart className="w-14 h-14 text-wedding-blue-300 transform rotate-12" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-10">
        <Heart className="w-10 h-10 text-wedding-blue-400 transform -rotate-45" />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Dress Code */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-wedding-blue-400 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <Heart className="w-8 h-8 text-wedding-blue-300" />
            </div>
            <div className="text-center mb-6">
              <div className="flex justify-center items-center mb-4">
                <div className="w-12 h-0.5 bg-wedding-blue-300"></div>
                <Shirt className="w-6 h-6 text-wedding-blue-400 mx-4" />
                <div className="w-12 h-0.5 bg-wedding-blue-300"></div>
              </div>
              <h3 className="font-serif text-2xl text-wedding-blue-900">
                Código de Vestimenta
              </h3>
              <div className="flex justify-center items-center mt-4">
                <div className="w-12 h-0.5 bg-wedding-blue-300"></div>
                <Shirt className="w-6 h-6 text-wedding-blue-400 mx-4" />
                <div className="w-12 h-0.5 bg-wedding-blue-300"></div>
              </div>
            </div>
            <div className="space-y-4 text-wedding-blue-700">
              <div className="text-center">
                <h4 className="font-semibold text-lg mb-2">Formal Elegante</h4>
                <p className="text-sm leading-relaxed">
                  Te invitamos a vestir con elegancia para celebrar este día
                  especial. Sugerimos colores suaves y evitar el blanco.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold mb-2">Para Ellas:</h5>
                  <ul className="space-y-1 text-xs">
                    <li>• Vestido elegante</li>
                    <li>• Colores pasteles</li>
                    <li>• Tacones cómodos</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Para Ellos:</h5>
                  <ul className="space-y-1 text-xs">
                    <li>• Traje o guayabera</li>
                    <li>• Corbata opcional</li>
                    <li>• Zapatos formales</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 opacity-10">
              <Heart className="w-6 h-6 text-wedding-blue-300" />
            </div>
          </div>

          {/* Gifts */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-wedding-blue-400 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <Heart className="w-8 h-8 text-wedding-blue-300" />
            </div>
            <div className="text-center mb-6">
              <div className="flex justify-center items-center mb-4">
                <div className="w-12 h-0.5 bg-wedding-blue-300"></div>
                <Gift className="w-6 h-6 text-wedding-blue-400 mx-4" />
                <div className="w-12 h-0.5 bg-wedding-blue-300"></div>
              </div>
              <h3 className="font-serif text-2xl text-wedding-blue-900">
                Regalos
              </h3>
              <div className="flex justify-center items-center mt-4">
                <div className="w-12 h-0.5 bg-wedding-blue-300"></div>
                <Gift className="w-6 h-6 text-wedding-blue-400 mx-4" />
                <div className="w-12 h-0.5 bg-wedding-blue-300"></div>
              </div>
            </div>
            <div className="space-y-4 text-wedding-blue-700 text-center">
              <p className="text-sm leading-relaxed">
                Tu presencia es el mejor regalo que podemos recibir. Si deseas
                obsequiarnos algo, hemos preparado algunas opciones:
              </p>
              <div className="space-y-3">
                <div className="bg-wedding-blue-50 rounded-lg p-3">
                  <h4 className="font-semibold text-sm mb-1">
                    Mesa de Regalos Liverpool
                  </h4>
                  <p className="text-xs text-wedding-blue-600">
                    Evento: [Número de evento]
                  </p>
                </div>
                <div className="bg-wedding-blue-50 rounded-lg p-3">
                  <h4 className="font-semibold text-sm mb-1">
                    Aportación Monetaria
                  </h4>
                  <p className="text-xs text-wedding-blue-600">
                    Para nuestro futuro juntos
                  </p>
                </div>
              </div>
              <p className="text-xs italic text-wedding-blue-600">
                "El amor es el regalo más grande de todos"
              </p>
            </div>
            <div className="absolute bottom-2 left-2 opacity-10">
              <Heart className="w-6 h-6 text-wedding-blue-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};