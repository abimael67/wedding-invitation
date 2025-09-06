import { useState } from "react";
import { Mail } from "lucide-react";
import imagesUrl from "../data/imagesUrl.json";
import { useGuestContext } from "../hooks/useGuestContext";
const Envelope = ({ setEnvelopeOpened }: { setEnvelopeOpened: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currentGuest } = useGuestContext();
  return (
    <div className="min-h-screen bg-gradient-to-br from-wedding-blue-50 via-vintage-white to-wedding-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="text-center max-w-md mx-auto">
        {currentGuest && (
          <div>
            <h1 className="text-4xl font-bold font-handwriting text-wedding-blue-800 mb-8 writing-text">
              {currentGuest?.name}
            </h1>
            <h3 className="text-lg font-serif text-wedding-blue-800 mb-4">
              Sus manos
            </h3>
          </div>
        )}
        {/* Envelope illustration */}
        <div className="relative mb-8">
          <div className="w-80 h-56 mx-auto relative">
            {/* Envelope body */}
            <div className="absolute inset-0 bg-gradient-to-br from-wedding-blue-100 to-wedding-blue-500 border-2 border-wedding-blue-200 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105">
              {/* Envelope flap */}
              <div
                className="absolute -top-1 left-0 right-0 h-20 bg-gradient-to-br from-wedding-blue-100 to-wedding-blue-200 transform origin-bottom transition-transform duration-700 hover:-rotate-12"
                style={{
                  clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                }}
              ></div>

              {/* Envelope content preview */}
              <div className=" absolute bottom-4 left-4 right-4 text-center">
                <img
                  src={imagesUrl.logo}
                  alt="Invitación de Boda"
                  className="w-16 h-16 mx-auto mb-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Open button */}
        <button
          onClick={setEnvelopeOpened}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative px-8 py-4 bg-gradient-to-r from-wedding-blue-600 to-wedding-blue-700 text-white font-semibold text-lg rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-wedding-blue-300"
        >
          <span className="relative z-10 flex items-center justify-center">
            <Mail
              className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                isHovered ? "rotate-12" : ""
              }`}
            />
            Abrir Invitación
          </span>

          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-wedding-blue-400 to-wedding-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

          {/* Sparkle effects */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
          <div
            className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </button>

        {/* Decorative elements */}
        <div className="mt-8 flex justify-center items-center space-x-4">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-wedding-blue-300"></div>

          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-wedding-blue-300"></div>
        </div>
        {currentGuest && (
          <p className="text-sm text-gray-600 mt-8 italic">
            Invitación valida para {currentGuest?.pax}{" "}
            {currentGuest?.pax === 1 ? "persona" : "personas"}
          </p>
        )}
        {!currentGuest && (
          <p className="text-sm text-gray-600 mt-8 italic">
            Invitado no encontrado
          </p>
        )}
      </div>
    </div>
  );
};

export default Envelope;
