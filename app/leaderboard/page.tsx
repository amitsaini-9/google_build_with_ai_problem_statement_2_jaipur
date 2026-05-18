"use client";

import { useState } from "react";
import Link from "next/link";
import PageBackground from "../components/PageBackground";

const leaderboardData = [
  { rank: 1, name: "CricketKing", xp: 15200, streak: 21, predictions: 89, accuracy: 72, avatar: "👑", change: 0 },
  { rank: 2, name: "Rohit_Fan_47", xp: 14800, streak: 18, predictions: 76, accuracy: 68, avatar: "🔥", change: 1 },
  { rank: 3, name: "ViratArmy", xp: 14200, streak: 15, predictions: 82, accuracy: 65, avatar: "💪", change: -1 },
  { rank: 4, name: "BleedBlue", xp: 13500, streak: 12, predictions: 71, accuracy: 63, avatar: "🇮🇳", change: 2 },
  { rank: 5, name: "SixerKing", xp: 12800, streak: 10, predictions: 68, accuracy: 61, avatar: "💥", change: 0 },
  { rank: 6, name: "Dhoni_Forever", xp: 12100, streak: 14, predictions: 65, accuracy: 59, avatar: "🦁", change: -2 },
  { rank: 7, name: "BumrahFan", xp: 11500, streak: 8, predictions: 62, accuracy: 58, avatar: "🎯", change: 1 },
  { rank: 8, name: "CricketNerd", xp: 10800, streak: 9, predictions: 58, accuracy: 56, avatar: "🤓", change: -1 },
  { rank: 9, name: "MatchPredictor", xp: 10200, streak: 7, predictions: 55, accuracy: 55, avatar: "🔮", change: 3 },
  { rank: 10, name: "SportsGuru", xp: 9800, streak: 6, predictions: 52, accuracy: 54, avatar: "🧙", change: 0 },
  { rank: 42, name: "You", xp: 2450, streak: 7, predictions: 18, accuracy: 61, avatar: "😎", change: 5, isUser: true },
];

type TimeFilter = "daily" | "weekly" | "allTime";

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("weekly");

  return (
    <main className="min-h-screen pb-24 max-w-md mx-auto relative">
      <PageBackground image="leaderboard-bg.jpeg" />
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong mx-4 mt-4 p-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white text-xl">←</Link>
          <h1 className="text-lg font-bold text-white">Leaderboard</h1>
        </div>
      </header>

      {/* Time Filter */}
      <div className="mx-4 mt-4 flex gap-2">
        {[
          { id: "daily", label: "Today" },
          { id: "weekly", label: "This Week" },
          { id: "allTime", label: "All Time" },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setTimeFilter(filter.id as TimeFilter)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              timeFilter === filter.id
                ? "gradient-gold text-black"
                : "glass text-gray-400"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="mx-4 mt-6 flex items-end justify-center gap-4">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-400/20 border-2 border-gray-400 flex items-center justify-center text-3xl mb-2">
            {leaderboardData[1].avatar}
          </div>
          <p className="text-white text-sm font-medium truncate max-w-[80px]">{leaderboardData[1].name}</p>
          <p className="text-yellow-400 text-xs font-bold">{leaderboardData[1].xp.toLocaleString()}</p>
          <div className="mt-2 w-20 h-16 rounded-t-xl bg-gray-400/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-400">2</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center text-4xl mb-2 pulse-glow">
            {leaderboardData[0].avatar}
          </div>
          <p className="text-white font-semibold truncate max-w-[80px]">{leaderboardData[0].name}</p>
          <p className="text-yellow-400 text-sm font-bold">{leaderboardData[0].xp.toLocaleString()}</p>
          <div className="mt-2 w-24 h-24 rounded-t-xl gradient-gold flex items-center justify-center">
            <span className="text-3xl font-bold text-black">1</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-orange-600/20 border-2 border-orange-600 flex items-center justify-center text-3xl mb-2">
            {leaderboardData[2].avatar}
          </div>
          <p className="text-white text-sm font-medium truncate max-w-[80px]">{leaderboardData[2].name}</p>
          <p className="text-yellow-400 text-xs font-bold">{leaderboardData[2].xp.toLocaleString()}</p>
          <div className="mt-2 w-20 h-12 rounded-t-xl bg-orange-600/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-orange-500">3</span>
          </div>
        </div>
      </div>

      {/* Full List */}
      <section className="mx-4 mt-6">
        <div className="glass-card p-4">
          {leaderboardData.slice(3).map((player, i) => (
            <div
              key={player.rank}
              className={`flex items-center gap-3 py-3 ${
                i < leaderboardData.length - 4 ? "border-b border-white/5" : ""
              } ${player.isUser ? "bg-blue-500/10 -mx-4 px-4 rounded-xl" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                player.isUser ? "bg-blue-500 text-white" : "bg-white/10 text-gray-400"
              }`}>
                {player.rank}
              </div>
              <span className="text-xl">{player.avatar}</span>
              <div className="flex-1">
                <p className={`font-medium ${player.isUser ? "text-blue-400" : "text-white"}`}>
                  {player.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>🔥 {player.streak}</span>
                  <span>•</span>
                  <span>{player.accuracy}% acc</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-bold text-sm">{player.xp.toLocaleString()}</p>
                <p className={`text-xs ${
                  player.change > 0 ? "text-green-400" : player.change < 0 ? "text-red-400" : "text-gray-500"
                }`}>
                  {player.change > 0 ? `↑${player.change}` : player.change < 0 ? `↓${Math.abs(player.change)}` : "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Your Stats */}
      <section className="mx-4 mt-6">
        <h2 className="text-lg font-bold text-white mb-3">Your Stats</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold text-white">18</p>
            <p className="text-xs text-gray-500">Predictions</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold text-green-400">61%</p>
            <p className="text-xs text-gray-500">Accuracy</p>
          </div>
          <div className="glass p-4 text-center">
            <p className="text-2xl font-bold text-orange-400">7</p>
            <p className="text-xs text-gray-500">Day Streak</p>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 glass-strong mb-4 w-[calc(100%-2rem)] max-w-md">
        <div className="flex items-center justify-around py-3">
          {[
            { id: "home", icon: "🏠", label: "Home", href: "/" },
            { id: "matches", icon: "🏏", label: "Matches", href: "/matches" },
            { id: "predict", icon: "🎯", label: "Predict", href: "/predict/1" },
            { id: "rewards", icon: "🎁", label: "Rewards", href: "/rewards" },
            { id: "profile", icon: "👤", label: "Profile", href: "/profile" },
          ].map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center gap-1 px-4 py-1"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] text-gray-500">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
