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

      {/* Romantic Quote Section */}
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
    </div>
  );
};
