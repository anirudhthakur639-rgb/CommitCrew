"use client";

import React from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import { Navbar } from "@/components/Navbar";
import { HeroCabinet } from "@/components/HeroCabinet";
import { JourneyTracks } from "@/components/JourneyTracks";
import { ArcadeHub } from "@/components/ArcadeHub";
import { JourneyView } from "@/components/JourneyView";
import { ProfileView } from "@/components/ProfileView";
import { GitStoryViewer } from "@/components/GitStoryViewer";
import { InteractiveLessonWorkspace } from "@/components/InteractiveLessonWorkspace";
import { CodedexAnimatedBackground } from "@/components/CodedexAnimatedBackground";
import { QuestModal } from "@/components/QuestModal";

const DashboardContent: React.FC = () => {
  const { activeTab, setActiveTab } = useGame();

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Top Retro Hero Banner */}
            <HeroCabinet />

            {/* Featured Git Story Mode Spotlight */}
            <div 
              onClick={() => setActiveTab("git-story")}
              className="bg-[#141228]/95 border-2 border-[#ff8906] p-3 sm:p-3.5 pixel-border-sm flex flex-col sm:flex-row items-center justify-between gap-3 cursor-pointer hover:bg-[#1c183d] transition-all group shadow-[0_0_18px_rgba(255,137,6,0.5),0_0_2px_#ff8906,3px_3px_0_#000]"
            >
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 bg-[#090814] border-2 border-[#ff8906] shadow-[0_0_10px_rgba(255,137,6,0.5)] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
                  🐱
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="font-pixel text-[8px] bg-[#ff8906] text-black px-1.5 py-0.5 border border-black font-bold shadow-[0_0_8px_rgba(255,137,6,0.5)]">
                      STORY MODE
                    </span>
                    <span className="font-pixel text-[9px] text-[#ffd166]">
                      Git &amp; GitHub with Doraemon Friends
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-[#a7a9be] mt-0.5">
                    Gian, Nobita &amp; Suneo navigate merge conflicts, staging carts &amp; PR reviews!
                  </p>
                </div>
              </div>

              <button className="px-3.5 py-1.5 bg-[#ffd166] text-black font-pixel text-[9px] uppercase pixel-btn shrink-0 group-hover:bg-[#fff] transition-colors font-bold shadow-[0_0_12px_rgba(255,209,102,0.6)]">
                PLAY STORY &gt;
              </button>
            </div>

            {/* CodeQuest Central Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left & Center Main Column: Course Tracks & Quests (8 Cols) */}
              <div className="lg:col-span-8 space-y-6">
                <JourneyTracks />
              </div>

              {/* Right Side Rail: Unified & Uncluttered Arcade Hub (4 Cols) */}
              <div className="lg:col-span-4 sticky top-20">
                <ArcadeHub />
              </div>
            </div>
          </div>
        )}

        {activeTab === "journey" && <JourneyView />}

        {activeTab === "terminal-lab" && <InteractiveLessonWorkspace />}

        {activeTab === "git-story" && <GitStoryViewer />}

        {activeTab === "profile" && <ProfileView />}
      </main>

      {/* Interactive Quest Modal */}
      <QuestModal />

      {/* Retro Arcade Footer */}
      <footer className="bg-[#090814] border-t-4 border-black py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="w-2 h-2 bg-[#06d6a0] rounded-full animate-ping" />
            <span className="font-pixel text-[10px] text-[#ffd166]">
              DEVF8RGE × HACKTOBERFEST 2026
            </span>
          </div>

          <div className="font-mono text-xs text-[#a7a9be]">
            CodeQuest · Built with 8-bit love for open-source learners · Hacktoberfest 2026
          </div>

          <div className="font-pixel text-[9px] text-[#ef476f] bg-[#141226] px-2.5 py-1 border border-[#ef476f] shadow-[0_0_10px_rgba(239,71,111,0.5),2px_2px_0_#000]">
            INSERT COIN [1P]
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function Home() {
  return (
    <GameProvider>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#0c0b1a]">
        {/* Living in-motion animated Codédex landscape backdrop */}
        <CodedexAnimatedBackground />

        {/* Foreground Content with crisp z-10 positioning */}
        <div className="relative z-10 flex-1 flex flex-col">
          <DashboardContent />
        </div>
      </div>
    </GameProvider>
  );
}
