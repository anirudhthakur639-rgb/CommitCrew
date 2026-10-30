"use client";

import React, { useState } from "react";
import { gitStoryChapters, GitStoryChapter, CharacterDialogue } from "@/data/gitStoryTutorials";
import { useGame } from "@/context/GameContext";
import { soundFx } from "@/utils/sound";
import confetti from "canvas-confetti";
import { 
  ArrowLeft, ArrowRight, Terminal, Sparkles, CheckCircle2, 
  AlertCircle, Play, Award, MessageSquareCode, Layers, 
  GitBranch, Users, HelpCircle, ChevronRight, Eye, RefreshCw
} from "lucide-react";

export const GitStoryViewer: React.FC = () => {
  const { addXp, setActiveTab } = useGame();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [activeDialogueIdx, setActiveDialogueIdx] = useState<number>(0);
  const [viewFullScript, setViewFullScript] = useState<boolean>(false);

  // Terminal simulator state
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [hasRunSim, setHasRunSim] = useState<boolean>(false);

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizStatus, setQuizStatus] = useState<"idle" | "success" | "wrong">("idle");
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});

  const currentChapter = gitStoryChapters[currentIdx];
  const activeDialogue: CharacterDialogue = currentChapter.dialogues[activeDialogueIdx] || currentChapter.dialogues[0];

  const handleNextChapter = () => {
    if (currentIdx < gitStoryChapters.length - 1) {
      soundFx.playClick();
      setCurrentIdx((i) => i + 1);
      resetChapterState();
    }
  };

  const handlePrevChapter = () => {
    if (currentIdx > 0) {
      soundFx.playClick();
      setCurrentIdx((i) => i - 1);
      resetChapterState();
    }
  };

  const handleJumpToChapter = (idx: number) => {
    soundFx.playClick();
    setCurrentIdx(idx);
    resetChapterState();
  };

  const resetChapterState = () => {
    setActiveDialogueIdx(0);
    setSimRunning(false);
    setHasRunSim(false);
    setSelectedQuizOption(null);
    setQuizStatus("idle");
  };

  // Step through story cutscene dialogues
  const handleNextDialogue = () => {
    soundFx.playClick();
    if (activeDialogueIdx < currentChapter.dialogues.length - 1) {
      setActiveDialogueIdx((prev) => prev + 1);
    } else {
      setActiveDialogueIdx(0); // loop back
    }
  };

  const handlePrevDialogue = () => {
    soundFx.playClick();
    if (activeDialogueIdx > 0) {
      setActiveDialogueIdx((prev) => prev - 1);
    }
  };

  const handleSelectCharacter = (idx: number) => {
    soundFx.playClick();
    setActiveDialogueIdx(idx);
  };

  const runSimulation = () => {
    soundFx.playClick();
    setSimRunning(true);
    setTimeout(() => {
      setSimRunning(false);
      setHasRunSim(true);
      soundFx.playCoin();
    }, 450);
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
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#ffd166", "#06d6a0", "#ff8906"],
      });

      if (!completedChapters[currentChapter.id]) {
        addXp(currentChapter.xpReward);
        setCompletedChapters((prev) => ({ ...prev, [currentChapter.id]: true }));
      }
    } else {
      setQuizStatus("wrong");
      soundFx.playClick();
    }
  };

  // Render a clean visual 8-bit diagram for each chapter
  const renderVisualDiagram = () => {
    switch (currentChapter.chapterNumber) {
      case 1:
        return (
          <div className="bg-[#090814] p-3.5 pixel-border-sm space-y-2.5 font-mono text-xs">
            <div className="text-[#ef476f] flex items-center gap-2">
              <span className="font-pixel text-[8px] bg-[#ef476f] text-black px-1.5">BEFORE GIT</span>
              <span className="truncate">app.txt ➔ app_final.txt ➔ app_FINAL_really.txt 💥 (Lost Work)</span>
            </div>
            <div className="text-[#06d6a0] flex items-center gap-2">
              <span className="font-pixel text-[8px] bg-[#06d6a0] text-black px-1.5">WITH GIT</span>
              <span className="truncate">[● Init] ──➔ [● Commit 1] ──➔ [● Working State] (Safe)</span>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-[#090814] p-3 pixel-border-sm grid grid-cols-3 gap-2 font-mono text-[10px] text-center">
            <div className="bg-[#141226] p-2 border border-[#ef476f]">
              <span className="text-xl block mb-1">🦍</span>
              <span className="text-white font-bold block">Gian</span>
              <span className="text-[#a7a9be] text-[8px]">Team Lead</span>
            </div>
            <div className="bg-[#141226] p-2 border border-[#ffd166]">
              <span className="text-xl block mb-1">👓</span>
              <span className="text-white font-bold block">Nobita</span>
              <span className="text-[#a7a9be] text-[8px]">Frontend</span>
            </div>
            <div className="bg-[#141226] p-2 border border-[#00bbf9]">
              <span className="text-xl block mb-1">🦊</span>
              <span className="text-white font-bold block">Suneo</span>
              <span className="text-[#a7a9be] text-[8px]">Backend</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-[#090814] p-3 pixel-border-sm flex items-center justify-between font-mono text-[10px] text-center gap-1">
            <div className="bg-[#1c183d] p-2 border border-[#ffd166] flex-1">
              <span className="font-bold text-white block">1. Working Dir</span>
              <span className="text-[#a7a9be] text-[8px]">Store Aisles</span>
            </div>
            <span className="text-[#06d6a0] font-bold text-xs">➔</span>
            <div className="bg-[#1c183d] p-2 border border-[#06d6a0] flex-1">
              <span className="font-bold text-[#06d6a0] block">2. Staging Cart</span>
              <span className="text-[#a7a9be] text-[8px]">git add .</span>
            </div>
            <span className="text-[#06d6a0] font-bold text-xs">➔</span>
            <div className="bg-[#1c183d] p-2 border border-[#00bbf9] flex-1">
              <span className="font-bold text-[#00bbf9] block">3. Local Repo</span>
              <span className="text-[#a7a9be] text-[8px]">git commit</span>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="bg-[#090814] p-3 pixel-border-sm font-mono text-xs space-y-1.5">
            <div className="text-[#06d6a0] flex items-center gap-2">
              <span className="font-pixel text-[8px] bg-[#06d6a0] text-black px-1.5">MAIN</span>
              <span>● ──────── ● ──────── ● (Stable Production)</span>
            </div>
            <div className="text-[#ffd166] flex items-center gap-2 pl-6">
              <span className="font-pixel text-[8px] bg-[#ffd166] text-black px-1.5">FEATURE</span>
              <span>╰──── ● ──── ● (Nobita&apos;s Experiment)</span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="bg-[#090814] p-3 pixel-border-sm font-mono text-[11px] border border-[#ef476f]">
            <div className="text-[#ef476f]">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (Gian&apos;s Branch)</div>
            <div className="text-white pl-4 font-bold">Total Score: 100</div>
            <div className="text-[#ffd166]">=======</div>
            <div className="text-white pl-4 font-bold">Total Score: 200</div>
            <div className="text-[#06d6a0]">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-scoring (Nobita&apos;s Branch)</div>
          </div>
        );
      case 6:
        return (
          <div className="bg-[#090814] p-3 pixel-border-sm flex items-center justify-between font-mono text-[10px] text-center gap-1.5">
            <div className="bg-[#181534] p-2 border border-white flex-1">
              <span className="block font-bold text-white">Local Code</span>
              <span className="text-[#a7a9be] text-[8px]">git push</span>
            </div>
            <span className="text-[#ff8906] font-bold text-xs">➔</span>
            <div className="bg-[#181534] p-2 border border-[#ff8906] flex-1">
              <span className="block font-bold text-[#ff8906]">GitHub Cloud</span>
              <span className="text-[#a7a9be] text-[8px]">Pull Request</span>
            </div>
            <span className="text-[#06d6a0] font-bold text-xs">➔</span>
            <div className="bg-[#181534] p-2 border border-[#06d6a0] flex-1">
              <span className="block font-bold text-[#06d6a0]">Merged!</span>
              <span className="text-[#a7a9be] text-[8px]">Code Review ✓</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200">
      
      {/* Top Header: Simple Episode Breadcrumb & Stepper */}
      <div className="bg-[#141226] pixel-border-lg p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[4px_4px_0_#000]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-pixel text-[8px] bg-[#ff8906] text-black px-1.5 py-0.5 border border-black font-bold">
              GIT STORY MODE
            </span>
            <span className="font-pixel text-[8px] bg-[#ffd166] text-black px-1.5 py-0.5 border border-black font-bold">
              EPISODE 0{currentChapter.chapterNumber} OF 0{gitStoryChapters.length}
            </span>
            {completedChapters[currentChapter.id] && (
              <span className="font-pixel text-[8px] bg-[#06d6a0] text-black px-1.5 py-0.5 border border-black flex items-center gap-1 font-bold animate-in zoom-in-95">
                <CheckCircle2 className="w-2.5 h-2.5 stroke-[3]" />
                CLEARED
              </span>
            )}
          </div>
          <h1 className="font-pixel text-xs sm:text-base text-white tracking-wide">
            {currentChapter.title}
          </h1>
          <p className="font-mono text-xs text-[#a7a9be] mt-0.5">
            {currentChapter.tagline}
          </p>
        </div>

        {/* Episode Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0">
          {gitStoryChapters.map((ch, idx) => {
            const isCurrent = idx === currentIdx;
            const isDone = completedChapters[ch.id];

            return (
              <button
                key={ch.id}
                onClick={() => handleJumpToChapter(idx)}
                title={`Episode ${ch.chapterNumber}: ${ch.title}`}
                className={`w-8 h-8 sm:w-9 sm:h-9 font-pixel text-[10px] pixel-btn flex items-center justify-center transition-all ${
                  isCurrent
                    ? "bg-[#ffd166] text-black font-bold -translate-y-0.5 shadow-[2px_2px_0_#000]"
                    : isDone
                    ? "bg-[#06d6a0] text-black"
                    : "bg-[#1f1c3a] text-[#a7a9be] hover:text-white hover:bg-[#2b2752]"
                }`}
              >
                {isDone ? "✓" : `0${ch.chapterNumber}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* ================= LEFT COLUMN: CINEMATIC STORY THEATER (7 COLS) ================= */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Visual Cutscene Theater Box */}
          <div className="bg-[#17152b] pixel-border p-4 sm:p-5 shadow-[4px_4px_0_#000]">
            
            {/* Cutscene Header & Character Lineup */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <MessageSquareCode className="w-4 h-4 text-[#ffd166]" />
                <span className="font-pixel text-xs text-[#ffd166] uppercase">
                  Story Cutscene
                </span>
              </div>

              {/* Character Avatar Picker / Lineup */}
              <div className="flex items-center gap-1 sm:gap-2">
                {currentChapter.dialogues.map((dlg, idx) => {
                  const isActive = idx === activeDialogueIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectCharacter(idx)}
                      title={`${dlg.speaker} (${dlg.role})`}
                      className={`w-7 h-7 sm:w-8 sm:h-8 text-sm sm:text-base pixel-border-sm flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-[#ffd166] scale-110 shadow-[0_0_10px_#ffd166]"
                          : "bg-[#090814] opacity-50 hover:opacity-100"
                      }`}
                    >
                      {dlg.avatar}
                    </button>
                  );
                })}

                <button
                  onClick={() => setViewFullScript(!viewFullScript)}
                  title={viewFullScript ? "Switch to single scene" : "View full script"}
                  className="ml-1 p-1.5 bg-[#090814] hover:bg-[#232048] pixel-border-sm text-[#a7a9be] text-[10px] font-mono flex items-center gap-1"
                >
                  <Eye className="w-3 h-3 text-[#06d6a0]" />
                  <span className="hidden sm:inline font-pixel text-[7px]">{viewFullScript ? "SCENE" : "SCRIPT"}</span>
                </button>
              </div>
            </div>

            {/* View Mode: Either Interactive Single Dialogue Theater OR Full Script */}
            {!viewFullScript ? (
              /* Single Animated Dialogue Card with Controls */
              <div className="space-y-4">
                
                {/* Speaker Card */}
                <div 
                  className="bg-[#121024] p-4 pixel-border relative"
                  style={{ borderColor: activeDialogue.bubbleColor }}
                >
                  {/* Speaker Top Bar */}
                  <div className="flex items-center justify-between mb-3 border-b border-[#2b2752] pb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 bg-[#090814] pixel-border-sm flex items-center justify-center text-2xl">
                        {activeDialogue.avatar}
                      </div>
                      <div>
                        <div className="font-pixel text-xs text-white">
                          {activeDialogue.speaker}
                        </div>
                        <div className="text-[10px] font-mono text-[#a7a9be]">
                          {activeDialogue.role}
                        </div>
                      </div>
                    </div>

                    <span 
                      className="font-pixel text-[8px] px-2 py-0.5 border border-black uppercase"
                      style={{ backgroundColor: activeDialogue.bubbleColor, color: '#000' }}
                    >
                      {activeDialogue.mood}
                    </span>
                  </div>

                  {/* Character Dialogue Speech */}
                  <p className="font-mono text-xs sm:text-sm text-white leading-relaxed font-medium">
                    &quot;{activeDialogue.message}&quot;
                  </p>

                  {/* Step Indicators */}
                  <div className="flex items-center justify-between mt-4 pt-2 border-t border-[#232048] text-[9px] font-mono text-[#a7a9be]">
                    <span>Line {activeDialogueIdx + 1} of {currentChapter.dialogues.length}</span>
                    <span className="font-pixel text-[8px] text-[#ffd166]">CLICK NEXT TO ADVANCE</span>
                  </div>
                </div>

                {/* Dialogue Stepping Buttons */}
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={handlePrevDialogue}
                    disabled={activeDialogueIdx === 0}
                    className={`px-3 py-1.5 font-pixel text-[9px] pixel-btn flex items-center gap-1.5 ${
                      activeDialogueIdx > 0
                        ? "bg-[#232048] text-white hover:bg-[#343063]"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <span>◀ PREV LINE</span>
                  </button>

                  <div className="flex gap-1.5">
                    {currentChapter.dialogues.map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 border border-black inline-block ${
                          i === activeDialogueIdx ? "bg-[#ffd166] scale-125" : "bg-[#252248]"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextDialogue}
                    className="px-4 py-1.5 bg-[#06d6a0] hover:bg-[#05ba8a] text-black font-pixel text-[9px] pixel-btn flex items-center gap-1.5 font-bold"
                  >
                    <span>{activeDialogueIdx === currentChapter.dialogues.length - 1 ? "REPEAT ↻" : "NEXT LINE ▶"}</span>
                  </button>
                </div>

              </div>
            ) : (
              /* Full Script List (Expanded) */
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {currentChapter.dialogues.map((dlg, idx) => (
                  <div key={idx} className="bg-[#121024] p-3 pixel-border-sm flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{dlg.avatar}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-pixel text-[10px] text-[#ffd166]">{dlg.speaker}</span>
                        <span className="text-[9px] font-mono text-[#a7a9be]">({dlg.role})</span>
                      </div>
                      <p className="font-mono text-xs text-white leading-relaxed">
                        &quot;{dlg.message}&quot;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Simple Visual Concept Card */}
          <div className="bg-[#17152b] pixel-border p-4 shadow-[4px_4px_0_#000]">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-black">
              <Layers className="w-4 h-4 text-[#06d6a0]" />
              <h3 className="font-pixel text-xs text-[#06d6a0] uppercase">
                Visual Concept Diagram
              </h3>
            </div>
            
            {/* The Dynamic 8-bit Diagram */}
            <div className="mb-3">
              {renderVisualDiagram()}
            </div>

            {/* Doraemon Analogy Key Takeaway */}
            <div className="bg-[#121024] p-3 pixel-border-sm border-l-4 border-l-[#ffd166] text-xs font-mono">
              <span className="font-pixel text-[9px] text-[#ffd166] block mb-1">
                💡 {currentChapter.analogyStory.heading}
              </span>
              <p className="text-white leading-relaxed mb-2">
                {currentChapter.analogyStory.narrative}
              </p>
              <div className="text-[#06d6a0] font-bold text-[11px]">
                &gt; {currentChapter.analogyStory.moral}
              </div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE TERMINAL & QUIZ (5 COLS) ================= */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Interactive Simulated Terminal */}
          <div className="bg-[#17152b] pixel-border overflow-hidden shadow-[4px_4px_0_#000]">
            
            {/* Terminal Top Window Bar */}
            <div className="bg-[#090814] border-b-4 border-black p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-[#ef476f] border border-black inline-block" />
                  <span className="w-2 h-2 bg-[#ffd166] border border-black inline-block" />
                  <span className="w-2 h-2 bg-[#06d6a0] border border-black inline-block" />
                </div>
                <span className="font-mono text-[10px] text-[#a7a9be] ml-1">
                  bash · nobita@school-project
                </span>
              </div>
              <span className="font-pixel text-[8px] text-[#06d6a0]">CLI</span>
            </div>

            {/* Terminal Body */}
            <div className="p-3.5 space-y-3 font-mono text-xs">
              
              {/* Command Display */}
              <div className="bg-[#090814] p-3 pixel-border-sm border-2 border-black">
                <div className="text-[10px] text-[#a7a9be] mb-1">
                  # Executable spell for Episode {currentChapter.chapterNumber}:
                </div>
                <div className="text-[#38ef7d] font-bold flex items-center gap-2 text-xs">
                  <span className="text-[#ffd166]">$</span>
                  <span>{currentChapter.simulation.command}</span>
                </div>

                {hasRunSim && (
                  <div className="mt-2.5 pt-2.5 border-t border-[#232044] text-[#ffd166] whitespace-pre-wrap text-[11px] animate-in fade-in">
                    {currentChapter.simulation.output}
                  </div>
                )}
              </div>

              {/* Feedback description */}
              {hasRunSim && (
                <div className="text-[11px] font-mono text-white bg-[#141226] p-2.5 pixel-border-sm border-l-2 border-l-[#06d6a0]">
                  <span className="text-[#06d6a0] font-bold block mb-0.5">✓ Git Output Explanation:</span>
                  {currentChapter.simulation.explanation}
                </div>
              )}

              {/* Run Button */}
              <button
                onClick={runSimulation}
                disabled={simRunning}
                className="w-full py-2 bg-[#06d6a0] hover:bg-[#05ba8a] text-black font-pixel text-[9px] uppercase pixel-btn flex items-center justify-center gap-2 font-bold"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>{simRunning ? "EXECUTING SPELL..." : "RUN TERMINAL SIMULATION"}</span>
              </button>
            </div>
          </div>

          {/* Episode Checkpoint Quiz */}
          <div className="bg-[#17152b] pixel-border p-4 shadow-[4px_4px_0_#000]">
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b-2 border-black">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#ffd166]" />
                <h3 className="font-pixel text-xs text-[#ffd166] uppercase">
                  Episode Checkpoint
                </h3>
              </div>
              <span className="font-pixel text-[9px] text-[#ffd166] bg-[#090814] px-1.5 py-0.5 border border-black">
                +{currentChapter.xpReward} XP
              </span>
            </div>

            <p className="font-mono text-xs text-white font-bold mb-3 leading-snug">
              ❓ {currentChapter.quiz.question}
            </p>

            {/* Quiz Choice Buttons */}
            <div className="space-y-2 mb-3">
              {currentChapter.quiz.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectQuiz(opt.id)}
                  className={`w-full text-left p-2 font-mono text-xs pixel-btn flex items-center justify-between transition-all ${
                    selectedQuizOption === opt.id
                      ? "bg-[#ffd166] text-black font-bold -translate-y-0.5"
                      : "bg-[#141226] hover:bg-[#232048] text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-pixel text-[8px] opacity-70">
                      [{String.fromCharCode(65 + opt.id)}]
                    </span>
                    <span>{opt.text}</span>
                  </span>

                  {selectedQuizOption === opt.id && (
                    <span className="font-pixel text-[7px] bg-black text-[#ffd166] px-1">
                      CHOSEN
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Feedback Alerts */}
            {quizStatus === "success" && (
              <div className="p-2.5 bg-[#06d6a0]/20 border border-[#06d6a0] text-[#06d6a0] font-pixel text-[9px] flex items-center gap-2 mb-3 animate-in zoom-in-95">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>EPISODE CLEARED! +{currentChapter.xpReward} XP AWARDED!</span>
              </div>
            )}

            {quizStatus === "wrong" && (
              <div className="p-2.5 bg-[#ef476f]/20 border border-[#ef476f] text-[#ef476f] font-pixel text-[9px] flex items-center gap-2 mb-3">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>INCORRECT. CHECK THE STORY CUTSCENE AND RETRY!</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmitQuiz}
              disabled={selectedQuizOption === null || quizStatus === "success"}
              className={`w-full py-2 font-pixel text-[9px] pixel-btn flex items-center justify-center gap-1.5 font-bold ${
                quizStatus === "success"
                  ? "bg-[#06d6a0] text-black cursor-default"
                  : selectedQuizOption !== null
                  ? "bg-[#ffd166] hover:bg-[#e6bd5c] text-black"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>{quizStatus === "success" ? "STAGE COMPLETED" : "VERIFY ANSWER"}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Episode Navigation Bar */}
      <div className="bg-[#141226] pixel-border p-3.5 flex items-center justify-between gap-3 shadow-[4px_4px_0_#000]">
        <button
          onClick={handlePrevChapter}
          disabled={currentIdx === 0}
          className={`px-3.5 py-2 font-pixel text-[9px] pixel-btn flex items-center gap-1.5 ${
            currentIdx > 0
              ? "bg-[#232048] hover:bg-[#343063] text-white"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ArrowLeft className="w-3 h-3" />
          <span>PREV EPISODE</span>
        </button>

        <div className="font-pixel text-[9px] text-[#ffd166] hidden sm:block">
          CHAPTER {currentChapter.chapterNumber} / {gitStoryChapters.length}
        </div>

        <button
          onClick={handleNextChapter}
          disabled={currentIdx === gitStoryChapters.length - 1}
          className={`px-4 py-2 font-pixel text-[9px] pixel-btn flex items-center gap-1.5 font-bold ${
            currentIdx < gitStoryChapters.length - 1
              ? "bg-[#06d6a0] hover:bg-[#05ba8a] text-black"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          <span>NEXT EPISODE</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
};
