"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

type SharedFixedLogoAreaProps = {
  children: ReactNode;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function SharedFixedLogoArea({
  children,
}: SharedFixedLogoAreaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [isLogoActive, setIsLogoActive] = useState(false);
  const [hasLogoEntered, setHasLogoEntered] = useState(false);

  useEffect(() => {
    let animationFrameId = 0;

    const updateLogoState = () => {
      const root = rootRef.current;

      if (!root) return;

      const rect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const isInRange = rect.top < viewportHeight && rect.bottom > 0;

      if (!isInRange) {
        setIsLogoActive(false);
        setLogoOpacity(0);
        return;
      }

      const fadeInProgress = clamp(
        (viewportHeight - rect.top) / (viewportHeight * 0.35),
        0,
        1,
      );
      const fadeOutProgress = clamp(
        rect.bottom / (viewportHeight * 0.45),
        0,
        1,
      );

      setIsLogoActive(true);
      setHasLogoEntered(true);
      setLogoOpacity(Math.min(fadeInProgress, fadeOutProgress));
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateLogoState);
    };

    updateLogoState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div
        className={`pointer-events-none fixed top-0 right-0 z-10 hidden h-dvh w-[40.3%] items-center justify-center overflow-hidden bg-white transition-opacity duration-300 md:flex ${
          isLogoActive ? "visible" : "invisible"
        } ${hasLogoEntered ? "has-entered" : ""}`}
        style={{ opacity: logoOpacity }}
        aria-hidden="true"
      >
        <div className="shared-logo-reveal">
          <Image src="/images/umia-logo.svg" alt="" width={191} height={82} />
        </div>
        <p className="font-display absolute right-6 bottom-4 text-xl leading-none">
          ©UMIA
        </p>
      </div>

      {children}
    </div>
  );
}
