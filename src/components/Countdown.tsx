import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface CountdownProps {
  onAddToCalendar: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown = ({ onAddToCalendar }: CountdownProps) => {
  const weddingDate = new Date("2025-11-02T15:00:00");
  const [countdownRef, isCountdownVisible] = useScrollAnimation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
  }, [weddingDate]);

  return (
    <section
      ref={countdownRef}
      className={`py-16 px-4 bg-wedding-blue-900 text-white overflow-x-hidden relative fade-in-section ${
        isCountdownVisible ? "visible" : ""
      }`}
    >
      <img
        src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/header%201.svg"
        alt="Separator"
        className="w-[24rem] h-auto object-cover mx-auto -mt-[5rem] "
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
              src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/improved%20car.svg"
              alt="Car"
              className="w-[12rem] h-auto object-cover mx-auto mb-10"
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
                      const startDate = new Date("2025-09-10T00:00:00");
                      const now = new Date();

                      const totalTime = weddingDate.getTime() - startDate.getTime();
                      const elapsedTime = now.getTime() - startDate.getTime();
                      const progress = Math.min(Math.max(elapsedTime / totalTime, 0), 1);

                      return progress;
                    })()
                  )
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
          onClick={onAddToCalendar}
          className="bg-white text-wedding-blue-900 px-6 py-3 rounded-lg font-medium hover:bg-vintage-cream transition-colors inline-flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Agregar al Calendario
        </button>
      </div>
    </section>
  );
};
