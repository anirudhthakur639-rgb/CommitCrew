"use client";

import React, { useState, useEffect, useRef } from "react";
import { interactiveLessons, InteractiveLesson } from "@/data/interactiveLessons";
import { useGame } from "@/context/GameContext";
import { soundFx } from "@/utils/sound";
import confetti from "canvas-confetti";
import { marked } from "marked";
import { 
  Terminal, BookOpen, CheckCircle2, AlertCircle, Sparkles, 
  ArrowLeft, ArrowRight, Play, Award, HelpCircle, CornerDownLeft, 
  RotateCcw, ShieldCheck, Flame, ChevronRight
} from "lucide-react";

interface TerminalHistoryEntry {
  command: string;
  output: string;
  isSuccess: boolean;
}

export const InteractiveLessonWorkspace: React.FC<{ onBackToMap?: () => void }> = ({ onBackToMap }) => {
  const { addXp, setActiveTab, deductHeart } = useGame();
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  
  // Track node state per lesson: 'in-progress' | 'completed'
  const [nodeStates, setNodeStates] = useState<Record<string, "in-progress" | "completed">>({
    "lesson-git-init": "in-progress",
    "lesson-git-add": "in-progress",
    "lesson-git-commit": "in-progress",
    "lesson-git-branch": "in-progress",
    "lesson-git-status": "in-progress",
  });

  // Mobile split-screen tab switcher ('guide' | 'terminal')
  const [mobilePane, setMobilePane] = useState<"guide" | "terminal">("guide");

  // Terminal state
  const [terminalInput, setTerminalInput] = useState<string>("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistoryEntry[]>([]);
  const [terminalCompleted, setTerminalCompleted] = useState<boolean>(false);
  const [showTerminalHint, setShowTerminalHint] = useState<boolean>(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizStatus, setQuizStatus] = useState<"idle" | "success" | "wrong">("idle");
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const currentLesson = interactiveLessons[currentStepIdx];
  const currentNodeState = nodeStates[currentLesson.id] || "in-progress";

  // Auto-focus the terminal input on step change
  useEffect(() => {
    setTerminalInput("");
    setTerminalHistory([]);
    setTerminalCompleted(nodeStates[currentLesson.id] === "completed");
    setSelectedQuizOption(null);
    setQuizStatus("idle");
    setQuizCompleted(false);
    setShowTerminalHint(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStepIdx, currentLesson.id, nodeStates]);

  // Scroll terminal to bottom when history updates
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  // Handle Terminal Command Submission
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = terminalInput.trim();
    if (!trimmed) return;

    // Track command in history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    soundFx.playClick();

    // Check if input matches any accepted command (case insensitive)
    const isCorrect = currentLesson.terminalChallenge.acceptedCommands.some(
      (cmd) => cmd.toLowerCase() === trimmed.toLowerCase()
    );

    if (isCorrect) {
      // Award +10 XP
      addXp(10);
      soundFx.playSuccess();

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#06d6a0", "#ffd166", "#118ab2"],
      });

      // Flip node state to 'Completed'
      setNodeStates((prev) => ({
        ...prev,
        [currentLesson.id]: "completed",
      }));

      setTerminalCompleted(true);

      setTerminalHistory((prev) => [
        ...prev,
        {
          command: trimmed,
          output: currentLesson.terminalChallenge.simulatedOutput,
          isSuccess: true,
        },
      ]);
    } else {
      // Wrong command feedback: play wrong audio, deduct a heart
      soundFx.playWrong();
      deductHeart();
      setTerminalHistory((prev) => [
        ...prev,
        {
          command: trimmed,
          output: `zsh: command not found or invalid syntax: '${trimmed}'\nHint: Check the target mission prompt, press Tab to autocomplete, or click 'AUTO-FILL'`,
          isSuccess: false,
        },
      ]);
    }

    setTerminalInput("");
  };

  // Keyboard navigation for terminal: ArrowUp / ArrowDown history, Tab autocomplete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      if (commandHistory.length > 0) {
        e.preventDefault();
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex !== -1) {
        e.preventDefault();
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setTerminalInput(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setTerminalInput("");
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const firstTarget = currentLesson.terminalChallenge.acceptedCommands[0];
      if (firstTarget) {
        setTerminalInput(firstTarget);
      }
    }
  };

  // Handle Quiz Submission
  const handleQuizSelect = (idx: number) => {
    soundFx.playClick();
    setSelectedQuizOption(idx);
    setQuizStatus("idle");
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;

    if (currentLesson.objectiveQuiz.options[selectedQuizOption].isCorrect) {
      setQuizStatus("success");
      setQuizCompleted(true);
      soundFx.playCoin();
      addXp(20);
    } else {
      setQuizStatus("wrong");
      soundFx.playWrong();
      deductHeart();
    }
  };

  // Navigation handlers
  const handleNextStep = () => {
    if (currentStepIdx < interactiveLessons.length - 1) {
      soundFx.playClick();
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      soundFx.playClick();
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  // Render markdown to HTML safely with marked
  const renderedMarkdown = marked.parse(currentLesson.markdownDoc) as string;

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200">
      
      {/* Top Workspace Header & Node State HUD */}
      <div className="bg-[#17152b] pixel-border-lg p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Step navigation & Category */}
        <div className="flex items-center gap-3">
          {onBackToMap ? (
            <button
              onClick={() => {
                soundFx.playClick();
                onBackToMap();
              }}
              className="px-3 py-1.5 bg-[#232144] hover:bg-[#343063] text-white font-pixel text-[10px] pixel-btn flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>MAP</span>
            </button>
          ) : (
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab("journey");
              }}
              className="px-3 py-1.5 bg-[#232144] hover:bg-[#343063] text-white font-pixel text-[10px] pixel-btn flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>JOURNEY</span>
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[9px] bg-[#ffd166] text-black px-2 py-0.5 border border-black">
                STEP 0{currentLesson.stepNumber} / 0{interactiveLessons.length}
              </span>
              <span className="font-pixel text-xs sm:text-sm text-white">
                {currentLesson.title}
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#a7a9be] hidden sm:block">
              Category: {currentLesson.category} · Interactive Terminal Laboratory
            </p>
          </div>
        </div>

        {/* Right: Flappable Current Node State Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#090814] px-3 py-1.5 pixel-border-sm">
            <span className="font-pixel text-[9px] text-[#a7a9be]">NODE STATE:</span>
            {currentNodeState === "completed" ? (
              <span className="font-pixel text-[10px] bg-[#06d6a0] text-black px-2 py-0.5 border border-black flex items-center gap-1 animate-in zoom-in-95">
                <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                COMPLETED
              </span>
            ) : (
              <span className="font-pixel text-[10px] bg-[#ffd166] text-black px-2 py-0.5 border border-black flex items-center gap-1 animate-pulse">
                <Flame className="w-3 h-3 fill-black" />
                IN-PROGRESS
              </span>
            )}
          </div>

          <div className="font-pixel text-[10px] text-[#ffd166] bg-[#090814] px-2.5 py-1.5 pixel-border-sm hidden sm:flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>+10 XP / MISSION</span>
          </div>
        </div>

      </div>

      {/* Mobile Split-Screen Mode Switcher (Visible on < 1024px) */}
      <div className="flex lg:hidden bg-[#090814] p-1.5 pixel-border gap-2">
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            setMobilePane("guide");
          }}
          className={`flex-1 py-2 font-pixel text-[10px] flex items-center justify-center gap-2 transition-all ${
            mobilePane === "guide"
              ? "bg-[#ffd166] text-black font-bold shadow-md"
              : "text-[#a7a9be] hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>📖 READ GUIDE</span>
        </button>
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            setMobilePane("terminal");
          }}
          className={`flex-1 py-2 font-pixel text-[10px] flex items-center justify-center gap-2 transition-all ${
            mobilePane === "terminal"
              ? "bg-[#06d6a0] text-black font-bold shadow-md"
              : "text-[#a7a9be] hover:text-white"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>💻 TERMINAL LAB</span>
        </button>
      </div>

      {/* Main Split-Screen Workspace (Left: Markdown | Right: Quiz + Terminal) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[620px]">
        
        {/* ================= LEFT PANE: MARKDOWN TUTORIAL TEXT (6 COLS) ================= */}
        <div className={`${mobilePane === "guide" ? "flex" : "hidden"} lg:flex lg:col-span-6 bg-[#17152b] pixel-border flex-col overflow-hidden`}>
          
          {/* Header */}
          <div className="bg-[#0f0e17] border-b-4 border-black p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#06d6a0]" />
              <h2 className="font-pixel text-xs text-white uppercase tracking-wider">
                Tutorial Documentation
              </h2>
            </div>
            <span className="font-pixel text-[9px] text-[#a7a9be] bg-[#17152b] px-2 py-0.5 border border-black">
              MARKDOWN VIEWER
            </span>
          </div>

          {/* Markdown Content Area */}
          <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-4 font-mono text-xs text-[#fffffe] leading-relaxed select-text">
            
            {/* Rendered Markdown Body with custom styling */}
            <div 
              className="prose prose-invert max-w-none 
                [&_h1]:font-pixel [&_h1]:text-sm sm:[&_h1]:text-base [&_h1]:text-[#ffd166] [&_h1]:border-b-2 [&_h1]:border-[#2c2854] [&_h1]:pb-2 [&_h1]:mb-3
                [&_h3]:font-pixel [&_h3]:text-xs [&_h3]:text-[#06d6a0] [&_h3]:mt-4 [&_h3]:mb-2
                [&_p]:text-xs [&_p]:leading-relaxed [&_p]:text-[#e2e8f0] [&_p]:mb-3
                [&_blockquote]:border-l-4 [&_blockquote]:border-l-[#ffd166] [&_blockquote]:bg-[#090814] [&_blockquote]:p-3 [&_blockquote]:my-3 [&_blockquote]:text-[#ffd166]
                [&_code]:bg-[#090814] [&_code]:text-[#38ef7d] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:border [&_code]:border-black [&_code]:font-mono [&_code]:text-[11px]
                [&_pre]:bg-[#090814] [&_pre]:p-3 [&_pre]:border-2 [&_pre]:border-black [&_pre]:overflow-x-auto [&_pre]:my-3
                [&_pre_code]:border-0 [&_pre_code]:p-0
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mb-3
                [&_li]:text-[#e2e8f0]"
              dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
            />

          </div>

          {/* Footer Note */}
          <div className="bg-[#0f0e17] border-t-2 border-black p-2.5 px-4 text-[10px] font-mono text-[#a7a9be] flex items-center justify-between">
            <span>READ &amp; MASTER THE CONCEPT</span>
            <span className="text-[#06d6a0]">STEP 0{currentLesson.stepNumber}</span>
          </div>

        </div>

        {/* ================= RIGHT PANE: OBJECTIVE QUIZ + SIMULATED TERMINAL (6 COLS) ================= */}
        <div className={`${mobilePane === "terminal" ? "flex" : "hidden"} lg:flex lg:col-span-6 space-y-6 flex-col justify-between`}>
          
          {/* SECTION 1: SIMULATED TERMINAL INPUT CONTAINER */}
          <div className="bg-[#17152b] pixel-border flex flex-col overflow-hidden">
            
            {/* Terminal Window Bar */}
            <div className="bg-[#090814] border-b-4 border-black p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#ef476f] border border-black inline-block" />
                  <span className="w-2.5 h-2.5 bg-[#ffd166] border border-black inline-block" />
                  <span className="w-2.5 h-2.5 bg-[#06d6a0] border border-black inline-block" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#a7a9be] ml-2">
                  <Terminal className="w-3.5 h-3.5 text-[#06d6a0]" />
                  <span>bash · nobita@{currentLesson.terminalChallenge.workingDir}</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                {terminalCompleted ? (
                  <span className="font-pixel text-[8px] bg-[#06d6a0] text-black px-1.5 py-0.5 border border-black">
                    ✓ PASSED (+10 XP)
                  </span>
                ) : (
                  <span className="font-pixel text-[8px] bg-[#ff8906] text-black px-1.5 py-0.5 border border-black animate-pulse">
                    TERMINAL AWAITING INPUT
                  </span>
                )}
              </div>
            </div>

            {/* Terminal Mission Banner */}
            <div className="bg-[#141226] p-3 border-b-2 border-black font-mono text-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[#ffd166]">
                <Flame className="w-4 h-4 shrink-0 text-[#ff8906]" />
                <span className="font-bold">MISSION:</span>
                <span className="text-white">{currentLesson.terminalChallenge.taskPrompt}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playCoin();
                    setTerminalInput(currentLesson.terminalChallenge.acceptedCommands[0]);
                    inputRef.current?.focus();
                  }}
                  className="px-2 py-1 bg-[#232144] hover:bg-[#343063] text-[#06d6a0] font-pixel text-[9px] pixel-border-sm flex items-center gap-1 hover:brightness-125"
                  title="Auto-fill with target spell"
                >
                  <Sparkles className="w-3 h-3 text-[#06d6a0]" />
                  <span>🪄 AUTO-FILL</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setShowTerminalHint(!showTerminalHint);
                  }}
                  className="text-[9px] font-pixel text-[#ffd166] hover:underline"
                >
                  {showTerminalHint ? "HIDE HINT" : "NEED HINT?"}
                </button>
              </div>
            </div>

            {/* Hint Box */}
            {showTerminalHint && (
              <div className="bg-[#232144] p-2.5 px-3 text-[11px] font-mono text-[#ffd166] border-b-2 border-black animate-in fade-in">
                💡 <span className="font-bold">Command Clue:</span> {currentLesson.terminalChallenge.hint}
              </div>
            )}

            {/* Interactive Terminal Screen & Log Stream */}
            <div 
              onClick={() => inputRef.current?.focus()}
              className="bg-[#06050b] p-4 font-mono text-xs min-h-[170px] max-h-[220px] overflow-y-auto space-y-2 cursor-text"
            >
              <div className="text-[#a7a9be] text-[11px]">
                Type the command below (<kbd className="bg-[#1e1b38] px-1 py-0.5 text-white border border-black">Tab</kbd> to autocomplete, <kbd className="bg-[#1e1b38] px-1 py-0.5 text-white border border-black">↑</kbd>/<kbd className="bg-[#1e1b38] px-1 py-0.5 text-white border border-black">↓</kbd> for history, or click <kbd className="bg-[#1e1b38] px-1 py-0.5 text-[#06d6a0] border border-black">AUTO-FILL</kbd>):
              </div>

              {/* Command History Stream */}
              {terminalHistory.map((entry, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-white font-bold">
                    <span className="text-[#06d6a0]">nobita@devforge:~$</span>
                    <span>{entry.command}</span>
                  </div>
                  <pre
                    className={`text-[11px] whitespace-pre-wrap pl-3 border-l-2 ${
                      entry.isSuccess
                        ? "text-[#38ef7d] border-[#06d6a0]"
                        : "text-[#ef476f] border-[#ef476f]"
                    }`}
                  >
                    {entry.output}
                  </pre>
                </div>
              ))}

              {/* Active Prompt Line Form */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1.5 pt-1">
                <span className="text-[#06d6a0] shrink-0 font-bold">nobita@devforge:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type command here (Tab to autocomplete)..."
                  className="flex-1 bg-transparent text-[#ffd166] font-mono text-xs focus:outline-none caret-[#06d6a0]"
                  disabled={terminalCompleted}
                />
                {!terminalCompleted && (
                  <button
                    type="submit"
                    className="p-1 bg-[#232144] hover:bg-[#343063] pixel-border-sm text-[#ffd166] shrink-0"
                    title="Press Enter to execute"
                  >
                    <CornerDownLeft className="w-3 h-3" />
                  </button>
                )}
              </form>

              <div ref={terminalBottomRef} />
            </div>

            {/* Terminal Success Banner */}
            {terminalCompleted && (
              <div className="bg-[#06d6a0]/20 border-t-2 border-[#06d6a0] p-3 text-[#06d6a0] font-pixel text-[9px] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>COMMAND VERIFIED! NODE FLIPPED TO &apos;COMPLETED&apos; (+10 XP)</span>
                </div>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setTerminalCompleted(false);
                    setTerminalHistory([]);
                    setTimeout(() => inputRef.current?.focus(), 100);
                  }}
                  className="font-mono text-[10px] text-white hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Retry
                </button>
              </div>
            )}

          </div>

          {/* SECTION 2: OBJECTIVE QUIZ CONTAINER */}
          <div className="bg-[#17152b] pixel-border p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-black">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#ffd166]" />
                  <h3 className="font-pixel text-xs text-[#ffd166] uppercase">
                    Objective Mastery Checkpoint
                  </h3>
                </div>
                <span className="font-pixel text-[9px] text-[#06d6a0]">
                  +20 XP
                </span>
              </div>

              <p className="font-mono text-xs sm:text-sm text-white font-bold mb-3 leading-snug">
                ❓ {currentLesson.objectiveQuiz.question}
              </p>

              {/* Option Buttons [A, B, C, D] */}
              <div className="space-y-2 mb-4">
                {currentLesson.objectiveQuiz.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleQuizSelect(opt.id)}
                    className={`w-full text-left p-2.5 font-mono text-xs pixel-btn flex items-center justify-between transition-all ${
                      selectedQuizOption === opt.id
                        ? "bg-[#ffd166] text-black font-bold -translate-y-0.5"
                        : "bg-[#232144] hover:bg-[#2d2955] text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-pixel text-[9px] opacity-70">
                        [{String.fromCharCode(65 + opt.id)}]
                      </span>
                      <span>{opt.text}</span>
                    </span>

                    {selectedQuizOption === opt.id && (
                      <span className="font-pixel text-[8px] bg-black text-[#ffd166] px-1 py-0.5">
                        SELECTED
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Quiz Result Alerts */}
              {quizStatus === "success" && (
                <div className="p-3 bg-[#06d6a0]/20 border-2 border-[#06d6a0] text-[#06d6a0] font-pixel text-[9px] flex items-center gap-2 mb-3 animate-in zoom-in-95">
                  <Sparkles className="w-4 h-4 shrink-0 text-[#06d6a0]" />
                  <span>CORRECT! +20 XP AWARDED TO PROGRESSION BAR!</span>
                </div>
              )}

              {quizStatus === "wrong" && (
                <div className="p-3 bg-[#ef476f]/20 border-2 border-[#ef476f] text-[#ef476f] font-pixel text-[9px] flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>INCORRECT DISCOVERY. RE-READ THE DOCUMENTATION ON THE LEFT!</span>
                </div>
              )}
            </div>

            {/* Submit Quiz Button */}
            <button
              onClick={handleQuizSubmit}
              disabled={selectedQuizOption === null || quizStatus === "success"}
              className={`w-full py-2.5 font-pixel text-[10px] pixel-btn flex items-center justify-center gap-2 ${
                quizStatus === "success"
                  ? "bg-[#06d6a0] text-black cursor-default"
                  : selectedQuizOption !== null
                  ? "bg-[#ffd166] hover:bg-[#e6bd5c] text-black"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>{quizStatus === "success" ? "OBJECTIVE PASSED" : "SUBMIT QUIZ ANSWER"}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Step Advancement Controls */}
      <div className="bg-[#141226] pixel-border p-4 flex items-center justify-between gap-4">
        <button
          onClick={handlePrevStep}
          disabled={currentStepIdx === 0}
          className={`px-4 py-2 font-pixel text-[10px] pixel-btn flex items-center gap-2 ${
            currentStepIdx > 0
              ? "bg-[#232144] hover:bg-[#343063] text-white"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PREVIOUS STEP</span>
        </button>

        <div className="font-pixel text-[9px] text-[#ffd166] text-center hidden sm:block">
          STAGE 0{currentLesson.stepNumber} OF 0{interactiveLessons.length}
        </div>

        <button
          onClick={handleNextStep}
          disabled={currentStepIdx === interactiveLessons.length - 1}
          className={`px-4 py-2 font-pixel text-[10px] pixel-btn flex items-center gap-2 ${
            currentStepIdx < interactiveLessons.length - 1
              ? "bg-[#06d6a0] hover:bg-[#05b889] text-black"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
        >
          <span>NEXT LESSON STAGE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

