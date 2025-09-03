import { Heart, Phone, Mail, MessageCircle } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-16 px-4 bg-vintage-cream relative">
      {/* Decorative elements */}
      <div className="absolute top-8 right-8 opacity-10">
        <Heart className="w-16 h-16 text-wedding-blue-300 transform rotate-45" />
      </div>
      <div className="absolute bottom-8 left-8 opacity-10">
        <Heart className="w-12 h-12 text-wedding-blue-400 transform -rotate-12" />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
            Contacto
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Bride Contact */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-wedding-blue-400 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <Heart className="w-8 h-8 text-wedding-blue-300" />
            </div>
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl text-wedding-blue-900 mb-2">
                Familia de la Novia
              </h3>
              <p className="text-wedding-blue-600">Para cualquier consulta</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-wedding-blue-500" />
                <div>
                  <p className="font-medium text-wedding-blue-900">Teléfono</p>
                  <p className="text-wedding-blue-700">+52 (xxx) xxx-xxxx</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-wedding-blue-500" />
                <div>
                  <p className="font-medium text-wedding-blue-900">Email</p>
                  <p className="text-wedding-blue-700">familia.novia@email.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-wedding-blue-500" />
                <div>
                  <p className="font-medium text-wedding-blue-900">WhatsApp</p>
                  <p className="text-wedding-blue-700">+52 (xxx) xxx-xxxx</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 opacity-10">
              <Heart className="w-6 h-6 text-wedding-blue-300" />
            </div>
          </div>

          {/* Groom Contact */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-wedding-blue-400 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <Heart className="w-8 h-8 text-wedding-blue-300" />
            </div>
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl text-wedding-blue-900 mb-2">
                Familia del Novio
              </h3>
              <p className="text-wedding-blue-600">Para cualquier consulta</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-wedding-blue-500" />
                <div>
                  <p className="font-medium text-wedding-blue-900">Teléfono</p>
                  <p className="text-wedding-blue-700">+52 (xxx) xxx-xxxx</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-wedding-blue-500" />
                <div>
                  <p className="font-medium text-wedding-blue-900">Email</p>
                  <p className="text-wedding-blue-700">familia.novio@email.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-wedding-blue-500" />
                <div>
                  <p className="font-medium text-wedding-blue-900">WhatsApp</p>
                  <p className="text-wedding-blue-700">+52 (xxx) xxx-xxxx</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 opacity-10">
              <Heart className="w-6 h-6 text-wedding-blue-300" />
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-wedding-blue-700 italic">
            "No dudes en contactarnos si tienes alguna pregunta. ¡Estamos aquí
            para ayudarte!"
          </p>
        </div>
      </div>
    </section>
  );
};