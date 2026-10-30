"use client";

import React, { useEffect, useState } from "react";

export const TechAnimatedBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Matrix tech characters & code tokens
  const codeStreams = [
    "01100111 01101001 01110100",
    "git commit -m 'feat: init'",
    "const gemma = new Model();",
    "0xFF4A 0x219C 0x88EE",
    "def train_step(batch):",
    "SELECT * FROM quests;",
    "git push origin main",
    "01010010 01000101 01010000",
    "while (alive) { code(); }",
    "import torch.nn as nn",
    "<<<<<<< HEAD",
    "OSI_APPROVED_MIT_2026",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#090814]">
      
      {/* 1. Deep Cyber Tech Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0918] via-[#0e0c24] to-[#080711]" />

      {/* 2. Perspective Neon Cyber Grid (Moving floor effect) */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 214, 160, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 214, 160, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
          transform: "perspective(500px) rotateX(40deg) translateY(-80px)",
          transformOrigin: "center top",
        }}
      />

      {/* 3. Glowing Circuit Board Traces (SVG lines with animated pulses) */}
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06d6a0" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00bbf9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7928ca" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="yellowGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd166" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff8906" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Circuit Traces across background */}
        <path d="M 0 120 L 250 120 L 320 190 L 700 190 L 760 130 L 1400 130" stroke="url(#cyanGlow)" strokeWidth="2" fill="none" />
        <path d="M 100 0 L 100 240 L 180 320 L 180 600" stroke="url(#cyanGlow)" strokeWidth="1.5" fill="none" />
        <path d="M 800 0 L 800 180 L 920 300 L 1200 300" stroke="url(#yellowGlow)" strokeWidth="1.5" fill="none" />
        <path d="M 300 800 L 550 800 L 620 730 L 1100 730" stroke="url(#cyanGlow)" strokeWidth="2" fill="none" />
        
        {/* Circuit nodes (chips) */}
        <circle cx="250" cy="120" r="4" fill="#06d6a0" className="animate-ping" style={{ animationDuration: '3s' }} />
        <circle cx="700" cy="190" r="4" fill="#00bbf9" className="animate-ping" style={{ animationDuration: '4s' }} />
        <circle cx="180" cy="320" r="4" fill="#ffd166" className="animate-ping" style={{ animationDuration: '2.5s' }} />
        <circle cx="920" cy="300" r="4" fill="#ff8906" />
      </svg>

      {/* 4. Falling Matrix Binary Code Columns (Left & Right Flanks) */}
      {mounted && (
        <div className="absolute inset-0 flex justify-between px-4 sm:px-12 pointer-events-none opacity-25">
          {/* Left Matrix Column */}
          <div className="flex flex-col space-y-8 font-mono text-[10px] text-[#06d6a0] animate-matrix-fall select-none">
            {codeStreams.slice(0, 6).map((line, i) => (
              <div key={i} className="tracking-widest drop-shadow-[0_0_6px_#06d6a0]">
                {line}
              </div>
            ))}
          </div>

          {/* Right Matrix Column */}
          <div className="hidden md:flex flex-col space-y-8 font-mono text-[10px] text-[#00bbf9] animate-matrix-fall select-none" style={{ animationDelay: '-5s' }}>
            {codeStreams.slice(6).map((line, i) => (
              <div key={i} className="tracking-widest drop-shadow-[0_0_6px_#00bbf9]">
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Sweeping Horizontal Cyber Scanner Line */}
      <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#06d6a0] to-transparent animate-cyber-scan pointer-events-none drop-shadow-[0_0_8px_#06d6a0]" />

      {/* 6. Dark Tech Readability Vignette */}
      {/* Ensures cards, text, and interactive buttons stay 100% crisp, sharp, and easy to read */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0915]/60 via-[#0a0915]/85 to-[#0a0915]" />
      
      {/* 7. Retro CRT Scanlines */}
      <div className="absolute inset-0 scanlines opacity-50" />

    </div>
  );
};

export const CodedexAnimatedBackground = TechAnimatedBackground;

