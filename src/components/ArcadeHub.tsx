"use client";

import React, { useState } from "react";
import { DailyBounties } from "./DailyBounties";
import { Leaderboard } from "./Leaderboard";
import { BadgeCabinet } from "./BadgeCabinet";
import { ArcadeShop } from "./ArcadeShop";
import { Target, Trophy, Award, ShoppingBag } from "lucide-react";
import { soundFx } from "@/utils/sound";

export const ArcadeHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bounties" | "leaderboard" | "trophies" | "shop">("bounties");

  const handleTabChange = (tab: "bounties" | "leaderboard" | "trophies" | "shop") => {
    soundFx.playClick();
    setActiveTab(tab);
  };

  return (
    <div className="w-full space-y-3">
      {/* Sleek Glowing Tab Switcher Container */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-[#100e24] pixel-border-sm">
        <button
          onClick={() => handleTabChange("bounties")}
          className={`py-2 px-1 text-center font-pixel text-[8px] uppercase transition-all flex items-center justify-center gap-1 ${
            activeTab === "bounties"
              ? "bg-[#06d6a0] text-black font-bold border border-black shadow-[0_0_12px_#06d6a0,2px_2px_0_#000]"
              : "text-[#a7a9be] hover:text-white hover:bg-[#1a1738]"
          }`}
        >
          <Target className="w-3 h-3 shrink-0" />
          <span className="hidden sm:inline">Bounties</span>
          <span className="sm:hidden">Tasks</span>
        </button>

        <button
          onClick={() => handleTabChange("leaderboard")}
          className={`py-2 px-1 text-center font-pixel text-[8px] uppercase transition-all flex items-center justify-center gap-1 ${
            activeTab === "leaderboard"
              ? "bg-[#ffd166] text-black font-bold border border-black shadow-[0_0_12px_#ffd166,2px_2px_0_#000]"
              : "text-[#a7a9be] hover:text-white hover:bg-[#1a1738]"
          }`}
        >
          <Trophy className="w-3 h-3 shrink-0" />
          <span>Ranks</span>
        </button>

        <button
          onClick={() => handleTabChange("trophies")}
          className={`py-2 px-1 text-center font-pixel text-[8px] uppercase transition-all flex items-center justify-center gap-1 ${
            activeTab === "trophies"
              ? "bg-[#ef476f] text-black font-bold border border-black shadow-[0_0_12px_#ef476f,2px_2px_0_#000]"
              : "text-[#a7a9be] hover:text-white hover:bg-[#1a1738]"
          }`}
        >
          <Award className="w-3 h-3 shrink-0" />
          <span>Vault</span>
        </button>

        <button
          onClick={() => handleTabChange("shop")}
          className={`py-2 px-1 text-center font-pixel text-[8px] uppercase transition-all flex items-center justify-center gap-1 ${
            activeTab === "shop"
              ? "bg-[#00bbf9] text-black font-bold border border-black shadow-[0_0_12px_#00bbf9,2px_2px_0_#000]"
              : "text-[#a7a9be] hover:text-white hover:bg-[#1a1738]"
          }`}
        >
          <ShoppingBag className="w-3 h-3 shrink-0" />
          <span>Shop</span>
        </button>
      </div>

      {/* Active Tab Panel with Smooth Transition */}
      <div className="transition-all duration-150">
        {activeTab === "bounties" && <DailyBounties />}
        {activeTab === "leaderboard" && <Leaderboard />}
        {activeTab === "trophies" && <BadgeCabinet />}
        {activeTab === "shop" && <ArcadeShop />}
      </div>
    </div>
  );
};

