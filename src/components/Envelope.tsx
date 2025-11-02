import { useState } from "react";
import { Church, Mail, PartyPopper } from "lucide-react";
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
          <div className="w-80 h-60 relative mx-auto">
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
        <br />

        <a
          href="https://www.google.com/maps/place/Iglesia+Adventista+Del+7mo+D%C3%ADa+Libertad/@19.4857117,-70.7224775,839m/data=!3m1!1e3!4m14!1m7!3m6!1s0x8eb1c6747ea5223d:0x70aa2edbb4262db1!2sIglesia+Adventista+Del+7mo+D%C3%ADa+Libertad!8m2!3d19.4855856!4d-70.7224636!16s%2Fg%2F1s04bxkmv!3m5!1s0x8eb1c6747ea5223d:0x70aa2edbb4262db1!8m2!3d19.4855856!4d-70.7224636!16s%2Fg%2F1s04bxkmv?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
          className="mt-4 text-wedding-blue-600 hover:text-wedding-blue-800 font-medium inline-block"
        >
          <span className="relative z-10 flex items-center justify-center">
            <Church
              className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                isHovered ? "rotate-12" : ""
              }`}
            />
            Ver ubicación de ceremonia
          </span>
        </a>
        <a
          href="https://www.google.com/maps/place/Urbanizaci%C3%B3n+Vista+Loma/@19.4907108,-70.6880853,839m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8eb1c5007a8840d9:0xb8fc7c83d9036a52!8m2!3d19.4907108!4d-70.6855104!16s%2Fg%2F11vm5ny591?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
          className="mt-2 text-wedding-blue-600 hover:text-wedding-blue-800 font-medium inline-block"
        >
          <span className="relative z-10 flex items-center justify-center">
            <PartyPopper
              className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                isHovered ? "rotate-12" : ""
              }`}
            />
            Ver ubicación de recepción
          </span>
        </a>

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
