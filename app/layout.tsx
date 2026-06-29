import type { Metadata } from "next";
import { LINE_Seed_JP, Outfit } from "next/font/google";
import SiteShell from "./components/SiteShell";
import "./globals.css";

const lineSeedJp = LINE_Seed_JP({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-line-seed-jp",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kenichiro Kanamori Portfolio | Web designer",
  description: "Kenichiro Kanamori Portfolio Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${lineSeedJp.variable} ${outfit.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
