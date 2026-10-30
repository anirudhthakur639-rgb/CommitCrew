"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { soundFx } from "@/utils/sound";
import confetti from "canvas-confetti";

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  category: "daily" | "odyssey";
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  rarity: "common" | "rare" | "legendary";
}

interface GameContextType {
  activeTab: "home" | "journey" | "git-story" | "terminal-lab" | "profile";
  setActiveTab: (tab: "home" | "journey" | "git-story" | "terminal-lab" | "profile") => void;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  streak: number;
  hearts: number;
  isMuted: boolean;
  toggleMute: () => void;
  addXp: (amount: number, reason?: string) => void;
  completeDailyQuest: (id: string) => void;
  dailyQuests: Quest[];
  badges: Badge[];
  activeModalQuest: Quest | null;
  openQuestModal: (quest: Quest) => void;
  closeQuestModal: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<"home" | "journey" | "git-story" | "terminal-lab" | "profile">("home");
  const [xp, setXp] = useState(420);
  const [coins, setCoins] = useState(185);
  const [streak, setStreak] = useState(7);
  const [hearts] = useState(3);
  const [isMuted, setIsMuted] = useState(false);
  const [activeModalQuest, setActiveModalQuest] = useState<Quest | null>(null);

  const xpPerLevel = 500;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentLevelXp = xp % xpPerLevel;
  const xpToNextLevel = xpPerLevel;

  const [dailyQuests, setDailyQuests] = useState<Quest[]>([
    {
      id: "q1",
      title: "Check-in at DevForge",
      description: "Scan your MLH QR badge and verify in the arena.",
      xpReward: 50,
      completed: true,
      category: "daily",
    },
    {
      id: "q2",
      title: "Fix the Broken Loop",
      description: "Debug the off-by-one index error in the Python Glade.",
      xpReward: 100,
      completed: false,
      category: "daily",
    },
    {
      id: "q3",
      title: "Push 1 Clean Commit",
      description: "Write an OSI MIT license and push to GitHub before 10 AM.",
      xpReward: 150,
      completed: false,
      category: "daily",
    },
  ]);

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "b1",
      name: "Hacktober Knight",
      description: "Attended DevForge 2026 Bengaluru offline finals.",
      icon: "🎃",
      unlocked: true,
      rarity: "legendary",
    },
    {
      id: "b2",
      name: "Night Owl",
      description: "Hacked past 03:00 AM without a segmentation fault.",
      icon: "🦉",
      unlocked: true,
      rarity: "rare",
    },
    {
      id: "b3",
      name: "Pixel Wizard",
      description: "Designed a pure 8-bit UI that impressed the guild.",
      icon: "🕹️",
      unlocked: true,
      rarity: "rare",
    },
    {
      id: "b4",
      name: "Open Source Champion",
      description: "Submitted an OSI-compliant project with clean README.",
      icon: "🛡️",
      unlocked: false,
      rarity: "legendary",
    },
  ]);

  const setActiveTab = (tab: "home" | "journey" | "git-story" | "terminal-lab" | "profile") => {
    soundFx.playClick();
    setActiveTabState(tab);
  };

  const toggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const addXp = (amount: number) => {
    const prevLevel = Math.floor(xp / xpPerLevel) + 1;
    const newXp = xp + amount;
    const newLevel = Math.floor(newXp / xpPerLevel) + 1;

    setXp(newXp);
    setCoins((c) => c + Math.round(amount / 2));

    if (newLevel > prevLevel) {
      soundFx.playLevelUp();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ffd166", "#06d6a0", "#118ab2", "#ef476f"],
      });
    } else {
      soundFx.playCoin();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#ffd166", "#06d6a0"],
      });
    }
  };

  const completeDailyQuest = (id: string) => {
    setDailyQuests((prev) =>
      prev.map((q) => {
        if (q.id === id && !q.completed) {
          addXp(q.xpReward);
          return { ...q, completed: true };
        }
        return q;
      })
    );
  };

  const openQuestModal = (quest: Quest) => {
    soundFx.playClick();
    setActiveModalQuest(quest);
  };

  const closeQuestModal = () => {
    soundFx.playClick();
    setActiveModalQuest(null);
  };

  return (
    <GameContext.Provider
      value={{
        activeTab,
        setActiveTab,
        level,
        xp: currentLevelXp,
        xpToNextLevel,
        coins,
        streak,
        hearts,
        isMuted,
        toggleMute,
        addXp,
        completeDailyQuest,
        dailyQuests,
        badges,
        activeModalQuest,
        openQuestModal,
        closeQuestModal,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

