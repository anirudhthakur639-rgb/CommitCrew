"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Award, Lock } from "lucide-react";

export const BadgeCabinet: React.FC = () => {
  const { badges } = useGame();

  return (
    <div className="bg-[#17152b] pixel-border p-4">
      <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#ef476f]" />
          <h3 className="font-pixel text-xs text-[#ef476f] uppercase">
            Trophy Vault
          </h3>
        </div>
        <span className="font-pixel text-[9px] text-[#ffd166]">
          {badges.filter((b) => b.unlocked).length}/{badges.length} UNLOCKED
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {badges.map((badge) => (
          <div
            key={badge.id}
            title={`${badge.name}: ${badge.description}`}
            className={`p-2.5 pixel-border-sm flex flex-col items-center text-center transition-all ${
              badge.unlocked
                ? "bg-[#232144] hover:bg-[#2d2955] cursor-pointer"
                : "bg-[#0f0e17] opacity-50 grayscale"
            }`}
          >
            <div className="w-9 h-9 bg-[#0d0c1d] pixel-border-sm flex items-center justify-center text-xl mb-1.5 relative">
              {badge.icon}
              {!badge.unlocked && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                </div>
              )}
            </div>
            <div className="font-pixel text-[8px] sm:text-[9px] text-white truncate max-w-full mb-0.5">
              {badge.name}
            </div>
            <div className="text-[8px] font-mono text-[#a7a9be] uppercase">
              {badge.rarity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
