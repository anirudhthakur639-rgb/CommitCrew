"use client";

import React from "react";

interface CodedexAnimatedBackgroundProps {
  showMascot?: boolean;
}

export const CodedexAnimatedBackground: React.FC<CodedexAnimatedBackgroundProps> = ({
  showMascot = true,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* Layer 1: Base Sky Color Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#157dd0]/80 via-[#103b6e]/70 to-[#0c0b1a]" />

      {/* Layer 2: Moving Pixel Sky & Clouds */}
      <div 
        className="absolute top-0 left-0 w-full h-[450px] animate-sky-move pixelated opacity-75"
        style={{
          backgroundImage: 'url("/images/codedex-bg/LandingPage_Sky.png")',
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
        }}
      />

      {/* Layer 3: Distant Pixel Mountains */}
      <div 
        className="absolute top-[140px] left-0 w-full h-[320px] pixelated opacity-80"
        style={{
          backgroundImage: 'url("/images/codedex-bg/LandingPage_Mountain.png")',
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
        }}
      />

      {/* Layer 4: Rolling Animated Pixel Hills GIF */}
      <div 
        className="absolute top-[280px] left-0 w-full h-[260px] pixelated opacity-90"
        style={{
          backgroundImage: 'url("/images/codedex-bg/LandingPage_Hills.gif")',
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
        }}
      />

      {/* Layer 5: Running Animated Mascot Sprite */}
      {showMascot && (
        <div 
          className="absolute top-[375px] left-[15%] sm:left-[22%] w-[130px] h-[155px] pixelated opacity-95 animate-pulse"
          style={{
            backgroundImage: 'url("/images/codedex-bg/LandingPage_Mascot.gif")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
      )}

      {/* Layer 6: Animated Waving Grass GIF */}
      <div 
        className="absolute top-[440px] left-0 w-full h-[180px] pixelated opacity-95"
        style={{
          backgroundImage: 'url("/images/codedex-bg/LandingPage_Grass.gif")',
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
        }}
      />

      {/* Layer 7: Precision Dark Readability Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b1a]/40 via-[#0c0b1a]/85 to-[#0c0b1a] backdrop-blur-[0.5px]" />
      
      {/* Layer 8: Retro Arcade Grid scanline overlay */}
      <div className="absolute inset-0 arcade-grid opacity-60" />
      <div className="absolute inset-0 scanlines opacity-40" />

    </div>
  );
};
