"use client";

import React, { useState } from "react";
import { DailyBounties } from "./DailyBounties";
import { Leaderboard } from "./Leaderboard";
import { BadgeCabinet } from "./BadgeCabinet";
import { Target, Trophy, Award } from "lucide-react";
import { soundFx } from "@/utils/sound";

export const ArcadeHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bounties" | "leaderboard" | "trophies">("bounties");

  const handleTabChange = (tab: "bounties" | "leaderboard" | "trophies") => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  return (
    <div className="w-full space-y-3">
      {/* Sleek Uncluttered Tab Switcher */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#100e24] pixel-border-sm">
        <button
          onClick={() => handleTabChange("bounties")}
          className={`py-2 px-1 text-center font-pixel text-[8px] sm:text-[9px] uppercase transition-all flex items-center justify-center gap-1 ${
            activeTab === "bounties"
              ? "bg-[#06d6a0] text-black font-bold shadow-[2px_2px_0_#000]"
              : "text-[#a7a9be] hover:text-white hover:bg-[#1a1738]"
          }`}
        >
          <Target className="w-3 h-3 shrink-0" />
          <span>Bounties</span>
        </button>

        <button
          onClick={() => handleTabChange("leaderboard")}
          className={`py-2 px-1 text-center font-pixel text-[8px] sm:text-[9px] uppercase transition-all flex items-center justify-center gap-1 ${
            activeTab === "leaderboard"
              ? "bg-[#ffd166] text-black font-bold shadow-[2px_2px_0_#000]"
              : "text-[#a7a9be] hover:text-white hover:bg-[#1a1738]"
          }`}
        >
          <Trophy className="w-3 h-3 shrink-0" />
          <span>Ranks</span>
        </button>

        <button
          onClick={() => handleTabChange("trophies")}
          className={`py-2 px-1 text-center font-pixel text-[8px] sm:text-[9px] uppercase transition-all flex items-center justify-center gap-1 ${
            activeTab === "trophies"
              ? "bg-[#ef476f] text-black font-bold shadow-[2px_2px_0_#000]"
              : "text-[#a7a9be] hover:text-white hover:bg-[#1a1738]"
          }`}
        >
          <Award className="w-3 h-3 shrink-0" />
          <span>Vault</span>
        </button>
      </div>

      {/* Active Tab Panel with Smooth Transition */}
      <div className="transition-all duration-150">
        {activeTab === "bounties" && <DailyBounties />}
        {activeTab === "leaderboard" && <Leaderboard />}
        {activeTab === "trophies" && <BadgeCabinet />}
      </div>
    </div>
  );
};

