"use client";

import { useState } from "react";
import Link from "next/link";
import PageBackground from "../components/PageBackground";

const userCoins = 1250;

const rewards = [
  { id: 1, name: "Mystery Box", cost: 500, icon: "🎁", description: "Random reward!", category: "mystery" },
  { id: 2, name: "XP Booster (2x)", cost: 300, icon: "⚡", description: "Double XP for 1 match", category: "booster" },
  { id: 3, name: "Streak Shield", cost: 400, icon: "🛡️", description: "Protect your streak once", category: "booster" },
  { id: 4, name: "Profile Frame", cost: 800, icon: "🖼️", description: "Gold champion frame", category: "cosmetic" },
  { id: 5, name: "Custom Badge", cost: 1000, icon: "🏅", description: "Unlock special badge", category: "cosmetic" },
  { id: 6, name: "Prediction Hint", cost: 200, icon: "💡", description: "AI-powered match insight", category: "booster" },
];

const achievements = [
  { id: 1, name: "First Blood", description: "Make your first prediction", progress: 1, total: 1, xp: 50, completed: true },
  { id: 2, name: "Streak Master", description: "Maintain a 7-day streak", progress: 7, total: 7, xp: 200, completed: true },
  { id: 3, name: "Prophet", description: "Win 10 predictions in a row", progress: 6, total: 10, xp: 500, completed: false },
  { id: 4, name: "Tournament King", description: "Predict all matches in a tournament", progress: 4, total: 15, xp: 1000, completed: false },
  { id: 5, name: "Social Butterfly", description: "Share 5 predictions", progress: 2, total: 5, xp: 150, completed: false },
];

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState<"shop" | "achievements">("shop");
  const [purchasedItem, setPurchasedItem] = useState<number | null>(null);

  const handlePurchase = (id: number, cost: number) => {
    if (userCoins >= cost) {
      setPurchasedItem(id);
      setTimeout(() => setPurchasedItem(null), 2000);
    }
  };

  return (
    <main className="min-h-screen pb-24 max-w-md mx-auto relative">
      <PageBackground image="rewards-bg.jpeg" />
      {/* Purchase Animation */}
      {purchasedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="text-center level-up">
            <div className="text-6xl mb-4">{rewards.find(r => r.id === purchasedItem)?.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">Reward Claimed!</h2>
            <p className="text-gray-400">Check your inventory</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong mx-4 mt-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-white text-xl">←</Link>
            <h1 className="text-lg font-bold text-white">Rewards</h1>
          </div>
          <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30">
            <span>🪙</span>
            <span className="text-yellow-400 font-bold">{userCoins}</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="mx-4 mt-4 flex gap-2">
        <button
          onClick={() => setActiveTab("shop")}
          className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
            activeTab === "shop"
              ? "gradient-gold text-black"
              : "glass text-gray-400"
          }`}
        >
          🛒 Shop
        </button>
        <button
          onClick={() => setActiveTab("achievements")}
          className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
            activeTab === "achievements"
              ? "gradient-purple text-white"
              : "glass text-gray-400"
          }`}
        >
          🏆 Achievements
        </button>
      </div>

      {activeTab === "shop" ? (
        <section className="mx-4 mt-6">
          <div className="grid grid-cols-2 gap-3">
            {rewards.map((reward) => (
              <div key={reward.id} className="glass-card p-4 flex flex-col">
                <div className="text-4xl mb-3 text-center">{reward.icon}</div>
                <h3 className="text-white font-semibold text-sm text-center">{reward.name}</h3>
                <p className="text-gray-500 text-xs text-center mt-1 flex-1">{reward.description}</p>
                <button
                  onClick={() => handlePurchase(reward.id, reward.cost)}
                  disabled={userCoins < reward.cost}
                  className={`mt-3 py-2 rounded-xl font-medium text-sm transition-all ${
                    userCoins >= reward.cost
                      ? "gradient-gold text-black hover:opacity-90"
                      : "bg-white/10 text-gray-500"
                  }`}
                >
                  🪙 {reward.cost}
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-4 mt-6 space-y-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`glass p-4 ${achievement.completed ? "border-green-500/30" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                  achievement.completed
                    ? "bg-green-500/20 border border-green-500/30"
                    : "bg-white/5 border border-white/10"
                }`}>
                  {achievement.completed ? "✓" : "🎯"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{achievement.name}</h3>
                    <span className="text-yellow-400 text-sm font-bold">+{achievement.xp} XP</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{achievement.description}</p>
                  {!achievement.completed && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{achievement.progress}/{achievement.total}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 glass-strong mb-4 w-[calc(100%-2rem)] max-w-md">
        <div className="flex items-center justify-around py-3">
          {[
            { id: "home", icon: "🏠", label: "Home", href: "/" },
            { id: "matches", icon: "🏏", label: "Matches", href: "/matches" },
            { id: "predict", icon: "🎯", label: "Predict", href: "/predict/1" },
            { id: "rewards", icon: "🎁", label: "Rewards", href: "/rewards", active: true },
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
