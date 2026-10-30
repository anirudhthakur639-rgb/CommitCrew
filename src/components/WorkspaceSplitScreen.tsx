"use client";

import React, { useState } from "react";
import { soundFx } from "@/utils/sound";
import { 
  ArrowLeft, BookOpen, CheckCircle2, AlertCircle, Sparkles, 
  Terminal, Code2, HelpCircle, Play, Flame, Award, Lightbulb
} from "lucide-react";

export interface LearningModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  badge: string;
  status: "completed" | "current" | "upcoming";
  xpReward: number;
  category: string;
  doc: {
    overview: string;
    codeSnippet: string;
    keyPoints: string[];
    proTip: string;
  };
  checkpoint: {
    question: string;
    codeContext?: string;
    options: { id: number; text: string; isCorrect: boolean }[];
    hint: string;
    explanationOnSuccess: string;
  };
}

interface WorkspaceSplitScreenProps {
  module: LearningModule;
  onBack: () => void;
  onComplete: (moduleId: string, xp: number) => void;
}

export const WorkspaceSplitScreen: React.FC<WorkspaceSplitScreenProps> = ({
  module,
  onBack,
  onComplete,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "wrong">("idle");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [activeDocTab, setActiveDocTab] = useState<"guide" | "code" | "bhasha">("guide");

  const handleSelectOption = (idx: number) => {
    soundFx.playClick();
    setSelectedOption(idx);
    setStatus("idle");
  };

  const handleRunCheckpoint = () => {
    if (selectedOption === null) return;

    const chosen = module.checkpoint.options[selectedOption];
    if (chosen.isCorrect) {
      setStatus("success");
      soundFx.playSuccess();
      onComplete(module.id, module.xpReward);
    } else {
      setStatus("wrong");
      soundFx.playClick();
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4 animate-in fade-in duration-200">
      
      {/* Top Workspace Navigation Bar */}
      <div className="bg-[#17152b] pixel-border p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onBack();
            }}
            className="px-3 py-1.5 bg-[#232144] hover:bg-[#343063] text-white font-pixel text-[10px] pixel-btn flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>MAP</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[9px] px-1.5 py-0.5 border border-black bg-[#ffd166] text-black">
                STAGE {module.number}
              </span>
              <span className="font-pixel text-xs sm:text-sm text-white">
                {module.title}
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#a7a9be] hidden sm:block">
              {module.subtitle}
            </p>
          </div>
        </div>

        {/* State Badge & XP Bounty */}
        <div className="flex items-center gap-3">
          <div
            className={`font-pixel text-[9px] px-2 py-1 border border-black ${
              module.status === "completed"
                ? "bg-[#06d6a0] text-black"
                : "bg-[#ffd166] text-black"
            }`}
          >
            {module.status === "completed" ? "✓ COMPLETED" : "★ IN PROGRESS"}
          </div>

          <div className="font-pixel text-[10px] text-[#ffd166] bg-[#090814] px-2.5 py-1 pixel-border-sm flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-[#ffd166]" />
            <span>+{module.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* Split-Screen Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[580px]">
        
        {/* ================= LEFT PANE: DOCUMENTATION & THEORY (6 Cols) ================= */}
        <div className="lg:col-span-6 bg-[#17152b] pixel-border flex flex-col overflow-hidden">
          
          {/* Doc Header with Tabs */}
          <div className="bg-[#0f0e17] border-b-4 border-black p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#06d6a0] ml-2" />
              <span className="font-pixel text-[10px] text-white">DOCUMENTATION</span>
            </div>

            {/* Doc Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveDocTab("guide");
                }}
                className={`px-2.5 py-1 text-[9px] font-pixel transition-colors ${
                  activeDocTab === "guide"
                    ? "bg-[#06d6a0] text-black border border-black"
                    : "text-[#a7a9be] hover:text-white"
                }`}
              >
                GUIDE
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveDocTab("code");
                }}
                className={`px-2.5 py-1 text-[9px] font-pixel transition-colors ${
                  activeDocTab === "code"
                    ? "bg-[#ffd166] text-black border border-black"
                    : "text-[#a7a9be] hover:text-white"
                }`}
              >
                SYNTAX
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveDocTab("bhasha");
                }}
                className={`px-2.5 py-1 text-[9px] font-pixel transition-colors ${
                  activeDocTab === "bhasha"
                    ? "bg-[#ef476f] text-black border border-black"
                    : "text-[#a7a9be] hover:text-white"
                }`}
              >
                BHASHA TIP
              </button>
            </div>
          </div>

          {/* Doc Body Content */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4 font-mono text-xs text-[#fffffe] leading-relaxed">
            {activeDocTab === "guide" && (
              <div className="space-y-4">
                <div className="bg-[#090814] p-3.5 pixel-border-sm border-l-4 border-l-[#06d6a0]">
                  <h4 className="font-pixel text-[10px] text-[#06d6a0] mb-1.5">CONCEPT OVERVIEW</h4>
                  <p className="text-[#e2e8f0] text-xs">
                    {module.doc.overview}
                  </p>
                </div>

                <div>
                  <h4 className="font-pixel text-[10px] text-[#ffd166] mb-2 uppercase">
                    Core Mechanics & Rules
                  </h4>
                  <ul className="space-y-2">
                    {module.doc.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#232144] p-2.5 pixel-border-sm">
                        <span className="font-pixel text-[#06d6a0] text-[10px]">0{idx + 1}</span>
                        <span className="text-[#e2e8f0]">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeDocTab === "code" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-pixel text-[#a7a9be]">
                  <span>CODE SNIPPET (PYTHON)</span>
                  <span className="text-[#06d6a0]">READ-ONLY</span>
                </div>
                <div className="bg-[#090814] p-4 pixel-border-sm font-mono text-xs overflow-x-auto border-2 border-black">
                  <pre className="text-[#38ef7d] leading-normal font-mono">
                    {module.doc.codeSnippet}
                  </pre>
                </div>
                <p className="text-[11px] text-[#a7a9be] italic">
                  Tip: Notice how indentation marks code blocks in Python rather than curly braces.
                </p>
              </div>
            )}

            {activeDocTab === "bhasha" && (
              <div className="space-y-3 bg-[#1e1b38] p-4 pixel-border-sm border-l-4 border-l-[#ef476f]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🇮🇳</span>
                  <h4 className="font-pixel text-[10px] text-[#ef476f] uppercase">
                    Indic Analogy (Desi Context)
                  </h4>
                </div>
                <p className="text-sm text-[#ffd166] font-mono leading-relaxed font-bold">
                  &quot;{module.doc.proTip}&quot;
                </p>
                <div className="pt-2 text-[11px] text-[#a7a9be]">
                  Gemma 2 open-weight model provides vernacular explanations to simplify abstract programming syntax into real-life mental models.
                </div>
              </div>
            )}
          </div>

          {/* Doc Bottom Status */}
          <div className="bg-[#0f0e17] border-t-2 border-black p-2.5 text-[10px] font-mono text-[#a7a9be] flex items-center justify-between">
            <span>MODULE: {module.category}</span>
            <span className="text-[#06d6a0]">OPEN-SOURCE CURRICULUM</span>
          </div>

        </div>

        {/* ================= RIGHT PANE: INTERACTIVE QUIZ & CHECKPOINT (6 Cols) ================= */}
        <div className="lg:col-span-6 bg-[#17152b] pixel-border flex flex-col justify-between overflow-hidden">
          
          {/* Checkpoint Header */}
          <div className="bg-[#0f0e17] border-b-4 border-black p-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#ffd166] ml-2" />
              <span className="font-pixel text-[10px] text-white">INTERACTIVE CHECKPOINT</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setShowHint(!showHint);
                }}
                className="px-2 py-1 text-[9px] font-pixel text-[#ffd166] hover:bg-[#232144] flex items-center gap-1 border border-transparent hover:border-black"
              >
                <Lightbulb className="w-3 h-3" />
                <span>{showHint ? "HIDE HINT" : "NEED HINT?"}</span>
              </button>
            </div>
          </div>

          {/* Checkpoint Question & Playground */}
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            
            {/* Prompt Card */}
            <div className="bg-[#090814] p-4 pixel-border-sm">
              <div className="flex items-center gap-2 text-[10px] font-pixel text-[#ffd166] mb-2">
                <Flame className="w-3.5 h-3.5 text-[#ff8906]" />
                <span>MISSION CHALLENGE</span>
              </div>
              <p className="font-mono text-sm text-white font-bold leading-relaxed mb-3">
                {module.checkpoint.question}
              </p>

              {/* Code Context if provided */}
              {module.checkpoint.codeContext && (
                <div className="bg-[#141226] p-3 border-2 border-black font-mono text-xs text-[#06d6a0] overflow-x-auto">
                  <pre>{module.checkpoint.codeContext}</pre>
                </div>
              )}
            </div>

            {/* Hint Box */}
            {showHint && (
              <div className="bg-[#232144] p-3 pixel-border-sm text-xs font-mono text-[#ffd166] border-l-4 border-l-[#ffd166] animate-in fade-in">
                💡 <span className="font-bold">Hacker Hint:</span> {module.checkpoint.hint}
              </div>
            )}

            {/* Options List */}
            <div className="space-y-2.5">
              <span className="font-pixel text-[10px] text-[#a7a9be] block">
                SELECT YOUR SOLUTION:
              </span>

              {module.checkpoint.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-3 font-mono text-xs pixel-btn flex items-center justify-between transition-all ${
                    selectedOption === opt.id
                      ? "bg-[#ffd166] text-black font-bold -translate-y-0.5"
                      : "bg-[#232144] hover:bg-[#2d2955] text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-pixel text-[9px] opacity-70">[{String.fromCharCode(65 + opt.id)}]</span>
                    <span>{opt.text}</span>
                  </span>

                  {selectedOption === opt.id && (
                    <span className="font-pixel text-[8px] bg-black text-[#ffd166] px-1.5 py-0.5">
                      ARMED
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Success Banner */}
            {status === "success" && (
              <div className="p-3.5 bg-[#06d6a0]/20 border-2 border-[#06d6a0] text-[#06d6a0] pixel-border-sm space-y-1 animate-in zoom-in-95">
                <div className="flex items-center gap-2 font-pixel text-[10px]">
                  <Sparkles className="w-4 h-4 shrink-0 text-[#06d6a0]" />
                  <span>CHECKPOINT CLEARED! +{module.xpReward} XP EARNED</span>
                </div>
                <p className="font-mono text-xs text-white">
                  {module.checkpoint.explanationOnSuccess}
                </p>
              </div>
            )}

            {/* Failure Banner */}
            {status === "wrong" && (
              <div className="p-3.5 bg-[#ef476f]/20 border-2 border-[#ef476f] text-[#ef476f] pixel-border-sm flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <div className="font-mono text-xs">
                  <span className="font-pixel text-[9px] block">TEST FAILED:</span>
                  Syntax or logical discrepancy encountered. Check the documentation and re-try.
                </div>
              </div>
            )}

          </div>

          {/* Bottom Execution Bar */}
          <div className="bg-[#0f0e17] border-t-2 border-black p-3.5 flex items-center justify-between gap-3">
            <div className="font-pixel text-[9px] text-[#a7a9be]">
              {selectedOption !== null ? "1 OPTION SELECTED" : "SELECT AN OPTION"}
            </div>

            <button
              onClick={handleRunCheckpoint}
              disabled={selectedOption === null || status === "success"}
              className={`px-5 py-2.5 font-pixel text-[10px] pixel-btn flex items-center gap-2 ${
                status === "success"
                  ? "bg-[#06d6a0] text-black cursor-default"
                  : selectedOption !== null
                  ? "bg-[#06d6a0] hover:bg-[#05ba8a] text-black"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{status === "success" ? "STAGE COMPLETE" : "EXECUTE & VERIFY"}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
