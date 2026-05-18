"use client";

import { useState } from "react";
import Link from "next/link";
import PageBackground from "./components/PageBackground";

// Mock user data
const userData = {
  name: "Amit",
  level: 12,
  xp: 2450,
  xpToNext: 3000,
  streak: 7,
  coins: 1250,
  rank: 42,
  badges: ["first_prediction", "streak_master", "tournament_fan"],
};

// Mock matches
const upcomingMatches = [
  { id: 1, team1: "IND", team1Flag: "🇮🇳", team2: "AUS", team2Flag: "🇦🇺", time: "Today, 7:30 PM", tournament: "ICC Champions Trophy", xpBonus: 50 },
  { id: 2, team1: "ENG", team1Flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", team2: "PAK", team2Flag: "🇵🇰", time: "Tomorrow, 2:30 PM", tournament: "ICC Champions Trophy", xpBonus: 40 },
  { id: 3, team1: "SA", team1Flag: "🇿🇦", team2: "NZ", team2Flag: "🇳🇿", time: "May 20, 7:30 PM", tournament: "ICC Champions Trophy", xpBonus: 35 },
];

// Daily challenges
const dailyChallenges = [
  { id: 1, title: "Make 3 Predictions", progress: 2, total: 3, xp: 100, icon: "🎯" },
  { id: 2, title: "Win 2 Head-to-Head", progress: 1, total: 2, xp: 150, icon: "⚔️" },
  { id: 3, title: "Share a Prediction", progress: 0, total: 1, xp: 50, icon: "📤" },
];

// Leaderboard
const leaderboard = [
  { rank: 1, name: "CricketKing", xp: 15200, avatar: "👑" },
  { rank: 2, name: "Rohit_Fan_47", xp: 14800, avatar: "🔥" },
  { rank: 3, name: "ViratArmy", xp: 14200, avatar: "💪" },
  { rank: 42, name: "You", xp: 2450, avatar: "😎", isUser: true },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <main className="min-h-screen pb-20 max-w-md mx-auto relative">
      <PageBackground image="hero-bg.jpeg" />
      {/* Header with XP bar */}
      <header className="sticky top-0 z-50 glass-strong mx-4 mt-4 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center text-xl font-bold text-black">
              {userData.level}
            </div>
            <div>
              <p className="text-white font-semibold">{userData.name}</p>
              <p className="text-xs text-gray-400">Level {userData.level} • Rank #{userData.rank}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30">
              <span className="streak-flame">🔥</span>
              <span className="text-orange-400 font-bold text-sm">{userData.streak}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30">
              <span>🪙</span>
              <span className="text-yellow-400 font-bold text-sm">{userData.coins}</span>
            </div>
          </div>
        </div>
        <div className="xp-bar h-2">
          <div className="xp-fill h-full" style={{ width: `${(userData.xp / userData.xpToNext) * 100}%` }} />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">{userData.xp} / {userData.xpToNext} XP</p>
      </header>

      {/* Daily Streak Banner */}
      <div className="mx-4 mt-4 p-4 glass-card bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-orange-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-400 font-semibold flex items-center gap-2">
              <span className="text-2xl streak-flame">🔥</span>
              {userData.streak} Day Streak!
            </p>
            <p className="text-xs text-gray-400 mt-1">Keep it going for bonus XP</p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div
                key={day}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  day <= userData.streak
                    ? "bg-orange-500 text-white"
                    : "bg-white/5 text-gray-600"
                }`}
              >
                {day <= userData.streak ? "✓" : day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Challenges */}
      <section className="mx-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">Daily Challenges</h2>
          <span className="text-xs text-gray-500">Resets in 8h</span>
        </div>
        <div className="space-y-3">
          {dailyChallenges.map((challenge) => (
            <div key={challenge.id} className="glass p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl">
                {challenge.icon}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{challenge.title}</p>
                <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{challenge.progress}/{challenge.total}</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-bold text-sm">+{challenge.xp} XP</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="mx-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">Predict & Win</h2>
          <Link href="/matches" className="text-xs text-blue-400">See all →</Link>
        </div>
        <div className="space-y-3">
          {upcomingMatches.map((match) => (
            <Link key={match.id} href={`/predict/${match.id}`}>
              <div className="glass-card p-4 hover:border-yellow-500/30 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">{match.tournament}</span>
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-medium">
                    +{match.xpBonus} XP
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{match.team1Flag}</span>
                    <span className="text-white font-bold">{match.team1}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">vs</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold">{match.team2}</span>
                    <span className="text-3xl">{match.team2Flag}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{match.time}</span>
                  <span className="text-xs text-blue-400 font-medium">Make Prediction →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="mx-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">Leaderboard</h2>
          <Link href="/leaderboard" className="text-xs text-blue-400">Full board →</Link>
        </div>
        <div className="glass-card p-4">
          {leaderboard.map((player, i) => (
            <div
              key={player.rank}
              className={`flex items-center gap-3 py-3 ${
                i < leaderboard.length - 1 ? "border-b border-white/5" : ""
              } ${player.isUser ? "bg-blue-500/10 -mx-4 px-4 rounded-xl" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                player.rank === 1 ? "bg-yellow-500 text-black" :
                player.rank === 2 ? "bg-gray-400 text-black" :
                player.rank === 3 ? "bg-orange-600 text-white" :
                "bg-white/10 text-gray-400"
              }`}>
                {player.rank}
              </div>
              <span className="text-xl">{player.avatar}</span>
              <div className="flex-1">
                <p className={`font-medium ${player.isUser ? "text-blue-400" : "text-white"}`}>{player.name}</p>
              </div>
              <p className="text-yellow-400 font-bold text-sm">{player.xp.toLocaleString()} XP</p>
            </div>
          ))}
        </div>
      </section>

      {/* Badges Section */}
      <section className="mx-4 mt-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">Your Badges</h2>
          <Link href="/badges" className="text-xs text-blue-400">View all →</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { id: "first_prediction", icon: "🎯", name: "First Prediction", color: "blue" },
            { id: "streak_master", icon: "🔥", name: "7 Day Streak", color: "orange" },
            { id: "tournament_fan", icon: "🏆", name: "Tournament Fan", color: "yellow" },
            { id: "locked", icon: "🔒", name: "???", color: "gray", locked: true },
            { id: "locked2", icon: "🔒", name: "???", color: "gray", locked: true },
          ].map((badge) => (
            <div
              key={badge.id}
              className={`flex-shrink-0 w-20 p-3 rounded-2xl text-center ${
                badge.locked
                  ? "bg-white/5 border border-white/5"
                  : `bg-${badge.color}-500/10 border border-${badge.color}-500/20`
              }`}
            >
              <div className={`text-3xl mb-1 ${badge.locked ? "opacity-30" : ""}`}>{badge.icon}</div>
              <p className={`text-[10px] ${badge.locked ? "text-gray-600" : "text-gray-400"}`}>{badge.name}</p>
            </div>
          ))}
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
              className={`flex flex-col items-center gap-1 px-4 py-1 ${
                activeTab === item.id ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`text-[10px] ${activeTab === item.id ? "text-yellow-400" : "text-gray-500"}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}
