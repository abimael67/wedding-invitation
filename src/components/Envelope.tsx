import { useState } from "react";
import { Mail } from "lucide-react";
import imagesUrl from "../data/imagesUrl.json";
import { useGuestContext } from "../hooks/useGuestContext";
const Envelope = ({ setEnvelopeOpened }: { setEnvelopeOpened: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currentGuest } = useGuestContext();
  return (
    <div className="min-h-screen bg-gradient-to-br from-wedding-blue-50 via-vintage-white to-wedding-blue-100 flex items-center justify-center p-2 relative overflow-hidden">
      <div className="text-center max-w-md mx-auto">
        {currentGuest && (
          <div>
            <h1 className="text-4xl font-bold font-handwriting text-wedding-blue-800 mb-2 writing-text">
              {currentGuest?.name}
            </h1>
          </div>
        )}
        <div className="relative mb-4">
          <div className="w-80 h-60 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-wedding-blue-300 to-wedding-blue-500 border-2 border-wedding-blue-200 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105">
              <div className=" ">
                <div className="text-xl text-wedding-blue-900">Mesa</div>
                <div className="font-handwriting text-8xl text-wedding-blue-900 mt-10 underline">
                  {currentGuest?.table_number}
                </div>
                <img
                  src={imagesUrl.logo}
                  alt="Invitación de Boda"
                  className="w-12 h-12 mx-auto mb-2 absolute bottom-2 right-4"
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
          className="group relative px-8 py-2 bg-gradient-to-r from-wedding-blue-600 to-wedding-blue-700 text-white font-semibold text-md rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-wedding-blue-300"
        >
          <span className="relative z-10 flex items-center justify-center">
            <Mail
              className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                isHovered ? "rotate-12" : ""
              }`}
            />
            Ver Invitación
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

        {currentGuest && (
          <p className="text-sm text-gray-600 mt-8 italic">
            Asientos para {currentGuest?.pax}{" "}
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
