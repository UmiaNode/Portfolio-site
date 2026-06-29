"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useLanguage } from "./components/LanguageProvider";
import ValueSection from "./components/ValueSection";
import WorksSection from "./components/WorksSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import SectionFade from "./components/SectionFade";
import SharedFixedLogoArea from "./components/SharedFixedLogoArea";
import SharedFixedPhotoArea from "./components/SharedFixedPhotoArea";

export default function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) return;

    const handleWheel = (event: WheelEvent) => {
      if (
        window.innerWidth < 768 ||
        event.defaultPrevented ||
        event.ctrlKey ||
        Math.abs(event.deltaY) < 1
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;

      if (target?.closest("input, textarea, select, button")) {
        return;
      }

      event.preventDefault();
      window.scrollBy({
        top: event.deltaY * 0.78,
        left: event.deltaX * 0.78,
        behavior: "auto",
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <main className="page-load-enter">
      <SharedFixedPhotoArea>
        <SectionFade>
          <section
            id="top"
            className="relative z-10 flex flex-col bg-white md:min-h-dvh"
          >
            <div className="relative flex w-full items-center bg-white px-6 pt-[120px] pb-[60px] md:min-h-dvh md:px-16 md:py-0">
              <div className="flex w-full flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <p className="font-display text-xl leading-none md:text-xl">
                    {t.hero.role}
                  </p>
                  <h1 className="font-display text-[50px] leading-none tracking-[0.06em] md:text-[90px]">
                    <span className="load-typing-line load-typing-line-first">
                      {t.hero.title[0]}
                    </span>
                    <span className="load-typing-line load-typing-line-second">
                      {t.hero.title[1]}
                    </span>
                  </h1>
                  <div
                    className="relative h-[228px] w-full overflow-hidden md:hidden"
                    data-load-image
                  >
                    <Image
                      src="/images/fv-photo-sp.jpg"
                      alt="Kenichiro Kanamori"
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  </div>
                </div>
                <p className="language-change-text text-sm">
                  {t.hero.lead[0]}
                  <br />
                  {t.hero.lead[1]}
                </p>
              </div>
            </div>
          </section>
        </SectionFade>

        <SectionFade>
          <ValueSection />
        </SectionFade>
      </SharedFixedPhotoArea>

      <SectionFade>
        <WorksSection />
      </SectionFade>
      <SharedFixedLogoArea>
        <SectionFade>
          <AboutSection />
        </SectionFade>
        <SectionFade>
          <ContactSection />
        </SectionFade>
      </SharedFixedLogoArea>
    </main>
  );
}
