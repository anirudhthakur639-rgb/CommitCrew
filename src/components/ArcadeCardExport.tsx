"use client";

import React, { useRef } from "react";
import { useGame } from "@/context/GameContext";
import { Download, Share2, Sparkles, Trophy, Award, Check } from "lucide-react";
import { soundFx } from "@/utils/sound";
import confetti from "canvas-confetti";

export const ArcadeCardExport: React.FC = () => {
  const { level, totalXp, streak, coins, badges, selectedAvatar } = useGame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDownload = () => {
    soundFx.playSuccess();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#ffd166", "#06d6a0", "#ef476f"],
    });

    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 420;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw Background
    ctx.fillStyle = "#0a0915";
    ctx.fillRect(0, 0, 720, 420);

    // Cyber Grid
    ctx.strokeStyle = "rgba(6, 214, 160, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 720; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 420);
      ctx.stroke();
    }
    for (let y = 0; y < 420; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(720, y);
      ctx.stroke();
    }

    // Outer Neon Border
    ctx.strokeStyle = "#06d6a0";
    ctx.lineWidth = 6;
    ctx.strokeRect(12, 12, 696, 396);

    // Inner Border
    ctx.strokeStyle = "#ffd166";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, 680, 380);

    // Header Badge
    ctx.fillStyle = "#151a33";
    ctx.fillRect(40, 40, 640, 54);
    ctx.strokeStyle = "#ffd166";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 640, 54);

    ctx.fillStyle = "#ffd166";
    ctx.font = "bold 18px monospace";
    ctx.fillText("⚡ CODEQUEST · OFFICIAL HACKER PASSPORT", 56, 74);

    // Avatar Box
    ctx.fillStyle = "#1b2140";
    ctx.fillRect(50, 120, 110, 110);
    ctx.strokeStyle = "#06d6a0";
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 120, 110, 110);

    ctx.font = "64px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(selectedAvatar || "🧙‍♂️", 105, 200);

    // Player Details
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px monospace";
    ctx.fillText("DEV_HACKER_2026", 185, 150);

    ctx.fillStyle = "#a7a9be";
    ctx.font = "14px monospace";
    ctx.fillText("Guild: DevForge Bengaluru · Hacktoberfest 2026", 185, 178);

    // Rank Pill
    ctx.fillStyle = "#06d6a0";
    ctx.fillRect(185, 195, 180, 26);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 12px monospace";
    ctx.fillText(`LEVEL ${level} CODE MAGE`, 195, 213);

    // Stats Grid Box
    ctx.fillStyle = "#141226";
    ctx.fillRect(50, 255, 620, 95);
    ctx.strokeStyle = "#2b2752";
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 255, 620, 95);

    // Stat 1: Total XP
    ctx.fillStyle = "#a7a9be";
    ctx.font = "11px monospace";
    ctx.fillText("TOTAL EXPERIENCE", 75, 285);
    ctx.fillStyle = "#06d6a0";
    ctx.font = "bold 20px monospace";
    ctx.fillText(`${totalXp} XP`, 75, 320);

    // Stat 2: Streak
    ctx.fillStyle = "#a7a9be";
    ctx.font = "11px monospace";
    ctx.fillText("FLAME STREAK", 240, 285);
    ctx.fillStyle = "#ff8906";
    ctx.font = "bold 20px monospace";
    ctx.fillText(`${streak} DAYS 🔥`, 240, 320);

    // Stat 3: Coins
    ctx.fillStyle = "#a7a9be";
    ctx.font = "11px monospace";
    ctx.fillText("ARCADE COINS", 400, 285);
    ctx.fillStyle = "#ffd166";
    ctx.font = "bold 20px monospace";
    ctx.fillText(`${coins} 🪙`, 400, 320);

    // Stat 4: Badges
    ctx.fillStyle = "#a7a9be";
    ctx.font = "11px monospace";
    ctx.fillText("ACHIEVEMENTS", 540, 285);
    ctx.fillStyle = "#ef476f";
    ctx.font = "bold 20px monospace";
    ctx.fillText(`${badges.filter(b => b.unlocked).length} / ${badges.length} 🎖️`, 540, 320);

    // Footer Watermark
    ctx.fillStyle = "#06d6a0";
    ctx.font = "10px monospace";
    ctx.fillText("VERIFIED ON CODEQUEST · BUILT WITH OPEN-SOURCE SPIRIT", 50, 385);

    ctx.fillStyle = "#a7a9be";
    ctx.textAlign = "right";
    ctx.fillText("codequest.devforge.io", 670, 385);

    // Trigger Download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `codequest-passport-devhacker-lvl${level}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="bg-[#151a33] pixel-border-sm p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-[#ffd166]" />
          <h3 className="font-pixel text-xs text-white">
            Arcade Developer Passport
          </h3>
        </div>
        <p className="text-xs font-mono text-[#a7a9be]">
          Export your 8-bit achievement card to showcase on LinkedIn, X, or DEV.to
        </p>
      </div>

      <button
        onClick={handleDownload}
        className="px-4 py-2.5 bg-gradient-to-r from-[#2ee59d] to-[#5aa8ff] text-[#0b1020] font-pixel text-[10px] font-bold rounded-full pixel-btn shadow-[0_0_14px_rgba(46,229,157,0.5)] flex items-center gap-2 cursor-pointer hover:opacity-90 shrink-0"
      >
        <Download className="w-3.5 h-3.5 stroke-[3]" />
        <span>DOWNLOAD PASSPORT</span>
      </button>
    </div>
  );
};
