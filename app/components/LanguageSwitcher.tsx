"use client";

import Image from "next/image";
import { useState } from "react";
import { languages, useLanguage } from "./LanguageProvider";

type LanguageSwitcherProps = {
  fixed?: boolean;
  showMobile?: boolean;
};

export default function LanguageSwitcher({
  fixed = false,
  showMobile = false,
}: LanguageSwitcherProps) {
  const { language: currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={
        fixed
          ? "font-display group fixed top-8 left-8 z-50 size-3.5 md:left-16 md:size-5"
          : `font-display group absolute top-8 left-8 size-3.5 md:left-16 md:block md:size-5 ${
              showMobile ? "block" : "hidden"
            }`
      }
    >
      <button
        type="button"
        aria-label="language selector"
        aria-expanded={isOpen}
        className="flex size-full items-center justify-center"
        onClick={() => setIsOpen((current) => !current)}
      >
        <Image
          src="/images/language-icon.svg"
          alt=""
          width={20}
          height={20}
          className="size-full"
        />
      </button>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-full left-0 h-4 w-[60px] group-hover:pointer-events-auto"
      />

      <div
        className={`absolute top-[calc(100%+16px)] left-0 flex flex-col gap-3 text-xs leading-none transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {languages.map((language) => (
          <button
            key={language.label}
            type="button"
            aria-pressed={currentLanguage === language.value}
            className="group/item relative h-3 w-[80px] cursor-pointer text-left"
            onClick={() => {
              setLanguage(language.value);
              setIsOpen(false);
            }}
          >
            <span
              className={`absolute top-0 left-0 transition-opacity duration-150 group-hover/item:opacity-0 ${
                currentLanguage === language.value ? "underline" : ""
              }`}
            >
              {language.label}
            </span>
            <span
              className={`absolute top-0 left-0 opacity-0 transition-opacity duration-150 group-hover/item:opacity-100 ${
                currentLanguage === language.value ? "underline" : ""
              }`}
            >
              {language.fullLabel}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
