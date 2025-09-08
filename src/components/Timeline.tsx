import {
  Heart,
  Church,
  Car,
  PartyPopperIcon,
  Smile,
  GlassWater,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export const Timeline = () => {
  const [timelineRef, isTimelineVisible] = useScrollAnimation();
  const timelineEvents = [
    { time: "3:00 PM", event: "Inicia la ceremonia de boda", icon: Church },
    {
      time: "4:00 PM",
      event: "Fin de ceremonia. Traslado a recepción",
      icon: Car,
    },
    { time: "4:30 PM", event: "Cóctel de bienvenida", icon: GlassWater },
    { time: "5:00 PM", event: "Inicia la celebración", icon: PartyPopperIcon },
    {
      time: "9:00 PM",
      event: "Despedida, agradecimientos y cierre",
      icon: Smile,
    },
  ];

  return (
    <section className="py-8 px-4 relative">
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
        <div
          className="relative"
          ref={timelineRef as React.RefObject<HTMLDivElement>}
        >
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-wedding-blue-300"></div>
          {timelineEvents.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-8 fade-in-section ${
                isTimelineVisible ? "visible" : ""
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-8 h-8 bg-wedding-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold z-10">
                {<item.icon />}
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
  );
};
