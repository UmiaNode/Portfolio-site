"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type SectionFadeProps = {
  children: ReactNode;
};

export default function SectionFade({ children }: SectionFadeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: "-18% 0px -18% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`section-fade-switch ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}
