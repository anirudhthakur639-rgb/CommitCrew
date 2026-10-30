"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { CheckSquare, Square, Zap, Check } from "lucide-react";

export const DailyBounties: React.FC = () => {
  const { dailyQuests, completeDailyQuest } = useGame();

  return (
    <div className="bg-[#17152b] pixel-border p-4 mb-6">
      <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <h3 className="font-pixel text-xs text-[#ffd166] uppercase">
            Daily Bounties
          </h3>
        </div>
        <span className="font-pixel text-[9px] text-[#06d6a0] bg-[#090814] px-1.5 py-0.5 border border-black">
          RESETS 10 AM
        </span>
      </div>

      <div className="space-y-3">
        {dailyQuests.map((quest) => (
          <div
            key={quest.id}
            onClick={() => !quest.completed && completeDailyQuest(quest.id)}
            className={`p-3 pixel-border-sm transition-all cursor-pointer select-none ${
              quest.completed
                ? "bg-[#0f0e17] opacity-70 border-[#232144]"
                : "bg-[#232144] hover:bg-[#2e2a57] hover:-translate-y-0.5"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {quest.completed ? (
                  <div className="w-4 h-4 bg-[#06d6a0] text-black flex items-center justify-center font-bold text-xs border border-black">
                    ✓
                  </div>
                ) : (
                  <div className="w-4 h-4 border-2 border-[#ffd166] bg-[#090814]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4
                    className={`font-mono text-xs font-bold leading-tight ${
                      quest.completed ? "line-through text-[#a7a9be]" : "text-white"
                    }`}
                  >
                    {quest.title}
                  </h4>
                  <span className="font-pixel text-[9px] text-[#ffd166] shrink-0">
                    +{quest.xpReward} XP
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#a7a9be] leading-relaxed">
                  {quest.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

