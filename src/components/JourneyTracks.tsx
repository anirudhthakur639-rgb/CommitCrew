"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Lock, CheckCircle2, ArrowRight, Star, Flame, Terminal } from "lucide-react";

interface CourseTrack {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  accentHex: string;
  completedQuests: number;
  totalQuests: number;
  levelBadge: string;
  status: "active" | "completed" | "locked";
  xpBounty: number;
}

export const JourneyTracks: React.FC = () => {
  const { openQuestModal, setActiveTab } = useGame();

  const tracks: CourseTrack[] = [
    {
      id: "python-glade",
      title: "The Python Glade",
      subtitle: "Variables, Conditionals & Loops in the Ancient Woods",
      icon: "🐍",
      color: "text-[#06d6a0]",
      bgGradient: "from-[#06d6a0]/20 to-[#1e1b38]",
      borderColor: "#06d6a0",
      accentHex: "#06d6a0",
      completedQuests: 12,
      totalQuests: 16,
      levelBadge: "STAGE 1 · NOVICE",
      status: "active",
      xpBounty: 450,
    },
    {
      id: "html-css-arcade",
      title: "HTML & CSS Arcana",
      subtitle: "Crafting Pixel Layouts, Flexbox & 8-Bit Color Magic",
      icon: "🎨",
      color: "text-[#118ab2]",
      bgGradient: "from-[#118ab2]/20 to-[#1e1b38]",
      borderColor: "#118ab2",
      accentHex: "#118ab2",
      completedQuests: 8,
      totalQuests: 10,
      levelBadge: "STAGE 2 · ARTISAN",
      status: "active",
      xpBounty: 300,
    },
    {
      id: "js-dungeon",
      title: "JavaScript Dungeon",
      subtitle: "Master the DOM, Event Listeners & the Async Dragon",
      icon: "⚡",
      color: "text-[#ffd166]",
      bgGradient: "from-[#ffd166]/20 to-[#1e1b38]",
      borderColor: "#ffd166",
      accentHex: "#ffd166",
      completedQuests: 4,
      totalQuests: 18,
      levelBadge: "STAGE 3 · SORCERER",
      status: "active",
      xpBounty: 600,
    },
    {
      id: "opensource-citadel",
      title: "Open-Source Citadel",
      subtitle: "Git PRs, OSI Licences & Gemma 2 Open-Weight AI",
      icon: "🎃",
      color: "text-[#ff8906]",
      bgGradient: "from-[#ff8906]/20 to-[#1e1b38]",
      borderColor: "#ff8906",
      accentHex: "#ff8906",
      completedQuests: 2,
      totalQuests: 6,
      levelBadge: "HACKTOBERFEST SPECIAL",
      status: "active",
      xpBounty: 500,
    },
  ];

  const handleOpenTrack = (track: CourseTrack) => {
    if (track.id === "opensource-citadel") {
      setActiveTab("git-story");
      return;
    }
    openQuestModal({
      id: track.id,
      title: `${track.title} Quest`,
      description: track.subtitle,
      xpReward: 100,
      completed: false,
      category: "odyssey",
    });
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🗺️</span>
          <h2 className="font-pixel text-sm sm:text-base text-[#fffffe] tracking-wide">
            ADVENTURE ODYSSEY
          </h2>
        </div>
        <div className="text-xs font-mono text-[#a7a9be]">
          Select an arcade cartridge to play
        </div>
      </div>

      {/* Cartridge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tracks.map((track) => {
          const progress = Math.round((track.completedQuests / track.totalQuests) * 100);

          return (
            <div
              key={track.id}
              className="group relative bg-[#17152b] transition-all duration-200 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              style={{
                border: `2px solid ${track.accentHex}`,
                boxShadow: `0 0 16px ${track.accentHex}55, 0 0 3px ${track.accentHex}, 4px 4px 0px #000000`,
              }}
            >
              {/* Retro Cartridge Grip Pins (Top) */}
              <div className="h-2.5 bg-[#090814] w-full flex items-center justify-around px-4 border-b-2 border-black">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 bg-[#37335e] block shadow-[0_0_4px_rgba(255,255,255,0.2)]" />
                ))}
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Badge & XP */}
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="font-pixel text-[9px] px-2 py-0.5 border border-black bg-[#0d0c1d] shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                      style={{ color: track.accentHex, borderColor: `${track.accentHex}88` }}
                    >
                      {track.levelBadge}
                    </span>
                    <span className="font-pixel text-[10px] text-[#ffd166] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#ffd166]" />
                      +{track.xpBounty} XP
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-3 mb-2">
                    <div 
                      className="w-12 h-12 shrink-0 bg-[#0d0c1d] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                      style={{
                        border: `2px solid ${track.accentHex}`,
                        boxShadow: `0 0 10px ${track.accentHex}55, 2px 2px 0 #000`,
                      }}
                    >
                      {track.icon}
                    </div>
                    <div>
                      <h3 className="font-pixel text-xs sm:text-sm text-white leading-snug mb-1">
                        {track.title}
                      </h3>
                      <p className="text-xs font-mono text-[#a7a9be] line-clamp-2">
                        {track.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Footer */}
                <div className="mt-4 pt-3 border-t-2 border-[#242145]">
                  <div className="flex justify-between items-center text-[10px] font-pixel text-[#a7a9be] mb-1.5">
                    <span>PROGRESS</span>
                    <span className="text-white">
                      {track.completedQuests}/{track.totalQuests} QUESTS ({progress}%)
                    </span>
                  </div>

                  {/* Retro Hash Bar */}
                  <div className="w-full h-3 bg-[#090814] border-2 border-black overflow-hidden mb-3.5 relative">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: track.accentHex,
                      }}
                    />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,#000_6px,#000_8px)] opacity-25" />
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleOpenTrack(track)}
                    className="w-full py-2 px-3 bg-[#232144] hover:bg-[#322f5c] text-white font-pixel text-[10px] uppercase pixel-btn flex items-center justify-center gap-2 group-hover:bg-[#fffffe] group-hover:text-black transition-colors"
                  >
                    <span>ENTER STAGE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

