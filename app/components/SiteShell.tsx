"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import GlobalNav from "./GlobalNav";
import { LanguageProvider, useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SiteShellContent>{children}</SiteShellContent>
    </LanguageProvider>
  );
}

function SiteShellContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { languageTransitionPhase } = useLanguage();
  const previousPathnameRef = useRef<string | null>(null);
  const [isWorksRouteTransitioning, setIsWorksRouteTransitioning] =
    useState(false);
  const languageTransitionClass =
    languageTransitionPhase === "exit"
      ? "language-text-exit"
      : languageTransitionPhase === "enter"
        ? "language-text-enter"
        : "";

  useEffect(() => {
    const previousPathname = previousPathnameRef.current;
    previousPathnameRef.current = pathname;

    if (!previousPathname || previousPathname === pathname) return;

    const isWorksTransition =
      previousPathname.startsWith("/works/") || pathname.startsWith("/works/");

    if (!isWorksTransition) return;

    const startTimerId = window.setTimeout(() => {
      setIsWorksRouteTransitioning(true);
    }, 0);
    const endTimerId = window.setTimeout(() => {
      setIsWorksRouteTransitioning(false);
    }, 560);

    return () => {
      window.clearTimeout(startTimerId);
      window.clearTimeout(endTimerId);
    };
  }, [pathname]);

  return (
    <div className={languageTransitionClass}>
      <div className="site-load-curtain" aria-hidden="true" />
      <div
        className={`works-route-transition ${
          isWorksRouteTransitioning ? "is-active" : ""
        }`}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed top-0 left-[calc(59.7%-48px)] z-20 hidden h-dvh w-12 bg-linear-to-l from-black/8 to-transparent md:block"
        aria-hidden="true"
      />
      <LanguageSwitcher fixed />
      <GlobalNav fixed />
      {children}
    </div>
  );
}
