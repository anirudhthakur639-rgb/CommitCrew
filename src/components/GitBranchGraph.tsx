"use client";

import React, { useState } from "react";
import { GitBranch, GitMerge, GitCommit, Play, RefreshCw, CheckCircle2, Sparkles } from "lucide-react";
import { soundFx } from "@/utils/sound";
import confetti from "canvas-confetti";

export const GitBranchGraph: React.FC = () => {
  const [stage, setStage] = useState<"initial" | "branched" | "committed" | "merged">("initial");

  const handleBranch = () => {
    soundFx.playClick();
    setStage("branched");
  };

  const handleCommit = () => {
    soundFx.playCoin();
    setStage("committed");
  };

  const handleMerge = () => {
    soundFx.playSuccess();
    setStage("merged");
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#06d6a0", "#ffd166", "#00bbf9"],
    });
  };

  const handleReset = () => {
    soundFx.playClick();
    setStage("initial");
  };

  return (
    <div className="bg-[#0b1020] pixel-border-sm rounded-xl p-4 sm:p-5 space-y-4 my-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#262d55] pb-2.5">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-[#06d6a0]" />
          <span className="font-pixel text-[11px] text-white">
            Interactive Branch Simulator
          </span>
        </div>
        <span className="text-[9px] font-pixel text-[#ffd166] bg-[#1b2140] px-2 py-0.5 rounded border border-[#ffd166]/50">
          STAGE: {stage.toUpperCase()}
        </span>
      </div>

      {/* SVG Interactive Timeline Diagram */}
      <div className="w-full h-44 bg-[#070b18] rounded-lg p-2 relative flex items-center justify-center border border-[#1b2140] overflow-x-auto">
        <svg viewBox="0 0 540 140" className="w-full h-full min-w-[500px]">
          {/* Main Trunk Line */}
          <line x1="40" y1="90" x2="500" y2="90" stroke="#06d6a0" strokeWidth="4" strokeLinecap="round" />
          
          {/* Main Branch Label */}
          <text x="40" y="115" fill="#06d6a0" fontSize="10" fontFamily="monospace" fontWeight="bold">
            branch: main
          </text>

          {/* Commit C1 (main) */}
          <circle cx="80" cy="90" r="14" fill="#151a33" stroke="#06d6a0" strokeWidth="3" />
          <text x="80" y="94" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="monospace" fontWeight="bold">c1</text>
          <text x="80" y="68" textAnchor="middle" fill="#a7a9be" fontSize="8" fontFamily="monospace">init</text>

          {/* Commit C2 (main) */}
          <line x1="94" y1="90" x2="166" y2="90" stroke="#06d6a0" strokeWidth="3" />
          <circle cx="180" cy="90" r="14" fill="#151a33" stroke="#06d6a0" strokeWidth="3" />
          <text x="180" y="94" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="monospace" fontWeight="bold">c2</text>
          <text x="180" y="68" textAnchor="middle" fill="#a7a9be" fontSize="8" fontFamily="monospace">setup</text>

          {/* Feature Branch Timeline (Active when stage !== 'initial') */}
          {stage !== "initial" && (
            <>
              {/* Curve Splitting Upwards */}
              <path
                d="M 180 90 Q 220 35, 270 35"
                fill="none"
                stroke="#ffd166"
                strokeWidth="3.5"
                strokeDasharray="4 2"
                className="animate-in fade-in"
              />
              <text x="270" y="18" fill="#ffd166" fontSize="10" fontFamily="monospace" fontWeight="bold">
                branch: feature-login
              </text>

              {/* Commit C3 on Feature */}
              <circle cx="280" cy="35" r="14" fill="#151a33" stroke="#ffd166" strokeWidth="3" className="animate-in zoom-in-75" />
              <text x="280" y="39" textAnchor="middle" fill="#ffd166" fontSize="9" fontFamily="monospace" fontWeight="bold">c3</text>
            </>
          )}

          {/* Commit C4 on Feature (When committed or merged) */}
          {(stage === "committed" || stage === "merged") && (
            <>
              <line x1="294" y1="35" x2="356" y2="35" stroke="#ffd166" strokeWidth="3" />
              <circle cx="370" cy="35" r="14" fill="#151a33" stroke="#ffd166" strokeWidth="3" className="animate-in zoom-in-75" />
              <text x="370" y="39" textAnchor="middle" fill="#ffd166" fontSize="9" fontFamily="monospace" fontWeight="bold">c4</text>
              <text x="370" y="18" textAnchor="middle" fill="#ffd166" fontSize="8" fontFamily="monospace">auth</text>
            </>
          )}

          {/* Merge back into main (When merged) */}
          {stage === "merged" && (
            <>
              {/* Merge Curve down to main */}
              <path
                d="M 370 35 Q 420 90, 450 90"
                fill="none"
                stroke="#00bbf9"
                strokeWidth="4"
                className="animate-in fade-in"
              />
              {/* Merge Commit Node C5 */}
              <circle cx="460" cy="90" r="16" fill="#00bbf9" stroke="#fff" strokeWidth="3" className="animate-in zoom-in-95" />
              <text x="460" y="94" textAnchor="middle" fill="#000" fontSize="10" fontFamily="monospace" fontWeight="bold">c5</text>
              <text x="460" y="125" textAnchor="middle" fill="#00bbf9" fontSize="8" fontFamily="monospace" fontWeight="bold">MERGED PR</text>
            </>
          )}
        </svg>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          {stage === "initial" && (
            <button
              onClick={handleBranch}
              className="px-3 py-1.5 bg-[#ffd166] text-black font-pixel text-[9px] font-bold rounded pixel-btn flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,209,102,0.4)]"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>1. git checkout -b feature-login</span>
            </button>
          )}

          {stage === "branched" && (
            <button
              onClick={handleCommit}
              className="px-3 py-1.5 bg-[#ffd166] text-black font-pixel text-[9px] font-bold rounded pixel-btn flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,209,102,0.4)]"
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>2. git commit (feature-login)</span>
            </button>
          )}

          {stage === "committed" && (
            <button
              onClick={handleMerge}
              className="px-3 py-1.5 bg-[#00bbf9] text-black font-pixel text-[9px] font-bold rounded pixel-btn flex items-center gap-1.5 shadow-[0_0_12px_#00bbf9]"
            >
              <GitMerge className="w-3.5 h-3.5" />
              <span>3. git merge feature-login</span>
            </button>
          )}

          {stage === "merged" && (
            <div className="flex items-center gap-1.5 text-[#06d6a0] font-pixel text-[9px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Branch Merged Successfully into Main!</span>
            </div>
          )}
        </div>

        <button
          onClick={handleReset}
          className="p-1.5 bg-[#1b2140] hover:bg-[#252c54] text-[#a7a9be] hover:text-white rounded text-xs flex items-center gap-1 transition-colors cursor-pointer"
          title="Reset Interactive Graph"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="font-mono text-[10px]">Reset</span>
        </button>
      </div>
    </div>
  );
};

