"use client";

import React, { useState } from "react";
import { useGame, ArcadeTheme } from "@/context/GameContext";
import { Heart, Zap, Shield, Sparkles, Coins, Palette, Check } from "lucide-react";

interface ShopItem {
  id: string;
  name: string;
  category: "powerup" | "skin";
  icon: string;
  description: string;
  cost: number;
  effect: string;
}

export const ArcadeShop: React.FC = () => {
  const { coins, hearts, doubleXpCount, hasStreakShield, activeTheme, buyShopItem } = useGame();
  const [purchaseMsg, setPurchaseMsg] = useState<string | null>(null);

  const items: ShopItem[] = [
    {
      id: "heart-potion",
      name: "Heart Potion",
      category: "powerup",
      icon: "🧪",
      description: "Restores full 3 Heart Lives immediately.",
      cost: 50,
      effect: "Full 3 Hearts Restored",
    },
    {
      id: "double-xp",
      name: "Double XP Elixir",
      category: "powerup",
      icon: "⚡",
      description: "Doubles XP earned on your next 3 quests.",
      cost: 120,
      effect: "+3 Quests with 2× XP",
    },
    {
      id: "streak-shield",
      name: "Streak Shield",
      category: "powerup",
      icon: "🛡️",
      description: "Protects your flame streak from resetting.",
      cost: 80,
      effect: "Streak Protected",
    },
    {
      id: "skin-cyberpunk",
      name: "Neon Cyberpunk",
      category: "skin",
      icon: "🌆",
      description: "Signature neon cyan & electric gold palette.",
      cost: 100,
      effect: "Active Theme",
    },
    {
      id: "skin-gameboy",
      name: "Game Boy 1989",
      category: "skin",
      icon: "📟",
      description: "Authentic 4-shade LCD lime green matrix.",
      cost: 150,
      effect: "Vintage LCD Theme",
    },
    {
      id: "skin-synthwave",
      name: "Synthwave Sunset",
      category: "skin",
      icon: "🌇",
      description: "Vibrant hot-pink & electric purple twilight.",
      cost: 150,
      effect: "Outrun 80s Theme",
    },
  ];

  const handleBuy = (item: ShopItem) => {
    const success = buyShopItem(item.id, item.cost);
    if (success) {
      setPurchaseMsg(`Unlocked ${item.name}!`);
      setTimeout(() => setPurchaseMsg(null), 2500);
    }
  };

  return (
    <div className="bg-[#17152b] pixel-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛒</span>
          <h3 className="font-pixel text-xs text-[#ffd166] uppercase">
            Arcade Armory & Shop
          </h3>
        </div>
        <div className="font-pixel text-[9px] text-[#ffd166] bg-[#090814] px-2 py-0.5 border border-[#ffd166]/60 flex items-center gap-1 shadow-[0_0_8px_rgba(255,209,102,0.3)]">
          <Coins className="w-3 h-3 text-[#ffd166]" />
          <span>{coins} 🪙</span>
        </div>
      </div>

      {purchaseMsg && (
        <div className="mb-3 p-2 bg-[#06d6a0]/20 border border-[#06d6a0] text-[#06d6a0] font-pixel text-[9px] flex items-center justify-center gap-1.5 animate-in zoom-in-95">
          <Sparkles className="w-3 h-3 shrink-0" />
          <span>{purchaseMsg}</span>
        </div>
      )}

      {/* Active Buffs Status Bar */}
      <div className="grid grid-cols-2 gap-2 mb-3 bg-[#090814] p-2 pixel-border-sm text-[10px] font-mono">
        <div className="flex items-center gap-1.5 text-[#06d6a0]">
          <Zap className="w-3 h-3 text-[#ffd166]" />
          <span>2X XP: {doubleXpCount} Left</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#ff8906]">
          <Shield className="w-3 h-3 text-[#ff8906]" />
          <span>Shield: {hasStreakShield ? "ACTIVE" : "NONE"}</span>
        </div>
      </div>

      {/* Items Grid */}
      <div className="space-y-2.5">
        {items.map((item) => {
          const isThemeActive = 
            (item.id === "skin-cyberpunk" && activeTheme === "cyberpunk") ||
            (item.id === "skin-gameboy" && activeTheme === "gameboy") ||
            (item.id === "skin-synthwave" && activeTheme === "synthwave");

          const canAfford = coins >= item.cost;

          return (
            <div
              key={item.id}
              className={`p-2.5 pixel-border-sm flex items-center justify-between gap-2.5 transition-all ${
                isThemeActive
                  ? "bg-[#252248] border-2 border-[#06d6a0] shadow-[0_0_10px_rgba(6,214,160,0.3)]"
                  : "bg-[#100e24] hover:bg-[#181534]"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-2xl shrink-0 p-1 bg-[#090814] pixel-border-sm">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <div className="font-pixel text-[9px] text-white flex items-center gap-1.5 truncate">
                    <span>{item.name}</span>
                    {isThemeActive && (
                      <span className="bg-[#06d6a0] text-black px-1 text-[7px] font-bold">EQUIPPED</span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] text-[#a7a9be] line-clamp-1">
                    {item.description}
                  </div>
                </div>
              </div>

              {/* Buy Button */}
              <button
                onClick={() => handleBuy(item)}
                disabled={!canAfford && !isThemeActive}
                className={`px-2.5 py-1.5 rounded-none font-pixel text-[8px] pixel-btn shrink-0 flex items-center gap-1 font-bold ${
                  isThemeActive
                    ? "bg-[#06d6a0] text-black cursor-default"
                    : canAfford
                    ? "bg-[#ffd166] hover:bg-[#ffe082] text-black shadow-[0_0_8px_rgba(255,209,102,0.4)] cursor-pointer"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed border-gray-700"
                }`}
              >
                {isThemeActive ? (
                  <>
                    <Check className="w-2.5 h-2.5" />
                    <span>ACTIVE</span>
                  </>
                ) : (
                  <>
                    <Coins className="w-2.5 h-2.5" />
                    <span>{item.cost} 🪙</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

