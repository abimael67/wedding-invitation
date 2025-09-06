import { useState, useEffect } from "react";
import "./index.css";
import imagesUrl from "./data/imagesUrl.json";

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
import { Play } from "lucide-react";
import Envelope from "./components/Envelope";
import { GuestProvider } from "./contexts/GuestContext";

function App() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState("");
  const [audioStarted, setAudioStarted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const playlist = [
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/Rewrite-the-Stars-Piano-Instrumental.mp3",
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/ony-Ann-ICARUS-feat-ARKAI-Orchestral-Version-Official.mp3",
    "https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/Yiruma-River-Flows-in-You.mp3",
  ];

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
              // Start audio after loading is complete
              startBackgroundMusic();
            }, 2000);
          }, minLoadTime - loadTime);
        } else {
          setIsExiting(true);
          setTimeout(() => {
            setImagesLoaded(true);
            // Start audio after loading is complete
            startBackgroundMusic();
          }, 2000);
        }
        clearInterval(intervalId);
      } catch (error) {
        console.error("Error loading images:", error);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setImagesLoaded(true);
            // Start audio after loading is complete
            startBackgroundMusic();
          }, 2000);
        }, 2000); // Show spinner for 2 seconds even on error
      }
    };

    preloadImages();
  }, []);

  const startBackgroundMusic = () => {
    if (!audioStarted) {
      // Start with a random song
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentSongIndex(randomIndex);

      const audio = document.getElementById(
        "background-music"
      ) as HTMLAudioElement;
      if (audio) {
        audio.src = playlist[randomIndex];
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Audio autoplay prevented:", error);
            // Add click listener to start audio on first user interaction
            const startAudioOnClick = () => {
              audio.play().then(() => {
                setIsPlaying(true);
              });
              setAudioStarted(true);
              document.removeEventListener("click", startAudioOnClick);
            };
            document.addEventListener("click", startAudioOnClick);
          });
        setAudioStarted(true);
      }
    }
  };

  const playNextSong = () => {
    const audio = document.getElementById(
      "background-music"
    ) as HTMLAudioElement;
    if (audio) {
      const nextIndex = (currentSongIndex + 1) % playlist.length;
      setCurrentSongIndex(nextIndex);
      audio.src = playlist[nextIndex];
      audio.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const toggleMusic = () => {
    const audio = document.getElementById(
      "background-music"
    ) as HTMLAudioElement;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => {
          setIsPlaying(true);
        });
      }
    }
  };

  useEffect(() => {
    const audio = document.getElementById(
      "background-music"
    ) as HTMLAudioElement;
    if (audio) {
      const handleSongEnd = () => {
        playNextSong();
      };
      audio.addEventListener("ended", handleSongEnd);
      return () => audio.removeEventListener("ended", handleSongEnd);
    }
  }, [currentSongIndex]);

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
    <GuestProvider>
      {/* Background Music */}
      <audio id="background-music" preload="auto" style={{ display: "none" }} />

      {/* Floating Music Control Button */}
      {audioStarted && isEnvelopeOpened && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 w-14 h-14 bg-wedding-blue-600 hover:bg-wedding-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group hover:scale-110 wave-button"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <>
              <span></span>
              <span></span>
              <span></span>
            </>
          ) : (
            <Play />
          )}
        </button>
      )}

      {/* Show Envelope after loading, before main content */}
      {imagesLoaded && !isEnvelopeOpened && (
        <Envelope
          setEnvelopeOpened={() => {
            setIsTransitioning(true);
            setTimeout(() => {
              setIsEnvelopeOpened(true);
              setIsTransitioning(false);
            }, 800);
          }}
        />
      )}

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
              src={imagesUrl.logo}
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

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-wedding-pink-50 via-white to-wedding-blue-50 transition-opacity duration-800"></div>
      )}

      {/* Main Wedding Invitation Content - Pre-loaded but hidden until envelope opens */}
      {imagesLoaded && (
        <div
          className={`min-h-screen bg-vintage-cream ${
            isEnvelopeOpened ? "animate-fade-in-up" : "invisible fixed -z-10"
          }`}
        >
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
      )}
    </GuestProvider>
  );
}

export default App;
