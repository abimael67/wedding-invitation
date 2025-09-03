import { useState } from "react";
import { Heart } from "lucide-react";

interface RSVPForm {
  name: string;
  email: string;
  phone: string;
  attending: string;
  guests: string;
  dietary: string;
  message: string;
}

export const RSVP = () => {
  const [rsvpForm, setRsvpForm] = useState<RSVPForm>({
    name: "",
    email: "",
    phone: "",
    attending: "",
    guests: "1",
    dietary: "",
    message: "",
  });

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Google Sheets integration would go here
    console.log("RSVP submitted:", rsvpForm);
    alert("Thank you for your RSVP! We'll be in touch soon.");
  };

  return (
    <section className="py-16 px-4 bg-wedding-blue-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 opacity-10">
        <Heart className="w-16 h-16 text-wedding-blue-300 transform rotate-45" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-10">
        <Heart className="w-12 h-12 text-wedding-blue-400 transform -rotate-12" />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
            RSVP
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
        </div>
        <form
          onSubmit={handleRsvpSubmit}
          className="bg-white rounded-lg shadow-lg p-6 space-y-4 border-t-4 border-wedding-blue-400 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2 opacity-10">
            <Heart className="w-8 h-8 text-wedding-blue-300" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre Completo"
              value={rsvpForm.name}
              onChange={(e) =>
                setRsvpForm({ ...rsvpForm, name: e.target.value })
              }
              className="w-full p-3 border border-wedding-blue-200 rounded-lg focus:ring-2 focus:ring-wedding-blue-500 focus:border-transparent"
              required
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={rsvpForm.email}
              onChange={(e) =>
                setRsvpForm({ ...rsvpForm, email: e.target.value })
              }
              className="w-full p-3 border border-wedding-blue-200 rounded-lg focus:ring-2 focus:ring-wedding-blue-500 focus:border-transparent"
              required
            />
          </div>
          <input
            type="tel"
            placeholder="Número de Teléfono"
            value={rsvpForm.phone}
            onChange={(e) =>
              setRsvpForm({ ...rsvpForm, phone: e.target.value })
            }
            className="w-full p-3 border border-wedding-blue-200 rounded-lg focus:ring-2 focus:ring-wedding-blue-500 focus:border-transparent"
          />
          <select
            value={rsvpForm.attending}
            onChange={(e) =>
              setRsvpForm({ ...rsvpForm, attending: e.target.value })
            }
            className="w-full p-3 border border-wedding-blue-200 rounded-lg focus:ring-2 focus:ring-wedding-blue-500 focus:border-transparent"
            required
          >
            <option value="">¿Asistirás a la boda?</option>
            <option value="yes">¡Sí, estaré ahí!</option>
            <option value="no">Lo siento, no podré asistir</option>
          </select>
          <select
            value={rsvpForm.guests}
            onChange={(e) =>
              setRsvpForm({ ...rsvpForm, guests: e.target.value })
            }
            className="w-full p-3 border border-wedding-blue-200 rounded-lg focus:ring-2 focus:ring-wedding-blue-500 focus:border-transparent"
          >
            <option value="1">1 Invitado</option>
            <option value="2">2 Invitados</option>
            <option value="3">3 Invitados</option>
            <option value="4">4 Invitados</option>
          </select>
          <input
            type="text"
            placeholder="Restricciones alimentarias o alergias"
            value={rsvpForm.dietary}
            onChange={(e) =>
              setRsvpForm({ ...rsvpForm, dietary: e.target.value })
            }
            className="w-full p-3 border border-wedding-blue-200 rounded-lg focus:ring-2 focus:ring-wedding-blue-500 focus:border-transparent"
          />
          <textarea
            placeholder="Mensaje especial para la pareja"
            value={rsvpForm.message}
            onChange={(e) =>
              setRsvpForm({ ...rsvpForm, message: e.target.value })
            }
            rows={3}
            className="w-full p-3 border border-wedding-blue-200 rounded-lg focus:ring-2 focus:ring-wedding-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-wedding-blue-600 text-white py-3 rounded-lg font-medium hover:bg-wedding-blue-700 transition-colors"
          >
            Enviar RSVP
          </button>
        </form>
      </div>
    </section>
  );
};