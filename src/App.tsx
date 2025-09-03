import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Gift,
  Phone,
  Mail,
} from "lucide-react";

// Custom hook for scroll animation
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

function App() {
  const [countdownRef, isCountdownVisible] = useScrollAnimation();
  const [venueRef, isVenueVisible] = useScrollAnimation();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [hasHeroAnimated, setHasHeroAnimated] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    email: "",
    phone: "",
    attending: "",
    guests: "1",
    dietary: "",
    message: "",
  });

  const weddingDate = new Date("2025-11-02T15:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hasHeroAnimated]);

  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/5.png",
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/hinge.png",
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/6.png",
      ];

      const loadPromises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });
      });

      try {
        await Promise.all(loadPromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        setImagesLoaded(true); // Continue even if some images fail
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "hero-section" && !hasHeroAnimated) {
            if (entry.isIntersecting) {
              setIsHeroVisible(true);
              setHasHeroAnimated(true);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -200px 0px",
      }
    );

    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, [hasHeroAnimated, imagesLoaded]);

  const addToCalendar = () => {
    const startDate = "20251102T160000Z";
    const endDate = "20251102T230000Z";
    const title = "Winnifer & Abimael Wedding";
    const details = "Unete a nosotros en nuestro día especial!";
    const location = "Gazebo Res. Vista Loma, Santiago";

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(location)}`;
    window.open(googleUrl, "_blank");
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Google Sheets integration would go here
    console.log("RSVP submitted:", rsvpForm);
    alert("Thank you for your RSVP! We'll be in touch soon.");
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="relative">
        <img
          src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/5.png"
          alt="Wedding"
          id="portrait"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-wedding-blue-900"></div>
        <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-center">
            <img
              src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/WA.png"
              alt="W & A"
              className="h-36 md:h-32 lg:h-45 w-auto drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      <section className="bg-wedding-blue-900 text-white py-8 px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4">
            <span className="text-6xl text-wedding-blue-300">"</span>
          </div>
          <p className="text-lg md:text-xl font-light italic leading-relaxed mb-4">
            Una sola persona puede ser vencida, pero dos ya pueden defenderse; y
            si tres unen sus fuerzas, ya no es fácil derrotarlas.
          </p>
          <p className="text-wedding-blue-300 text-sm">Eclesiastés 4:12</p>
          <div className="mt-4">
            <span className="text-6xl text-wedding-blue-300">"</span>
          </div>
        </div>
        {/* Hinge Images for Notebook Effect */}
        <div className="absolute w-full z-30" style={{ bottom: "3rem" }}>
          <img
            src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/hinge.png"
            alt="Notebook Hinge Left"
            className="absolute -left-5"
            style={{ width: "100px" }}
          />
          <img
            src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/hinge.png"
            alt="Notebook Hinge Right"
            className="absolute right-2"
            style={{ width: "100px" }}
          />
        </div>
      </section>

      {/* Hero Section */}
      <section
        id="hero-section"
        className={`min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-wedding-blue-50 to-vintage-white relative page-flip-section ${
          isHeroVisible ? "visible" : ""
        }`}
      >
        <div className="text-center max-w-lg">
          <div className="mt-8">
            <span className="font-cursive text-6xl mt-4 -ml-24">Winnifer</span>
          </div>
          <div className="-mt-4 -ml-16">
            <span className="font-cursive text-2xl">&</span>
          </div>
          <div className="-mt-4">
            <span className="font-cursive text-6xl mt-16 -mr-24">Abimael</span>
          </div>

          <div>
            <p className="text-md text-wedding-blue-700  mt-4">
              NOS COMPLACE INVITARTE A NUESTRA BODA
            </p>

            <div>
              <img
                src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/minirings.png"
                alt="Wedding rings"
                className="w-12 h-auto object-cover mx-auto"
              />
            </div>

            {/* Portrait Photo Section */}
            <div className="mb-8">
              <div className="relative mx-auto w-70 h-70 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/6.png"
                  alt="Wedding"
                  className="w-23 h-auto object-cover rounded-full"
                />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="text-lg font-semibold tracking-wider text-wedding-blue-600 mb-2">
                NOVIEMBRE
              </div>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-sm font-medium text-wedding-blue-500">
                  DOM
                </span>
                <span className="text-2xl font-bold text-wedding-blue-400">
                  |
                </span>
                <span className="text-4xl font-bold text-wedding-blue-700 bg-wedding-blue-100 px-4 py-2 rounded-lg shadow-md border-2 border-wedding-blue-300">
                  02
                </span>
                <span className="text-2xl font-bold text-wedding-blue-400">
                  |
                </span>
                <span className="text-sm font-medium text-wedding-blue-500">
                  2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section 
        ref={countdownRef}
        className={`py-16 px-4 bg-wedding-blue-900 text-white overflow-x-hidden relative fade-in-section ${
          isCountdownVisible ? 'visible' : ''
        }`}
      >
        <img
          src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/separator%201.png"
          alt="Separator"
          className="w-[20rem] h-auto object-cover mx-auto -mt-[7rem] -mb-8"
        />
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-row justify-center items-center car-drag-animation overflow-hidden">
            <div className="mb-2">
              {/* Minimalistic Sign */}
              <div className="bg-vintage-cream border-2 border-wedding-blue-300 rounded-lg shadow-lg px-6 py-3">
                <h2 className="font-serif text-2xl md:text-3xl text-wedding-blue-800 font-semibold text-center">
                  Cuenta Regresiva
                </h2>
              </div>
            </div>
            <span>
              <img
                src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/carhd.png"
                alt="Car"
                className="w-[10rem] h-auto object-cover mx-auto mb-10"
              />
            </span>
          </div>
          {/* Circular Progress Countdown */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-80 h-80 mb-8">
              {/* Background Circle */}
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Progress Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#ffffff"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${
                    2 *
                    Math.PI *
                    45 *
                    (1 -
                      (() => {
                        const weddingDate = new Date("2025-11-02T00:00:00");
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        yesterday.setHours(0, 0, 0, 0);
                        const now = new Date();

                        const totalTime =
                          weddingDate.getTime() - yesterday.getTime();
                        const elapsedTime = now.getTime() - yesterday.getTime();

                        return Math.min(
                          Math.max(elapsedTime / totalTime, 0),
                          1
                        );
                      })())
                  }`}
                  className="transition-all duration-1000 ease-out"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))",
                  }}
                />
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {timeLeft.days}
                  </div>
                  <div className="text-lg uppercase tracking-wide mb-4">
                    Días Restantes
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-xl font-semibold">
                        {timeLeft.hours}
                      </div>
                      <div className="text-xs opacity-80">Horas</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">
                        {timeLeft.minutes}
                      </div>
                      <div className="text-xs opacity-80">Minutos</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">
                        {timeLeft.seconds}
                      </div>
                      <div className="text-xs opacity-80">Segundos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={addToCalendar}
            className="bg-white text-wedding-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-vintage-cream transition-colors inline-flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Agregar al Calendario
          </button>
        </div>
      </section>

      {/* Wedding Details */}
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

      {/* Photo Placeholder */}
      <section className="py-16 px-4 bg-vintage-cream relative">
        {/* Decorative elements */}
        <div className="absolute top-12 left-4 opacity-15">
          <Heart className="w-20 h-20 text-wedding-blue-300 transform rotate-45" />
        </div>
        <div className="absolute bottom-12 right-4 opacity-15">
          <Heart className="w-16 h-16 text-wedding-blue-400 transform -rotate-12" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex justify-center items-center mb-4">
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
              <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
              Nuestra Historia
            </h2>
            <div className="flex justify-center items-center mt-4">
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
              <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-lg p-6 border-2 border-wedding-blue-100 hover:border-wedding-blue-300 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-2 right-2 opacity-20">
                  <Heart className="w-6 h-6 text-wedding-blue-300" />
                </div>
                <div className="aspect-square bg-gradient-to-br from-wedding-blue-100 to-vintage-cream rounded-lg mb-4 flex items-center justify-center border-4 border-white shadow-md">
                  <Heart className="w-12 h-12 text-wedding-blue-400" />
                </div>
                <p className="text-sm text-wedding-blue-700 font-medium">
                  Foto pre-boda {i}
                </p>
                <div className="absolute bottom-2 left-2 opacity-20">
                  <Heart className="w-4 h-4 text-wedding-blue-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-8 right-8 opacity-15">
          <Heart className="w-14 h-14 text-wedding-blue-300 transform rotate-12" />
        </div>
        <div className="absolute bottom-8 left-8 opacity-15">
          <Heart className="w-10 h-10 text-wedding-blue-400 transform -rotate-45" />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
              <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
              <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
              Cronograma del Día de la Boda
            </h2>
            <div className="flex justify-center items-center mt-4">
              <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
              <Heart className="w-6 h-6 text-wedding-blue-400 mx-4" />
              <div className="w-16 h-0.5 bg-wedding-blue-300"></div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-wedding-blue-300"></div>
            {[
              { time: "3:00 PM", event: "Llegada de invitados y ubicación" },
              { time: "4:00 PM", event: "Inicia la ceremonia de boda" },
              { time: "4:30 PM", event: "Termina ceremonia, hora del cóctel" },
              { time: "5:00 PM", event: "Recepción" },
              { time: "6:00 PM", event: "Actividad 1" },
              { time: "7:00 PM", event: "Actividad 2" },
              { time: "8:00 PM", event: "Cena" },
              { time: "9:00 PM", event: "Actividad 3" },
              { time: "10:00 PM", event: "Actividad 4" },
              { time: "11:00 PM", event: "Despedida y agradecimientos" },
            ].map((item, index) => (
              <div key={index} className="relative flex items-center mb-8">
                <div className="w-8 h-8 bg-wedding-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold z-10">
                  {index + 1}
                </div>
                <div className="ml-6 bg-white rounded-lg shadow-lg p-4 flex-1">
                  <div className="font-bold text-wedding-blue-800">
                    {item.time}
                  </div>
                  <div className="text-wedding-blue-600">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Form */}
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

      {/* Dress Code & Gifts */}
      <section className="py-16 px-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-12 left-4 opacity-15">
          <Heart className="w-14 h-14 text-wedding-blue-300 transform rotate-12" />
        </div>
        <div className="absolute bottom-12 right-4 opacity-15">
          <Heart className="w-10 h-10 text-wedding-blue-400 transform -rotate-45" />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dress Code */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-wedding-blue-400 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-10">
                <Heart className="w-8 h-8 text-wedding-blue-300" />
              </div>
              <h3 className="font-serif text-2xl text-wedding-blue-800 mb-4 flex items-center">
                <Heart className="w-6 h-6 text-wedding-blue-400 mr-2" />
                Código de Vestimenta
              </h3>
              <p className="text-wedding-blue-600 mb-4">Formal</p>
              <ul className="text-sm text-wedding-blue-700 space-y-2">
                <li>
                  • Evite los colores:{" "}
                  <span className="w-4 h-4 rounded-full bg-wedding-blue-400 inline-block mr-1"></span>
                  <span className="w-4 h-4 rounded-full bg-wedding-blue-500 inline-block mr-1"></span>
                  <span className="w-4 h-4 rounded-full bg-wedding-blue-600 inline-block"></span>
                </li>
              </ul>
            </div>

            {/* Gifts */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-wedding-blue-400 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-10">
                <Heart className="w-8 h-8 text-wedding-blue-300" />
              </div>
              <h3 className="font-serif text-2xl text-wedding-blue-800 mb-4 flex items-center gap-2">
                <Gift className="w-6 h-6 text-wedding-blue-400" />
                Regalos de Boda
              </h3>
              <p className="text-wedding-blue-600 mb-4">
                Tu presencia es el mejor regalo, pero si deseas contribuir:
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-wedding-blue-800">
                    Cuenta Bancaria 1:
                  </p>
                  <p className="text-wedding-blue-600">
                    Cuenta: 1234-5678-9012
                  </p>
                  <p className="text-wedding-blue-600">Banco: Banco Nacional</p>
                </div>
                <div>
                  <p className="font-medium text-wedding-blue-800">
                    Cuenta Bancaria 2:
                  </p>
                  <p className="text-wedding-blue-600">
                    Cuenta: 9876-5432-1098
                  </p>
                  <p className="text-wedding-blue-600">
                    Banco: Cooperativa de Crédito
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-vintage-cream relative">
        {/* Decorative elements */}
        <div className="absolute top-8 left-8 opacity-15">
          <Heart className="w-16 h-16 text-wedding-blue-300 transform rotate-45" />
        </div>
        <div className="absolute bottom-8 right-8 opacity-15">
          <Heart className="w-12 h-12 text-wedding-blue-400 transform -rotate-12" />
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
              <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
              Preguntas Frecuentes
            </h2>
            <div className="flex justify-center items-center mt-4">
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
              <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            </div>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "¿A qué hora debo llegar?",
                a: "Por favor llega 15-30 minutos antes de que comience la ceremonia a las 4:00 PM para ubicarte.",
              },
              {
                q: "¿Hay estacionamiento disponible?",
                a: "Sí, ambos lugares tienen estacionamiento pero no son suficientes. En ese caso se pueden estacionar en las calles circuncidantes.",
              },
              {
                q: "¿Puedo traer acompañante?",
                a: "Los acompañantes están limitados por el número máximo de tu invitación.",
              },
              {
                q: "¿La boda es apta para niños?",
                a: "No, la boda es exclusivamente para adultos.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-wedding-blue-400 relative overflow-hidden"
              >
                <div className="absolute top-2 right-2 opacity-10">
                  <Heart className="w-6 h-6 text-wedding-blue-300" />
                </div>
                <h4 className="font-medium text-wedding-blue-800 mb-2 flex items-center">
                  <Heart className="w-4 h-4 text-wedding-blue-400 mr-2" />
                  {faq.q}
                </h4>
                <p className="text-wedding-blue-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trivia */}
      <section className="py-16 px-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-12 left-4 opacity-15">
          <Heart className="w-18 h-18 text-wedding-blue-300 transform rotate-12" />
        </div>
        <div className="absolute bottom-12 right-4 opacity-15">
          <Heart className="w-14 h-14 text-wedding-blue-400 transform -rotate-45" />
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
              <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900">
              Datos Curiosos Sobre Nosotros
            </h2>
            <div className="flex justify-center items-center mt-4">
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
              <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Nos conocimos en una cafetería un martes lluvioso",
              "Nuestra primera cita duró 8 horas",
              "Hemos viajado juntos a 12 países",
              "Abimael me propuso matrimonio durante una caminata al atardecer",
              "A ambos nos encanta cocinar comida italiana",
              "Nuestra película favorita es La Princesa Prometida",
            ].map((fact, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center border-2 border-wedding-blue-100 hover:border-wedding-blue-300 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-2 right-2 opacity-20">
                  <Heart className="w-5 h-5 text-wedding-blue-300" />
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-wedding-blue-100 to-vintage-cream rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-white shadow-sm">
                  <Heart className="w-6 h-6 text-wedding-blue-400" />
                </div>
                <p className="text-wedding-blue-700 font-medium">{fact}</p>
                <div className="absolute bottom-2 left-2 opacity-20">
                  <Heart className="w-4 h-4 text-wedding-blue-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 bg-vintage-cream relative">
        {/* Decorative elements */}
        <div className="absolute top-8 left-8 opacity-15">
          <Heart className="w-20 h-20 text-wedding-blue-300 transform rotate-12" />
        </div>
        <div className="absolute bottom-8 right-8 opacity-15">
          <Heart className="w-16 h-16 text-wedding-blue-400 transform -rotate-45" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-10">
          <Heart className="w-8 h-8 text-wedding-blue-300 transform rotate-45" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-10">
          <Heart className="w-10 h-10 text-wedding-blue-400 transform -rotate-12" />
        </div>
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex justify-center items-center mb-4">
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
              <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-wedding-blue-900 mb-2">
              ¿Preguntas?
            </h2>
            <div className="flex justify-center items-center">
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
              <Heart className="w-8 h-8 text-wedding-blue-400 mx-4" />
              <div className="w-20 h-0.5 bg-wedding-blue-300"></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-wedding-blue-100 relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-20">
              <Heart className="w-6 h-6 text-wedding-blue-300" />
            </div>
            <div className="absolute bottom-4 left-4 opacity-20">
              <Heart className="w-6 h-6 text-wedding-blue-300" />
            </div>
            <p className="text-wedding-blue-700 mb-8 text-lg leading-relaxed">
              ¡No dudes en contactarnos si tienes alguna pregunta sobre nuestro
              día especial!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 bg-wedding-blue-600 text-white rounded-lg px-6 py-3 hover:bg-wedding-blue-700 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                (123) 456-7890
              </a>
              <a
                href="mailto:winnifer.abimael@wedding.com"
                className="flex items-center gap-2 bg-wedding-blue-600 text-white rounded-lg px-6 py-3 hover:bg-wedding-blue-700 transition-colors shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-wedding-blue-900 to-wedding-blue-800 text-white py-12 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 left-8 opacity-20">
          <Heart className="w-12 h-12 text-white transform rotate-12" />
        </div>
        <div className="absolute bottom-4 right-8 opacity-20">
          <Heart className="w-10 h-10 text-white transform -rotate-45" />
        </div>
        <div className="absolute top-1/2 left-1/3 opacity-10">
          <Heart className="w-6 h-6 text-white transform rotate-45" />
        </div>
        <div className="absolute top-1/3 right-1/3 opacity-10">
          <Heart className="w-8 h-8 text-white transform -rotate-12" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-0.5 bg-white opacity-50"></div>
            <Heart className="w-8 h-8 text-white mx-4" />
            <div className="w-16 h-0.5 bg-white opacity-50"></div>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl mb-2">
            Winnifer & Abimael
          </h3>
          <p className="text-wedding-blue-200 text-lg mb-4">
            2 de Noviembre, 2025
          </p>
          <div className="flex justify-center items-center">
            <div className="w-16 h-0.5 bg-white opacity-50"></div>
            <Heart className="w-6 h-6 text-white mx-4" />
            <div className="w-16 h-0.5 bg-white opacity-50"></div>
          </div>
          <p className="text-wedding-blue-300 text-sm mt-6 italic">
            "El amor es paciente, el amor es bondadoso"
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
