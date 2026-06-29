"use client";

import { useLanguage } from "./LanguageProvider";

export default function ValueSection() {
  const { t } = useLanguage();

  return (
    <section
      id="value"
      className="relative z-10 flex flex-col bg-white md:min-h-dvh"
    >
      <div className="relative flex w-full items-center bg-white px-6 py-15 md:min-h-dvh md:px-16 md:py-0">
        <div className="flex flex-col gap-8">
          <h2 className="font-display text-[50px] leading-none tracking-[0.06em] md:text-[90px]">
            VALUE
          </h2>
          <div className="flex flex-col gap-6">
            <p className="language-change-text text-2xl">{t.value.title}</p>
            <div className="language-change-text flex flex-col gap-4 text-sm">
              <p>
                {t.value.body.map((line, index) =>
                  line ? (
                    <span key={`${line}-${index}`}>
                      {line}
                      <br />
                    </span>
                  ) : (
                    <br key={`break-${index}`} />
                  ),
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
