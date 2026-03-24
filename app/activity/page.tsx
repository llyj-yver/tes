"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  CheckCircle2,
  FileText,
  Leaf,
  Star,
  Upload,
  BookOpen,
  Clock,
  Award,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Rubric Data — matches PDF exactly ───────────────────────────────────────
const rubricData = [
  {
    criteria: "Salad Components",
    points: 10,
    color: "from-emerald-500 to-green-600",
    bg: "from-emerald-50 to-green-50",
    border: "border-emerald-200",
    icon: "🥗",
    levels: [
      { label: "Excellent", score: 10, desc: "All 4 components (Base, Body, Garnish, Dressing) are clearly identified and appropriate for the salad type." },
      { label: "Good",      score: 8,  desc: "All 4 components are present, though one may be a weak fit for the salad type." },
      { label: "Fair",      score: 5,  desc: "1 component is missing or identified incorrectly." },
      { label: "Needs Improvement", score: 3, desc: "2 or more components are missing." },
    ],
  },
  {
    criteria: "Dressing Identification",
    points: 10,
    color: "from-lime-500 to-green-600",
    bg: "from-lime-50 to-green-50",
    border: "border-lime-200",
    icon: "🫙",
    levels: [
      { label: "Excellent", score: 10, desc: "Dressing is correctly identified by type (e.g., Vinaigrette, Emulsified, Creamy) with clear reasoning." },
      { label: "Good",      score: 8,  desc: "Dressing is identified by type, but the description of the type is vague." },
      { label: "Fair",      score: 5,  desc: "Dressing is named, but the category/type is missing." },
      { label: "Needs Improvement", score: 3, desc: "Dressing is not mentioned or incorrectly categorized." },
    ],
  },
  {
    criteria: "Preparation and Technique",
    points: 10,
    color: "from-yellow-500 to-amber-600",
    bg: "from-yellow-50 to-amber-50",
    border: "border-yellow-200",
    icon: "🔪",
    levels: [
      { label: "Excellent", score: 10, desc: "Vegetables and fruits are cut uniformly in size and shape." },
      { label: "Good",      score: 8,  desc: "Some vegetables and fruits are not cut uniformly in size and shape." },
      { label: "Fair",      score: 5,  desc: "Most vegetables and fruits are not cut uniformly in size and shape." },
      { label: "Needs Improvement", score: 3, desc: "All vegetables and fruits are not cut uniformly in size and shape." },
    ],
  },
  {
    criteria: "Quality of Ingredients",
    points: 10,
    color: "from-rose-500 to-pink-600",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-200",
    icon: "🌿",
    levels: [
      { label: "Excellent", score: 10, desc: "Ingredients are fresh, crisp, and properly balanced for enjoyable mouthfeel." },
      { label: "Good",      score: 8,  desc: "Mostly fresh with a good mix of textures; may have a minor flow issue." },
      { label: "Fair",      score: 5,  desc: "Acceptable textures though some ingredients may lack freshness or balanced flow." },
      { label: "Needs Improvement", score: 3, desc: "Mostly fresh with a good mix of textures; may have a minor issue." },
    ],
  },
  {
    criteria: "Presentation and Plating",
    points: 10,
    color: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    icon: "📸",
    levels: [
      { label: "Excellent", score: 10, desc: "Neat, attractive plating; clear photo; background removed." },
      { label: "Good",      score: 8,  desc: "Good presentation; minor issues in clarity or background." },
      { label: "Fair",      score: 5,  desc: "Acceptable but lacks neatness or photo clarity." },
      { label: "Needs Improvement", score: 3, desc: "Poor presentation; unclear photo; background not removed." },
    ],
  },
];

const totalPoints = rubricData.reduce((sum, r) => sum + r.points, 0); // 50

const instructionSteps = [
  {
    num: 1,
    icon: <Leaf className="w-5 h-5" />,
    title: "Choose Your Salad Type",
    desc: "Pick one from: Green, Vegetable, Fruit, Pasta, or Protein Salad.",
    color: "from-emerald-500 to-green-600",
  },
  {
    num: 2,
    icon: <CheckCircle2 className="w-5 h-5" />,
    title: "Include All Components",
    desc: "Your salad must have a Base, Body, Garnish, and Dressing (identify its type).",
    color: "from-lime-500 to-green-600",
  },
  {
    num: 3,
    icon: <Upload className="w-5 h-5" />,
    title: "Submission",
    desc: "Upload to the designated submission folder.",
    color: "from-violet-500 to-purple-600",
  },
];

// Score label colors
const scoreBadge: Record<string, string> = {
  "Excellent":         "bg-emerald-100 text-emerald-800 border-emerald-300",
  "Good":              "bg-lime-100 text-lime-800 border-lime-300",
  "Fair":              "bg-yellow-100 text-yellow-800 border-yellow-300",
  "Needs Improvement": "bg-rose-100 text-rose-800 border-rose-300",
};

const ActivityPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"instructions" | "rubric">("instructions");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">

      {/* ── Hero Header ── */}
      <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-green-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
          <button
            onClick={() => router.push("/navigation")}
            className="flex items-center gap-2 text-lime-200 hover:text-white transition-colors mb-6 group"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-semibold">Back to Course</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-lime-200 mb-4">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                Practical Activity
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
                <span className="bg-gradient-to-r from-yellow-200 via-lime-200 to-green-200 bg-clip-text text-transparent">
                  Create Your Salad
                </span>
                <br />
                <span className="text-white text-2xl md:text-3xl font-bold">
                  Practical Assessment
                </span>
              </h1>
              <p className="text-green-100 text-lg max-w-xl">
                Demonstrate your understanding of salad classification, components, and dressing preparation by creating and presenting a well-balanced salad.
              </p>
            </div>

            {/* Score chips */}
            <div className="flex flex-wrap gap-3 shrink-0">
              {[
                { icon: <Award className="w-5 h-5 text-yellow-300" />,  label: `${totalPoints} Points Total` },
                { icon: <BookOpen className="w-5 h-5 text-lime-300" />, label: `${rubricData.length} Criteria` },
                { icon: <Clock className="w-5 h-5 text-green-200" />,   label: "Submit on Time" },
              ].map((chip, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-full text-white font-semibold text-sm">
                  {chip.icon}
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex gap-2 bg-white border-2 border-green-200 rounded-2xl p-1.5 w-fit shadow-sm">
          {(["instructions", "rubric"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all capitalize ${
                activeTab === tab
                  ? "bg-gradient-to-r from-lime-400 to-green-500 text-green-900 shadow-md"
                  : "text-green-600 hover:text-green-800"
              }`}
            >
              {tab === "instructions" ? "📋 Instructions" : "📊 Rubric"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-6 py-8 pb-16">
        <AnimatePresence mode="wait">

          {/* INSTRUCTIONS TAB */}
          {activeTab === "instructions" && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Left: Steps */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-extrabold text-green-900 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-lime-500" />
                  Activity Instructions
                </h2>

                {instructionSteps.map((step, idx) => {
                  const isLast = idx === instructionSteps.length - 1;

                  const content = (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={`flex gap-4 bg-white rounded-2xl p-5 border-2 transition-all group ${
                        isLast
                          ? "border-lime-400 hover:border-lime-500 hover:shadow-lg cursor-pointer ring-2 ring-lime-100"
                          : "border-green-100 hover:border-green-300 hover:shadow-md"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-extrabold text-green-400 uppercase tracking-wider">Step {step.num}</span>
                          {isLast && (
                            <span className="text-xs font-extrabold text-lime-600 bg-lime-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Upload className="w-3 h-3" /> Click to Submit
                            </span>
                          )}
                        </div>
                        <h3 className="font-extrabold text-green-900 text-lg mb-1">{step.title}</h3>
                        <p className="text-green-700 leading-relaxed">{step.desc}</p>
                        {isLast && (
                          <div className="mt-3 flex items-center gap-2 text-lime-600 font-bold text-sm">
                            <Upload className="w-4 h-4" />
                            Open Submission Form →
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );

                  return isLast ? (
                    <a
                      key={idx}
                      href="https://drive.google.com/drive/folders/1IYZk7tWadQWqmGH2Ydd3BI7flwZGjivs?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {content}
                    </a>
                  ) : content;
                })}
              </div>

              {/* Right: Scoring Guide */}
              <div className="space-y-6 mt-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-3xl border-2 border-green-200 overflow-hidden shadow-sm"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-4">
                    <h3 className="text-green-900 font-extrabold text-lg flex items-center gap-2">
                      <Star className="w-5 h-5" /> Scoring Guide
                    </h3>
                  </div>
                  <div className="p-5 space-y-2">
                    {[
                      { range: "45–50", label: "Outstanding",        color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                      { range: "38–44", label: "Very Satisfactory",  color: "text-lime-700 bg-lime-50 border-lime-200" },
                      { range: "28–37", label: "Satisfactory",       color: "text-yellow-700 bg-yellow-50 border-yellow-200" },
                      { range: "Below 28", label: "Needs Improvement", color: "text-rose-700 bg-rose-50 border-rose-200" },
                    ].map((s, i) => (
                      <div key={i} className={`flex items-center justify-between p-3 rounded-xl border-2 ${s.color}`}>
                        <span className="font-extrabold text-sm">{s.range}</span>
                        <span className="font-semibold text-sm">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* RUBRIC TAB */}
          {activeTab === "rubric" && (
            <motion.div
              key="rubric"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-green-900 flex items-center gap-2">
                  <Award className="w-6 h-6 text-lime-500" />
                  Grading Rubric
                </h2>
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 to-lime-400 text-green-900 px-5 py-2.5 rounded-full font-extrabold text-sm shadow-md">
                  <Star className="w-4 h-4" />
                  Total: {totalPoints} Points
                </div>
              </div>

              {/* Points summary bar */}
              <div className="bg-white rounded-2xl border-2 border-green-200 p-5 mb-6 shadow-sm">
                <p className="text-green-700 font-semibold text-sm mb-3">Points Distribution</p>
                <div className="flex rounded-xl overflow-hidden h-6">
                  {rubricData.map((r, i) => (
                    <div
                      key={i}
                      className={`bg-gradient-to-r ${r.color} flex items-center justify-center text-white text-xs font-bold`}
                      style={{ width: `${(r.points / totalPoints) * 100}%` }}
                      title={`${r.criteria}: ${r.points}pts`}
                    >
                      {r.points}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-3">
                  {rubricData.map((r, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-green-700 font-semibold">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${r.color}`} />
                      {r.criteria} ({r.points}pts)
                    </div>
                  ))}
                </div>
              </div>

              {/* Rubric Table */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border-2 border-green-200 shadow-sm overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    {/* Table head */}
                    <thead>
                      <tr>
                        <th className="bg-gradient-to-br from-lime-600 to-green-700 text-white text-left px-5 py-4 font-extrabold text-sm w-44">
                          Criteria
                        </th>
                        {rubricData[0].levels.map((l) => (
                          <th
                            key={l.label}
                            className={`px-4 py-4 font-extrabold text-center text-xs uppercase tracking-wide border-l border-white/20 ${
                              l.label === "Excellent"
                                ? "bg-emerald-600 text-white"
                                : l.label === "Good"
                                ? "bg-lime-500 text-white"
                                : l.label === "Fair"
                                ? "bg-yellow-500 text-white"
                                : "bg-rose-500 text-white"
                            }`}
                          >
                            <div>{l.label}</div>
                            <div className="text-lg font-extrabold mt-0.5 opacity-90">({l.score})</div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {/* Table body */}
                    <tbody>
                      {rubricData.map((item, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-white" : "bg-green-50/60"}
                        >
                          {/* Criteria cell */}
                          <td className="px-5 py-4 border-t border-green-100 align-top">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{item.icon}</span>
                              <div>
                                <p className="font-extrabold text-green-900 leading-snug">{item.criteria}</p>
                                <span className={`inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                                  {item.points} pts
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Level cells */}
                          {item.levels.map((level, lIdx) => (
                            <td
                              key={lIdx}
                              className={`px-4 py-4 border-t border-l text-green-800 leading-relaxed align-top ${
                                lIdx === 0 ? "border-emerald-100 bg-emerald-50/40"
                                : lIdx === 1 ? "border-lime-100 bg-lime-50/40"
                                : lIdx === 2 ? "border-yellow-100 bg-yellow-50/40"
                                : "border-rose-100 bg-rose-50/40"
                              }`}
                            >
                              {level.desc}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>

                    {/* Total row */}
                    <tfoot>
                      <tr className="bg-gradient-to-r from-lime-50 to-green-50 border-t-2 border-green-200">
                        <td className="px-5 py-3 font-extrabold text-green-900">
                          Total
                        </td>
                        {rubricData[0].levels.map((l) => (
                          <td key={l.label} className="px-4 py-3 text-center border-l border-green-100">
                          </td>
                        ))}
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ActivityPage;