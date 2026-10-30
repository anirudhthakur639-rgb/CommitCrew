"use client";

import React from "react";
import { GameProvider, useGame } from "@/context/GameContext";
import { Navbar } from "@/components/Navbar";
import { HeroCabinet } from "@/components/HeroCabinet";
import { JourneyTracks } from "@/components/JourneyTracks";
import { DailyBounties } from "@/components/DailyBounties";
import { Leaderboard } from "@/components/Leaderboard";
import { BadgeCabinet } from "@/components/BadgeCabinet";
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

            {/* Featured Git Story Mode Banner */}
            <div 
              onClick={() => setActiveTab("git-story")}
              className="bg-gradient-to-r from-[#ff8906]/20 via-[#17152b] to-[#06d6a0]/20 pixel-border p-4 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:bg-[#201d3a] transition-all group"
            >
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-12 h-12 bg-[#090814] pixel-border-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shrink-0">
                  🐱
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="font-pixel text-[8px] bg-[#ff8906] text-black px-1.5 py-0.5 border border-black">
                      STORY MODE
                    </span>
                    <span className="font-pixel text-[9px] text-[#ffd166]">
                      GIT &amp; GITHUB WITH DORAEMON FRIENDS
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#fffffe]">
                    Watch Gian, Nobita &amp; Suneo navigate merge conflicts, staging carts &amp; pull requests in 6 interactive cutscenes!
                  </p>
                </div>
              </div>

              <button className="px-4 py-2 bg-[#ffd166] text-black font-pixel text-[10px] uppercase pixel-btn shrink-0 group-hover:bg-[#fff] transition-colors">
                PLAY STORY &gt;
              </button>
            </div>

            {/* Codédex Central Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left & Center Main Column: Course Tracks & Quests (8 Cols) */}
              <div className="lg:col-span-8 space-y-6">
                <JourneyTracks />
              </div>

              {/* Right Side Rail: Daily Tasks, Leaderboard, Badges (4 Cols) */}
              <div className="lg:col-span-4 space-y-6">
                <DailyBounties />
                <Leaderboard />
                <BadgeCabinet />
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

          <div className="font-pixel text-[9px] text-[#ef476f] bg-[#141226] px-2.5 py-1 border border-black">
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
