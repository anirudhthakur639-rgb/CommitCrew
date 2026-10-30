"use client";

import React, { useState } from "react";
import { gitStoryChapters, GitStoryChapter } from "@/data/gitStoryTutorials";
import { VisualDialogueCard } from "./VisualDialogueCard";
import { useGame } from "@/context/GameContext";
import { soundFx } from "@/utils/sound";
import { 
  ArrowLeft, ArrowRight, Terminal, Sparkles, CheckCircle2, 
  AlertCircle, BookOpen, Play, HelpCircle, Award, Compass, MessageSquareCode
} from "lucide-react";

export const GitStoryViewer: React.FC = () => {
  const { addXp } = useGame();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [hasRunSim, setHasRunSim] = useState<boolean>(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizStatus, setQuizStatus] = useState<"idle" | "success" | "wrong">("idle");
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});

  const currentChapter = gitStoryChapters[currentIdx];

  const handleNext = () => {
    if (currentIdx < gitStoryChapters.length - 1) {
      soundFx.playClick();
      setCurrentIdx((i) => i + 1);
      resetState();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      soundFx.playClick();
      setCurrentIdx((i) => i - 1);
      resetState();
    }
  };

  const handleJumpTo = (idx: number) => {
    soundFx.playClick();
    setCurrentIdx(idx);
    resetState();
  };

  const resetState = () => {
    setSimRunning(false);
    setHasRunSim(false);
    setSelectedQuizOption(null);
    setQuizStatus("idle");
  };

  const runSimulation = () => {
    soundFx.playClick();
    setSimRunning(true);
    setTimeout(() => {
      setSimRunning(false);
      setHasRunSim(true);
      soundFx.playCoin();
    }, 500);
  };

  const handleSelectQuiz = (idx: number) => {
    soundFx.playClick();
    setSelectedQuizOption(idx);
    setQuizStatus("idle");
  };

  const handleSubmitQuiz = () => {
    if (selectedQuizOption === null) return;

    if (currentChapter.quiz.options[selectedQuizOption].isCorrect) {
      setQuizStatus("success");
      soundFx.playSuccess();
      if (!completedChapters[currentChapter.id]) {
        addXp(currentChapter.xpReward);
        setCompletedChapters((prev) => ({ ...prev, [currentChapter.id]: true }));
      }
    } else {
      setQuizStatus("wrong");
      soundFx.playClick();
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Chapter Stepper & Top Banner */}
      <div className="bg-[#1e1b38] pixel-border-lg p-5 sm:p-7 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-pixel text-[9px] bg-[#ffd166] text-black px-2 py-0.5 border border-black">
                {currentChapter.conceptBadge}
              </span>
              <span className="font-pixel text-[9px] bg-[#ef476f] text-black px-2 py-0.5 border border-black">
                DORAEMON &amp; FRIENDS ODYSSEY
              </span>
            </div>
            <h1 className="font-pixel text-sm sm:text-xl text-white mb-1">
              CHAPTER {currentChapter.chapterNumber}: {currentChapter.title}
            </h1>
            <p className="text-xs font-mono text-[#a7a9be]">
              {currentChapter.tagline}
            </p>
          </div>

          {/* XP Bounty & Chapter Count */}
          <div className="bg-[#090814] p-3 pixel-border-sm flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="font-pixel text-[9px] text-[#a7a9be]">STAGE CLEAR BOUNTY</div>
              <div className="font-pixel text-xs text-[#ffd166]">+{currentChapter.xpReward} XP</div>
            </div>
            <div className="w-8 h-8 bg-[#ff8906] pixel-border-sm flex items-center justify-center text-black font-pixel text-xs">
              0{currentChapter.chapterNumber}
            </div>
          </div>
        </div>

        {/* Chapter Quick Jump Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t-2 border-[#2b2752]">
          {gitStoryChapters.map((ch, idx) => {
            const isCurrent = idx === currentIdx;
            const isDone = completedChapters[ch.id];

            return (
              <button
                key={ch.id}
                onClick={() => handleJumpTo(idx)}
                className={`p-2 font-pixel text-[8px] pixel-btn text-left flex items-center justify-between transition-all ${
                  isCurrent
                    ? "bg-[#ffd166] text-black font-bold -translate-y-0.5"
                    : isDone
                    ? "bg-[#06d6a0] text-black"
                    : "bg-[#0d0c1d] text-[#a7a9be] hover:bg-[#232144]"
                }`}
              >
                <span>CH {ch.chapterNumber}</span>
                <span>{isDone ? "✓" : isCurrent ? "▶" : "·"}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Story Mode (Left) & Interactive Terminal/Quiz (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= LEFT COLUMN: VISUAL DIALOGUE CARDS & STORY (7 COLS) ================= */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Visual Dialogue Cutscene Header */}
          <div className="bg-[#17152b] pixel-border p-4">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <MessageSquareCode className="w-4 h-4 text-[#ffd166]" />
                <h2 className="font-pixel text-xs sm:text-sm text-[#ffd166] uppercase">
                  Story Cutscene · Episode {currentChapter.chapterNumber}
                </h2>
              </div>
              <span className="font-pixel text-[9px] text-[#06d6a0]">
                4 DIALOGUES
              </span>
            </div>

            {/* Render Visual Dialogue Cards */}
            <div className="space-y-4">
              {currentChapter.dialogues.map((dlg, idx) => (
                <VisualDialogueCard key={idx} dialogue={dlg} index={idx} />
              ))}
            </div>
          </div>

          {/* Gian, Nobita & Suneo Analogy Card */}
          <div className="bg-[#17152b] pixel-border p-4 border-l-4 border-l-[#ffd166]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💡</span>
              <h3 className="font-pixel text-xs text-[#ffd166] uppercase">
                {currentChapter.analogyStory.heading}
              </h3>
            </div>
            <p className="font-mono text-xs sm:text-sm text-[#fffffe] leading-relaxed mb-3">
              {currentChapter.analogyStory.narrative}
            </p>
            <div className="bg-[#090814] p-3 pixel-border-sm text-[11px] font-mono text-[#06d6a0]">
              <span className="font-pixel text-[9px] uppercase block mb-1">
                KEY LESSON:
              </span>
              {currentChapter.analogyStory.moral}
            </div>
          </div>

          {/* Key Commands Cheatblock */}
          <div className="bg-[#17152b] pixel-border p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-black">
              <Terminal className="w-4 h-4 text-[#06d6a0]" />
              <h3 className="font-pixel text-xs text-[#06d6a0] uppercase">
                Key Git Spells In This Episode
              </h3>
            </div>
            <div className="space-y-2">
              {currentChapter.keyCommands.map((kc, idx) => (
                <div key={idx} className="bg-[#090814] p-2.5 pixel-border-sm font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <code className="text-[#ffd166] font-bold bg-[#17152b] px-2 py-0.5 border border-black shrink-0">
                    {kc.cmd}
                  </code>
                  <span className="text-[#a7a9be] text-[11px]">{kc.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE TERMINAL SIMULATOR & QUIZ (5 COLS) ================= */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Interactive Terminal Simulator */}
          <div className="bg-[#17152b] pixel-border overflow-hidden">
            <div className="bg-[#090814] border-b-4 border-black p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#ef476f] rounded-none border border-black inline-block" />
                  <span className="w-2.5 h-2.5 bg-[#ffd166] rounded-none border border-black inline-block" />
                  <span className="w-2.5 h-2.5 bg-[#06d6a0] rounded-none border border-black inline-block" />
                </div>
                <span className="font-pixel text-[9px] text-[#a7a9be] ml-2">
                  nobita@laptop: ~/school-project
                </span>
              </div>
              <span className="font-pixel text-[8px] text-[#06d6a0]">BASH</span>
            </div>

            <div className="p-4 space-y-3 font-mono text-xs">
              <div className="bg-[#090814] p-3 pixel-border-sm text-[#fffffe] border-2 border-black">
                <div className="text-[#a7a9be] text-[11px] mb-1">
                  # Staged command to simulate:
                </div>
                <div className="text-[#38ef7d] font-bold flex items-center gap-2">
                  <span>$</span>
                  <span>{currentChapter.simulation.command}</span>
                </div>

                {hasRunSim && (
                  <div className="mt-3 pt-3 border-t border-[#232144] text-[#ffd166] whitespace-pre-wrap animate-in fade-in">
                    {currentChapter.simulation.output}
                  </div>
                )}
              </div>

              {hasRunSim && (
                <div className="text-[11px] font-mono text-[#a7a9be] bg-[#232144] p-2.5 pixel-border-sm">
                  💡 <span className="text-white font-bold">Terminal Feedback:</span> {currentChapter.simulation.explanation}
                </div>
              )}

              <button
                onClick={runSimulation}
                disabled={simRunning}
                className="w-full py-2.5 bg-[#06d6a0] hover:bg-[#05b889] text-black font-pixel text-[10px] uppercase pixel-btn flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>{simRunning ? "EXECUTING COMMAND..." : "RUN TERMINAL SIMULATION"}</span>
              </button>
            </div>
          </div>

          {/* Episode Checkpoint / Quiz */}
          <div className="bg-[#17152b] pixel-border p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#ffd166]" />
                <h3 className="font-pixel text-xs text-[#ffd166] uppercase">
                  Episode Checkpoint
                </h3>
              </div>
              <span className="font-pixel text-[9px] text-[#ffd166]">
                +{currentChapter.xpReward} XP
              </span>
            </div>

            <p className="font-mono text-xs text-white font-bold mb-3">
              ❓ {currentChapter.quiz.question}
            </p>

            <div className="space-y-2 mb-4">
              {currentChapter.quiz.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectQuiz(opt.id)}
                  className={`w-full text-left p-2.5 font-mono text-xs pixel-btn flex items-center justify-between transition-all ${
                    selectedQuizOption === opt.id
                      ? "bg-[#ffd166] text-black font-bold -translate-y-0.5"
                      : "bg-[#232144] hover:bg-[#2e2a57] text-white"
                  }`}
                >
                  <span>{opt.text}</span>
                  {selectedQuizOption === opt.id && (
                    <span className="font-pixel text-[8px] bg-black text-[#ffd166] px-1 py-0.5">
                      ARMED
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quiz Result Alerts */}
            {quizStatus === "success" && (
              <div className="p-3 bg-[#06d6a0]/20 border-2 border-[#06d6a0] text-[#06d6a0] font-pixel text-[9px] flex items-center gap-2 mb-3 animate-in zoom-in-95">
                <Sparkles className="w-4 h-4 shrink-0 text-[#06d6a0]" />
                <span>EPISODE PASSED! +{currentChapter.xpReward} XP EARNED!</span>
              </div>
            )}

            {quizStatus === "wrong" && (
              <div className="p-3 bg-[#ef476f]/20 border-2 border-[#ef476f] text-[#ef476f] font-pixel text-[9px] flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>WRONG ANSWER! DORAEMON SAYS: REVIEW THE DIALOGUE!</span>
              </div>
            )}

            <button
              onClick={handleSubmitQuiz}
              disabled={selectedQuizOption === null || quizStatus === "success"}
              className={`w-full py-2.5 font-pixel text-[10px] pixel-btn flex items-center justify-center gap-2 ${
                quizStatus === "success"
                  ? "bg-[#06d6a0] text-black cursor-default"
                  : selectedQuizOption !== null
                  ? "bg-[#ffd166] hover:bg-[#e6bd5c] text-black"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>{quizStatus === "success" ? "CHECKPOINT CLEARED" : "SUBMIT ANSWER"}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="bg-[#141226] pixel-border p-4 flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className={`px-4 py-2 font-pixel text-[10px] pixel-btn flex items-center gap-2 ${
            currentIdx > 0
              ? "bg-[#232144] hover:bg-[#343063] text-white"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PREVIOUS EPISODE</span>
        </button>

        <div className="font-pixel text-[9px] text-[#ffd166] text-center hidden sm:block">
          EPISODE 0{currentChapter.chapterNumber} OF 0{gitStoryChapters.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIdx === gitStoryChapters.length - 1}
          className={`px-4 py-2 font-pixel text-[10px] pixel-btn flex items-center gap-2 ${
            currentIdx < gitStoryChapters.length - 1
              ? "bg-[#06d6a0] hover:bg-[#05b889] text-black"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          <span>NEXT EPISODE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

