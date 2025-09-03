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
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
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
    <div className="min-h-screen bg-vintage-cream">
      <Header />
      <Countdown onAddToCalendar={addToCalendar} />
      <VenueDetails />
      <PhotoGallery />
      <Timeline />
      <RSVP />
      <DressCodeAndGifts />
      <FAQ />
      <Trivia />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
