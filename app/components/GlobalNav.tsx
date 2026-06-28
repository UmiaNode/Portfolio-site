"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type GlobalNavProps = {
  fixed?: boolean;
  showMobile?: boolean;
};

export default function GlobalNav({
  fixed = false,
  showMobile = false,
}: GlobalNavProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [visibleSection, setVisibleSection] = useState("top");
  const activeSection = pathname.startsWith("/works/")
    ? "works"
    : pathname === "/"
      ? visibleSection
      : "";
  const navItems = [
    {
      id: "top",
      label: t.nav.top,
      href: "/#top",
    },
    {
      id: "works",
      label: t.nav.works,
      href: "/#works",
    },
    {
      id: "about",
      label: t.nav.about,
      href: "/#about",
    },
    {
      id: "contact",
      label: t.nav.contact,
      href: "/#contact",
    },
  ];

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["top", "works", "about", "contact"];
    let frameId = 0;

    const updateActiveSection = () => {
      const viewportPoint = window.innerHeight * 0.42;
      let nextVisibleSection = "top";

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportPoint && rect.bottom > viewportPoint) {
          nextVisibleSection = sectionId;
        }
      }

      setVisibleSection(nextVisibleSection);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    frameId = window.requestAnimationFrame(updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  return (
    <nav
      className={
        fixed
          ? "font-display fixed top-8 right-6 z-50 flex gap-5 md:top-auto md:right-auto md:bottom-8 md:left-16 md:gap-7"
          : `font-display absolute top-8 right-6 gap-5 md:top-auto md:right-auto md:bottom-8 md:left-16 md:flex md:gap-7 ${
              showMobile ? "flex" : "hidden"
            }`
      }
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex items-center gap-1 text-sm leading-none tracking-[0.08em] transition-opacity hover:opacity-70 md:text-base"
          aria-current={activeSection === item.id ? "page" : undefined}
        >
          <span
            aria-hidden="true"
            className={`h-0 w-0 border-y-[3.5px] border-l-[8px] border-y-transparent border-l-[#393a47] transition-all duration-300 ease-out ${
              activeSection === item.id
                ? "translate-x-0 opacity-100"
                : "w-0 -translate-x-1 border-l-0 opacity-0"
            }`}
          />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
