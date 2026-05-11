import type { Metadata } from "next";
import { Libre_Baskerville, Quicksand } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "The HatchOut Club — Strangers to Soul Tribe",
  description: "For the young & wild and the old & wise. We curate group trips and custom travel itineraries that turn strangers into a soul tribe.",
  keywords: ["travel club", "group trips", "community travel", "India travel", "soul tribe", "adventure travel"],
  openGraph: {
    title: "The HatchOut Club",
    description: "Strangers → Soul Tribe. Curated group travel for all ages.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreBaskerville.variable} ${quicksand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
