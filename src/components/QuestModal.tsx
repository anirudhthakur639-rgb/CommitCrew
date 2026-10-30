"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { X, Terminal, CheckCircle2, AlertCircle, Sparkles, Play } from "lucide-react";
import { soundFx } from "@/utils/sound";

export const QuestModal: React.FC = () => {
  const { activeModalQuest, closeQuestModal, addXp } = useGame();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "wrong">("idle");

  if (!activeModalQuest) return null;

  const challenge = {
    question: "You encounter a rogue recursive function draining stack frames! Which base case stops the loop at count = 0?",
    options: [
      { id: 0, text: "if (count <= 0) return 0;", isCorrect: true },
      { id: 1, text: "while (count > 0) count++;", isCorrect: false },
      { id: 2, text: "if (count == -999) break;", isCorrect: false },
      { id: 3, text: "return recurse(count + 1);", isCorrect: false },
    ],
    hint: "Open-source wisdom: A clean base case avoids StackOverflow dungeons!",
  };

  const handleSelect = (idx: number) => {
    soundFx.playClick();
    setSelectedOption(idx);
    setStatus("idle");
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    if (challenge.options[selectedOption].isCorrect) {
      setStatus("success");
      soundFx.playSuccess();
      addXp(activeModalQuest.xpReward);
    } else {
      setStatus("wrong");
      soundFx.playClick();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#141226] pixel-border-lg p-5 sm:p-6 overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-4 bg-[#090814] -mx-5 sm:-mx-6 -mt-5 sm:-mt-6 p-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#06d6a0]" />
            <h3 className="font-pixel text-xs sm:text-sm text-[#ffd166]">
              {activeModalQuest.title}
            </h3>
          </div>
          <button
            onClick={closeQuestModal}
            className="w-7 h-7 bg-[#ef476f] hover:bg-[#d63056] text-black font-pixel text-xs flex items-center justify-center pixel-btn"
          >
            <X className="w-4 h-4 text-black stroke-[3]" />
          </button>
        </div>

        {/* Quest Description & Prompt */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[10px] font-pixel text-[#a7a9be] mb-2">
            <span>TERMINAL MISSION</span>
            <span className="text-[#ffd166]">REWARD: +{activeModalQuest.xpReward} XP</span>
          </div>

          <div className="bg-[#090814] p-3.5 pixel-border-sm font-mono text-xs text-[#06d6a0] mb-4">
            <p className="text-white font-bold mb-2">
              👾 {challenge.question}
            </p>
            <p className="text-[#a7a9be] text-[11px]">
              &gt; {challenge.hint}
            </p>
          </div>

          {/* Interactive Multiple Choice */}
          <div className="space-y-2 mb-4">
            {challenge.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={status === "success"}
                className={`w-full text-left p-3 font-mono text-xs pixel-btn flex items-center justify-between transition-all ${
                  selectedOption === opt.id
                    ? "bg-[#ffd166] text-black font-bold -translate-y-0.5"
                    : "bg-[#232144] hover:bg-[#2c2856] text-white"
                }`}
              >
                <span>{opt.text}</span>
                {selectedOption === opt.id && (
                  <span className="font-pixel text-[9px] bg-black text-[#ffd166] px-1 py-0.5">
                    SELECTED
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Result Alert */}
          {status === "success" && (
            <div className="p-3 bg-[#06d6a0]/20 border-2 border-[#06d6a0] text-[#06d6a0] font-pixel text-[10px] flex items-center gap-2 mb-4 animate-bounce">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>QUEST COMPLETE! +{activeModalQuest.xpReward} XP & 50 COINS EARNED!</span>
            </div>
          )}

          {status === "wrong" && (
            <div className="p-3 bg-[#ef476f]/20 border-2 border-[#ef476f] text-[#ef476f] font-pixel text-[10px] flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>SYNTAX ERROR! REVIEW YOUR LOGIC AND TRY AGAIN.</span>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t-2 border-[#232144]">
          <button
            onClick={closeQuestModal}
            className="px-4 py-2 bg-[#232144] hover:bg-[#2d2955] text-white font-pixel text-[10px] pixel-btn"
          >
            {status === "success" ? "CONTINUE" : "RETREAT"}
          </button>

          {status !== "success" && (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-5 py-2 font-pixel text-[10px] pixel-btn flex items-center gap-2 ${
                selectedOption !== null
                  ? "bg-[#06d6a0] hover:bg-[#05b889] text-black"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>SUBMIT SOLUTION</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

