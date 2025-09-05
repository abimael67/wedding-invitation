import { useState, useEffect } from "react";

export const Header = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [hasHeroAnimated, setHasHeroAnimated] = useState(false);

  useEffect(() => {
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
  }, [hasHeroAnimated]);

  return (
    <div className="relative">
      {/* Portrait Section */}
      <div className="relative">
        <img
          src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_3253.jpg"
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

      {/* Romantic Quote Section */}
      <section className="bg-wedding-blue-900 text-white py-8 px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4">
            <span className="text-6xl text-wedding-blue-300">"</span>
          </div>
          <p className="text-2xl md:text-2xl font-light font-handwriting leading-relaxed mb-4">
            Uno solo puede ser vencido, pero dos pueden resistir. ¡La cuerda de
            tres hilos no se rompe fácilmente!
          </p>
          <p className="text-wedding-blue-300 text-sm">Eclesiastés 4:12</p>
          <div className="mt-4">
            <span className="text-6xl text-wedding-blue-300">"</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section
        id="hero-section"
        className={`min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-wedding-blue-50 to-vintage-white relative page-flip-section ${
          isHeroVisible ? "visible" : ""
        }`}
      >
        <img
          src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/leaves_bg.png"
          alt="Wedding"
          className="absolute top-0 left-0 w-full h-[50%] object-cover z-[-1] opacity-40"
        />

        <div className="text-center max-w-lg">
          <div className="mt-8">
            <span className="font-script text-wedding-blue-700 text-6xl mt-4 -ml-24">
              Winnifer
            </span>
          </div>
          <div className=" -ml-[6rem]">
            <span className="font-cursive text-wedding-blue-700 text-2xl">
              &
            </span>
          </div>
          <div className="-mt-4">
            <span className="font-script text-wedding-blue-700 text-6xl mt-16 -mr-24">
              Abimael
            </span>
          </div>

          <div>
            <div>
              <img
                src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/minirings.png"
                alt="Wedding rings"
                className="w-12 h-auto object-cover mx-auto"
              />
            </div>
            <p className="text-sm font-roboto text-wedding-blue-700  mt-4">
              NOS COMPLACE INVITARTE A NUESTRA BODA
            </p>

            {/* Portrait Photo Section */}

            <div className="mb-8 h-[450px] flex items-center justify-center">
              <div className="w-[300px] h-50 md:w-60 md:h-60 absolute overflow-hidden border-8 border-white shadow-2xl rotate-[350deg]">
                <img
                  src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_2827.jpg"
                  alt="Wedding"
                  className=" h-[350px] "
                />
                <div className="h-[40px] w-full bg-white absolute bottom-0"></div>
              </div>
              <div className="w-[300px] h-50 md:w-60 md:h-60 absolute ml-8 mt-14 overflow-hidden border-8 border-white shadow-2xl rotate-[10deg]">
                <img
                  src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/session/DSC_3214.jpg"
                  alt="Wedding"
                  className=" h-[350px] "
                />
                <div className="h-[40px] w-full bg-white absolute bottom-0"></div>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-3xl font-semibold font-handwriting tracking-wider text-wedding-blue-600 mb-2">
                Noviembre
              </div>
              <div className="flex items-center justify-center space-x-3">
                <span className="text-lg font-medium text-wedding-blue-500">
                  DOM
                </span>
                <span className="text-2xl font-bold text-wedding-blue-400">
                  |
                </span>
                <span className="text-4xl font-bold font-handwriting text-wedding-blue-700 px-4 py-2 ">
                  02
                </span>
                <span className="text-2xl font-bold text-wedding-blue-400">
                  |
                </span>
                <span className="text-lg text-bold text-wedding-blue-500">
                  2025
                </span>
              </div>
            </div>
          </div>
        </div>
        <img
          src="https://ittjdadhzzieregopwba.supabase.co/storage/v1/object/public/imagenes_torneo/wedding/leaves_bg.png"
          alt="Wedding"
          className="absolute bottom-0 right-0 w-full h-[50%] transform rotate-180 object-cover z-[-1] opacity-40"
        />
      </section>
    </div>
  );
};
