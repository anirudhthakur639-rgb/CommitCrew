"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Sparkles } from "lucide-react";

export const FloatingXpManager: React.FC = () => {
  const { floatingXps } = useGame();

  if (floatingXps.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 pointer-events-none flex flex-col items-end gap-2">
      {floatingXps.map((p) => (
        <div
          key={p.id}
          className="bg-[#090814]/95 border-2 border-[#ffd166] text-[#ffd166] font-pixel text-xs sm:text-sm px-3.5 py-1.5 shadow-[0_0_16px_rgba(255,209,102,0.8),3px_3px_0_#000] flex items-center gap-1.5 animate-in slide-in-from-bottom-4 fade-in duration-300"
        >
          <Sparkles className="w-3.5 h-3.5 fill-[#ffd166] text-[#ffd166] animate-spin" />
          <span className="font-bold">+{p.amount} XP</span>
          {p.label && (
            <span className="text-[9px] font-mono text-[#a7a9be] hidden sm:inline border-l border-gray-700 pl-1.5">
              {p.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
