import { useState } from "react";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";

export const FAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Habrá transporte desde el hotel?",
      answer:
        "Sí, habrá transporte disponible desde los hoteles principales. Los detalles se enviarán por separado.",
    },
    {
      question: "¿La ceremonia será al aire libre?",
      answer:
        "Sí, la ceremonia será en un hermoso jardín al aire libre. En caso de lluvia, tenemos un plan alternativo bajo techo.",
    },
    {
      question: "¿Puedo traer niños?",
      answer:
        "¡Por supuesto! Los niños son bienvenidos. Habrá actividades especiales para ellos durante la recepción.",
    },
    {
      question: "¿Habrá música en vivo?",
      answer:
        "Sí, tendremos música en vivo durante la ceremonia y DJ para la recepción con música para todos los gustos.",
    },
    {
      question: "¿Qué pasa si tengo restricciones alimentarias?",
      answer:
        "Por favor indícanos tus restricciones en el formulario RSVP y nos aseguraremos de tener opciones adecuadas para ti.",
    },
  ];

  return (
    <section className="py-16 px-4 relative">
      {/* Decorative elements */}
      <div className="absolute top-8 right-8 opacity-10">
        <Heart className="w-16 h-16 text-wedding-blue-300 transform rotate-45" />
      </div>
      <div className="absolute bottom-8 left-8 opacity-10">
        <Heart className="w-12 h-12 text-wedding-blue-400 transform -rotate-12" />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
            Preguntas Frecuentes
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg border border-wedding-blue-100 overflow-hidden relative"
            >
              <div className="absolute top-2 right-2 opacity-10">
                <Heart className="w-6 h-6 text-wedding-blue-300" />
              </div>
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 text-left flex justify-between items-center hover:bg-wedding-blue-50 transition-colors"
              >
                <span className="font-medium text-wedding-blue-900 pr-8">
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-wedding-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-wedding-blue-600 flex-shrink-0" />
                )}
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4">
                  <div className="border-t border-wedding-blue-100 pt-4">
                    <p className="text-wedding-blue-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};