"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Play, Sparkles, Trophy, ChevronRight, Zap, Compass } from "lucide-react";

export const HeroCabinet: React.FC = () => {
  const { openQuestModal, setActiveTab } = useGame();

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
    <div className="relative w-full bg-[#17152b] pixel-border-lg overflow-hidden mb-8 shadow-[6px_6px_0px_#000]">
      
      {/* ================= TOP CODÉDEX ANIMATED PANORAMA VIEWPORT ================= */}
      <div className="relative w-full h-36 sm:h-44 border-b-4 border-black overflow-hidden bg-[#157dd0]">
        
        {/* Animated Sky Layer */}
        <div 
          className="absolute inset-0 animate-sky-move pixelated"
          style={{
            backgroundImage: 'url("/images/codedex-bg/LandingPage_Sky.png")',
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
          }}
        />

        {/* Parallax Mountain Layer */}
        <div 
          className="absolute bottom-6 left-0 w-full h-24 pixelated opacity-90"
          style={{
            backgroundImage: 'url("/images/codedex-bg/LandingPage_Mountain.png")',
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
          }}
        />

        {/* Animated Rolling Hills GIF */}
        <div 
          className="absolute bottom-2 left-0 w-full h-20 pixelated"
          style={{
            backgroundImage: 'url("/images/codedex-bg/LandingPage_Hills.gif")',
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
          }}
        />

        {/* Animated Mascot Running in Landscape */}
        <div 
          className="absolute bottom-2 left-8 sm:left-16 w-16 h-20 pixelated z-10"
          style={{
            backgroundImage: 'url("/images/codedex-bg/LandingPage_Mascot.gif")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />

        {/* Animated Waving Grass GIF */}
        <div 
          className="absolute bottom-0 left-0 w-full h-8 pixelated z-10"
          style={{
            backgroundImage: 'url("/images/codedex-bg/LandingPage_Grass.gif")',
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
          }}
        />

        {/* Overlay Badges on Top of Panorama */}
        <div className="absolute top-3 left-3 sm:left-4 z-20 flex items-center gap-2">
          <span className="bg-[#ef476f] text-black font-pixel text-[9px] px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000] animate-pulse">
            ★ HACKTOBERFEST 2026
          </span>
          <span className="bg-[#ffd166] text-black font-pixel text-[8px] px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000] hidden sm:inline-block">
            BENGALURU ARENA
          </span>
        </div>

        <div className="absolute top-3 right-3 sm:right-4 z-20 bg-[#090814]/90 px-2.5 py-1 pixel-border-sm text-[10px] font-mono text-[#06d6a0] flex items-center gap-1.5 backdrop-blur-xs">
          <span className="inline-block w-2 h-2 bg-[#06d6a0] rounded-full animate-ping" />
          <span>70 TEAMS LIVE IN ARENA</span>
        </div>
      </div>

      {/* ================= BOTTOM CONTENT: MASCOT & QUEST ACTION ================= */}
      <div className="p-5 sm:p-6 bg-[#1a1735]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Left: Pixel Avatar & Speech Bubble */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            
            {/* 8-Bit NPC Mascot Box */}
            <div className="relative shrink-0 select-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ffd166] pixel-border flex items-center justify-center text-4xl shadow-[4px_4px_0px_#000]">
                🧙‍♂️
              </div>
              <div className="absolute -bottom-2 -right-1 bg-[#ff8906] text-black text-[8px] font-pixel px-1 py-0.5 border border-black">
                NPC
              </div>
            </div>

            {/* Clear, High-Contrast Speech Bubble */}
            <div className="relative bg-[#ffffff] text-[#0f0e17] p-3.5 sm:p-4 pixel-border flex-1 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-[10px] text-[#ff8906] uppercase">
                  Elder Pythoneer:
                </span>
                <span className="text-[9px] bg-[#e2e8f0] px-1 font-mono text-gray-700">
                  Quest Giver
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono leading-relaxed font-medium">
                &quot;Welcome to the Bengaluru finals! The clock is ticking. Master the ancient arts of open-source logic, conquer the stages, and claim your share of the ₹25K bounty!&quot;
              </p>
            </div>
          </div>

          {/* Right: Quest Action Card */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <div className="bg-[#0c0b1a] p-3.5 pixel-border-sm w-full border-2 border-black">
              <div className="flex justify-between items-center text-[10px] font-pixel text-[#a7a9be] mb-1">
                <span>ACTIVE STAGE</span>
                <span className="text-[#ffd166]">+100 XP</span>
              </div>
              <div className="text-xs font-mono font-bold text-white truncate mb-2.5">
                Ch 4: Nested Loops &amp; Recursion
              </div>
              
              {/* Play Button */}
              <button
                onClick={handleStartMainQuest}
                className="w-full py-2.5 px-4 bg-[#06d6a0] hover:bg-[#05ba8a] text-black font-pixel text-xs uppercase pixel-btn flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>RESUME QUEST</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#a7a9be] px-1">
              <span className="flex items-center gap-1 text-[#ffd166]">
                <Zap className="w-3 h-3 text-[#ffd166]" />
                <span>LVL 2 Milestone</span>
              </span>
              <button 
                onClick={() => setActiveTab("journey")}
                className="hover:underline text-[#06d6a0] font-pixel text-[8px]"
              >
                VIEW MAP &gt;
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
