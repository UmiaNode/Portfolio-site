"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

const workImages = [
  {
    href: "/works/meibu",
    image: "/images/works-meibu-thumb.jpg",
    objectPosition: "50% 0.1%",
    tags: ["Design", "Coding", "Writing"],
    displayPeriod: "December.2025",
  },
  {
    href: "/works/membo",
    image: "/images/works-membo-thumb.jpg",
    objectPosition: "0% -20px",
    tags: ["Design", "Coding", "Writing"],
    displayPeriod: "January.2026",
  },
  {
    href: "/works/arigato",
    image: "/images/works-arigato-thumb.jpg",
    objectPosition: "0% 0%",
    tags: ["Design", "Writing"],
    displayPeriod: "March.2026",
  },
];
export default function WorksSection() {
  const { t } = useLanguage();

  return (
    <section
      id="works"
      className="flex flex-col gap-15 py-15 md:min-h-dvh md:flex-row md:gap-0 md:py-0"
    >
      <div className="relative flex w-full items-center bg-white px-6 md:w-[59.7%] md:px-16">
        <div className="flex flex-col gap-8">
          <h2 className="font-display text-[50px] leading-none tracking-[0.06em] md:text-[90px]">
            WORKS
          </h2>
          <div className="flex flex-col gap-6">
            <p>
              {t.works.lead.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>

      </div>
      <div className="relative flex w-full flex-col overflow-hidden bg-gray-100 md:w-[40.3%]">
        {workImages.map((work, index) => {
          const workText = t.works.items[index];

          return (
          <Link
            key={work.href}
            href={work.href}
            className="group relative h-46.25 overflow-hidden md:h-1/3"
          >
            <div className="absolute inset-x-0 top-0 h-[220%] transition-transform duration-500 ease-out group-hover:translate-y-[-55%] group-hover:duration-8000 group-hover:ease-linear">
              <Image
                src={work.image}
                alt={workText.title}
                fill
                className="object-cover"
                style={{ objectPosition: work.objectPosition }}
                unoptimized
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#393a47]/85 pt-8 opacity-100 transition-all duration-500 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <h3 className="text-center text-sm text-white md:text-2xl">
                {workText.displayTitle}
              </h3>
              <div className="font-display flex gap-2 md:gap-3">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white px-2 py-1 text-xs text-white md:text-base"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="font-display text-xs tracking-[0.12em] text-white md:text-sm">
                {work.displayPeriod}
              </p>
              <Image
                src="/images/works-link.svg"
                alt=""
                width={40}
                height={40}
                className="absolute top-1/2 right-4 size-6 -translate-y-1/2 transition-transform duration-500 group-hover:translate-x-1 md:right-8 md:size-10"
              />
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
