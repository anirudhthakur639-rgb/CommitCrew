"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Volume2, VolumeX, Flame, Coins, Heart, Compass, Home, User, Sparkles, GitPullRequest, Terminal, Zap } from "lucide-react";

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
    refillHearts,
    isMuted,
    toggleMute,
  } = useGame();

  const percentage = Math.min(100, Math.round((xp / xpToNextLevel) * 100));

  return (
    <header className="sticky top-0 z-50 bg-[#0d0b1d]/95 backdrop-blur-md border-b-4 border-black shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-3">
          
          {/* Logo & Primary Tabs */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            
            {/* CodeQuest Brand with Glowing Border */}
            <div 
              onClick={() => setActiveTab("home")}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 bg-[#090814] border-2 border-[#06d6a0] neon-brand-glow flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 text-[#06d6a0] fill-[#06d6a0] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-pixel text-sm sm:text-base text-white tracking-wider font-bold block drop-shadow-[0_0_10px_#06d6a0]">
                    CodeQuest
                  </span>
                  <span className="text-[8px] font-pixel bg-[#06d6a0] text-black px-1.5 py-0.5 border border-black shadow-[1px_1px_0_#000]">
                    TECH
                  </span>
                </div>
                <span className="text-[9px] text-[#06d6a0] uppercase tracking-widest font-mono font-bold block drop-shadow-[0_0_5px_rgba(6,214,160,0.5)]">
                  Arcade Quest Engine
                </span>
              </div>
            </div>

            {/* Bright, Clear Navigation Tabs with Hover Glows */}
            <nav className="flex items-center gap-1.5 sm:gap-2">
              {/* Home */}
              <button
                onClick={() => setActiveTab("home")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-pixel uppercase pixel-btn glow-cyan-hover transition-all ${
                  activeTab === "home"
                    ? "bg-[#06d6a0] text-black border-2 border-black shadow-[0_0_15px_#06d6a0] -translate-y-0.5 font-bold"
                    : "bg-[#181534]/75 text-[#06d6a0] hover:text-white hover:bg-[#241f4d] border-2 border-[#06d6a0]/50"
                }`}
              >
                <Home className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline font-bold">Home</span>
              </button>

              {/* Journey */}
              <button
                onClick={() => setActiveTab("journey")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-pixel uppercase pixel-btn glow-yellow-hover transition-all ${
                  activeTab === "journey"
                    ? "bg-[#ffd166] text-black border-2 border-black shadow-[0_0_15px_#ffd166] -translate-y-0.5 font-bold"
                    : "bg-[#181534]/75 text-[#ffd166] hover:text-white hover:bg-[#241f4d] border-2 border-[#ffd166]/50"
                }`}
              >
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline font-bold">Journey</span>
              </button>

              {/* Terminal Lab */}
              <button
                onClick={() => setActiveTab("terminal-lab")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-pixel uppercase pixel-btn glow-blue-hover transition-all ${
                  activeTab === "terminal-lab"
                    ? "bg-[#00f5d4] text-black border-2 border-black shadow-[0_0_15px_#00f5d4] -translate-y-0.5 font-bold"
                    : "bg-[#181534]/75 text-[#00f5d4] hover:text-white hover:bg-[#241f4d] border-2 border-[#00f5d4]/50"
                }`}
              >
                <Terminal className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline font-bold">Terminal Lab</span>
              </button>

              {/* Git Story */}
              <button
                onClick={() => setActiveTab("git-story")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-pixel uppercase pixel-btn glow-orange-hover transition-all ${
                  activeTab === "git-story"
                    ? "bg-[#ff8906] text-black border-2 border-black shadow-[0_0_15px_#ff8906] -translate-y-0.5 font-bold"
                    : "bg-[#181534]/75 text-[#ff8906] hover:text-white hover:bg-[#241f4d] border-2 border-[#ff8906]/50"
                }`}
              >
                <GitPullRequest className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline font-bold">Git Story</span>
                <span className="font-pixel text-[7px] bg-[#ef476f] text-white px-1 ml-0.5 hidden lg:inline border border-black">NEW</span>
              </button>

              {/* Profile */}
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-pixel uppercase pixel-btn glow-pink-hover transition-all ${
                  activeTab === "profile"
                    ? "bg-[#ef476f] text-black border-2 border-black shadow-[0_0_15px_#ef476f] -translate-y-0.5 font-bold"
                    : "bg-[#181534]/75 text-[#ef476f] hover:text-white hover:bg-[#241f4d] border-2 border-[#ef476f]/50"
                }`}
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline font-bold">Profile</span>
              </button>
            </nav>
          </div>

          {/* Right Section: XP Bar & Stats HUD */}
          <div className="flex flex-wrap items-center justify-end w-full md:w-auto gap-3">
            
            {/* XP Progression Bar HUD with Neon Border */}
            <div className="flex items-center gap-2 bg-[#090814] px-3 py-1.5 pixel-border-sm border-2 border-[#06d6a0]/60 shadow-[0_0_10px_rgba(6,214,160,0.2)]">
              <div className="bg-[#ffd166] text-black font-pixel text-[10px] px-1.5 py-0.5 border border-black font-bold">
                LVL {level}
              </div>
              
              <div className="flex flex-col">
                <div className="flex justify-between items-center text-[9px] font-pixel text-[#a7a9be] gap-3 mb-1">
                  <span className="font-bold text-white">EXP</span>
                  <span className="text-[#06d6a0] font-bold">{xp}/{xpToNextLevel}</span>
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
                className="flex items-center gap-1 bg-[#181534] px-2.5 py-1.5 pixel-border-sm text-[#ff8906] border border-[#ff8906]/60 shadow-[0_0_8px_rgba(255,137,6,0.3)]"
              >
                <Flame className="w-3.5 h-3.5 fill-[#ff8906]" />
                <span className="font-pixel text-xs font-bold">{streak}</span>
              </div>

              {/* Coins */}
              <div 
                title="Arcade Coins"
                className="flex items-center gap-1 bg-[#181534] px-2.5 py-1.5 pixel-border-sm text-[#ffd166] border border-[#ffd166]/60 shadow-[0_0_8px_rgba(255,209,102,0.3)]"
              >
                <Coins className="w-3.5 h-3.5 text-[#ffd166]" />
                <span className="font-pixel text-xs font-bold">{coins}</span>
              </div>

              {/* Hearts (Interactive Arcade Lives) */}
              <div 
                title={`${hearts} of 3 Lives Remaining - Refill in Shop!`}
                onClick={() => {
                  if (hearts < 3) {
                    refillHearts(50);
                  }
                }}
                className={`flex items-center gap-1 bg-[#181534] px-2.5 py-1.5 pixel-border-sm transition-all cursor-pointer ${
                  hearts <= 1
                    ? "text-[#ef476f] border-2 border-[#ef476f] animate-pulse shadow-[0_0_12px_#ef476f]"
                    : "text-[#ef476f] border border-[#ef476f]/60 shadow-[0_0_8px_rgba(239,71,111,0.3)]"
                }`}
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart 
                    key={i} 
                    className={`w-3.5 h-3.5 transition-all ${
                      i < hearts 
                        ? "fill-[#ef476f] text-[#ef476f] scale-105" 
                        : "text-gray-700 fill-transparent opacity-30 scale-90"
                    }`} 
                  />
                ))}
                <span className="font-pixel text-[9px] text-[#ef476f] ml-0.5 hidden lg:inline font-bold">
                  {hearts}/3
                </span>
              </div>

              {/* Audio Toggle */}
              <button
                onClick={toggleMute}
                title={isMuted ? "Unmute 8-bit Sound FX" : "Mute Sound FX"}
                className="p-1.5 bg-[#181534] hover:bg-[#241f4d] pixel-border-sm text-[#a7a9be] hover:text-white transition-colors border border-black"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-gray-500" /> : <Volume2 className="w-4 h-4 text-[#06d6a0]" />}
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
