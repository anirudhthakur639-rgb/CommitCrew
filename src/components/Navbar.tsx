"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Volume2, VolumeX, Flame, Coins, Heart, Compass, Home, User, Sparkles, GitPullRequest, Terminal } from "lucide-react";

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    level,
    xp,
    xpToNextLevel,
    coins,
    streak,
    hearts,
    isMuted,
    toggleMute,
  } = useGame();

  const percentage = Math.min(100, Math.round((xp / xpToNextLevel) * 100));

  return (
    <header className="sticky top-0 z-50 bg-[#141226] border-b-4 border-black shadow-[0_4px_0_#000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-3">
          
          {/* Logo & Primary Tabs */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div 
              onClick={() => setActiveTab("home")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-[#ff8906] pixel-border-sm flex items-center justify-center text-xl group-hover:rotate-6 transition-transform">
                👾
              </div>
              <div>
                <span className="font-pixel text-sm sm:text-base text-[#ffd166] tracking-wider block">
                  CODÉDEX
                </span>
                <span className="text-[10px] text-[#a7a9be] uppercase tracking-widest font-mono">
                  Arcade Edition
                </span>
              </div>
            </div>

            {/* Navigation Tabs (Mobile & Desktop) */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-pixel uppercase transition-all ${
                  activeTab === "home"
                    ? "bg-[#06d6a0] text-black pixel-border-sm -translate-y-0.5"
                    : "bg-[#232144] text-[#fffffe] hover:bg-[#2e2a59] border-2 border-transparent"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Home</span>
              </button>

              <button
                onClick={() => setActiveTab("journey")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-pixel uppercase transition-all ${
                  activeTab === "journey"
                    ? "bg-[#ffd166] text-black pixel-border-sm -translate-y-0.5"
                    : "bg-[#232144] text-[#fffffe] hover:bg-[#2e2a59] border-2 border-transparent"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Journey</span>
              </button>

              <button
                onClick={() => setActiveTab("terminal-lab")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-pixel uppercase transition-all ${
                  activeTab === "terminal-lab"
                    ? "bg-[#06d6a0] text-black pixel-border-sm -translate-y-0.5"
                    : "bg-[#232144] text-[#06d6a0] hover:bg-[#2e2a59] border-2 border-transparent"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Terminal Lab</span>
              </button>

              <button
                onClick={() => setActiveTab("git-story")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-pixel uppercase transition-all ${
                  activeTab === "git-story"
                    ? "bg-[#ff8906] text-black pixel-border-sm -translate-y-0.5"
                    : "bg-[#232144] text-[#ffd166] hover:bg-[#2e2a59] border-2 border-transparent"
                }`}
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Git Story</span>
                <span className="font-pixel text-[7px] bg-[#ef476f] text-white px-1 ml-0.5 hidden lg:inline">NEW</span>
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-pixel uppercase transition-all ${
                  activeTab === "profile"
                    ? "bg-[#ef476f] text-black pixel-border-sm -translate-y-0.5"
                    : "bg-[#232144] text-[#fffffe] hover:bg-[#2e2a59] border-2 border-transparent"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Profile</span>
              </button>
            </nav>
          </div>

          {/* Right Section: XP Bar & Stats HUD */}
          <div className="flex flex-wrap items-center justify-end w-full md:w-auto gap-3">
            
            {/* XP Progression Bar HUD */}
            <div className="flex items-center gap-2 bg-[#090814] px-3 py-1.5 pixel-border-sm">
              <div className="bg-[#ffd166] text-black font-pixel text-[10px] px-1.5 py-0.5 border border-black">
                LVL {level}
              </div>
              
              <div className="flex flex-col">
                <div className="flex justify-between items-center text-[9px] font-pixel text-[#a7a9be] gap-3 mb-1">
                  <span>EXP</span>
                  <span className="text-[#06d6a0]">{xp}/{xpToNextLevel}</span>
                </div>
                {/* 8-bit Segmented Progress Bar */}
                <div className="w-28 sm:w-36 h-3 bg-[#1e1b38] border-2 border-black overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#06d6a0] to-[#ffd166] transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                  {/* Pixel grid overlay on bar */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,#000_6px,#000_8px)] opacity-30" />
                </div>
              </div>
            </div>

            {/* Stats Badges: Streak, Coins, Hearts */}
            <div className="flex items-center gap-2">
              {/* Streak */}
              <div 
                title="7-Day Streak"
                className="flex items-center gap-1 bg-[#232144] px-2.5 py-1.5 pixel-border-sm text-[#ff8906]"
              >
                <Flame className="w-3.5 h-3.5 fill-[#ff8906]" />
                <span className="font-pixel text-xs">{streak}</span>
              </div>

              {/* Coins */}
              <div 
                title="Arcade Coins"
                className="flex items-center gap-1 bg-[#232144] px-2.5 py-1.5 pixel-border-sm text-[#ffd166]"
              >
                <Coins className="w-3.5 h-3.5" />
                <span className="font-pixel text-xs">{coins}</span>
              </div>

              {/* Hearts */}
              <div 
                title="Lives Remaining"
                className="hidden sm:flex items-center gap-1 bg-[#232144] px-2 py-1.5 pixel-border-sm text-[#ef476f]"
              >
                {Array.from({ length: hearts }).map((_, i) => (
                  <Heart key={i} className="w-3.5 h-3.5 fill-[#ef476f]" />
                ))}
              </div>

              {/* Audio Toggle */}
              <button
                onClick={toggleMute}
                title={isMuted ? "Unmute 8-bit Sound FX" : "Mute Sound FX"}
                className="p-1.5 bg-[#232144] hover:bg-[#343161] pixel-border-sm text-[#a7a9be] hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#06d6a0]" />}
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

