"use client";

import React from "react";

interface TriquetraIconProps {
  className?: string;
}

/**
 * Triquetra Icon with Interwoven Circle (Trinity Knot)
 * Hand-tuned geometric Celtic knot inspired by the Sic Mundus / Dark symbol.
 */
export const TriquetraIcon: React.FC<TriquetraIconProps> = ({
  className = "w-7 h-7",
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transformOrigin: "50% 50%" }}
    >
      <defs>
        {/* Luminous emerald glow for the sacred knot */}
        <filter id="triquetra-emerald-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#06d6a0" floodOpacity="0.85" />
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#06d6a0" floodOpacity="0.4" />
        </filter>

        {/* Golden aura for the intertwined circle */}
        <filter id="triquetra-gold-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ffd166" floodOpacity="0.75" />
        </filter>
      </defs>

      {/* Base Intertwined Ring (passes beneath outer strands) */}
      <circle
        cx="50"
        cy="50"
        r="26"
        stroke="#ffd166"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        filter="url(#triquetra-gold-glow)"
        opacity="0.95"
      />

      {/* The 3-Lobe Sacred Triquetra Knot */}
      <path
        d="M 15.36 70.00 A 34.64 34.64 0 0 1 50.00 10.00 A 34.64 34.64 0 0 1 84.64 70.00 A 34.64 34.64 0 0 1 15.36 70.00 Z"
        stroke="#06d6a0"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        filter="url(#triquetra-emerald-glow)"
      />

      {/* Inner Chalk/Rune Core Highlight on Triquetra Strands */}
      <path
        d="M 15.36 70.00 A 34.64 34.64 0 0 1 50.00 10.00 A 34.64 34.64 0 0 1 84.64 70.00 A 34.64 34.64 0 0 1 15.36 70.00 Z"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />

      {/* Interlacing Over-Arcs (Circle passing OVER triquetra strand for authentic Celtic weave) */}
      {/* Lobe 1 (Bottom Right) */}
      <path
        d="M 66.01 70.49 A 26 26 0 0 1 54.45 75.72"
        stroke="#090814"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 66.01 70.49 A 26 26 0 0 1 54.45 75.72"
        stroke="#ffd166"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Lobe 2 (Bottom Left) */}
      <path
        d="M 24.21 53.26 A 26 26 0 0 1 25.69 40.77"
        stroke="#090814"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 24.21 53.26 A 26 26 0 0 1 25.69 40.77"
        stroke="#ffd166"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Lobe 3 (Top) */}
      <path
        d="M 59.78 26.25 A 26 26 0 0 1 69.86 33.51"
        stroke="#090814"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 59.78 26.25 A 26 26 0 0 1 69.86 33.51"
        stroke="#ffd166"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Central Singularity Node */}
      <circle cx="50" cy="50" r="2.2" fill="#ffd166" opacity="0.85" />
    </svg>
  );
};
