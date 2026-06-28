"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export type Language = "ja" | "en" | "os";

export const languages: {
  label: string;
  fullLabel: string;
  value: Language;
}[] = [
  { label: "Ja", fullLabel: "Japanese", value: "ja" },
  { label: "En", fullLabel: "English", value: "en" },
  { label: "Os", fullLabel: "Osakaben", value: "os" },
];

const translations = {
  ja: {
    hero: {
      title: ["Kenichiro", "Kanamori"],
      role: "Web Designer / Developer / Director",
      lead: [
        "訴求整理からデザイン、実装まで。",
        "Web制作を一貫して形にするパートナーです。",
      ],
    },
    nav: {
      top: "TOP",
      works: "WORKS",
      about: "ABOUT",
      contact: "CONTACT",
    },
    common: {
      scope: "担当範囲",
      period: "制作時期",
      overview: "概要",
      target: "誰向け？",
      challenge: "課題",
      approach: "工夫",
      back: "戻る",
      visitSite: "VISIT SITE",
    },
    value: {
      title: "どこの、どんな、誰に向けて伝える？",
      body: [
        "デザインをするときに大切にしているのは、",
        "ユーザーのことを個人単位の高い解像度で想像することです。",
        "",
        "最近、「長いコンテンツは見られない」と言われることがあります。",
        "しかし私は、長いから見られないのではなく、",
        "見る理由がないまま置かれていることが問題なのだと考えています。",
        "",
        "興味を持てる流れがあり、自分に関係があると感じられる内容であれば、",
        "自然と先へ進み、ユーザーと作り手のニーズがマッチする地点を作ることができるはずです。",
        "だからこそ、どこの、どんな、誰に向けて、何を伝えてどんな行動につなげるのかを最も重要視しています。",
        "",
        "ユーザー、言葉、情報設計、デザイン、実装。",
        "ユーザーと作り手にとって理想のWebサイト制作を目指しています。",
      ],
    },
    works: {
      lead: [
        "公開可能実績を掲載しています。",
        "制作では「誰に向けた、何のためのWebサイトなのか?」を大切に、",
        "訴求構成・デザインを整理して制作しています。",
      ],
      items: [
        {
          title: "Meibuキッズ空手教室",
          displayTitle: "Meibuキッズ空手教室",
          scope: "構成 / デザイン / 構築 / ライティング",
          period: "2025年12月",
          detailPeriod: "2025年12月",
          overview: [
            "子ども向けの空手教室の広告用LP。",
            "構成案の作成からデザイン、構築、ライティングまでを担当。",
          ],
          target: [
            "3〜5歳の子どもがおり、初めての習い事を検討している母親を理想ユーザーとして設定。",
          ],
          challenge: [
            "空手という拳法に対して抱かれやすい「危ないかもしれない」というイメージや、小さな子どもでも安心して通えるのかという不安を払拭する必要があった。",
          ],
          approach: [
            "習い事を検討する母親のインサイトを調査し、単に身体的な強さではなく、「精神的な強さを育ててほしい」というウォンツを定義。そのうえで、成長訴求と不安払拭を両立できるよう、構成・コピー・導線を設計。",
          ],
        },
        {
          title: "バンドメンバー募集アプリ Membo",
          displayTitle: "バンドメンバー募集アプリ Membo",
          scope: "構成 / デザイン / 初期構築 / ライティング",
          period: "2026年1月",
          detailPeriod: "2026年1月",
          overview: [
            "バンドメンバーを募集できる多言語翻訳機能を搭載したWebアプリのリリースにあたり、広報用サービスLPを制作。",
          ],
          target: [
            "バンド活動をしたいものの、言語の壁がネックとなり踏み切れない日本在住外国人を理想ユーザーとして定義。",
          ],
          challenge: [
            "機能なサービスである一方、どの機能を優先して訴求すべきかが整理しきれていなかった。「バンド活動を促進する」というミッションのもと、当たり障りのないデザインにはしたくないという要望があった。",
          ],
          approach: [
            "「音楽をやる理由は、音楽をやりたいから以外に必要ない」という、ミュージシャンが本質的に抱えている衝動に直接訴求するキャッチコピーと構成を考案。",
            "特定の音楽ジャンルに寄せすぎないよう制約を設け、セクションごとにあえてテイストを変えることで、多様な音楽性を受け止められるLPとして設計。",
          ],
        },
        {
          title: "外国人向け求人媒体 アリガトジョブズ",
          displayTitle: "外国人向け求人媒体 アリガトジョブズ",
          scope: "構成 / デザイン / 初期構築 / ライティング",
          period: "2026年1月",
          detailPeriod: "2026年1月",
          overview: [
            "掲載費用などを完全無料で利用できる、外国人労働者向け求人ポータルサイト。",
            "CVR改善を目的にLPをリニューアル。",
          ],
          target: [
            "外国人採用を検討している企業の採用担当者。",
            "ある程度の意思決定権限は持っている、もしくは最終決裁者。",
          ],
          challenge: [
            "コンテンツ量が多く、訴求軸も分散していたため、",
            "サービスの強みが伝わる前に離脱が発生していると定義。",
          ],
          approach: [
            "採用担当者が判断に必要とする情報を再構成し、サービスの利用メリットが段階的に伝わるLPとして設計。",
            "他の求人サービスと競合させるのではなく、併用する選択肢として検討してもらえるよう、無料で利用できる点や導入ハードルの低さを整理して訴求。",
          ],
        },
      ],
    },
    about: {
      name: "金森 謙一郎",
      career:
        "2020年から制作会社で合計5年勤務し、Webデザイン、アートディレクション、フロントエンド実装を手がけてきました。2025年に個人事業主として独立し、屋号「UMIA」として活動しています。",
      skills: [
        "Webデザイン / グラフィックデザイン",
        "アートディレクション / 制作ディレクション",
        "コーディング（HTML / CSS / JavaScript / GSAP / Astro / WordPress など）",
      ],
      privateWorks: [
        [
          "求人広告LP制作 2,000件以上",
          "担当範囲：デザイン / アートディレクション / 制作改善",
        ],
        [
          "大手音楽スクール 求人サイト構築",
          "担当範囲：フロントエンド実装 / アートディレクション補助",
        ],
        [
          "大手商社系企業 コーポレートサイト構築",
          "担当範囲：フロントエンド実装 など",
        ],
      ],
      note: "※制作会社在籍時の実績を含みます。一部実績は社名・URL・画面を非公開としています。",
    },
    contact: {
      lead: "お問い合せはこちらからご連絡ください。通常3営業日以内にお返事いたします。",
      name: "お名前",
      email: "メール",
      message: "メッセージ",
      namePlaceholder: "お名前",
      submit: "送信する",
      confirm: "この内容で送信します",
      edit: "修正する",
      complete: "送信が完了しました。",
      sending: "送信中です。",
      failed:
        "送信できませんでした。時間をおいて再度お試しいただくか、メールでご連絡ください。",
      missingUrl:
        "送信先が未設定です。NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL を設定してください。",
    },
  },
  en: {
    hero: {
      title: ["Kenichiro", "Kanamori"],
      role: "Web Designer / Developer / Director",
      lead: [
        "From messaging strategy to design and implementation.",
        "I build websites as one coherent production partner.",
      ],
    },
    nav: { top: "TOP", works: "WORKS", about: "ABOUT", contact: "CONTACT" },
    common: {
      scope: "Scope",
      period: "Period",
      overview: "Overview",
      target: "Audience",
      challenge: "Challenge",
      approach: "Approach",
      back: "Back",
      visitSite: "VISIT SITE",
    },
    value: {
      title: "Where, what, and who are we speaking to?",
      body: [
        "What I value most in design is imagining each user with high resolution.",
        "",
        "People often say that long content is no longer read.",
        "I think the issue is not length itself, but content placed without a reason to keep reading.",
        "",
        "When a page has a flow that creates interest and feels personally relevant, users naturally move forward.",
        "That is where the needs of the user and the maker can meet.",
        "This is why I focus on where the message comes from, what it communicates, who it is for, and what action it should lead to.",
        "",
        "Users, words, information design, visual design, and implementation.",
        "I aim to create websites that work for both users and makers.",
      ],
    },
    works: {
      lead: [
        "Selected public work is listed here.",
        "In production, I focus on who the site is for and what purpose it serves,",
        "then organize the message, structure, and design around that intent.",
      ],
      items: [
        {
          title: "Meibu Kids Karate School",
          displayTitle: "Meibu Kids Karate School",
          scope: "Structure / Design / Development / Writing",
          period: "December 2025",
          detailPeriod: "December 2025",
          overview: [
            "An advertising landing page for a children's karate school.",
            "I handled the structure, design, development, and writing.",
          ],
          target: [
            "Mothers with children aged three to five who are considering a first extracurricular activity.",
          ],
          challenge: [
            "Karate can feel dangerous to parents, so the page needed to reduce concerns and show that young children can attend safely.",
          ],
          approach: [
            "I researched the mindset of mothers considering lessons and defined the core want as not just physical strength, but mental strength. The structure, copy, and flow were designed to balance growth appeal with reassurance.",
          ],
        },
        {
          title: "Band Member Recruiting App Membo",
          displayTitle: "Band Member Recruiting App Membo",
          scope: "Structure / Design / Initial Development / Writing",
          period: "January 2026",
          detailPeriod: "January 2026",
          overview: [
            "A service landing page for the release of a multilingual web app that helps users recruit band members.",
          ],
          target: [
            "Foreign residents in Japan who want to play in a band but hesitate because of the language barrier.",
          ],
          challenge: [
            "The service had useful features, but the priority of what to communicate was unclear. The client also wanted to avoid a safe, generic design while keeping the mission of encouraging band activity.",
          ],
          approach: [
            "I built the concept around the idea that wanting to play music is reason enough.",
            "To avoid leaning too strongly into one genre, each section intentionally shifts in tone, creating a page that can hold many kinds of musical identity.",
          ],
        },
        {
          title: "Arigato Jobs Recruiting Media",
          displayTitle: "Arigato Jobs Recruiting Media",
          scope: "Structure / Design / First Draft Writing",
          period: "January 2026",
          detailPeriod: "January 2026",
          overview: [
            "A job portal for foreign workers that can be used completely free of posting fees.",
            "The landing page was renewed to improve CVR.",
          ],
          target: [
            "Recruiting managers at companies considering hiring foreign workers.",
            "Users with some decision-making authority, or final decision makers.",
          ],
          challenge: [
            "The page had a large amount of content and scattered points of appeal.",
            "I defined the issue as users leaving before understanding the service's strengths.",
          ],
          approach: [
            "I reorganized the information recruiters need for decision-making and designed the page so the benefits unfold step by step.",
            "Rather than positioning it as a direct competitor to other job services, I clarified the low barrier to adoption and the fact that it can be used alongside existing channels.",
          ],
        },
      ],
    },
    about: {
      name: "Kenichiro Kanamori",
      career:
        "I worked at production companies for a total of five years from 2020, handling web design, art direction, and front-end implementation. In 2025, I became independent and now work under the name UMIA.",
      skills: [
        "Web design / Graphic design",
        "Art direction / Production direction",
        "Coding (HTML / CSS / JavaScript / GSAP / Astro / WordPress, etc.)",
      ],
      privateWorks: [
        [
          "Over 2,000 recruitment landing pages",
          "Scope: Design / Art direction / Production improvement",
        ],
        [
          "Recruiting site for a major music school",
          "Scope: Front-end development / Art direction support",
        ],
        [
          "Corporate site for a major trading company group",
          "Scope: Front-end development, etc.",
        ],
      ],
      note: "Includes work produced while employed at production companies. Some company names, URLs, and screens are private.",
    },
    contact: {
      lead: "Please contact me through this form. I usually reply within three business days.",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Name",
      submit: "Send",
      confirm: "Send with this content",
      edit: "Edit",
      complete: "Your message has been sent.",
      sending: "Sending.",
      failed:
        "Your message could not be sent. Please try again later or contact me by email.",
      missingUrl:
        "Submission URL is not configured. Please set NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL.",
    },
  },
  os: {
    hero: {
      title: ["Kenichiro", "Kanamori"],
      role: "Web Designer / Developer / Director",
      lead: [
        "訴求整理からデザイン、実装まで。",
        "Web制作、まるっと任せて任せといてください。",
      ],
    },
    nav: { top: "TOP", works: "WORKS", about: "ABOUT", contact: "CONTACT" },
    common: {
      scope: "担当したとこ",
      period: "作った時期",
      overview: "ざっくり言うと",
      target: "誰向け？",
      challenge: "困りごと",
      approach: "工夫したとこ",
      back: "戻る",
      visitSite: "VISIT SITE",
    },
    value: {
      title: "どこの、どんな、誰に向けてんの？",
      body: [
        "デザインするときに大事にしてるんは、ユーザーのことをちゃんと一人の人として想像することです。",
        "",
        "最近は「長いコンテンツは見られへん」と言われがちです。",
        "でも、長いから見られへんのやなくて、見る理由がないまま置かれてることが問題やと思っています。",
        "",
        "興味を持てる流れがあって、自分ごとやと感じられる内容なら、自然と先へ進んでもらえるはずです。",
        "だから、どこの、どんな、誰に向けて、何を伝えてどんな行動につなげるんかを大切にしています。",
        "",
        "ユーザー、言葉、情報設計、デザイン、実装。",
        "ユーザーと作り手にとって、ええ感じのWebサイトを目指しています。",
      ],
    },
    works: {
      lead: [
        "公開できる実績を載せてます。",
        "制作では「誰の、何のためのWebサイトなん？」を大事にして、",
        "訴求構成とデザインを整理しています。",
      ],
      items: [
        {
          title: "Meibuキッズ空手教室",
          displayTitle: "Meibuキッズ空手教室",
          scope: "構成 / デザイン / 構築 / ライティング",
          period: "2025年12月",
          detailPeriod: "2025年12月",
          overview: [
            "子ども向け空手教室の広告LPです。",
            "構成案、デザイン、構築、ライティングまで担当しました。",
          ],
          target: [
            "3〜5歳の子どもがおって、初めての習い事を探しているお母さんを想定しました。",
          ],
          challenge: [
            "空手に対して持たれがちな「危なそう」という不安や、小さい子でも安心して通えるんかという心配をなくす必要がありました。",
          ],
          approach: [
            "習い事を探すお母さんの気持ちを調べて、身体の強さだけやなく「心の強さを育ててほしい」という気持ちを軸にしました。成長訴求と安心感が両立するように構成、コピー、導線を設計しています。",
          ],
        },
        {
          title: "バンドメンバー募集アプリ Membo",
          displayTitle: "バンドメンバー募集アプリ Membo",
          scope: "構成 / デザイン / 初期構築 / ライティング",
          period: "2026年1月",
          detailPeriod: "2026年1月",
          overview: [
            "多言語翻訳機能つきのバンドメンバー募集Webアプリのリリースに合わせて、サービスLPを制作しました。",
          ],
          target: [
            "バンド活動をしたいけど、言葉の壁で踏み出しにくい日本在住の外国人を想定しました。",
          ],
          challenge: [
            "機能は便利やけど、どこを一番に伝えるべきか整理しきれていませんでした。バンド活動を促進するミッションのもと、無難すぎるデザインにはしたくないという要望もありました。",
          ],
          approach: [
            "「音楽をやる理由は、音楽をやりたいから以外にいらん」という衝動に直接届くコピーと構成を考えました。",
            "特定ジャンルに寄りすぎへんように、セクションごとにあえてテイストを変えて、いろんな音楽性を受け止められるLPにしています。",
          ],
        },
        {
          title: "外国人向け求人媒体 アリガトジョブズ",
          displayTitle: "外国人向け求人媒体 アリガトジョブズ",
          scope: "構成 / デザイン / 初期構築 / ライティング",
          period: "2026年1月",
          detailPeriod: "2026年1月",
          overview: [
            "掲載費用などを完全無料で使える、外国人労働者向け求人ポータルサイトです。",
            "CVR改善を目的にLPをリニューアルしました。",
          ],
          target: [
            "外国人採用を考えている企業の採用担当者。",
            "ある程度の決定権がある人、もしくは最終決裁者を想定しました。",
          ],
          challenge: [
            "コンテンツ量が多く、訴求軸も散らばっていたため、",
            "サービスの強みが伝わる前に離脱していると考えました。",
          ],
          approach: [
            "採用担当者が判断に必要な情報を組み直し、サービスのメリットが段階的に伝わるLPとして設計しました。",
            "他の求人サービスと競わせるのではなく、併用できる選択肢として見てもらえるよう、無料で使える点や導入のしやすさを整理しました。",
          ],
        },
      ],
    },
    about: {
      name: "金森 謙一郎",
      career:
        "2020年から制作会社で合計5年働き、Webデザイン、アートディレクション、フロントエンド実装を担当してきました。2025年に独立し、屋号「UMIA」として活動しています。",
      skills: [
        "Webデザイン / グラフィックデザイン",
        "アートディレクション / 制作ディレクション",
        "コーディング（HTML / CSS / JavaScript / GSAP / Astro / WordPress など）",
      ],
      privateWorks: [
        [
          "求人広告LP制作 2,000件以上",
          "担当範囲：デザイン / アートディレクション / 制作改善",
        ],
        [
          "大手音楽スクール 求人サイト構築",
          "担当範囲：フロントエンド実装 / アートディレクション補助",
        ],
        [
          "大手商社系企業 コーポレートサイト構築",
          "担当範囲：フロントエンド実装 など",
        ],
      ],
      note: "※制作会社にいた時の実績も含みます。一部実績は社名・URL・画面を非公開にしています。",
    },
    contact: {
      lead: "お問い合わせはこちらからどうぞ。通常3営業日以内にお返事します。",
      name: "お名前",
      email: "メール",
      message: "メッセージ",
      namePlaceholder: "お名前",
      submit: "送信する",
      confirm: "この内容で送ります",
      edit: "修正する",
      complete: "送信できました。",
      sending: "送信中です。",
      failed:
        "送信できませんでした。時間をおいてもう一度試すか、メールで連絡してください。",
      missingUrl:
        "送信先が未設定です。NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL を設定してください。",
    },
  },
} as const;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  languageTransitionPhase: "idle" | "exit" | "enter";
  t: (typeof translations)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const languageStoreListeners = new Set<() => void>();

function isLanguage(value: string | null): value is Language {
  return value === "ja" || value === "en" || value === "os";
}

function getLanguageSnapshot(): Language {
  if (typeof window === "undefined") {
    return "ja";
  }

  const savedLanguage = window.localStorage.getItem("umia-language");

  if (isLanguage(savedLanguage)) {
    return savedLanguage;
  }

  return "ja";
}

function getServerLanguageSnapshot(): Language {
  return "ja";
}

function subscribeLanguageStore(listener: () => void) {
  languageStoreListeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === "umia-language") {
      listener();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    languageStoreListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function notifyLanguageStore() {
  languageStoreListeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribeLanguageStore,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );
  const [languageTransitionPhase, setLanguageTransitionPhase] = useState<
    "idle" | "exit" | "enter"
  >("idle");
  const animationTimerRefs = useRef<number[]>([]);

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "ja";
  }, [language]);

  useEffect(() => {
    return () => {
      animationTimerRefs.current.forEach((timerId) =>
        window.clearTimeout(timerId),
      );
    };
  }, []);

  const setLanguage = useCallback(
    (nextLanguage: Language) => {
      if (nextLanguage === language) return;

      animationTimerRefs.current.forEach((timerId) =>
        window.clearTimeout(timerId),
      );
      animationTimerRefs.current = [];

      setLanguageTransitionPhase("exit");

      const enterTimerId = window.setTimeout(() => {
        window.localStorage.setItem("umia-language", nextLanguage);
        notifyLanguageStore();
        setLanguageTransitionPhase("enter");
      }, 260);
      const idleTimerId = window.setTimeout(() => {
        setLanguageTransitionPhase("idle");
        animationTimerRefs.current = [];
      }, 980);

      animationTimerRefs.current = [enterTimerId, idleTimerId];
    },
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      languageTransitionPhase,
      t: translations[language],
    }),
    [language, languageTransitionPhase, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
