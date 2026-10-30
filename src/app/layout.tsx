import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeQuest | Retro-Gaming Coding Odyssey",
  description: "A high-tech retro-gaming 8-bit learning adventure. Master coding quests, run interactive terminals, earn XP, and unlock open-source achievements.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pressStart2P.variable} h-full`}>
      <body className="min-h-full flex flex-col font-mono bg-[#0c0b1a] text-[#fffffe] selection:bg-[#ff8906] selection:text-[#0f0e17]">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
