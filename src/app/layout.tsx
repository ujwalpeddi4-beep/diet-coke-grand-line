import type { Metadata } from "next";
import localFont from "next/font/local";

import "./app.css";
import Header from "@/components/Header";
import ViewCanvas from "@/components/ViewCanvas";
import Footer from "@/components/Footer";
import SiteThunder from "@/components/SiteThunder";

const alpino = localFont({
  src: "../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export const metadata: Metadata = {
  title: "Diet Coke × One Piece — Taste the Grand Line",
  description:
    "Diet Coke × One Piece Limited Edition. Taste the Grand Line with Zero Sugar and Devil-Fruit Grade Flavors. Unleash your Gear Fifth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={alpino.variable}>
      <body className="overflow-x-hidden bg-[#05070B] font-sans text-[#F8FAFC] antialiased">
        <Header />
        <main>
          {children}
          <ViewCanvas />
        </main>
        <Footer />
        <SiteThunder />
      </body>
    </html>
  );
}
