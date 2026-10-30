"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Play, Sparkles, Trophy, ChevronRight, Zap, Terminal, Cpu, Activity, ShieldCheck, Radio } from "lucide-react";

export const HeroCabinet: React.FC = () => {
  const { openQuestModal, setActiveTab } = useGame();

  const handleStartMainQuest = () => {
    openQuestModal({
      id: "odyssey-main",
      title: "The Dungeon of the For-Loop",
      description: "Battle through nested arrays and tame the wild iterator before time runs out!",
      xpReward: 100,
      completed: false,
      category: "odyssey",
    });
  };

  return (
    <div className="relative w-full bg-[#141226] pixel-border-lg overflow-hidden mb-8 shadow-[6px_6px_0px_#000]">
      
      {/* ================= HIGH-TECH CYBER TELEMETRY & MATRIX SCREEN ================= */}
      <div className="relative w-full h-40 sm:h-48 border-b-4 border-black overflow-hidden bg-[#090814] flex flex-col justify-between p-3.5 sm:p-5 select-none">
        
        {/* Animated Cyber Grid Matrix Backdrop */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 214, 160, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 214, 160, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Laser Scanner Beam sweeping across screen */}
        <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#06d6a0] to-transparent animate-cyber-scan pointer-events-none drop-shadow-[0_0_10px_#06d6a0]" />

        {/* Top Header of Tech Viewport: System Status */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-[#232044] pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#06d6a0] border border-black animate-ping" />
            <span className="font-pixel text-[9px] sm:text-[10px] text-[#06d6a0] tracking-wider uppercase font-bold drop-shadow-[0_0_6px_#06d6a0]">
              SYSTEM: ONLINE · BENGALURU ARENA P3
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-pixel text-[8px] bg-[#ef476f] text-white px-2 py-0.5 border border-black shadow-[2px_2px_0_#000] animate-pulse">
              12H FINALS ACTIVE
            </span>
            <span className="font-pixel text-[8px] bg-[#ffd166] text-black px-2 py-0.5 border border-black shadow-[2px_2px_0_#000] hidden sm:inline-block">
              70 TEAMS LIVE
            </span>
          </div>
        </div>

        {/* Central Tech Section: Holographic CPU Chip + Live Code Matrix Stream */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-1">
          
          {/* Left: Animated Holographic CPU Core */}
          <div className="md:col-span-6 flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-14 h-14 bg-[#0d0b1f] border-2 border-[#06d6a0] pixel-border-sm flex items-center justify-center animate-chip-pulse">
                <Cpu className="w-7 h-7 text-[#06d6a0]" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#ffd166] text-black text-[7px] font-pixel px-1 border border-black">
                CORE
              </div>
            </div>

            <div>
              <div className="font-pixel text-[10px] text-white flex items-center gap-1.5">
                <span>AI_ENGINE:</span>
                <span className="text-[#06d6a0] drop-shadow-[0_0_6px_#06d6a0]">GEMMA-2-9B</span>
              </div>
              <div className="font-mono text-[11px] text-[#a7a9be] mt-0.5">
                Local Ollama Server · Zero Latency Triage
              </div>
              <div className="flex items-center gap-2 mt-1 text-[9px] font-mono text-[#00f5d4]">
                <Activity className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
                <span>INFERENCE: 142 TOKENS/SEC</span>
              </div>
            </div>
          </div>

          {/* Right: Live Audio / Network Telemetry Equalizer Bars */}
          <div className="md:col-span-6 hidden sm:flex flex-col items-end justify-center gap-1.5">
            <div className="flex items-center gap-1 text-[9px] font-mono text-[#ffd166]">
              <Radio className="w-3 h-3 text-[#ff8906] animate-pulse" />
              <span>PACKET STREAM FREQUENCY</span>
            </div>

            {/* 8-bit Equalizer Visualizer */}
            <div className="flex items-end gap-1 h-8 bg-[#0a0818] p-1 border border-[#2b2754]">
              {[40, 75, 55, 90, 60, 100, 45, 80, 65, 95, 70, 85].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-[#06d6a0] via-[#ffd166] to-[#ef476f] transition-all duration-300"
                  style={{
                    height: `${h}%`,
                    animation: `pulseGlow 1.2s infinite ease-in-out ${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            <span className="text-[8px] font-pixel text-[#a7a9be]">
              KERNEL: v6.12 · OSI LICENSED
            </span>
          </div>

        </div>

        {/* Bottom Ticker Tape */}
        <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-[#a7a9be] border-t border-[#232044] pt-1">
          <span className="text-[#06d6a0] font-bold">STATUS &gt; LATENCY: 8ms · NO LOSS</span>
          <span className="text-[#ffd166]">CODE FREEZE: 10:00 AM HARD STOP</span>
        </div>

      </div>

      {/* ================= BOTTOM ACTION BAR: MASCOT & QUEST ACTION ================= */}
      <div className="p-5 sm:p-6 bg-[#181534]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Left: Pixel Avatar & Speech Bubble */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            
            {/* 8-Bit NPC Mascot Box */}
            <div className="relative shrink-0 select-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ffd166] pixel-border flex items-center justify-center text-4xl shadow-[4px_4px_0px_#000]">
                🧙‍♂️
              </div>
              <div className="absolute -bottom-2 -right-1 bg-[#ff8906] text-black text-[8px] font-pixel px-1 py-0.5 border border-black">
                NPC
              </div>
            </div>

            {/* Clear, High-Contrast Speech Bubble */}
            <div className="relative bg-[#ffffff] text-[#0f0e17] p-3.5 sm:p-4 pixel-border flex-1 shadow-[4px_4px_0px_#000]">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-[10px] text-[#ff8906] uppercase">
                  Elder Pythoneer:
                </span>
                <span className="text-[9px] bg-[#e2e8f0] px-1 font-mono text-gray-700">
                  Quest Giver
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono leading-relaxed font-semibold">
                &quot;Welcome to CodeQuest Bengaluru finals! The clock is ticking toward 10:00 AM. Master the ancient arts of open-source logic, conquer the stages, and claim your share of the ₹25K bounty!&quot;
              </p>
            </div>
          </div>

          {/* Right: Quest Action Card */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <div className="bg-[#0c0b1a] p-3.5 pixel-border-sm w-full border-2 border-black shadow-[3px_3px_0_#000]">
              <div className="flex justify-between items-center text-[10px] font-pixel text-[#a7a9be] mb-1">
                <span className="text-white font-bold">ACTIVE STAGE</span>
                <span className="text-[#ffd166] font-bold">+100 XP</span>
              </div>
              <div className="text-xs font-mono font-bold text-white truncate mb-2.5">
                Ch 4: Nested Loops &amp; Recursion
              </div>
              
              {/* Play Button */}
              <button
                onClick={handleStartMainQuest}
                className="w-full py-2.5 px-4 bg-[#06d6a0] hover:bg-[#05ba8a] text-black font-pixel text-xs uppercase pixel-btn glow-cyan-hover flex items-center justify-center gap-2 font-bold"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>RESUME QUEST</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#a7a9be] px-1">
              <span className="flex items-center gap-1 text-[#ffd166] font-bold">
                <Zap className="w-3 h-3 text-[#ffd166]" />
                <span>LVL 2 Milestone</span>
              </span>
              <button 
                onClick={() => setActiveTab("journey")}
                className="hover:underline text-[#06d6a0] font-pixel text-[8px] font-bold"
              >
                VIEW MAP &gt;
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
