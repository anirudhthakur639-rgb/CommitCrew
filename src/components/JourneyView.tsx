"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { soundFx } from "@/utils/sound";
import { 
  Check, Lock, Play, Star, Sparkles, MapPin, 
  ChevronRight, Compass, Shield, Flame, Terminal
} from "lucide-react";
import { WorkspaceSplitScreen, LearningModule } from "./WorkspaceSplitScreen";

export const JourneyView: React.FC = () => {
  const { addXp, setActiveTab } = useGame();

  // Full interactive learning path modules
  const [modules, setModules] = useState<LearningModule[]>([
    {
      id: "mod-1",
      number: 1,
      title: "Hello World & Variables",
      subtitle: "Memory allocation, identifiers & the stdout terminal",
      badge: "STAGE 1 · NOVICE",
      status: "completed",
      xpReward: 50,
      category: "Foundations",
      doc: {
        overview: "In computer science, a variable is a named storage location in memory that holds a value. In Python, variables are dynamically typed, meaning you do not need to explicitly declare their type.",
        codeSnippet: `# Assigning memory references
hero_name = "DevHacker"
level = 1
is_ready = True

print(f"Player {hero_name} spawned at Level {level}")`,
        keyPoints: [
          "Variable names must begin with a letter or an underscore (_).",
          "Python is case-sensitive: 'Hero' and 'hero' are distinct variables.",
          "Dynamic typing assigns data types automatically at runtime.",
        ],
        proTip: "Samjho: Variable ek labeled dabba (box) jaisa hai jisme aap apna samaan rakhte ho aur zaroorat padne par nikaal sakte ho.",
      },
      checkpoint: {
        question: "Which of the following is a VALID variable declaration in Python?",
        codeContext: "# Select the correct assignment:",
        options: [
          { id: 0, text: "2player_score = 100", isCorrect: false },
          { id: 1, text: "player_score = 100", isCorrect: true },
          { id: 2, text: "player-score = 100", isCorrect: false },
          { id: 3, text: "def = 100", isCorrect: false },
        ],
        hint: "Variable names cannot start with numbers and cannot use hyphens or reserved keywords like 'def'.",
        explanationOnSuccess: "Correct! 'player_score' follows PEP 8 snake_case conventions and starts with a letter.",
      },
    },
    {
      id: "mod-2",
      number: 2,
      title: "Conditionals & Logic Gates",
      subtitle: "Branching execution with if, elif, and boolean gates",
      badge: "STAGE 2 · APPRENTICE",
      status: "completed",
      xpReward: 75,
      category: "Control Flow",
      doc: {
        overview: "Conditionals allow algorithms to make decisions based on boolean logic (True or False). In Python, if, elif, and else statements control which branch of code executes.",
        codeSnippet: `hp = 45

if hp > 70:
    status = "Healthy"
elif hp > 20:
    status = "Wounded - Drink Potion"
else:
    status = "Critical Danger!"`,
        keyPoints: [
          "Colons (:) are mandatory after if, elif, and else statements.",
          "Code blocks must be indented (typically 4 spaces).",
          "Comparison operators include == (equality), != (inequality), <, and >.",
        ],
        proTip: "Traffic signal ki tarah socho: Red pe ruko (stop), Yellow pe ready raho, Green pe chalo.",
      },
      checkpoint: {
        question: "What does this condition evaluate to when level = 5 and coins = 120?",
        codeContext: "if level >= 5 and coins > 100:\n    can_enter = True\nelse:\n    can_enter = False",
        options: [
          { id: 0, text: "can_enter is False", isCorrect: false },
          { id: 1, text: "can_enter is True", isCorrect: true },
          { id: 2, text: "SyntaxError: invalid syntax", isCorrect: false },
          { id: 3, text: "None", isCorrect: false },
        ],
        hint: "Both conditions across the 'and' operator must be True for the block to trigger.",
        explanationOnSuccess: "Spot on! 5 >= 5 is True AND 120 > 100 is True, so can_enter becomes True.",
      },
    },
    {
      id: "mod-3",
      number: 3,
      title: "The For-Loop Dungeon",
      subtitle: "Iterating sequences and defeating repetitive chores",
      badge: "STAGE 3 · EXPLORER",
      status: "completed",
      xpReward: 100,
      category: "Iteration",
      doc: {
        overview: "Loops automate repetitive execution. A for-loop in Python iterates directly over items of any sequence (such as a list, string, or range of integers).",
        codeSnippet: `# Iterate through monsters in dungeon
monsters = ["Goblin", "Orc", "Dragon"]

for monster in monsters:
    print(f"Engaging {monster} with spell cast!")`,
        keyPoints: [
          "The 'range(start, stop, step)' function generates an immutable arithmetic progression.",
          "The 'stop' boundary in range() is exclusive: range(1, 5) yields 1, 2, 3, 4.",
          "The 'break' statement terminates the current loop immediately.",
        ],
        proTip: "Chai-wallah ka kettle: Jab tak kettle mein chai hai, tab tak cups bharte raho (loop chalta rahega).",
      },
      checkpoint: {
        question: "How many times does print() execute in this loop?",
        codeContext: "for count in range(0, 4):\n    print('Attack!')",
        options: [
          { id: 0, text: "3 times", isCorrect: false },
          { id: 1, text: "4 times (0, 1, 2, 3)", isCorrect: true },
          { id: 2, text: "5 times (0, 1, 2, 3, 4)", isCorrect: false },
          { id: 3, text: "Infinite loop", isCorrect: false },
        ],
        hint: "range(0, 4) produces values 0, 1, 2, 3. Count them!",
        explanationOnSuccess: "Flawless! range(0, 4) produces exactly 4 iterations: 0, 1, 2, and 3.",
      },
    },
    {
      id: "mod-4",
      number: 4,
      title: "Arrays, Lists & Indexing",
      subtitle: "Mastering zero-indexed lists and avoiding bounds errors",
      badge: "STAGE 4 · CURRENT MISSION",
      status: "current",
      xpReward: 150,
      category: "Data Structures",
      doc: {
        overview: "Lists are ordered, mutable sequences that store collections of items. In almost all modern languages, indexing starts at 0, not 1. Attempting to access an index beyond length-1 raises an IndexError.",
        codeSnippet: `inventory = ["Potion", "Sword", "Shield"]

# Zero-based indexing
first_item = inventory[0]   # "Potion"
last_item = inventory[-1]   # "Shield"

# Append a newly looted item
inventory.append("Gemma Spellbook")`,
        keyPoints: [
          "Indexing is zero-based: The first element is always at index [0].",
          "Negative indexing counts from the end: [-1] is the last element.",
          "len(list) returns the total count of elements inside the collection.",
        ],
        proTip: "Train compartments ki tarah socho: Engine ke theek baad pehla dabba D0 (index 0) hota hai, na ki 1.",
      },
      checkpoint: {
        question: "You have a list of length 3: items = ['Ruby', 'Emerald', 'Sapphire']. What happens if you run print(items[3])?",
        codeContext: "items = ['Ruby', 'Emerald', 'Sapphire']\nprint(items[3])",
        options: [
          { id: 0, text: "Prints 'Sapphire'", isCorrect: false },
          { id: 1, text: "Raises IndexError: list index out of range", isCorrect: true },
          { id: 2, text: "Prints None", isCorrect: false },
          { id: 3, text: "Returns undefined", isCorrect: false },
        ],
        hint: "The valid indices for 3 elements are 0, 1, and 2. Index 3 is off-by-one!",
        explanationOnSuccess: "Masterful! Because Python is 0-indexed, items[3] triggers an IndexError crash. items[2] is the last element.",
      },
    },
    {
      id: "mod-5",
      number: 5,
      title: "Functions & Scope Alchemy",
      subtitle: "Reusable algorithmic spells and local vs global scope",
      badge: "STAGE 5 · MAGE",
      status: "upcoming",
      xpReward: 180,
      category: "Modularity",
      doc: {
        overview: "Functions encapsulate reusable code blocks that accept arguments and return output values. Variables created inside a function possess local scope and cannot be directly accessed outside.",
        codeSnippet: `def calculate_loot(level: int, multiplier: float = 1.5) -> int:
    base_xp = 100 * level
    return int(base_xp * multiplier)

earned = calculate_loot(3)`,
        keyPoints: [
          "Use the 'def' keyword followed by function name and parameters.",
          "The 'return' keyword passes computed data back to the caller.",
          "Functions without an explicit return statement return None.",
        ],
        proTip: "Function ek Juicer Mixer jaisa hai: Fruit daalo (arguments) -> Process hoga -> Juice nikal aayega (return value).",
      },
      checkpoint: {
        question: "What does this function return?",
        codeContext: "def multiply(x, y=2):\n    return x * y\n\nresult = multiply(4)",
        options: [
          { id: 0, text: "8 (uses default y=2)", isCorrect: true },
          { id: 1, text: "4", isCorrect: false },
          { id: 2, text: "TypeError: missing required argument", isCorrect: false },
          { id: 3, text: "16", isCorrect: false },
        ],
        hint: "When 'y' is not passed, it uses its default value 2.",
        explanationOnSuccess: "Correct! The parameter y falls back to default 2, computing 4 * 2 = 8.",
      },
    },
    {
      id: "mod-6",
      number: 6,
      title: "Open-Source Git & PR Mastery",
      subtitle: "Forking, branching, OSI licenses & community reviews",
      badge: "STAGE 6 · BOSS FIGHT",
      status: "upcoming",
      xpReward: 250,
      category: "Open Source Special",
      doc: {
        overview: "The capstone of developer education is open-source collaboration. True open source requires choosing an approved OSI license (like MIT or Apache-2.0), creating git branches, and submitting clear Pull Requests.",
        codeSnippet: `# Standard Git Open-Source Workflow
git checkout -b feat/indic-tutor
git add .
git commit -m "feat: add vernacular error explainer"
git push origin feat/indic-tutor`,
        keyPoints: [
          "Always attach an OSI license in the repo root so others have legal right to use it.",
          "Write descriptive commit messages explaining the 'why', not just the 'what'.",
          "Never commit real secrets or API keys into public repositories.",
        ],
        proTip: "Hacktoberfest Rule #1: Fork karo, branch banao, clean PR bhejo. Spam issues mat kholo!",
      },
      checkpoint: {
        question: "According to Hacktoberfest & MLH guidelines, which license is OSI-approved for open-source repositories?",
        codeContext: "# Select the OSI-compliant license:",
        options: [
          { id: 0, text: "MIT License", isCorrect: true },
          { id: 1, text: "All Rights Reserved", isCorrect: false },
          { id: 2, text: "Proprietary Commercial EULA", isCorrect: false },
          { id: 3, text: "Internal Confidential License", isCorrect: false },
        ],
        hint: "MIT and Apache-2.0 are standard permissive open-source licenses.",
        explanationOnSuccess: "Victory! The MIT license is permissive, OSI-approved, and scores full points on Open-Source Quality!",
      },
    },
  ]);

  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);

  const completedCount = modules.filter((m) => m.status === "completed").length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  const handleNodeClick = (mod: LearningModule) => {
    if (mod.status === "upcoming") {
      soundFx.playClick();
      return;
    }
    soundFx.playClick();
    setSelectedModule(mod);
  };

  const handleModuleComplete = (moduleId: string, xpReward: number) => {
    addXp(xpReward);

    setModules((prev) => {
      const idx = prev.findIndex((m) => m.id === moduleId);
      if (idx === -1) return prev;

      const updated = [...prev];
      updated[idx] = { ...updated[idx], status: "completed" };

      // Unlock the next module if it is upcoming
      if (idx + 1 < updated.length && updated[idx + 1].status === "upcoming") {
        updated[idx + 1] = { ...updated[idx + 1], status: "current" };
      }

      return updated;
    });

    // Update selected module to completed state so UI reflects it immediately
    if (selectedModule && selectedModule.id === moduleId) {
      setSelectedModule((prev) => prev ? { ...prev, status: "completed" } : null);
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* If a module is active, render the Split-Screen Workspace! */}
      {selectedModule ? (
        <WorkspaceSplitScreen
          module={selectedModule}
          onBack={() => setSelectedModule(null)}
          onComplete={handleModuleComplete}
        />
      ) : (
        /* Otherwise, render the Interactive Linear Journey Pathway */
        <div className="space-y-6">
          
          {/* Journey Header Banner */}
          <div className="bg-[#1e1b38] pixel-border-lg p-5 sm:p-7 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-pixel text-[9px] bg-[#ffd166] text-black px-2 py-0.5 border border-black">
                    WORLD 01 · CODEQUEST ARENA
                  </span>
                  <span className="text-xs font-mono text-[#06d6a0] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CODING ODYSSEY</span>
                  </span>
                </div>
                <h1 className="font-pixel text-sm sm:text-xl text-white mb-1.5">
                  THE DEVELOPER JOURNEY PATH
                </h1>
                <p className="text-xs font-mono text-[#a7a9be] max-w-xl">
                  A linear progression of quests. Click any unlocked module to open the split-screen learning workspace.
                </p>
              </div>

              {/* Progress Summary Card */}
              <div className="bg-[#090814] p-3.5 pixel-border-sm min-w-[200px] w-full sm:w-auto">
                <div className="flex justify-between items-center text-[10px] font-pixel text-[#a7a9be] mb-1.5">
                  <span>PROGRESS</span>
                  <span className="text-[#06d6a0]">{completedCount}/{modules.length} ({progressPercent}%)</span>
                </div>

                <div className="w-full h-3 bg-[#17152b] border-2 border-black overflow-hidden mb-2 relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#06d6a0] to-[#ffd166] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,#000_6px,#000_8px)] opacity-30" />
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between text-[9px] font-mono text-[#a7a9be] pt-1 border-t border-[#232144]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#06d6a0] inline-block border border-black" /> Done
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#ffd166] inline-block border border-black" /> Current
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#2a2845] inline-block border border-black" /> Locked
                  </span>
                </div>

                {/* Direct shortcut to Interactive Terminal Laboratory */}
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab("terminal-lab");
                  }}
                  className="w-full mt-2.5 py-1.5 px-2 bg-[#06d6a0] hover:bg-[#05ba8a] text-black font-pixel text-[8px] uppercase pixel-btn flex items-center justify-center gap-1.5"
                >
                  <Terminal className="w-3 h-3 stroke-[2.5]" />
                  <span>SIMULATED TERMINAL LAB &gt;</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Quest Nodes Track */}
          <div className="bg-[#141226] pixel-border-lg p-6 sm:p-10 relative overflow-hidden">
            
            {/* Ambient Background Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#2b2848_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            <div className="max-w-2xl mx-auto py-6 relative">
              
              {/* Vertical Connecting Track (SVG line showing completed vs locked progress) */}
              <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-4 bg-[#090814] border-x-2 border-black">
                {/* Dynamic colored progress filler line */}
                <div 
                  className="w-full bg-[#06d6a0] transition-all duration-500"
                  style={{
                    height: `${Math.min(100, Math.max(0, (completedCount / (modules.length - 1)) * 100))}%`
                  }}
                />
              </div>

              {/* Linear Quest Nodes Sequence */}
              <div className="space-y-12 sm:space-y-16 relative">
                {modules.map((mod, idx) => {
                  const isLeft = idx % 2 === 0;
                  const isCompleted = mod.status === "completed";
                  const isCurrent = mod.status === "current";
                  const isUpcoming = mod.status === "upcoming";

                  // Color styling based on state
                  let nodeBg = "bg-[#252342] text-gray-400";
                  let nodeBorder = "border-2 border-gray-700 shadow-[0_0_10px_rgba(100,116,139,0.3),3px_3px_0px_#000]";
                  let ringEffect = "";

                  if (isCompleted) {
                    nodeBg = "bg-[#06d6a0] text-black";
                    nodeBorder = "border-2 border-[#06d6a0] shadow-[0_0_20px_rgba(6,214,160,0.85),0_0_4px_#06d6a0,4px_4px_0px_#000]";
                  } else if (isCurrent) {
                    nodeBg = "bg-[#ffd166] text-black";
                    nodeBorder = "border-2 border-[#ffd166] shadow-[0_0_24px_rgba(255,209,102,0.95),0_0_6px_#ffd166,4px_4px_0px_#000]";
                    ringEffect = "ring-4 ring-[#ff8906]/70 animate-pulse";
                  }

                  return (
                    <div
                      key={mod.id}
                      className={`flex items-center gap-4 sm:gap-6 ${
                        isLeft ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      {/* Node Information Card */}
                      <div
                        className={`w-1/2 ${
                          isLeft ? "text-right pr-2 sm:pr-4" : "text-left pl-2 sm:pl-4"
                        }`}
                      >
                        <div
                          onClick={() => handleNodeClick(mod)}
                          className={`inline-block p-3 sm:p-4 pixel-border-sm transition-all select-none ${
                            !isUpcoming
                              ? isCurrent
                                ? "bg-[#1e1b38] border-2 border-[#ffd166] shadow-[0_0_16px_rgba(255,209,102,0.6),3px_3px_0px_#000] cursor-pointer hover:-translate-y-1"
                                : isCompleted
                                ? "bg-[#1e1b38] border-2 border-[#06d6a0] shadow-[0_0_14px_rgba(6,214,160,0.5),3px_3px_0px_#000] cursor-pointer hover:-translate-y-1"
                                : "bg-[#1e1b38] hover:bg-[#28254c] hover:-translate-y-1 cursor-pointer"
                              : "bg-[#0d0c1d] opacity-50 cursor-not-allowed border-gray-800"
                          }`}
                        >
                          <div className={`flex items-center gap-2 mb-1 ${isLeft ? "justify-end" : "justify-start"}`}>
                            <span
                              className={`font-pixel text-[8px] sm:text-[9px] px-1.5 py-0.5 border border-black ${
                                isCompleted
                                  ? "bg-[#06d6a0] text-black"
                                  : isCurrent
                                  ? "bg-[#ffd166] text-black font-bold"
                                  : "bg-[#090814] text-[#a7a9be]"
                              }`}
                            >
                              STAGE 0{mod.number}
                            </span>

                            <span className="font-pixel text-[8px] text-[#ffd166]">
                              +{mod.xpReward} XP
                            </span>
                          </div>

                          <h3 className="font-mono text-xs sm:text-sm font-bold text-white leading-tight">
                            {mod.title}
                          </h3>

                          <p className="text-[11px] font-mono text-[#a7a9be] mt-1 line-clamp-1">
                            {mod.subtitle}
                          </p>

                          {/* Action Cue */}
                          {!isUpcoming && (
                            <div className={`mt-2 flex items-center gap-1 text-[9px] font-pixel text-[#06d6a0] ${isLeft ? "justify-end" : "justify-start"}`}>
                              <span>{isCompleted ? "REVIEW LESSON" : "ENTER WORKSPACE"}</span>
                              <ChevronRight className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Interactive Quest Node Button */}
                      <div className="shrink-0 z-10 relative">
                        <button
                          onClick={() => handleNodeClick(mod)}
                          disabled={isUpcoming}
                          title={
                            isCompleted
                              ? "Completed: Click to open documentation & quiz"
                              : isCurrent
                              ? "Current Quest: Click to solve checkpoint!"
                              : "Locked: Complete previous stages first"
                          }
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-none pixel-btn flex items-center justify-center text-xl transition-all ${nodeBg} ${nodeBorder} ${ringEffect} ${
                            isUpcoming ? "cursor-not-allowed opacity-60" : "hover:scale-105"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-7 h-7 stroke-[3] text-black" />
                          ) : isCurrent ? (
                            <Play className="w-6 h-6 fill-black text-black ml-0.5" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-500" />
                          )}
                        </button>

                        {/* Floating "YOU ARE HERE" Pin on Current Node */}
                        {isCurrent && (
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#ff8906] text-black font-pixel text-[8px] px-2 py-0.5 border border-black animate-bounce shadow-[2px_2px_0px_#000]">
                            READY
                          </div>
                        )}
                      </div>

                      {/* Balancing Empty Space for alternating layout */}
                      <div className="w-1/2" />
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
