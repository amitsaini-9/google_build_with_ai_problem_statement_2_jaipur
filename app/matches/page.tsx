"use client";

import { useState } from "react";
import Link from "next/link";
import PageBackground from "../components/PageBackground";

const allMatches = [
  { id: 1, team1: "IND", team1Flag: "🇮🇳", team2: "AUS", team2Flag: "🇦🇺", time: "Today, 7:30 PM", tournament: "ICC Champions Trophy", xpBonus: 50, status: "upcoming" },
  { id: 2, team1: "ENG", team1Flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", team2: "PAK", team2Flag: "🇵🇰", time: "Tomorrow, 2:30 PM", tournament: "ICC Champions Trophy", xpBonus: 40, status: "upcoming" },
  { id: 3, team1: "SA", team1Flag: "🇿🇦", team2: "NZ", team2Flag: "🇳🇿", time: "May 20, 7:30 PM", tournament: "ICC Champions Trophy", xpBonus: 35, status: "upcoming" },
  { id: 4, team1: "BAN", team1Flag: "🇧🇩", team2: "AFG", team2Flag: "🇦🇫", time: "May 21, 2:30 PM", tournament: "ICC Champions Trophy", xpBonus: 30, status: "upcoming" },
  { id: 5, team1: "SL", team1Flag: "🇱🇰", team2: "WI", team2Flag: "🌴", time: "May 22, 7:30 PM", tournament: "ICC Champions Trophy", xpBonus: 30, status: "upcoming" },
  { id: 6, team1: "IND", team1Flag: "🇮🇳", team2: "PAK", team2Flag: "🇵🇰", time: "May 15", score1: "287/6", score2: "281/9", result: "IND won by 6 runs", status: "completed", predicted: true, won: true },
  { id: 7, team1: "ENG", team1Flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", team2: "AUS", team2Flag: "🇦🇺", time: "May 14", score1: "312/7", score2: "315/4", result: "AUS won by 6 wickets", status: "completed", predicted: true, won: false },
  { id: 8, team1: "SA", team1Flag: "🇿🇦", team2: "BAN", team2Flag: "🇧🇩", time: "May 13", score1: "298/5", score2: "245/10", result: "SA won by 53 runs", status: "completed", predicted: false },
];

type TabType = "upcoming" | "completed";

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");

  const filteredMatches = allMatches.filter(m => m.status === activeTab);

  return (
    <main className="min-h-screen pb-24 max-w-md mx-auto relative">
      <PageBackground image="match-bg.jpeg" />
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong mx-4 mt-4 p-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white text-xl">←</Link>
          <div>
            <h1 className="text-lg font-bold text-white">Matches</h1>
            <p className="text-xs text-gray-500">ICC Champions Trophy 2025</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="mx-4 mt-4 flex gap-2">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
            activeTab === "upcoming"
              ? "gradient-gold text-black"
              : "glass text-gray-400"
          }`}
        >
          Upcoming ({allMatches.filter(m => m.status === "upcoming").length})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
            activeTab === "completed"
              ? "gradient-purple text-white"
              : "glass text-gray-400"
          }`}
        >
          Completed ({allMatches.filter(m => m.status === "completed").length})
        </button>
      </div>

      {/* Match List */}
      <section className="mx-4 mt-6 space-y-3">
        {filteredMatches.map((match) => (
          <Link key={match.id} href={match.status === "upcoming" ? `/predict/${match.id}` : "#"}>
            <div className={`glass-card p-4 transition-all ${match.status === "upcoming" ? "hover:border-yellow-500/30 cursor-pointer" : ""}`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{match.tournament}</span>
                {match.status === "upcoming" ? (
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-medium">
                    +{match.xpBonus} XP
                  </span>
                ) : match.predicted ? (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    match.won
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}>
                    {match.won ? "✓ Won" : "✗ Lost"}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-500 text-[10px] font-medium">
                    Not Predicted
                  </span>
                )}
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{match.team1Flag}</span>
                  <div>
                    <span className="text-white font-bold">{match.team1}</span>
                    {match.score1 && <p className="text-xs text-gray-400">{match.score1}</p>}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">vs</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-white font-bold">{match.team2}</span>
                    {match.score2 && <p className="text-xs text-gray-400">{match.score2}</p>}
                  </div>
                  <span className="text-3xl">{match.team2Flag}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-400">{match.time}</span>
                {match.status === "upcoming" ? (
                  <span className="text-xs text-blue-400 font-medium">Make Prediction →</span>
                ) : (
                  <span className="text-xs text-gray-500">{match.result}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Tournament Stats */}
      {activeTab === "completed" && (
        <section className="mx-4 mt-6">
          <h2 className="text-lg font-bold text-white mb-3">Your Tournament Stats</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="glass p-4 text-center">
              <p className="text-2xl font-bold text-white">2/3</p>
              <p className="text-xs text-gray-500">Predicted</p>
            </div>
            <div className="glass p-4 text-center">
              <p className="text-2xl font-bold text-green-400">1</p>
              <p className="text-xs text-gray-500">Won</p>
            </div>
            <div className="glass p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">50</p>
              <p className="text-xs text-gray-500">XP Earned</p>
            </div>
          </div>
        </section>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 glass-strong mb-4 w-[calc(100%-2rem)] max-w-md">
        <div className="flex items-center justify-around py-3">
          {[
            { id: "home", icon: "🏠", label: "Home", href: "/" },
            { id: "matches", icon: "🏏", label: "Matches", href: "/matches", active: true },
            { id: "predict", icon: "🎯", label: "Predict", href: "/predict/1" },
            { id: "rewards", icon: "🎁", label: "Rewards", href: "/rewards" },
            { id: "profile", icon: "👤", label: "Profile", href: "/profile" },
          ].map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-1 ${item.active ? "tab-active" : ""}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`text-[10px] ${item.active ? "text-yellow-400" : "text-gray-500"}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
