"use client";

import React from "react";
import { CharacterDialogue } from "@/data/gitStoryTutorials";
import { soundFx } from "@/utils/sound";

interface VisualDialogueCardProps {
  dialogue: CharacterDialogue;
  index: number;
}

export const VisualDialogueCard: React.FC<VisualDialogueCardProps> = ({ dialogue, index }) => {
  const isLeft = index % 2 === 0;

  const getMoodBadge = (mood: CharacterDialogue["mood"]) => {
    switch (mood) {
      case "angry":
        return { label: "💢 ENRAGED", bg: "bg-[#ef476f] text-black" };
      case "panic":
        return { label: "💦 PANICKING", bg: "bg-[#ffd166] text-black" };
      case "smug":
        return { label: "😏 SMUG", bg: "bg-[#118ab2] text-white" };
      case "helpful":
        return { label: "✨ GADGET READY", bg: "bg-[#06d6a0] text-black" };
      case "cheerful":
        return { label: "🌸 CONFIDENT", bg: "bg-[#f72585] text-white" };
      default:
        return { label: "ACTIVE", bg: "bg-gray-800 text-white" };
    }
  };

  const moodInfo = getMoodBadge(dialogue.mood);

  return (
    <div
      onClick={() => soundFx.playClick()}
      className={`flex items-start gap-3 sm:gap-4 select-none cursor-pointer group transition-transform hover:-translate-y-0.5 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Character Pixel Portrait */}
      <div className="shrink-0 flex flex-col items-center">
        <div 
          className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0d0c1d] pixel-border flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-105 transition-transform relative"
          style={{
            boxShadow: `3px 3px 0px ${dialogue.bubbleColor}`,
          }}
        >
          <span>{dialogue.avatar}</span>
          
          {/* Mood Badge Pill */}
          <div className={`absolute -bottom-2.5 px-1 py-0.2 font-pixel text-[7px] border border-black ${moodInfo.bg}`}>
            {moodInfo.label}
          </div>
        </div>
        
        <span className="font-pixel text-[9px] text-white mt-3 text-center">
          {dialogue.speaker}
        </span>
      </div>

      {/* Retro RPG Dialogue Speech Bubble */}
      <div 
        className="flex-1 bg-[#1e1b38] pixel-border p-3.5 sm:p-4 relative transition-colors group-hover:bg-[#252246]"
        style={{
          boxShadow: `4px 4px 0px ${dialogue.bubbleColor}`,
        }}
      >
        {/* Bubble Header */}
        <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5 pb-1 border-b border-[#2b2752]">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-[#ffd166] uppercase">
              {dialogue.speaker}
            </span>
            <span className="text-[10px] font-mono text-[#a7a9be]">
              ({dialogue.role})
            </span>
          </div>

          <span className="font-pixel text-[8px] text-[#a7a9be]">
            PRESS TO READ
          </span>
        </div>

        {/* Dialogue Text */}
        <p className="font-mono text-xs sm:text-sm text-[#fffffe] leading-relaxed">
          &quot;{dialogue.message}&quot;
        </p>
      </div>
    </div>
  );
};

