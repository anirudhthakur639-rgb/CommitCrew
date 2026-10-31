"use client";

import React, { useState } from "react";
import { gitStoryChapters, GitStoryChapter, CharacterDialogue } from "@/data/gitStoryTutorials";
import { useGame } from "@/context/GameContext";
import { soundFx } from "@/utils/sound";
import confetti from "canvas-confetti";
import { 
  ArrowLeft, ArrowRight, Terminal, Sparkles, CheckCircle2, 
  AlertCircle, Play, Award, ChevronRight, RefreshCw, Check
} from "lucide-react";

export const GitStoryViewer: React.FC = () => {
  const { addXp, setActiveTab } = useGame();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [activeDialogueIdx, setActiveDialogueIdx] = useState<number>(0);

  // Terminal simulator state
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [hasRunSim, setHasRunSim] = useState<boolean>(false);

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<"idle" | "success" | "wrong">("idle");
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});

  const currentChapter = gitStoryChapters[currentIdx];
  const activeDialogue: CharacterDialogue = currentChapter.dialogues[activeDialogueIdx] || currentChapter.dialogues[0];

  const progressPercent = Math.round(((currentIdx + 1) / gitStoryChapters.length) * 100);

  const handleNextChapter = () => {
    if (currentIdx < gitStoryChapters.length - 1) {
      soundFx.playClick();
      setCurrentIdx((i) => i + 1);
      resetChapterState();
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handlePrevChapter = () => {
    if (currentIdx > 0) {
      soundFx.playClick();
      setCurrentIdx((i) => i - 1);
      resetChapterState();
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleJumpToChapter = (idx: number) => {
    soundFx.playClick();
    setCurrentIdx(idx);
    resetChapterState();
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const resetChapterState = () => {
    setActiveDialogueIdx(0);
    setSimRunning(false);
    setHasRunSim(false);
    setSelectedQuizOption(null);
    setQuizStatus("idle");
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
    }, 400);
  };

  const handleSelectQuiz = (optId: string) => {
    if (quizStatus === "success") return;
    soundFx.playClick();
    setSelectedQuizOption(optId);
    setQuizStatus("idle");
  };

  const handleSubmitQuiz = () => {
    if (selectedQuizOption === null) return;

    const chosen = currentChapter.quiz.options.find((o) => o.id === selectedQuizOption);
    if (chosen && chosen.isCorrect) {
      setQuizStatus("success");
      soundFx.playSuccess();
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.65 },
        colors: ["#2ee59d", "#5aa8ff", "#ffd166", "#ff6b9a"],
      });

      if (!completedChapters[currentChapter.id]) {
        addXp(currentChapter.xpReward);
        setCompletedChapters((prev) => ({ ...prev, [currentChapter.id]: true }));
      }
    } else {
      setQuizStatus("wrong");
      soundFx.playWrong();
    }
  };

  return (
    <div className="max-w-[860px] mx-auto space-y-5 pb-12 font-sans text-[#eef0ff]">

      {/* ================= 1. TOP HERO BANNER ================= */}
      <div className="relative rounded-2xl p-7 sm:p-9 text-center bg-gradient-to-br from-[#6d4aff] to-[#1fb579] pixel-border-lg overflow-hidden shadow-[0_0_24px_rgba(6,214,160,0.5),4px_4px_0_#000]">
        
        {/* Quick Chapter Navigation Pill Selector */}
        <div className="flex items-center justify-center gap-1.5 mb-3 flex-wrap">
          {gitStoryChapters.map((ch, idx) => {
            const isCurrent = idx === currentIdx;
            const isCleared = completedChapters[ch.id];
            return (
              <button
                key={ch.id}
                onClick={() => handleJumpToChapter(idx)}
                className={`px-2 py-0.5 rounded font-pixel text-[8px] transition-all flex items-center gap-1 ${
                  isCurrent
                    ? "bg-[#ffd166] text-black font-bold shadow-[0_0_10px_#ffd166] scale-105"
                    : isCleared
                    ? "bg-[#2ee59d]/80 text-black font-bold"
                    : "bg-[#0b1020]/60 text-white/80 hover:bg-[#0b1020] hover:text-white"
                }`}
              >
                <span>CH {idx + 1}</span>
                {isCleared && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </button>
            );
          })}
        </div>

        <h1 className="font-pixel text-xl sm:text-2xl text-white font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          {currentChapter.heroTitle}
        </h1>
        <p className="text-base sm:text-lg text-[#eef0ff]/95 font-medium mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          {currentChapter.heroSubtitle}
        </p>
      </div>

      {/* ================= 2. PROGRESS BAR ================= */}
      <div className="space-y-1.5">
        <div className="h-2.5 bg-[#1b2140] rounded-full overflow-hidden border border-[#262d55]">
          <div 
            className="h-full bg-gradient-to-r from-[#2ee59d] via-[#5aa8ff] to-[#ffd166] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm text-[#a3a9cf]">
          <span>
            Lesson {currentChapter.chapterNumber} of {gitStoryChapters.length} · {currentChapter.lessonTitle}
          </span>
          <span className="font-pixel text-[9px] text-[#ffd166] flex items-center gap-1 bg-[#151a33] px-2 py-0.5 rounded border border-[#262d55]">
            +{currentChapter.xpReward} XP
            {completedChapters[currentChapter.id] && (
              <span className="text-[#2ee59d] font-bold ml-1">✓ CLEARED</span>
            )}
          </span>
        </div>
      </div>

      {/* ================= 3. STORY DIALOGUE BOX (.box .talk) ================= */}
      <div 
        className="bg-[#151a33] pixel-border rounded-xl p-5 sm:p-6 transition-colors"
        style={{ borderLeft: `6px solid ${activeDialogue.bubbleColor || "#ff6b9a"}` }}
      >
        <div className="flex items-center justify-between mb-3 border-b border-[#262d55] pb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activeDialogue.avatar}</span>
            <span 
              className="font-bold text-sm sm:text-base"
              style={{ color: activeDialogue.bubbleColor || "#ff6b9a" }}
            >
              {activeDialogue.speaker} ({activeDialogue.role}):
            </span>
          </div>

          {/* Interactive Character Pickers */}
          <div className="flex items-center gap-1.5">
            {currentChapter.dialogues.map((dlg, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectCharacter(idx)}
                title={`${dlg.speaker} (${dlg.role})`}
                className={`w-7 h-7 rounded text-sm flex items-center justify-center transition-all ${
                  idx === activeDialogueIdx
                    ? "bg-[#ffd166] scale-110 shadow-[0_0_8px_#ffd166]"
                    : "bg-[#1b2140] opacity-60 hover:opacity-100"
                }`}
              >
                {dlg.avatar}
              </button>
            ))}
          </div>
        </div>

        <p className="text-base sm:text-lg text-[#eef0ff] leading-relaxed italic">
          &quot;{activeDialogue.message}&quot;
        </p>
      </div>

      {/* ================= 4. THE PROBLEM BOX (.box) ================= */}
      <div className="bg-[#151a33] pixel-border rounded-xl p-5 sm:p-6 space-y-3">
        <h2 className="font-pixel text-sm sm:text-base text-white flex items-center gap-2">
          <span>😬</span>
          <span>{currentChapter.problem.heading}</span>
        </h2>
        
        <p className="text-[#eef0ff] text-base">
          {currentChapter.problem.description}
        </p>

        {/* Bad file name chips */}
        <div className="flex flex-wrap gap-2.5 my-3">
          {currentChapter.problem.badChips.map((chip, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1.5 rounded-lg border border-[#ff6b9a] text-[#ff6b9a] bg-[#ff6b9a]/15 font-mono text-sm shadow-[0_0_8px_rgba(255,107,154,0.25)] flex items-center gap-1"
            >
              <span className="text-xs">⚠️</span>
              <span>{chip}</span>
            </span>
          ))}
        </div>

        <p>
          <mark className="bg-[#ffd166] text-[#111] font-bold px-2 py-1 rounded text-sm sm:text-base inline-block shadow-[0_0_8px_rgba(255,209,102,0.4)]">
            {currentChapter.problem.takeaway}
          </mark>
        </p>
      </div>

      {/* ================= 5. THE GIT FIX BOX (.box) ================= */}
      <div className="bg-[#151a33] pixel-border rounded-xl p-5 sm:p-6 space-y-4">
        <h2 className="font-pixel text-sm sm:text-base text-white flex items-center gap-2">
          <span>✅</span>
          <span>{currentChapter.solution.heading}</span>
        </h2>

        <p className="text-[#eef0ff] text-base leading-relaxed">
          Git saves{" "}
          <mark className="bg-[#2ee59d] text-[#111] px-1.5 py-0.5 rounded font-bold shadow-[0_0_8px_rgba(46,229,157,0.4)]">
            snapshots
          </mark>{" "}
          of your project. Three commands do most of the work:
        </p>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          {currentChapter.solution.steps.map((st) => {
            const isBlue = st.colorType === "blue";
            const isYellow = st.colorType === "yellow";
            const isGreen = st.colorType === "green";

            const borderClass = isBlue
              ? "border-t-[#5aa8ff] shadow-[0_0_12px_rgba(90,168,255,0.25)]"
              : isYellow
              ? "border-t-[#ffd166] shadow-[0_0_12px_rgba(255,209,102,0.25)]"
              : "border-t-[#2ee59d] shadow-[0_0_12px_rgba(46,229,157,0.25)]";

            const numBg = isBlue
              ? "bg-[#5aa8ff] text-[#0b1020]"
              : isYellow
              ? "bg-[#ffd166] text-[#0b1020]"
              : "bg-[#2ee59d] text-[#0b1020]";

            return (
              <div 
                key={st.num}
                className={`bg-[#1b2140] border-t-4 ${borderClass} rounded-xl p-4 flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-9 h-9 rounded-full ${numBg} font-pixel text-xs font-bold flex items-center justify-center mb-2.5`}>
                    {st.num}
                  </div>
                  <h3 className="font-pixel text-xs sm:text-sm text-white leading-snug">
                    {st.cmd}
                  </h3>
                  <p className="text-[#a3a9cf] text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tip Box (.note) */}
        <div className="bg-[#ffd166]/10 border-l-4 border-l-[#ffd166] rounded-xl p-4 text-sm sm:text-base text-[#eef0ff] shadow-[0_0_10px_rgba(255,209,102,0.15)] leading-relaxed">
          💡 <strong>{currentChapter.solution.note}</strong>
        </div>

        {/* Interactive Terminal Playground (Simulation) */}
        <div className="bg-[#0b1020] rounded-xl p-3.5 border border-[#262d55] space-y-2 mt-4">
          <div className="flex items-center justify-between text-xs text-[#a3a9cf] font-mono border-b border-[#262d55] pb-1.5">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#2ee59d]" />
              <span>Interactive CLI Playground</span>
            </span>
            <span className="text-[10px] text-[#ffd166] font-pixel">BASH</span>
          </div>

          <div className="font-mono text-xs sm:text-sm text-[#2ee59d] py-1 flex items-center gap-2">
            <span className="text-[#ffd166]">$</span>
            <span className="font-bold">{currentChapter.simulation.command}</span>
          </div>

          {hasRunSim && (
            <div className="pt-2 border-t border-[#262d55] text-xs font-mono text-[#ffd166] whitespace-pre-wrap animate-in fade-in">
              {currentChapter.simulation.output}
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
            <p className="text-[11px] text-[#a3a9cf] font-mono">
              {currentChapter.simulation.explanation}
            </p>
            <button
              onClick={runSimulation}
              disabled={simRunning}
              className="px-3.5 py-1.5 bg-[#2ee59d] hover:bg-[#25be82] text-black font-pixel text-[9px] rounded-lg font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(46,229,157,0.4)] cursor-pointer"
            >
              <Play className="w-3 h-3 fill-black" />
              <span>{simRunning ? "EXECUTING..." : "RUN SIMULATION"}</span>
            </button>
          </div>
        </div>

      </div>

      {/* ================= 6. CHECKPOINT QUIZ BOX (.box) ================= */}
      <div className="bg-[#151a33] pixel-border rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-pixel text-sm sm:text-base text-white flex items-center gap-2">
            <span>🧠</span>
            <span>Checkpoint</span>
          </h2>
          <span className="font-pixel text-[9px] text-[#ffd166] bg-[#0b1020] px-2 py-1 rounded border border-[#262d55]">
            +{currentChapter.xpReward} XP
          </span>
        </div>

        <p className="text-base sm:text-lg text-[#eef0ff] font-medium leading-relaxed">
          {currentChapter.quiz.question}
        </p>

        {/* Quiz Option Radio List (.opt) */}
        <div className="space-y-2.5">
          {currentChapter.quiz.options.map((opt) => {
            const isSelected = selectedQuizOption === opt.id;
            return (
              <label
                key={opt.id}
                onClick={() => handleSelectQuiz(opt.id)}
                className={`block p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#ffd166] bg-[#1b2140] shadow-[0_0_14px_rgba(255,209,102,0.35)]"
                    : "border-[#262d55] bg-[#151a33] hover:border-[#5aa8ff] hover:bg-[#1b2140]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="quiz-answer"
                    value={opt.id}
                    checked={isSelected}
                    onChange={() => handleSelectQuiz(opt.id)}
                    className="w-4 h-4 accent-[#2ee59d] cursor-pointer"
                  />
                  <span className="text-sm sm:text-base text-[#eef0ff]">
                    <strong className="text-[#ffd166] mr-1">{opt.letter}.</strong> {opt.text}
                  </span>
                </div>
              </label>
            );
          })}
        </div>

        {/* Feedback Alerts */}
        {quizStatus === "success" && (
          <div className="p-3 bg-[#2ee59d]/20 border border-[#2ee59d] text-[#2ee59d] rounded-xl font-pixel text-[10px] flex items-center gap-2 shadow-[0_0_12px_rgba(46,229,157,0.4)] animate-in zoom-in-95">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>EPISODE PASSED! +{currentChapter.xpReward} XP AWARDED!</span>
          </div>
        )}

        {quizStatus === "wrong" && (
          <div className="p-3 bg-[#ff6b9a]/20 border border-[#ff6b9a] text-[#ff6b9a] rounded-xl font-pixel text-[10px] flex items-center gap-2 shadow-[0_0_12px_rgba(255,107,154,0.4)] animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>INCORRECT. HINT: {currentChapter.quiz.hint}</span>
          </div>
        )}

        {/* Action Button (.btn) */}
        <button
          onClick={handleSubmitQuiz}
          disabled={selectedQuizOption === null || quizStatus === "success"}
          className={`btn inline-block bg-gradient-to-r from-[#2ee59d] to-[#5aa8ff] text-[#0b1020] font-pixel text-xs sm:text-sm px-7 py-3.5 rounded-full font-bold cursor-pointer shadow-[0_0_16px_rgba(46,229,157,0.5)] transition-opacity ${
            quizStatus === "success"
              ? "opacity-80 cursor-default"
              : selectedQuizOption !== null
              ? "hover:opacity-90"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          {quizStatus === "success" ? "Checkpoint Cleared ✓" : "Check answer"}
        </button>
      </div>

      {/* ================= 7. BOTTOM NAVIGATION (.next) ================= */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-3 border-t border-[#262d55]">
        <div>
          {currentIdx > 0 ? (
            <button
              onClick={handlePrevChapter}
              className="text-[#a3a9cf] hover:text-white font-medium text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: Lesson {currentIdx}</span>
            </button>
          ) : (
            <span className="text-[#a3a9cf]/40 text-sm">First Lesson</span>
          )}
        </div>

        <div>
          {currentIdx < gitStoryChapters.length - 1 ? (
            <button
              onClick={handleNextChapter}
              className="text-[#2ee59d] hover:text-[#5aa8ff] font-bold text-sm sm:text-base flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Next: Lesson {currentIdx + 2} · {currentChapter.nextLessonTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("journey")}
              className="text-[#ffd166] hover:text-white font-bold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Course Completed! Continue Journey →</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
