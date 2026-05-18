"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PageBackground from "../../components/PageBackground";

const matchData = {
  id: 1,
  team1: { code: "IND", flag: "🇮🇳", name: "India", odds: 1.8 },
  team2: { code: "AUS", flag: "🇦🇺", name: "Australia", odds: 2.1 },
  time: "Today, 7:30 PM",
  venue: "Narendra Modi Stadium, Ahmedabad",
  tournament: "ICC Champions Trophy 2025",
  xpBonus: 50,
  predictions: {
    team1: 65,
    team2: 35,
  },
};

const predictionTypes = [
  { id: "winner", title: "Match Winner", xp: 50, icon: "🏆" },
  { id: "toss", title: "Toss Winner", xp: 20, icon: "🪙" },
  { id: "motm", title: "Man of the Match", xp: 75, icon: "⭐" },
  { id: "top_scorer", title: "Top Scorer", xp: 60, icon: "🏏" },
  { id: "total_runs", title: "Total Runs Range", xp: 40, icon: "📊" },
  { id: "first_wicket", title: "First Wicket Over", xp: 35, icon: "🎯" },
];

const players = {
  IND: ["Rohit Sharma", "Virat Kohli", "Shubman Gill", "KL Rahul", "Hardik Pandya"],
  AUS: ["Pat Cummins", "Steve Smith", "Travis Head", "Mitchell Starc", "Glenn Maxwell"],
};

const runRanges = ["Under 300", "300-325", "326-350", "351-375", "Above 375"];

export default function PredictPage() {
  const params = useParams();
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [winnerPick, setWinnerPick] = useState<string | null>(null);
  const [tossPick, setTossPick] = useState<string | null>(null);
  const [motmPick, setMotmPick] = useState<string | null>(null);
  const [runRange, setRunRange] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const totalXP = (winnerPick ? 50 : 0) + (tossPick ? 20 : 0) + (motmPick ? 75 : 0) + (runRange ? 40 : 0);

  return (
    <main className="min-h-screen pb-24 max-w-md mx-auto relative">
      <PageBackground image="prediction-bg.jpeg" />
      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="text-center level-up">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-white mb-2">Predictions Locked!</h2>
            <p className="text-yellow-400 font-bold text-xl">+{totalXP} XP Potential</p>
            <p className="text-gray-400 text-sm mt-2">Good luck!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 glass-strong mx-4 mt-4 p-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white text-xl">←</Link>
          <div>
            <h1 className="text-lg font-bold text-white">Make Predictions</h1>
            <p className="text-xs text-gray-500">{matchData.tournament}</p>
          </div>
        </div>
      </header>

      {/* Match Card */}
      <div className="mx-4 mt-4 glass-card p-6">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <span className="text-5xl block mb-2">{matchData.team1.flag}</span>
            <p className="text-white font-bold">{matchData.team1.name}</p>
            <p className="text-xs text-gray-500 mt-1">{matchData.predictions.team1}% picked</p>
          </div>
          <div className="text-center px-4">
            <p className="text-gray-500 text-xl">vs</p>
          </div>
          <div className="text-center flex-1">
            <span className="text-5xl block mb-2">{matchData.team2.flag}</span>
            <p className="text-white font-bold">{matchData.team2.name}</p>
            <p className="text-xs text-gray-500 mt-1">{matchData.predictions.team2}% picked</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">{matchData.time}</p>
          <p className="text-gray-600 text-xs mt-1">{matchData.venue}</p>
        </div>
      </div>

      {/* Prediction Sections */}
      <div className="mx-4 mt-6 space-y-4">
        {/* Match Winner */}
        <div className="glass p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <span className="text-white font-semibold">Match Winner</span>
            </div>
            <span className="text-yellow-400 text-sm font-bold">+50 XP</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[matchData.team1, matchData.team2].map((team) => (
              <button
                key={team.code}
                onClick={() => !submitted && setWinnerPick(team.code)}
                disabled={submitted}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  winnerPick === team.code
                    ? "border-yellow-500 bg-yellow-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                } ${submitted ? "opacity-60" : ""}`}
              >
                <span className="text-3xl block mb-2">{team.flag}</span>
                <p className="text-white font-medium">{team.code}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Toss Winner */}
        <div className="glass p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🪙</span>
              <span className="text-white font-semibold">Toss Winner</span>
            </div>
            <span className="text-yellow-400 text-sm font-bold">+20 XP</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[matchData.team1, matchData.team2].map((team) => (
              <button
                key={team.code}
                onClick={() => !submitted && setTossPick(team.code)}
                disabled={submitted}
                className={`p-3 rounded-xl border-2 transition-all ${
                  tossPick === team.code
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                } ${submitted ? "opacity-60" : ""}`}
              >
                <span className="text-2xl">{team.flag}</span>
                <span className="text-white font-medium ml-2">{team.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Man of the Match */}
        <div className="glass p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <span className="text-white font-semibold">Man of the Match</span>
            </div>
            <span className="text-yellow-400 text-sm font-bold">+75 XP</span>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 mb-2">India</p>
            <div className="flex flex-wrap gap-2">
              {players.IND.map((player) => (
                <button
                  key={player}
                  onClick={() => !submitted && setMotmPick(player)}
                  disabled={submitted}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    motmPick === player
                      ? "bg-purple-500 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  } ${submitted ? "opacity-60" : ""}`}
                >
                  {player}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-2 mt-3">Australia</p>
            <div className="flex flex-wrap gap-2">
              {players.AUS.map((player) => (
                <button
                  key={player}
                  onClick={() => !submitted && setMotmPick(player)}
                  disabled={submitted}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    motmPick === player
                      ? "bg-purple-500 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  } ${submitted ? "opacity-60" : ""}`}
                >
                  {player}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Total Runs */}
        <div className="glass p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <span className="text-white font-semibold">Total Match Runs</span>
            </div>
            <span className="text-yellow-400 text-sm font-bold">+40 XP</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {runRanges.map((range) => (
              <button
                key={range}
                onClick={() => !submitted && setRunRange(range)}
                disabled={submitted}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  runRange === range
                    ? "bg-green-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                } ${submitted ? "opacity-60" : ""}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-strong max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-sm">Potential Earnings</span>
          <span className="text-yellow-400 font-bold text-lg">+{totalXP} XP</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitted || (!winnerPick && !tossPick && !motmPick && !runRange)}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            submitted
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : totalXP > 0
              ? "gradient-gold text-black hover:opacity-90"
              : "bg-white/10 text-gray-500"
          }`}
        >
          {submitted ? "✓ Predictions Locked" : "Lock Predictions"}
        </button>
      </div>
    </main>
  );
}
