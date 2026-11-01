"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
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

export interface FloatingXp {
  id: number;
  amount: number;
  label?: string;
}

export type ArcadeTheme = "cyberpunk" | "gameboy" | "synthwave";

interface GameContextType {
  activeTab: "home" | "journey" | "git-story" | "terminal-lab" | "profile";
  setActiveTab: (tab: "home" | "journey" | "git-story" | "terminal-lab" | "profile") => void;
  level: number;
  xp: number;
  totalXp: number;
  xpToNextLevel: number;
  coins: number;
  streak: number;
  hearts: number;
  isMuted: boolean;
  toggleMute: () => void;
  addXp: (amount: number, label?: string) => void;
  deductHeart: () => boolean;
  refillHearts: (cost?: number) => boolean;
  freeRevive: () => void;
  isGameOver: boolean;
  closeGameOverModal: () => void;
  doubleXpCount: number;
  hasStreakShield: boolean;
  buyShopItem: (itemId: string, cost: number) => boolean;
  activeTheme: ArcadeTheme;
  setActiveTheme: (theme: ArcadeTheme) => void;
  floatingXps: FloatingXp[];
  completeDailyQuest: (id: string) => void;
  dailyQuests: Quest[];
  badges: Badge[];
  activeModalQuest: Quest | null;
  openQuestModal: (quest: Quest) => void;
  closeQuestModal: () => void;
  selectedAvatar: string;
  setSelectedAvatar: (avatar: string) => void;
}

const STORAGE_KEY = "codequest_retro_state_v1";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<"home" | "journey" | "git-story" | "terminal-lab" | "profile">("home");
  const [totalXp, setTotalXp] = useState<number>(420);
  const [coins, setCoins] = useState<number>(185);
  const [streak, setStreak] = useState<number>(7);
  const [hearts, setHearts] = useState<number>(3);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [doubleXpCount, setDoubleXpCount] = useState<number>(0);
  const [hasStreakShield, setHasStreakShield] = useState<boolean>(false);
  const [activeTheme, setActiveTheme] = useState<ArcadeTheme>("cyberpunk");
  const [selectedAvatar, setSelectedAvatar] = useState<string>("🧙‍♂️");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [floatingXps, setFloatingXps] = useState<FloatingXp[]>([]);
  const [activeModalQuest, setActiveModalQuest] = useState<Quest | null>(null);

  const xpPerLevel = 500;
  const level = Math.floor(totalXp / xpPerLevel) + 1;
  const currentLevelXp = totalXp % xpPerLevel;
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
    {
      id: "b5",
      name: "Git Master",
      description: "Mastered staging, branching, and pull requests in CodeQuest.",
      icon: "🐱",
      unlocked: false,
      rarity: "legendary",
    },
  ]);

  // Load state from localStorage on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (typeof data.totalXp === "number") setTotalXp(data.totalXp);
        if (typeof data.coins === "number") setCoins(data.coins);
        if (typeof data.streak === "number") setStreak(data.streak);
        if (typeof data.hearts === "number") setHearts(data.hearts);
        if (typeof data.doubleXpCount === "number") setDoubleXpCount(data.doubleXpCount);
        if (typeof data.hasStreakShield === "boolean") setHasStreakShield(data.hasStreakShield);
        if (data.activeTheme) setActiveTheme(data.activeTheme);
        if (data.selectedAvatar) setSelectedAvatar(data.selectedAvatar);
        if (Array.isArray(data.dailyQuests)) setDailyQuests(data.dailyQuests);
        if (Array.isArray(data.badges)) setBadges(data.badges);
      }
    } catch {
      // ignore JSON parse errors
    }
  }, []);

  // Save state to localStorage whenever state changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const dataToSave = {
        totalXp,
        coins,
        streak,
        hearts,
        doubleXpCount,
        hasStreakShield,
        activeTheme,
        selectedAvatar,
        dailyQuests,
        badges,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // ignore storage quota errors
    }
  }, [totalXp, coins, streak, hearts, doubleXpCount, hasStreakShield, activeTheme, selectedAvatar, dailyQuests, badges]);

  const setActiveTab = (tab: "home" | "journey" | "git-story" | "terminal-lab" | "profile") => {
    soundFx.playClick();
    setActiveTabState(tab);
  };

  const toggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const addXp = useCallback((amount: number, label?: string) => {
    const multiplier = doubleXpCount > 0 ? 2 : 1;
    const finalAmount = amount * multiplier;

    if (doubleXpCount > 0) {
      setDoubleXpCount((prev) => Math.max(0, prev - 1));
    }

    const prevLevel = Math.floor(totalXp / xpPerLevel) + 1;
    const newTotalXp = totalXp + finalAmount;
    const newLevel = Math.floor(newTotalXp / xpPerLevel) + 1;

    setTotalXp(newTotalXp);
    setCoins((c) => c + Math.round(finalAmount / 2));

    // Spawn floating particle notification
    const particleId = Date.now() + Math.random();
    setFloatingXps((prev) => [...prev, { id: particleId, amount: finalAmount, label }]);
    setTimeout(() => {
      setFloatingXps((prev) => prev.filter((p) => p.id !== particleId));
    }, 2000);

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
  }, [doubleXpCount, totalXp, xpPerLevel]);

  const deductHeart = useCallback((): boolean => {
    soundFx.playWrong();
    if (hearts <= 1) {
      setHearts(0);
      setIsGameOver(true);
      return false;
    }
    setHearts((h) => h - 1);
    return true;
  }, [hearts]);

  const refillHearts = useCallback((cost: number = 50): boolean => {
    if (coins < cost) {
      soundFx.playWrong();
      return false;
    }
    setCoins((c) => c - cost);
    setHearts(3);
    setIsGameOver(false);
    soundFx.playSuccess();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#ef476f", "#ffd166", "#06d6a0"],
    });
    return true;
  }, [coins]);

  const freeRevive = useCallback(() => {
    setHearts(1);
    setIsGameOver(false);
    soundFx.playCoin();
  }, []);

  const closeGameOverModal = useCallback(() => {
    setIsGameOver(false);
  }, []);

  const buyShopItem = useCallback((itemId: string, cost: number): boolean => {
    if (coins < cost) {
      soundFx.playWrong();
      return false;
    }
    setCoins((c) => c - cost);
    soundFx.playCoin();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#ffd166", "#06d6a0"],
    });

    if (itemId === "heart-potion") {
      setHearts(3);
    } else if (itemId === "double-xp") {
      setDoubleXpCount((prev) => prev + 3);
    } else if (itemId === "streak-shield") {
      setHasStreakShield(true);
    } else if (itemId === "skin-gameboy") {
      setActiveTheme("gameboy");
    } else if (itemId === "skin-synthwave") {
      setActiveTheme("synthwave");
    } else if (itemId === "skin-cyberpunk") {
      setActiveTheme("cyberpunk");
    }
    return true;
  }, [coins]);

  const completeDailyQuest = (id: string) => {
    setDailyQuests((prev) =>
      prev.map((q) => {
        if (q.id === id && !q.completed) {
          addXp(q.xpReward, q.title);
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
        totalXp,
        xpToNextLevel,
        coins,
        streak,
        hearts,
        isMuted,
        toggleMute,
        addXp,
        deductHeart,
        refillHearts,
        freeRevive,
        isGameOver,
        closeGameOverModal,
        doubleXpCount,
        hasStreakShield,
        buyShopItem,
        activeTheme,
        setActiveTheme,
        floatingXps,
        completeDailyQuest,
        dailyQuests,
        badges,
        activeModalQuest,
        openQuestModal,
        closeQuestModal,
        selectedAvatar,
        setSelectedAvatar,
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
