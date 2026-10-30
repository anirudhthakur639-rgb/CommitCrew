"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Check, Lock, Play, Star, Sparkles, MapPin } from "lucide-react";

interface PathNode {
  id: string;
  number: number;
  title: string;
  xp: number;
  status: "completed" | "current" | "locked";
  type: "lesson" | "quiz" | "boss";
}

export const JourneyView: React.FC = () => {
  const { openQuestModal } = useGame();

  const nodes: PathNode[] = [
    { id: "n1", number: 1, title: "Hello World & Print", xp: 50, status: "completed", type: "lesson" },
    { id: "n2", number: 2, title: "Variables & Memory Storage", xp: 75, status: "completed", type: "lesson" },
    { id: "n3", number: 3, title: "Conditionals & If/Else Branching", xp: 100, status: "completed", type: "quiz" },
    { id: "n4", number: 4, title: "The For-Loop Dungeon", xp: 150, status: "current", type: "boss" },
    { id: "n5", number: 5, title: "Arrays & List Manipulation", xp: 120, status: "locked", type: "lesson" },
    { id: "n6", number: 6, title: "Functions & Scope Alchemy", xp: 180, status: "locked", type: "lesson" },
    { id: "n7", number: 7, title: "Open Source Git Pull Request", xp: 250, status: "locked", type: "boss" },
  ];

  return (
    <div className="w-full">
      {/* Journey Banner */}
      <div className="bg-[#1e1b38] pixel-border-lg p-6 mb-8 text-center relative overflow-hidden">
        <span className="font-pixel text-[10px] bg-[#ffd166] text-black px-2 py-0.5 border border-black inline-block mb-2">
          WORLD MAP 01
        </span>
        <h1 className="font-pixel text-base sm:text-xl text-[#fffffe] mb-2">
          THE PYTHON ODYSSEY PATHWAY
        </h1>
        <p className="text-xs font-mono text-[#a7a9be] max-w-xl mx-auto">
          Traverse the 8-bit continent from Novice to Open-Source Contributor. Complete each node to unlock the next region.
        </p>
      </div>

      {/* Winding Adventure Path */}
      <div className="max-w-xl mx-auto py-6 relative">
        {/* Connecting Vertical Track Line */}
        <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-3 bg-[#090814] border-x-2 border-black" />

        <div className="space-y-10 relative">
          {nodes.map((node, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={node.id}
                className={`flex items-center gap-4 ${
                  isLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Node Description Card */}
                <div
                  className={`w-1/2 ${
                    isLeft ? "text-right pr-4" : "text-left pl-4"
                  }`}
                >
                  <div
                    className={`inline-block p-3 pixel-border-sm transition-all ${
                      node.status === "current"
                        ? "bg-[#ffd166] text-black scale-105"
                        : node.status === "completed"
                        ? "bg-[#17152b] text-white"
                        : "bg-[#0f0e17] text-[#a7a9be] opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="font-pixel text-[9px]">
                        STAGE {node.number}
                      </span>
                      {node.type === "boss" && (
                        <span className="font-pixel text-[8px] bg-[#ef476f] text-white px-1">
                          BOSS
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-xs font-bold leading-tight mt-1">
                      {node.title}
                    </div>
                    <div className="font-pixel text-[8px] mt-1 text-inherit opacity-80">
                      +{node.xp} XP
                    </div>
                  </div>
                </div>

                {/* Central Circle Node */}
                <div className="shrink-0 z-10">
                  <button
                    onClick={() => {
                      if (node.status !== "locked") {
                        openQuestModal({
                          id: node.id,
                          title: node.title,
                          description: `Conquer Stage ${node.number} to advance your coding journey!`,
                          xpReward: node.xp,
                          completed: node.status === "completed",
                          category: "odyssey",
                        });
                      }
                    }}
                    disabled={node.status === "locked"}
                    className={`w-14 h-14 pixel-btn flex items-center justify-center text-lg ${
                      node.status === "completed"
                        ? "bg-[#06d6a0] text-black"
                        : node.status === "current"
                        ? "bg-[#ffd166] text-black animate-bounce ring-4 ring-[#ff8906]"
                        : "bg-[#232144] text-[#a7a9be] cursor-not-allowed opacity-60"
                    }`}
                  >
                    {node.status === "completed" ? (
                      <Check className="w-6 h-6 stroke-[3]" />
                    ) : node.status === "current" ? (
                      <Play className="w-6 h-6 fill-black" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>

                {/* Empty Balancing Spacer */}
                <div className="w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
