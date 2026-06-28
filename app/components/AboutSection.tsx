"use client";

import { useLanguage } from "./LanguageProvider";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="flex flex-col md:min-h-dvh md:flex-row">
      <div className="relative flex w-full items-center bg-white px-6 py-15 md:w-[59.7%] md:px-16 md:py-0">
        <div className="flex w-full flex-col gap-8">
          <h2 className="font-display text-[50px] leading-none tracking-[0.06em] md:text-[90px]">
            ABOUT
          </h2>

          <div className="flex w-full flex-col gap-8 text-sm">
            <div className="flex items-start gap-4">
              <p className="font-display w-20 shrink-0 text-[#868686]">NAME</p>
              <p>{t.about.name}</p>
            </div>

            <div className="flex items-start gap-4">
              <p className="font-display w-20 shrink-0 text-[#868686]">
                CAREER
              </p>
              <p>{t.about.career}</p>
            </div>

            <div className="flex items-start gap-4">
              <p className="font-display w-20 shrink-0 text-[#868686]">SKILL</p>
              <ul className="list-disc pl-5">
                {t.about.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-4">
              <div className="font-display w-20 shrink-0 text-[#868686]">
                <p>WORKS</p>
                <p className="text-xs">-Private-</p>
              </div>
              <div>
                <ul className="list-disc pl-5">
                  {t.about.privateWorks.map(([title, description]) => (
                    <li key={title}>
                      <p>{title}</p>
                      <p className="text-xs">{description}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-1 text-[10px]">{t.about.note}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
