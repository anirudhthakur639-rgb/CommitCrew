"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Heart, Coins, RefreshCw, Sparkles, Skull, Flame } from "lucide-react";

export const GameOverModal: React.FC = () => {
  const { isGameOver, coins, refillHearts, freeRevive, closeGameOverModal } = useGame();

  if (!isGameOver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#141026] pixel-border-lg p-6 text-center border-4 border-[#ef476f] shadow-[0_0_30px_rgba(239,71,111,0.7),6px_6px_0_#000]">
        
        {/* Flashing Arcade Skull Icon */}
        <div className="w-16 h-16 mx-auto mb-3 bg-[#241128] border-2 border-[#ef476f] rounded-none flex items-center justify-center shadow-[0_0_15px_#ef476f] animate-pulse">
          <Skull className="w-9 h-9 text-[#ef476f]" />
        </div>

        {/* Game Over Title */}
        <h2 className="font-pixel text-xl sm:text-2xl text-[#ef476f] tracking-wider mb-1.5 animate-pulse drop-shadow-[0_0_10px_#ef476f]">
          GAME OVER
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#ffd166] mb-5">
          You lost all your Heart Lives in the coding dungeon!
        </p>

        {/* Lives depleted indicator */}
        <div className="flex items-center justify-center gap-2 mb-6 bg-[#090814] py-2.5 px-4 pixel-border-sm border-gray-700">
          <span className="font-pixel text-[10px] text-gray-400">STATUS:</span>
          <div className="flex items-center gap-1.5 opacity-40">
            <Heart className="w-4 h-4 text-gray-600" />
            <Heart className="w-4 h-4 text-gray-600" />
            <Heart className="w-4 h-4 text-gray-600" />
          </div>
          <span className="font-pixel text-[9px] text-[#ef476f] ml-1 font-bold">0 LIVES REMAINING</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Option 1: Respawn with 50 coins */}
          <button
            onClick={() => refillHearts(50)}
            disabled={coins < 50}
            className={`w-full py-3 px-4 font-pixel text-[11px] pixel-btn flex items-center justify-center gap-2 transition-all ${
              coins >= 50
                ? "bg-[#06d6a0] hover:bg-[#05ba8a] text-black font-bold shadow-[0_0_16px_#06d6a0]"
                : "bg-gray-800 text-gray-500 cursor-not-allowed border-gray-700"
            }`}
          >
            <Coins className="w-4 h-4 text-black shrink-0" />
            <span>INSERT 50 COINS · RESTORE 3 HEARTS</span>
          </button>

          {/* Option 2: Free 1-heart revive */}
          <button
            onClick={freeRevive}
            className="w-full py-2.5 px-4 bg-[#232048] hover:bg-[#343063] text-[#ffd166] font-pixel text-[10px] pixel-btn flex items-center justify-center gap-2 border border-[#ffd166]/50 shadow-[0_0_10px_rgba(255,209,102,0.3)] cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-[#ef476f] text-[#ef476f]" />
            <span>FREE RESPAWN (1 HEART MERCY)</span>
          </button>
        </div>

        {/* Coin Balance Note */}
        <div className="mt-4 text-[11px] font-mono text-[#a7a9be] flex items-center justify-center gap-1.5">
          <span>Your Coin Balance:</span>
          <span className="text-[#ffd166] font-bold flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-[#ffd166]" />
            {coins} 🪙
          </span>
        </div>

      </div>
    </div>
  );
};

