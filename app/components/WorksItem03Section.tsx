"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function WorksItem03Section() {
  const { t } = useLanguage();
  const work = t.works.items[2];
  const sectionRef = useRef<HTMLElement>(null);
  const isImageLoadedRef = useRef(false);
  const hasSectionEnteredRef = useRef(false);
  const hasScrollGuideTriggeredRef = useRef(false);
  const isScrollGuideDismissedRef = useRef(false);
  const [isScrollGuideVisible, setIsScrollGuideVisible] = useState(false);
  const [isDetailImageLoaded, setIsDetailImageLoaded] = useState(false);
  const [isMinimumLoadingElapsed, setIsMinimumLoadingElapsed] = useState(false);
  const isDetailImageLoading =
    !isDetailImageLoaded || !isMinimumLoadingElapsed;

  const showScrollGuideIfReady = useCallback(() => {
    if (
      !isImageLoadedRef.current ||
      !hasSectionEnteredRef.current ||
      hasScrollGuideTriggeredRef.current ||
      isScrollGuideDismissedRef.current
    ) {
      return;
    }

    hasScrollGuideTriggeredRef.current = true;
    setIsScrollGuideVisible(true);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasSectionEnteredRef.current = true;
          showScrollGuideIfReady();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [showScrollGuideIfReady]);

  useEffect(() => {
    if (!isScrollGuideVisible) return;

    const timerId = window.setTimeout(() => {
      setIsScrollGuideVisible(false);
    }, 1200);

    return () => window.clearTimeout(timerId);
  }, [isScrollGuideVisible]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIsMinimumLoadingElapsed(true);
    }, 700);

    return () => window.clearTimeout(timerId);
  }, []);

  const hideScrollGuide = () => {
    isScrollGuideDismissedRef.current = true;
    setIsScrollGuideVisible(false);
  };

  const handleImageLoad = () => {
    isImageLoadedRef.current = true;
    setIsDetailImageLoaded(true);
    showScrollGuideIfReady();
  };

  return (
    <section
      ref={sectionRef}
      id="works-item03"
      className="relative flex flex-col py-30 md:min-h-dvh md:flex-row md:py-0"
    >
      <div className="relative order-2 flex w-full items-center bg-white px-6 pt-12 md:order-1 md:w-[59.7%] md:px-16 md:pt-0">
        <div className="flex w-full flex-col gap-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl">{work.title}</h2>
            <p className="text-xs">
              {t.common.scope}：{work.scope}
            </p>
            <p className="text-xs">
              {t.common.period}：{work.detailPeriod}
            </p>
          </div>

          <div className="flex flex-col gap-8 md:gap-6">
            <div className="flex flex-col items-start gap-4 md:flex-row">
              <p className="w-22 shrink-0 text-lg">{t.common.overview}</p>
              <p className="text-sm">
                {work.overview.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:flex-row">
              <p className="w-22 shrink-0 text-lg">{t.common.target}</p>
              <p className="text-sm">
                {work.target.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:flex-row">
              <p className="w-22 shrink-0 text-lg">{t.common.challenge}</p>
              <p className="text-sm">
                {work.challenge.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:flex-row">
              <p className="w-22 shrink-0 text-lg">{t.common.approach}</p>
              <p className="text-sm">
                {work.approach.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
          <Link
            href="/#works"
            className="flex w-full items-center justify-center border border-[#393a47] py-1.5 text-sm transition-colors hover:bg-[#393a47] hover:text-white md:w-fit md:px-10"
          >
            {t.common.back}
          </Link>
        </div>
      </div>

      <div className="relative order-1 mx-6 h-102.5 overflow-hidden bg-[#f6fdfe] md:order-2 md:mx-0 md:h-auto md:w-[40.3%]">
        <div
          className="h-full scrollbar-none overflow-y-auto md:h-dvh [&::-webkit-scrollbar]:hidden"
          onPointerDown={hideScrollGuide}
          onScroll={hideScrollGuide}
          onWheel={hideScrollGuide}
        >
          <Image
            src="/images/works-arigato-detail.jpg"
            alt={work.title}
            width={800}
            height={7330}
            className="block h-auto w-full"
            onLoad={handleImageLoad}
          />
        </div>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 hidden items-center justify-center bg-[#393a47]/45 transition-opacity duration-700 ease-out md:flex ${
            isScrollGuideVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex h-16 w-8 justify-center rounded-full border border-white/90 bg-white/15 pt-3 shadow-[0_12px_30px_rgba(57,58,71,0.35)] backdrop-blur-sm">
            <div className="h-3 w-1 animate-bounce rounded-full bg-white" />
          </div>
        </div>
        <div
          aria-live="polite"
          className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#f6fdfe] transition-opacity duration-500 ${
            isDetailImageLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="font-display text-sm tracking-[0.16em] text-[#393a47]">
            loading...
          </p>
        </div>
      </div>
    </section>
  );
}
