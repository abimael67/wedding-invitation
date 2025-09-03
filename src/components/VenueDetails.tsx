import { Clock, MapPin, Heart } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export const VenueDetails = () => {
  const [venueRef, isVenueVisible] = useScrollAnimation();

  return (
    <section 
      ref={venueRef}
      className={`py-16 px-4 relative fade-in-section ${
        isVenueVisible ? 'visible' : ''
      }`}
    >
      {/* Decorative Border Frame */}
      <img
        src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/border%204.png"
        alt="Decorative border"
        className="absolute top-0 left-0 w-40 h-40 object-contain z-10"
      />

      <div className="absolute top-16 right-12 opacity-20">
        <Heart className="w-12 h-12 text-wedding-blue-400 transform -rotate-45" />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
            Detalles de la Boda
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
            <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ceremony */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-wedding-blue-400 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <Heart className="w-8 h-8 text-wedding-blue-300" />
            </div>
            <h3 className="font-serif text-2xl text-wedding-blue-800 mb-4 flex items-center">
              <Heart className="w-6 h-6 text-wedding-blue-400 mr-2" />
              Ceremonia
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-wedding-blue-600" />
                <span>3:00 PM</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-wedding-blue-600 mt-1" />
                <div>
                  <p>Iglesia Adventista del Séptimo Día - Libertad</p>
                  <p className="text-sm text-gray-600">
                    Calle 1, #2, Santiago
                  </p>
                </div>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/place/Iglesia+Adventista+Del+7mo+D%C3%ADa+Libertad/@19.4857117,-70.7224775,839m/data=!3m1!1e3!4m14!1m7!3m6!1s0x8eb1c6747ea5223d:0x70aa2edbb4262db1!2sIglesia+Adventista+Del+7mo+D%C3%ADa+Libertad!8m2!3d19.4855856!4d-70.7224636!16s%2Fg%2F1s04bxkmv!3m5!1s0x8eb1c6747ea5223d:0x70aa2edbb4262db1!8m2!3d19.4855856!4d-70.7224636!16s%2Fg%2F1s04bxkmv?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-wedding-blue-600 hover:text-wedding-blue-800 font-medium inline-block"
            >
              Ver en Mapa
            </a>
          </div>

          {/* Reception */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-wedding-blue-400 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <Heart className="w-8 h-8 text-wedding-blue-300" />
            </div>
            <h3 className="font-serif text-2xl text-wedding-blue-800 mb-4 flex items-center">
              <Heart className="w-6 h-6 text-wedding-blue-400 mr-2" />
              Recepción
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-wedding-blue-600" />
                <span>5:00 PM</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-wedding-blue-600 mt-1" />
                <div>
                  <p>Gazebo</p>
                  <p className="text-sm text-gray-600">
                    Av. Paseo de los Choferes, Urb. Vista Loma, Santiago
                  </p>
                </div>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/place/Urbanizaci%C3%B3n+Vista+Loma/@19.4907108,-70.6880853,839m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8eb1c5007a8840d9:0xb8fc7c83d9036a52!8m2!3d19.4907108!4d-70.6855104!16s%2Fg%2F11vm5ny591?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-wedding-blue-600 hover:text-wedding-blue-800 font-medium inline-block"
            >
              Ver en Mapa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};