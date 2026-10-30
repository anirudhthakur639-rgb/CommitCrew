"use client";

import React from "react";
import { Trophy, Medal, Crown } from "lucide-react";

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  badge: string;
  isCurrentUser?: boolean;
}

export const Leaderboard: React.FC = () => {
  const leaders: LeaderboardUser[] = [
    { rank: 1, name: "PixelPaladin", avatar: "🤖", xp: 1840, badge: "Grandmaster" },
    { rank: 2, name: "BhashaNinja", avatar: "🥷", xp: 1620, badge: "Indic Mage" },
    { rank: 3, name: "ByteReaper", avatar: "👻", xp: 1490, badge: "Ghost Coder" },
    { rank: 4, name: "You (Hacker)", avatar: "🧙‍♂️", xp: 920, badge: "Apprentice", isCurrentUser: true },
    { rank: 5, name: "KernelKnight", avatar: "👾", xp: 810, badge: "DevOps Novice" },
  ];

  return (
    <div className="bg-[#17152b] pixel-border p-4 mb-6">
      <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#ffd166]" />
          <h3 className="font-pixel text-xs text-[#ffd166] uppercase">
            Hall of Fame
          </h3>
        </div>
        <span className="font-mono text-[10px] text-[#a7a9be]">
          LIVE STANDINGS
        </span>
      </div>

      <div className="space-y-2">
        {leaders.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between p-2 pixel-border-sm transition-all ${
              user.isCurrentUser
                ? "bg-[#2d2955] border-[#ffd166]"
                : "bg-[#0f0e17] hover:bg-[#1f1c3a]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {/* Rank Badge */}
              <div
                className={`w-5 h-5 flex items-center justify-center font-pixel text-[10px] border border-black ${
                  user.rank === 1
                    ? "bg-[#ffd166] text-black"
                    : user.rank === 2
                    ? "bg-[#e2e8f0] text-black"
                    : user.rank === 3
                    ? "bg-[#cd7f32] text-white"
                    : "bg-[#232144] text-[#a7a9be]"
                }`}
              >
                {user.rank}
              </div>

              {/* Avatar & Name */}
              <div className="text-base">{user.avatar}</div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-mono text-xs font-bold ${
                      user.isCurrentUser ? "text-[#ffd166]" : "text-white"
                    }`}
                  >
                    {user.name}
                  </span>
                  {user.isCurrentUser && (
                    <span className="text-[8px] bg-[#06d6a0] text-black font-pixel px-1">
                      YOU
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-mono text-[#a7a9be]">
                  {user.badge}
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="font-pixel text-[10px] text-[#06d6a0]">
              {user.xp} <span className="text-[8px] text-[#a7a9be]">XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
