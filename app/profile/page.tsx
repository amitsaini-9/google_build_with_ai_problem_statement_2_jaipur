"use client";

import { useState } from "react";
import Link from "next/link";
import PageBackground from "../components/PageBackground";

const userData = {
  name: "Amit",
  username: "@amit_cricket",
  level: 12,
  xp: 2450,
  xpToNext: 3000,
  rank: 42,
  coins: 1250,
  streak: 7,
  maxStreak: 14,
  joinDate: "March 2025",
  totalPredictions: 86,
  correctPredictions: 52,
  accuracy: 61,
  badges: [
    { id: "first_win", icon: "🎯", name: "First Win", date: "Mar 15" },
    { id: "streak_7", icon: "🔥", name: "Week Warrior", date: "Mar 20" },
    { id: "tournament", icon: "🏆", name: "Tournament Fan", date: "Apr 1" },
    { id: "social", icon: "📤", name: "Social Star", date: "Apr 5" },
  ],
  recentActivity: [
    { type: "prediction", result: "win", match: "IND vs PAK", xp: 50, time: "2h ago" },
    { type: "prediction", result: "loss", match: "ENG vs AUS", xp: 0, time: "1d ago" },
    { type: "achievement", name: "Week Warrior", xp: 200, time: "2d ago" },
    { type: "prediction", result: "win", match: "SA vs NZ", xp: 75, time: "3d ago" },
  ],
};

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<"stats" | "badges" | "history">("stats");

  return (
    <main className="min-h-screen pb-24 max-w-md mx-auto relative">
      <PageBackground image="profile-bg.jpeg" />
      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong mx-4 mt-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white text-xl">←</Link>
            <h1 className="text-lg font-bold text-white">Profile</h1>
          </div>
          <button className="text-gray-400 hover:text-white">⚙️</button>
        </div>
      </header>

      {/* Profile Card */}
      <div className="mx-4 mt-4 glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center text-3xl font-bold text-black">
              {userData.level}
            </div>
            <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-purple-500 text-white text-xs font-bold">
              #{userData.rank}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{userData.name}</h2>
            <p className="text-gray-500 text-sm">{userData.username}</p>
            <p className="text-gray-600 text-xs mt-1">Joined {userData.joinDate}</p>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-400">Level {userData.level}</span>
            <span className="text-gray-400">Level {userData.level + 1}</span>
          </div>
          <div className="xp-bar h-3">
            <div className="xp-fill h-full" style={{ width: `${(userData.xp / userData.xpToNext) * 100}%` }} />
          </div>
          <p className="text-xs text-center text-gray-500 mt-1">{userData.xp} / {userData.xpToNext} XP</p>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="streak-flame">🔥</span>
              <span className="text-xl font-bold text-orange-400">{userData.streak}</span>
            </div>
            <p className="text-xs text-gray-500">Streak</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span>🪙</span>
              <span className="text-xl font-bold text-yellow-400">{userData.coins}</span>
            </div>
            <p className="text-xs text-gray-500">Coins</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span>🎯</span>
              <span className="text-xl font-bold text-green-400">{userData.accuracy}%</span>
            </div>
            <p className="text-xs text-gray-500">Accuracy</p>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="mx-4 mt-6 flex gap-2">
        {[
          { id: "stats", label: "Stats", icon: "📊" },
          { id: "badges", label: "Badges", icon: "🏅" },
          { id: "history", label: "History", icon: "📜" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as typeof activeSection)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              activeSection === tab.id
                ? "gradient-purple text-white"
                : "glass text-gray-400"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <section className="mx-4 mt-4">
        {activeSection === "stats" && (
          <div className="space-y-3">
            <div className="glass p-4">
              <h3 className="text-white font-semibold mb-3">Prediction Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">{userData.totalPredictions}</p>
                  <p className="text-xs text-gray-500">Total Predictions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{userData.correctPredictions}</p>
                  <p className="text-xs text-gray-500">Correct</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-400">{userData.maxStreak}</p>
                  <p className="text-xs text-gray-500">Best Streak</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-400">3</p>
                  <p className="text-xs text-gray-500">Tournaments</p>
                </div>
              </div>
            </div>

            <div className="glass p-4">
              <h3 className="text-white font-semibold mb-3">Favorite Teams</h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <span className="text-xl">🇮🇳</span>
                  <span className="text-white text-sm">India</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xl">🇦🇺</span>
                  <span className="text-gray-400 text-sm">Australia</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "badges" && (
          <div className="grid grid-cols-2 gap-3">
            {userData.badges.map((badge) => (
              <div key={badge.id} className="glass-card p-4 text-center">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="text-white font-medium text-sm">{badge.name}</p>
                <p className="text-gray-500 text-xs mt-1">{badge.date}</p>
              </div>
            ))}
            {[1, 2, 3, 4].map((i) => (
              <div key={`locked-${i}`} className="glass p-4 text-center opacity-50">
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-gray-500 font-medium text-sm">???</p>
                <p className="text-gray-600 text-xs mt-1">Keep playing!</p>
              </div>
            ))}
          </div>
        )}

        {activeSection === "history" && (
          <div className="space-y-3">
            {userData.recentActivity.map((activity, i) => (
              <div key={i} className="glass p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                  activity.type === "achievement"
                    ? "bg-purple-500/20"
                    : activity.result === "win"
                    ? "bg-green-500/20"
                    : "bg-red-500/20"
                }`}>
                  {activity.type === "achievement" ? "🏆" : activity.result === "win" ? "✓" : "✗"}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">
                    {activity.type === "achievement" ? activity.name : activity.match}
                  </p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
                {activity.xp > 0 && (
                  <span className="text-yellow-400 font-bold text-sm">+{activity.xp} XP</span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 glass-strong mb-4 w-[calc(100%-2rem)] max-w-md">
        <div className="flex items-center justify-around py-3">
          {[
            { id: "home", icon: "🏠", label: "Home", href: "/" },
            { id: "matches", icon: "🏏", label: "Matches", href: "/matches" },
            { id: "predict", icon: "🎯", label: "Predict", href: "/predict/1" },
            { id: "rewards", icon: "🎁", label: "Rewards", href: "/rewards" },
            { id: "profile", icon: "👤", label: "Profile", href: "/profile", active: true },
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
