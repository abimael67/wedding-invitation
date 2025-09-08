import { Heart, Shirt, Gift } from "lucide-react";

export const DressCodeAndGifts = () => {
  return (
    <section className="py-4 px-4 relative">
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
                <img
                  src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/Couple.png"
                  className="w-16 h-auto"
                  alt="Wedding Couple"
                />
              </div>
            </div>
            <div className="space-y-4 text-wedding-blue-700">
              <div className="text-center">
                <h4 className="font-semibold text-lg mb-2">Formal Elegante</h4>
                <p className="text-sm leading-relaxed">
                  Te invitamos a vestir con elegancia para celebrar este día
                  especial.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2 text-center">
                  Evitar Colores
                </h4>
                <div className="flex items-center justify-center">
                  <span className="circle bg-wedding-blue-400 w-4 h-4 rounded-full inline-block mr-2"></span>
                  <span className="circle bg-wedding-blue-600 w-4 h-4 rounded-full inline-block mr-2"></span>
                  <span className="circle bg-wedding-blue-900 w-4 h-4 rounded-full inline-block mr-2"></span>
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
                obsequiarnos algo adicional, puedes hacerlo a las siguientes
                cuentas:
              </p>
              <div className="space-y-3">
                <div className="bg-wedding-blue-50 rounded-lg p-3">
                  <h4 className="font-semibold text-sm mb-1">29727570010</h4>
                  <p className="text-xs text-wedding-blue-600">
                    Winnifer Vargas
                  </p>
                  <p className="text-xs text-wedding-blue-600">
                    Banco BHD León
                  </p>
                </div>
                <div className="bg-wedding-blue-50 rounded-lg p-3">
                  <h4 className="font-semibold text-sm mb-1">810962571</h4>
                  <p className="text-xs text-wedding-blue-600">Jose Martinez</p>
                  <p className="text-xs text-wedding-blue-600">
                    Banco Popular Dominicano
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
