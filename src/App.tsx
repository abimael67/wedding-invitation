import { useState, useEffect } from "react";
import "./index.css";

// Import components
import { Header } from "./components/Header";
import { Countdown } from "./components/Countdown";
import { VenueDetails } from "./components/VenueDetails";
import { PhotoGallery } from "./components/PhotoGallery";
import { Timeline } from "./components/Timeline";
import { RSVP } from "./components/RSVP";
import { DressCodeAndGifts } from "./components/DressCodeAndGifts";
import { FAQ } from "./components/FAQ";
import { Trivia } from "./components/Trivia";
import { Footer } from "./components/Footer";
//import Envelope from "./components/Envelope";

function App() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState("");
  // const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const intervalId = setInterval(
        () => setLoadingPhrase(getRandomLoadingPhrases()),
        2000
      );
      const imageUrls = [
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2660.jpg",
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2767.jpg",
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2807.jpg",
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2818.jpg",
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2821.jpg",
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2849.jpg",
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2827.jpg",
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2861.jpg",
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_3211.jpg",
        "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_3214.jpg",
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
        const startTime = Date.now();
        await Promise.all(loadPromises);
        const loadTime = Date.now() - startTime;
        const minLoadTime = 2000; // Minimum 2 seconds to show spinner

        if (loadTime < minLoadTime) {
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              setImagesLoaded(true);
            }, 2000);
          }, minLoadTime - loadTime);
        } else {
          setIsExiting(true);
          setTimeout(() => {
            setImagesLoaded(true);
          }, 2000);
        }
        clearInterval(intervalId);
      } catch (error) {
        console.error("Error loading images:", error);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setImagesLoaded(true);
          }, 2000);
        }, 2000); // Show spinner for 2 seconds even on error
      }
    };

    preloadImages();
  }, []);

  const getRandomLoadingPhrases = () => {
    const loadingPhrases = [
      "Preparando el vestido de Winny...",
      "Haciendo el peinado de Winny...",
      "Arreglando el ramo de flores...",
      "Ajustando el traje de Abi...",
      "Paseando a Kiwi...",
      "Organizando las mesas...",
      "Probando la comida...",
    ];

    return loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];
  };
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

  return (
    <>
      {/* Loading Spinner Overlay */}
      {!imagesLoaded && (
        <div
          className={`fixed inset-0 bg-[#0a1929] flex items-center justify-center z-50 transition-all duration-[2000ms] ${
            isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div
            className={`text-center transition-all duration-[2000ms] ${
              isExiting
                ? "opacity-0 scale-75 transform translate-y-4"
                : "opacity-100 scale-100 transform translate-y-0"
            }`}
          >
            <img
              src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/WA.png"
              alt="Loading..."
              className={`h-24 w-auto mx-auto drop-shadow-lg animate-spin transition-all duration-[2000ms] `}
            />
            <p
              className={`mt-4 text-white font-medium transition-all duration-[2000ms] ${
                isExiting
                  ? "opacity-0 transform translate-y-2"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              {loadingPhrase}
            </p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-vintage-cream">
        <Header />
        <Countdown onAddToCalendar={addToCalendar} />
        <VenueDetails />
        <DressCodeAndGifts />
        <Timeline />
        <PhotoGallery />
        <RSVP />
        <FAQ />
        <Trivia />
        <Footer />
      </div>
    </>
  );
}

export default App;
