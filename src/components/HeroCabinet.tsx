"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Play, Sparkles, Trophy, ChevronRight, Zap } from "lucide-react";

export const HeroCabinet: React.FC = () => {
  const { openQuestModal } = useGame();

  const handleStartMainQuest = () => {
    openQuestModal({
      id: "odyssey-main",
      title: "The Dungeon of the For-Loop",
      description: "Battle through nested arrays and tame the wild iterator before time runs out!",
      xpReward: 100,
      completed: false,
      category: "odyssey",
    });
  };

  return (
    <div className="relative w-full bg-[#1e1b38] pixel-border-lg p-5 sm:p-7 overflow-hidden mb-8">
      {/* Background Arcade Grid Accents */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#ff8906]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#06d6a0]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Tag & Event Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#ef476f] text-black font-pixel text-[10px] px-2 py-1 border border-black animate-pulse">
            ★ HACKTOBER SPECIAL
          </span>
          <span className="text-xs text-[#ffd166] font-pixel tracking-wider hidden sm:inline">
            WORLD 1 · STAGE 4
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#a7a9be]">
          <span className="inline-block w-2.5 h-2.5 bg-[#06d6a0] rounded-full animate-ping" />
          <span>70 TEAMS LIVE IN THE ARENA</span>
        </div>
      </div>

      {/* Main Grid: Mascot Dialogue + CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Pixel Avatar & Speech Bubble */}
        <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Animated 8-Bit Mascot */}
          <div className="relative group shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#ffd166] pixel-border flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-105 transition-transform select-none bg-gradient-to-b from-[#ffeaa7] to-[#fdcb6e]">
              🧙‍♂️
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#ff8906] text-black text-[9px] font-pixel px-1.5 py-0.5 border border-black">
              NPC
            </div>
          </div>

          {/* Speech Bubble */}
          <div className="relative bg-[#fffffe] text-[#0f0e17] p-4 pixel-border flex-1">
            {/* Bubble arrow pointing left */}
            <div className="hidden sm:block absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#000]" />
            <div className="hidden sm:block absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-[#fff]" />

            <div className="flex items-center gap-2 mb-1">
              <span className="font-pixel text-[11px] text-[#ff8906] uppercase">
                Elder Pythoneer:
              </span>
              <span className="text-[10px] bg-[#e2e8f0] px-1 font-mono text-gray-700">
                Quest Giver
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono leading-relaxed">
              &quot;Welcome to the Bengaluru finals! The clock reads 12 hours. Master the ancient arts of open-source logic, slay the syntax errors, and claim your share of the ₹25K bounty!&quot;
            </p>
          </div>
        </div>

        {/* Right: Quest Progress & Big Button */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
          <div className="bg-[#0f0e17] p-3 pixel-border-sm w-full">
            <div className="flex justify-between items-center text-[10px] font-pixel text-[#a7a9be] mb-1.5">
              <span>ACTIVE QUEST</span>
              <span className="text-[#ffd166]">+100 XP</span>
            </div>
            <div className="text-xs font-mono font-bold text-white truncate mb-2">
              Ch 4: Nested Loops & Recursion
            </div>
            
            {/* Action Button */}
            <button
              onClick={handleStartMainQuest}
              className="w-full py-2.5 px-4 bg-[#06d6a0] hover:bg-[#05b889] text-black font-pixel text-xs uppercase pixel-btn flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>RESUME QUEST</span>
            </button>
          </div>

          <div className="text-[10px] font-mono text-[#a7a9be] flex items-center gap-1.5 self-center lg:self-end">
            <Zap className="w-3 h-3 text-[#ffd166]" />
            <span>Next milestone unlocks at LVL 3</span>
          </div>
        </div>

      </div>
    </div>
  );
};

