"use client";

import { ReactNode } from "react";
import GlobalNav from "./GlobalNav";
import { LanguageProvider } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="site-load-curtain" aria-hidden="true" />
      <div
        className="pointer-events-none fixed top-0 left-[calc(59.7%-48px)] z-20 hidden h-dvh w-12 bg-linear-to-l from-black/8 to-transparent md:block"
        aria-hidden="true"
      />
      <LanguageSwitcher fixed />
      <GlobalNav fixed />
      {children}
    </LanguageProvider>
  );
}
