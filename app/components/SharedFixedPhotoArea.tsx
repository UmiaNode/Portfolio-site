"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

type SharedFixedPhotoAreaProps = {
  children: ReactNode;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function SharedFixedPhotoArea({
  children,
}: SharedFixedPhotoAreaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [photoOpacity, setPhotoOpacity] = useState(0);
  const [isPhotoActive, setIsPhotoActive] = useState(false);

  useEffect(() => {
    let animationFrameId = 0;

    const updatePhotoState = () => {
      const root = rootRef.current;

      if (!root) return;

      const rect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const isInRange = rect.top < viewportHeight && rect.bottom > 0;

      if (!isInRange) {
        setIsPhotoActive(false);
        setPhotoOpacity(0);
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

      setIsPhotoActive(true);
      setPhotoOpacity(Math.min(fadeInProgress, fadeOutProgress));
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updatePhotoState);
    };

    updatePhotoState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative md:[&_.section-fade-switch]:w-[59.7%]">
      <div
        className={`shared-fixed-photo pointer-events-none fixed top-0 right-0 z-0 hidden h-dvh w-[40.3%] overflow-hidden bg-gray-200 transition-opacity duration-300 md:block ${
          isPhotoActive ? "visible" : "invisible"
        }`}
        style={{ opacity: photoOpacity }}
        aria-hidden="true"
      >
        <Image
          src="/images/fv-photo.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {children}
    </div>
  );
}
