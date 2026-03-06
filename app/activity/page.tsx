
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  CheckCircle2,
  Camera,
  FileText,
  Leaf,
  Star,
  Upload,
  BookOpen,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Rubric Data ─────────────────────────────────────────────────────────────
const rubricData = [
  {
    criteria: "Salad Classification",
    points: 20,
    color: "from-emerald-500 to-green-600",
    bg: "from-emerald-50 to-green-50",
    border: "border-emerald-200",
    icon: "🥗",
    levels: [
      { label: "Excellent (4)", desc: "Correctly classified with clear justification" },
      { label: "Good (3)", desc: "Correctly classified but explanation is minimal" },
      { label: "Fair (2)", desc: "Classification is somewhat correct but unclear" },
      { label: "Needs Improvement (1)", desc: "Incorrect classification or no explanation" },
    ],
  },
  {
    criteria: "Completeness of Components",
    points: 25,
    color: "from-lime-500 to-green-600",
    bg: "from-lime-50 to-green-50",
    border: "border-lime-200",
    icon: "🧩",
    levels: [
      { label: "Excellent (4)", desc: "All components complete and properly identified" },
      { label: "Good (3)", desc: "All components present but not clearly identified" },
      { label: "Fair (2)", desc: "One component missing or incorrectly identified" },
      { label: "Needs Improvement (1)", desc: "Two or more components missing" },
    ],
  },
  {
    criteria: "Dressing Appropriateness",
    points: 15,
    color: "from-yellow-500 to-amber-600",
    bg: "from-yellow-50 to-amber-50",
    border: "border-yellow-200",
    icon: "🫙",
    levels: [
      { label: "Excellent (4)", desc: "Correctly identified and strongly complements the salad" },
      { label: "Good (3)", desc: "Appropriate but explanation is limited" },
      { label: "Fair (2)", desc: "Dressing somewhat matches the salad" },
      { label: "Needs Improvement (1)", desc: "Does not match or not identified" },
    ],
  },
  {
    criteria: "Presentation & Plating",
    points: 20,
    color: "from-rose-500 to-pink-600",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-200",
    icon: "📸",
    levels: [
      { label: "Excellent (4)", desc: "Neat, attractive plating; clear photo; background removed" },
      { label: "Good (3)", desc: "Good presentation; minor issues in clarity or background" },
      { label: "Fair (2)", desc: "Acceptable but lacks neatness or photo clarity" },
      { label: "Needs Improvement (1)", desc: "Poor presentation; unclear photo; background not removed" },
    ],
  },
  {
    criteria: "Written Explanation",
    points: 10,
    color: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    icon: "✍️",
    levels: [
      { label: "Excellent (4)", desc: "Complete, clear, 5–7 sentences with all required details" },
      { label: "Good (3)", desc: "Complete but lacks depth or clarity" },
      { label: "Fair (2)", desc: "Incomplete (missing one required detail)" },
      { label: "Needs Improvement (1)", desc: "Very minimal or unclear explanation" },
    ],
  },
  {
    criteria: "Timeliness",
    points: 10,
    color: "from-sky-500 to-blue-600",
    bg: "from-sky-50 to-blue-50",
    border: "border-sky-200",
    icon: "⏰",
    levels: [
      { label: "Excellent (4)", desc: "Submitted on or before deadline" },
      { label: "Good (3)", desc: "1 day late" },
      { label: "Fair (2)", desc: "2 days late" },
      { label: "Needs Improvement (1)", desc: "More than 2 days late or not submitted" },
    ],
  },
];

const saladTypes = [
  "Green Salad",
  "Vegetable Salad",
  "Fruit Salad",
  "Pasta Salad",
  "Protein Salad",
];

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
    icon: <Camera className="w-5 h-5" />,
    title: "Take a Clear Photo",
    desc: "Capture your finished salad. Remove the background so only the salad is visible.",
    color: "from-yellow-500 to-amber-500",
  },
  {
    num: 4,
    icon: <FileText className="w-5 h-5" />,
    title: "Write a Description",
    desc: "5–7 sentences covering the salad type, components, dressing choice, and nutritional value.",
    color: "from-rose-500 to-pink-500",
  },
  {
    num: 5,
    icon: <Upload className="w-5 h-5" />,
    title: "Submit Before Deadline",
    desc: "Upload to the designated submission folder before the deadline.",
    color: "from-violet-500 to-purple-600",
  },
];

// ── Component ────────────────────────────────────────────────────────────────
const ActivityPage = () => {
  const router = useRouter();
  const [expandedRubric, setExpandedRubric] = useState<number | null>(null);
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
              {/* Badge */}
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
                { icon: <Award className="w-5 h-5 text-yellow-300" />, label: "100 Points Total" },
                { icon: <BookOpen className="w-5 h-5 text-lime-300" />, label: "6 Criteria" },
                { icon: <Clock className="w-5 h-5 text-green-200" />, label: "Submit on Time" },
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

                {instructionSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex gap-4 bg-white rounded-2xl p-5 border-2 border-green-100 hover:border-green-300 hover:shadow-md transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-extrabold text-green-400 uppercase tracking-wider">Step {step.num}</span>
                      </div>
                      <h3 className="font-extrabold text-green-900 text-lg mb-1">{step.title}</h3>
                      <p className="text-green-700 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Alert box */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3 bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 mt-2"
                >
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-sm font-semibold leading-relaxed">
                    Make sure to remove the background from your photo so that only the salad or ingredients are visible before uploading.
                  </p>
                </motion.div>
              </div>

              {/* Right: Salad types + score guide */}
              <div className="space-y-6">
                {/* Salad Types Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-3xl border-2 border-green-200 overflow-hidden shadow-sm"
                >
                  <div className="bg-gradient-to-r from-lime-500 to-green-600 px-6 py-4">
                    <h3 className="text-white font-extrabold text-lg flex items-center gap-2">
                      <Leaf className="w-5 h-5" /> Choose a Salad Type
                    </h3>
                  </div>
                  <div className="p-5 space-y-2">
                    {saladTypes.map((type, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100 hover:border-green-300 transition-all">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-lime-400 to-green-500" />
                        <span className="font-semibold text-green-800">{type}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Required Components */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-3xl border-2 border-green-200 overflow-hidden shadow-sm"
                >
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4">
                    <h3 className="text-white font-extrabold text-lg flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Required Components
                    </h3>
                  </div>
                  <div className="p-5 space-y-2">
                    {[
                      { name: "Base", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
                      { name: "Body", color: "bg-amber-100 text-amber-700 border-amber-200" },
                      { name: "Garnish", color: "bg-rose-100 text-rose-700 border-rose-200" },
                      { name: "Dressing", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
                    ].map((comp, idx) => (
                      <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl border-2 ${comp.color}`}>
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span className="font-bold">{comp.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Scoring Guide */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-3xl border-2 border-green-200 overflow-hidden shadow-sm"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-4">
                    <h3 className="text-green-900 font-extrabold text-lg flex items-center gap-2">
                      <Star className="w-5 h-5" /> Scoring Guide
                    </h3>
                  </div>
                  <div className="p-5 space-y-2">
                    {[
                      { range: "90–100", label: "Outstanding", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                      { range: "80–89", label: "Very Satisfactory", color: "text-lime-700 bg-lime-50 border-lime-200" },
                      { range: "70–79", label: "Satisfactory", color: "text-yellow-700 bg-yellow-50 border-yellow-200" },
                      { range: "Below 70", label: "Needs Improvement", color: "text-rose-700 bg-rose-50 border-rose-200" },
                    ].map((s, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-3 rounded-xl border-2 ${s.color}`}>
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
                  Total: 100 Points
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
                      style={{ width: `${r.points}%` }}
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

              {/* Rubric cards */}
              <div className="space-y-4">
                {rubricData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    className={`bg-gradient-to-br ${item.bg} rounded-2xl border-2 ${item.border} overflow-hidden shadow-sm`}
                  >
                    {/* Header */}
                    <button
                      onClick={() => setExpandedRubric(expandedRubric === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left hover:brightness-95 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-md`}>
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-green-900 text-lg">{item.criteria}</h3>
                          <p className="text-green-600 text-sm font-semibold">{item.points} points</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`bg-gradient-to-r ${item.color} text-white px-4 py-1.5 rounded-full text-sm font-extrabold shadow`}>
                          /{item.points}
                        </div>
                        {expandedRubric === idx
                          ? <ChevronUp className="w-5 h-5 text-green-600" />
                          : <ChevronDown className="w-5 h-5 text-green-600" />
                        }
                      </div>
                    </button>

                    {/* Expanded levels */}
                    <AnimatePresence>
                      {expandedRubric === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 border-t-2 border-white/60 pt-4">
                            {item.levels.map((level, lIdx) => (
                              <div
                                key={lIdx}
                                className={`bg-white rounded-xl p-4 border-2 ${item.border} shadow-sm`}
                              >
                                <span className={`inline-block text-xs font-extrabold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                                  {level.label}
                                </span>
                                <p className="text-green-800 text-sm leading-relaxed">{level.desc}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ActivityPage;