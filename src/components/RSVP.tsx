import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Confetti from "../Shared/Confetti";
import { useGuestContext, useGuestRSVP } from "../hooks/useGuestContext";
interface RSVPForm {
  name: string;
  phone: string;
  attending: string;
  pax: string;
  message: string;
}
// const googleSheetWebAppUrl =
//   "https://script.google.com/macros/s/AKfycbyM7ddg9rpR2UvsydGrdYGTNpj1RaygAxHVPJYpo6vihFnvhpI-8OtbNiHlkGqsO_iH/exec";

export const RSVP = () => {
  const [rsvpForm, setRsvpForm] = useState<RSVPForm>({
    name: "",
    phone: "",
    attending: "",
    pax: "1",
    message: "",
  });
  const [responseSent, setResponseSent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { currentGuest } = useGuestContext();
  const { submitRSVP, submitting } = useGuestRSVP();
  // Show confetti for 5 seconds when user confirms attendance
  useEffect(() => {
    if (currentGuest && currentGuest.attending !== null) {
      setRsvpForm({
        ...rsvpForm,
        attending: currentGuest.attending ? "yes" : "no",
        pax: String(currentGuest.pax || 1),
        message: currentGuest.message || "",
      });
      setResponseSent(true);
    }
  }, [currentGuest]);

  useEffect(() => {
    if (responseSent) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  }, [responseSent]);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) {
      return;
    }
    if (!currentGuest) {
      alert(
        "No se pudo encontrar el invitado. Por favor contacta a los organizadores."
      );
      return;
    }

    try {
      submitRSVP({
        attending: rsvpForm.attending === "yes",
        pax: Number(rsvpForm.pax),
        message: rsvpForm.message,
      });
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    }
    setResponseSent(true);
  };
  if (!currentGuest) {
    return null;
  }
  return (
    <section
      className="py-8 px-4 bg-vintage-white relative"
      style={{
        backgroundImage: `url('https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/flowers%20bg.png')`,
        backgroundRepeat: "repeat",
        backgroundSize: "150px 200px",
        backgroundPosition: "center",
        opacity: 0.95,
      }}
    >
      <div className="absolute inset-0 bg-vintage-cream/80 pointer-events-none"></div>
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 opacity-10 z-10">
        <Heart className="w-16 h-16 text-wedding-blue-300 transform rotate-45" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-10 z-10">
        <Heart className="w-12 h-12 text-wedding-blue-400 transform -rotate-12" />
      </div>
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
            CONFIRMACIÓN
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
        </div>
        {responseSent && (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 border-t-4 border-wedding-blue-400 relative overflow-hidden">
            {rsvpForm.attending === "no" && (
              <>
                <p className="text-center text-wedding-blue-900">
                  Gracias por informarnos.
                </p>
                <p className="text-center text-wedding-blue-900">
                  Te echaremos en falta.
                </p>
              </>
            )}
            {responseSent && rsvpForm.attending === "yes" && (
              <>
                {showConfetti && <Confetti />}

                <div className="text-center bg-gradient-to-r from-pink-50 to-blue-50 p-6 rounded-lg border-2 border-pink-200 mt-4">
                  <div className="flex justify-center items-center mb-3">
                    <Heart className="w-6 h-6 text-pink-500 mx-1 animate-pulse" />
                    <Heart className="w-8 h-8 text-red-500 mx-1 animate-bounce" />
                    <Heart className="w-6 h-6 text-pink-500 mx-1 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold text-wedding-blue-900 mb-2">
                    ¡Gracias!
                  </h3>
                  <p className="text-lg text-wedding-blue-800 mb-2">
                    ¡Qué emoción saber que estarás con nosotros en este día tan
                    especial!
                  </p>
                  <p className="text-wedding-blue-700">
                    Tu presencia hará que nuestra celebración sea aún más
                    perfecta. ✨
                  </p>
                  <div className="flex justify-center items-center mt-3">
                    <span className="mx-2 text-wedding-blue-600 font-medium">
                      {`${
                        currentGuest.pax === 1
                          ? "Te esperamos con muchísima alegría"
                          : `Los esperamos a los ${currentGuest.pax} con mucha alegría`
                      }`}
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className="text-center">
              <button
                onClick={() => {
                  setResponseSent(false);
                }}
                className="bg-wedding-blue-500 hover:bg-wedding-blue-600 text-white py-2 px-4 rounded mt-4"
              >
                Cambiar respuesta
              </button>
            </div>
          </div>
        )}
        {!responseSent && (
          <form
            onSubmit={handleRsvpSubmit}
            className="bg-vintage-white rounded-lg shadow-lg p-6 space-y-4 border-t-4 border-wedding-blue-400 relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 opacity-10">
              <Heart className="w-8 h-8 text-wedding-blue-300" />
            </div>
            <div>
              <h3 className="font-handwriting text-5xl text-wedding-blue-900 mb-4">
                {currentGuest.name}
              </h3>
              <h4 className="font-serif text-lg text-wedding-blue-900">
                Para nosotros es un honor poder contar con tu presencia en este
                evento que marcará el inicio de una nueva etapa en nuestras
                vidas. Por favor, confirma tu asistencia para prepararte un
                lugar especial.
              </h4>
            </div>
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
            {rsvpForm.attending &&
              currentGuest.maxPax > 1 &&
              rsvpForm.attending === "yes" && (
                <select
                  value={rsvpForm.pax}
                  onChange={(e) =>
                    setRsvpForm({ ...rsvpForm, pax: e.target.value })
                  }
                  className="w-full p-3 border border-wedding-blue-200 rounded-lg focus:ring-2 focus:ring-wedding-blue-500 focus:border-transparent"
                >
                  <option value="">¿Cuantos acompañantes llevarás?</option>
                  <option value="1">Iré yo solo/a</option>
                  {currentGuest.maxPax > 1 &&
                    Array.from({ length: currentGuest.maxPax - 1 }).map(
                      (_, index) => (
                        <option key={index} value={index + 2}>
                          Llevaré {index + 1} acompañante
                          {index + 1 > 1 ? "s" : ""}
                        </option>
                      )
                    )}
                </select>
              )}

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
              disabled={rsvpForm.attending === ""}
              type="submit"
              className="w-full bg-wedding-blue-600 text-white py-3 rounded-lg font-medium hover:bg-wedding-blue-700 transition-colors disabled:bg-wedding-blue-300 disabled:cursor-not-allowed"
            >
              {submitting ? "Enviando..." : "Enviar RSVP"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
