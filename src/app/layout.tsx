import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevForge Arcade | Level Up Your Code",
  description: "A retro-gaming 8-bit learning adventure inspired by Codédex. Master coding quests, earn XP, and unlock open-source achievements.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pressStart2P.variable} h-full`}>
      <body className="min-h-full flex flex-col font-mono bg-[#0f0e17] text-[#fffffe] selection:bg-[#ff8906] selection:text-[#0f0e17]">
        {children}
      </body>
    </html>
  );
}
