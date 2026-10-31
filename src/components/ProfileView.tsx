"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { Shield, Sparkles, Flame, Coins, Trophy, Code2, Clock } from "lucide-react";
import { soundFx } from "@/utils/sound";

export const ProfileView: React.FC = () => {
  const { level, xp, xpToNextLevel, coins, streak, badges } = useGame();
  const [selectedAvatar, setSelectedAvatar] = useState("🧙‍♂️");

  const avatars = ["🧙‍♂️", "🤖", "🥷", "👾", "🦊", "👩‍💻", "🧝‍♀️", "💀"];

  const handleAvatarChange = (avatar: string) => {
    soundFx.playClick();
    setSelectedAvatar(avatar);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Player Card (Retro RPG Style) */}
      <div className="bg-[#1e1b38] pixel-border-lg p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Avatar Display & Customizer */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 bg-[#ffd166] pixel-border-yellow flex items-center justify-center text-6xl mb-3 select-none">
              {selectedAvatar}
            </div>

            {/* Avatar picker pills */}
            <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
              {avatars.map((av) => (
                <button
                  key={av}
                  onClick={() => handleAvatarChange(av)}
                  className={`w-7 h-7 text-sm pixel-border-sm flex items-center justify-center transition-transform ${
                    selectedAvatar === av
                      ? "bg-[#06d6a0] scale-110"
                      : "bg-[#0d0c1d] hover:bg-[#232144]"
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Player Info & Stats */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="font-pixel text-[10px] bg-[#ef476f] text-black px-2 py-0.5 border border-black">
                PLAYER CARD
              </span>
              <span className="font-pixel text-[10px] bg-[#ffd166] text-black px-2 py-0.5 border border-black">
                LVL {level} APPRENTICE
              </span>
            </div>

            <h1 className="font-pixel text-lg sm:text-2xl text-white mb-1">
              DEV_HACKER_2026
            </h1>
            <p className="font-mono text-xs text-[#a7a9be] mb-4">
              Newton School of Technology · Bengaluru DevForge Guild
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0d0c1d] p-3 pixel-border-sm">
              <div className="text-center">
                <div className="text-[10px] font-pixel text-[#a7a9be]">TOTAL EXP</div>
                <div className="text-sm font-pixel text-[#06d6a0] mt-1">{level * 500 + xp}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-pixel text-[#a7a9be]">COINS</div>
                <div className="text-sm font-pixel text-[#ffd166] mt-1">{coins} 🪙</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-pixel text-[#a7a9be]">STREAK</div>
                <div className="text-sm font-pixel text-[#ff8906] mt-1">{streak} DAYS 🔥</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-pixel text-[#a7a9be]">BADGES</div>
                <div className="text-sm font-pixel text-[#ef476f] mt-1">{badges.filter(b => b.unlocked).length} / {badges.length}</div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Equipment & Loadout */}
      <div className="bg-[#17152b] pixel-border p-5">
        <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
          <Shield className="w-4 h-4 text-[#ffd166]" />
          <h2 className="font-pixel text-xs sm:text-sm text-[#ffd166] uppercase">
            Hacker Loadout & Inventory
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[#090814] p-3 pixel-border-sm flex items-center gap-3">
            <span className="text-2xl">⌨️</span>
            <div>
              <div className="font-pixel text-[9px] text-[#06d6a0]">MAIN WEAPON</div>
              <div className="font-mono text-xs font-bold text-white">Clicky Mechanical 60%</div>
              <div className="text-[10px] font-mono text-[#a7a9be]">+20 WPM Coding Speed</div>
            </div>
          </div>

          <div className="bg-[#090814] p-3 pixel-border-sm flex items-center gap-3">
            <span className="text-2xl">🧥</span>
            <div>
              <div className="font-pixel text-[9px] text-[#ffd166]">BODY ARMOR</div>
              <div className="font-mono text-xs font-bold text-white">Hackathon Hoodie</div>
              <div className="text-[10px] font-mono text-[#a7a9be]">+40% Cold AC Resistance</div>
            </div>
          </div>

          <div className="bg-[#090814] p-3 pixel-border-sm flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <div className="font-pixel text-[9px] text-[#ef476f]">COMPANION AI</div>
              <div className="font-mono text-xs font-bold text-white">Gemma 2 (Local Ollama)</div>
              <div className="text-[10px] font-mono text-[#a7a9be]">Zero Latency Code Triage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hackathon Status Note */}
      <div className="bg-[#0f0e17] pixel-border-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#ffd166]">
          <Clock className="w-4 h-4" />
          <span>Finals Code Freeze: 10:00 AM Sharp</span>
        </div>
        <div className="text-[#a7a9be]">
          Repo: OSI Licensed · All code written tonight
        </div>
      </div>

    </div>
  );
};

