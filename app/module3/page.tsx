"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Award, BookOpen, ChevronRight } from "lucide-react";

interface Step {
  title: string;
  description: string;
  visual: string;
  tip: string;
}

interface DressingType {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  color: string;
  accent: string;
  bg: string;
  steps: Step[];
}

const dressingData: DressingType[] = [
  {
    id: "oil-vinegar",
    name: "Oil & Vinegar Dressing",
    emoji: "🫒",
    tagline: "The Classic Foundation",
    color: "#4caf72",
    accent: "#1a4a2e",
    bg: "#f0faf4",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "You'll need good quality olive oil, vinegar (red wine, white, or balsamic), and a pinch of salt. The ratio is always 3 parts oil to 1 part vinegar.",
        visual: "🫒 🍶 🧂",
        tip: "Quality matters — use extra virgin olive oil for the best flavor.",
      },
      {
        title: "Measure Your Oil",
        description: "Pour 3 tablespoons of olive oil into a small bowl or jar. Olive oil forms the smooth, rich base of the dressing.",
        visual: "🥄 → 🥣",
        tip: "Use a clear jar so you can see the layers before mixing.",
      },
      {
        title: "Add the Vinegar",
        description: "Add 1 tablespoon of vinegar. The acidity of the vinegar balances the richness of the oil and brightens all the flavors.",
        visual: "🍶 → 🥣",
        tip: "Balsamic gives sweetness; red wine vinegar gives sharpness.",
      },
      {
        title: "Season with Salt",
        description: "Add a generous pinch of salt. Salt is essential — it draws out the flavors and ties the dressing together.",
        visual: "🧂 ✨",
        tip: "Taste as you go — seasoning is personal!",
      },
      {
        title: "Shake or Stir",
        description: "If using a jar, seal and shake vigorously for 10 seconds. If using a bowl, whisk quickly. The mixture will briefly combine but will separate — that's normal!",
        visual: "🫙 ↔️ 🫙",
        tip: "This is a temporary emulsion — shake again right before serving.",
      },
      {
        title: "Ready to Serve!",
        description: "Drizzle immediately over your salad. Oil and vinegar dressing works best on hearty greens like Italian salad, Greek salad, or a simple house salad.",
        visual: "🥗 ✅",
        tip: "Dress the salad just before serving so greens don't wilt.",
      },
    ],
  },
  {
    id: "emulsified",
    name: "Emulsified Dressing",
    emoji: "🥫",
    tagline: "Creamy & Stable",
    color: "#7bc67e",
    accent: "#2d6a4f",
    bg: "#f4fbf6",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "You'll need egg yolk (the emulsifier), oil, and lemon juice. The egg yolk is the secret — it contains lecithin which permanently bonds oil and water.",
        visual: "🥚 🫒 🍋",
        tip: "Use room temperature eggs for smoother emulsification.",
      },
      {
        title: "Start with the Egg Yolk",
        description: "Place one egg yolk in a bowl. This is your emulsifier — it will act as the bridge between the oil and the lemon juice.",
        visual: "🥚 → 🥣",
        tip: "Separate yolk carefully — no egg white should get in.",
      },
      {
        title: "Add Lemon Juice",
        description: "Add a tablespoon of fresh lemon juice to the yolk and whisk together. This starts building the base of the dressing.",
        visual: "🍋 + 🥚 → 🌀",
        tip: "Fresh lemon is much better than bottled here.",
      },
      {
        title: "Drizzle in Oil — Slowly!",
        description: "This is the critical step. Add oil ONE DROP AT A TIME while whisking constantly. Going too fast breaks the emulsion. Slowly increase to a thin stream.",
        visual: "🫒 💧💧💧 → 🌀",
        tip: "Patience is everything — rushing this step will cause it to break.",
      },
      {
        title: "Watch it Thicken",
        description: "As you keep whisking and adding oil, the dressing will suddenly thicken and turn creamy and pale. This is emulsification happening in real time!",
        visual: "💛 → 🍦",
        tip: "If it breaks (goes oily), add another yolk and whisk again slowly.",
      },
      {
        title: "Ready to Serve!",
        description: "Your emulsified dressing is stable — it won't separate! Use it for Caesar salad, Thousand Island, or Honey Mustard dressings.",
        visual: "🥬 ✅",
        tip: "Refrigerate and use within 2 days since it contains raw egg.",
      },
    ],
  },
  {
    id: "other",
    name: "Other Dressings",
    emoji: "🌿",
    tagline: "Unique & Creative",
    color: "#52b788",
    accent: "#1b4332",
    bg: "#edf7f1",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "For yogurt-based dressings, you'll need plain yogurt, fresh herbs, and lemon juice. These dressings are lighter, tangy, and incredibly fresh.",
        visual: "🥛 🌿 🍋",
        tip: "Greek yogurt makes a thicker, creamier dressing.",
      },
      {
        title: "Spoon the Yogurt",
        description: "Add 3–4 tablespoons of plain yogurt to a bowl. Yogurt replaces oil as the base, making this a lighter alternative to traditional dressings.",
        visual: "🥛 → 🥣",
        tip: "Full-fat yogurt gives the best texture and flavor.",
      },
      {
        title: "Chop Fresh Herbs",
        description: "Finely chop your herbs — parsley, mint, dill, or cilantro all work beautifully. Fresh herbs are what makes this dressing vibrant and alive.",
        visual: "🌿 🔪 ✨",
        tip: "Add herbs at the end to preserve their bright green color.",
      },
      {
        title: "Add Lemon Juice",
        description: "Squeeze in fresh lemon juice. The acidity brightens the yogurt and brings all the flavors together — this is what makes it taste fresh, not flat.",
        visual: "🍋 → 🥣",
        tip: "Start with half a lemon and taste before adding more.",
      },
      {
        title: "Mix & Season",
        description: "Stir everything together gently. Season with salt and pepper. Unlike oil-based dressings, this stays naturally combined — no shaking needed!",
        visual: "🥄 🌀 🧂",
        tip: "Let it sit for 5 minutes before serving so flavors meld.",
      },
      {
        title: "Ready to Serve!",
        description: "Perfect for Tahini salad, Yogurt Herb, or Avocado Lime dressings. These pair beautifully with Mediterranean and Middle Eastern style salads.",
        visual: "🥙 ✅",
        tip: "Also works as a dip for pita or vegetables!",
      },
    ],
  },
  {
    id: "temporary",
    name: "Temporary Emulsion",
    emoji: "🥗",
    tagline: "Shake Before Use",
    color: "#74c69d",
    accent: "#1b4332",
    bg: "#f0faf5",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "You'll need oil, vinegar, and mustard. Mustard acts as a partial emulsifier — it helps the dressing stay mixed longer than plain oil and vinegar, but it will still eventually separate.",
        visual: "🫒 🍶 🌭",
        tip: "Dijon mustard works best for a smoother, more stable mix.",
      },
      {
        title: "Add Mustard First",
        description: "Place a teaspoon of Dijon mustard in a jar. The mustard's lecithin will help temporarily bind the oil and vinegar together.",
        visual: "🌭 → 🫙",
        tip: "Mustard is the key — don't skip it for a proper vinaigrette.",
      },
      {
        title: "Add Vinegar",
        description: "Pour in 1 tablespoon of vinegar. Red wine vinegar is classic for a French vinaigrette, giving it a bright, sharp character.",
        visual: "🍶 → 🫙",
        tip: "Champagne vinegar gives a lighter, more elegant result.",
      },
      {
        title: "Add Oil",
        description: "Pour in 3 tablespoons of oil. Unlike an emulsified dressing, you can add it all at once — we're not building a permanent bond here.",
        visual: "🫒 → 🫙",
        tip: "A neutral oil like sunflower lets the vinegar flavor shine.",
      },
      {
        title: "Shake Vigorously",
        description: "Seal the jar and shake hard for 15–20 seconds. Watch it combine into a cloudy, unified dressing. If you leave it, it will slowly separate back.",
        visual: "🫙 ↔️↔️↔️ 🫙",
        tip: "The cloudiness means the emulsion is working!",
      },
      {
        title: "Ready to Serve — Use Immediately!",
        description: "Pour straight away over your salad. This is perfect for Vinaigrette, French Dressing, or Citrus Vinaigrette. Shake again if it separates.",
        visual: "🥗 ⚡ ✅",
        tip: "Make it fresh each time for the best flavor.",
      },
    ],
  },
  {
    id: "permanent",
    name: "Permanent Dressing",
    emoji: "🧈",
    tagline: "Set It & Forget It",
    color: "#40916c",
    accent: "#1b4332",
    bg: "#eaf6f0",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "You'll need egg yolk, oil, and vinegar. Like emulsified dressing, egg yolk is the hero here — but the technique creates an even more stable, permanent texture.",
        visual: "🥚 🫒 🍶",
        tip: "This is the base technique for making mayonnaise!",
      },
      {
        title: "Whisk the Egg Yolk",
        description: "Start with just the egg yolk in a large bowl. Whisk it alone for 30 seconds until it lightens in color slightly.",
        visual: "🥚 🌀 → 💛",
        tip: "A wider bowl gives you more control during whisking.",
      },
      {
        title: "Add Vinegar",
        description: "Add a teaspoon of vinegar and whisk into the yolk. This helps stabilize the emulsion from the start.",
        visual: "🍶 + 💛 → 🌀",
        tip: "White wine vinegar is classic for mayonnaise-style dressings.",
      },
      {
        title: "Add Oil — Drop by Drop",
        description: "Very slowly drizzle in oil while whisking constantly. This is even more critical than emulsified — go one drop at a time at first. The mixture must absorb each drop before you add more.",
        visual: "💧💧💧 🌀 → 🍦",
        tip: "Use a squeeze bottle for perfect control over the oil flow.",
      },
      {
        title: "It Becomes Thick & Stable",
        description: "The dressing becomes very thick — almost like a cream. Unlike temporary emulsion, this will NOT separate even when left to sit. The bond is permanent.",
        visual: "🍦 ≠ 💧",
        tip: "If it gets too thick, whisk in a few drops of warm water.",
      },
      {
        title: "Ready to Store & Serve!",
        description: "This dressing keeps in the fridge for up to a week without separating. Use it as the base for Ranch, Blue Cheese, or Green Goddess dressings.",
        visual: "🧀 🌿 ✅",
        tip: "Add herbs, garlic, or cheese to customize the flavor.",
      },
    ],
  },
  {
    id: "cooked",
    name: "Cooked Salad Dressing",
    emoji: "🍳",
    tagline: "Heat-Thickened & Sweet",
    color: "#95d5b2",
    accent: "#1b4332",
    bg: "#f2fbf6",
    steps: [
      {
        title: "Gather Your Ingredients",
        description: "You'll need flour, eggs, sugar, and vinegar. Unlike other dressings, this one is cooked on a stove — the heat activates the starch and eggs to create a smooth, pudding-like texture.",
        visual: "🌾 🥚 🍬 🍶",
        tip: "This is the only dressing that needs a pot and heat!",
      },
      {
        title: "Mix Dry Ingredients",
        description: "Whisk together flour and sugar in a small saucepan. The flour is your thickener — it will absorb moisture and swell when heated.",
        visual: "🌾 + 🍬 → 🥣",
        tip: "Sift the flour first to avoid lumps in your dressing.",
      },
      {
        title: "Add Eggs & Vinegar",
        description: "Beat the eggs and add them to the pan along with the vinegar. Stir everything together into a smooth, liquid mixture before turning on the heat.",
        visual: "🥚 🍶 → 🌀",
        tip: "Mix cold so the eggs don't scramble before cooking.",
      },
      {
        title: "Cook Over Medium Heat",
        description: "Place the pan on medium heat and stir constantly with a wooden spoon or whisk. Never stop stirring — the bottom can scorch quickly.",
        visual: "🔥 🥄 🌀",
        tip: "Low and slow wins — high heat will curdle the eggs.",
      },
      {
        title: "Watch it Thicken",
        description: "After 5–7 minutes of stirring, the mixture will suddenly thicken into a smooth, glossy, pudding-like consistency. Remove from heat immediately.",
        visual: "🌡️ → 🍮",
        tip: "It thickens fast at the end — don't walk away!",
      },
      {
        title: "Cool & Serve!",
        description: "Let the dressing cool slightly before using. It's perfect for Fruit Salad, Waldorf, Ambrosia, or Boiled Dressing — sweet salads that need a gentle, warm flavor.",
        visual: "🍇 🍎 ✅",
        tip: "Refrigerate leftovers — it keeps for up to 3 days.",
      },
    ],
  },
];

// Which localStorage key this module uses
const MODULE_KEY = "module3"; // adjust to whatever key matches your ModuleContext

export default function DressingFlipbook() {
  const [selectedDressing, setSelectedDressing] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [isModuleComplete, setIsModuleComplete] = useState<boolean>(false);
  const [showCompletionBanner, setShowCompletionBanner] = useState<boolean>(false);

  const dressing = dressingData[selectedDressing];
  const step = dressing.steps[currentStep];
  const totalSteps = dressing.steps.length;

  // Check if already completed on mount
  useEffect(() => {
    const saved = localStorage.getItem("completedModules");
    if (saved) {
      const modules = JSON.parse(saved);
      if (modules[MODULE_KEY]) setIsModuleComplete(true);
    }
  }, []);

  // Mark module complete when all dressings are done
  useEffect(() => {
    if (completed.size === dressingData.length && !isModuleComplete) {
      const saved = localStorage.getItem("completedModules");
      const modules = saved ? JSON.parse(saved) : {};
      modules[MODULE_KEY] = true;
      localStorage.setItem("completedModules", JSON.stringify(modules));
      setIsModuleComplete(true);
      setShowCompletionBanner(true);
      window.dispatchEvent(new Event("moduleCompleted"));
    }
  }, [completed.size, isModuleComplete]);

  const goToStep = (next: number) => {
    setDirection(next > currentStep ? 1 : -1);
    setCurrentStep(next);
    // Mark dressing complete when reaching last step
    if (next === dressing.steps.length - 1) {
      setCompleted((prev) => new Set([...prev, dressing.id]));
    }
  };

  const selectDressing = (idx: number) => {
    setSelectedDressing(idx);
    setCurrentStep(0);
    setDirection(1);
  };

  const handleNextDressing = () => {
    // Mark current as complete too
    setCompleted((prev) => new Set([...prev, dressing.id]));
    const next = (selectedDressing + 1) % dressingData.length;
    selectDressing(next);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const progressPercent = (completed.size / dressingData.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 flex flex-col">

      {/* ── Hero Header (matches landing page) ── */}
      <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-green-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
          {/* Back button */}
          <button
            onClick={() => window.location.href = "/navigation"}
            className="flex items-center gap-2 text-lime-200 hover:text-white transition-colors mb-6 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-semibold">Back to Course</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
                <span className="bg-gradient-to-r from-yellow-200 via-lime-200 to-green-200 bg-clip-text text-transparent">
                  Types of Dressing
                </span>
                <br />
                <span className="text-white text-3xl md:text-4xl">Interactive Flipbook</span>
              </h1>
              <p className="text-green-100 text-lg">
                Learn how to make every type of salad dressing step by step
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                <BookOpen className="w-5 h-5 text-lime-300" />
                <span className="font-semibold">{dressingData.length} Dressings</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                <Award className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">{completed.size}/{dressingData.length} Done</span>
              </div>
              {isModuleComplete && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 px-5 py-3 rounded-full font-bold shadow-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Module Complete!</span>
                </div>
              )}
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-lime-200 font-semibold">Overall Progress</span>
              <span className="text-lime-200 font-semibold">{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-300 to-lime-400 h-2 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Completion Banner ── */}
      {showCompletionBanner && (
        <div className="bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 px-6 py-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3 font-extrabold text-lg">
            <Award className="w-6 h-6" />
            🎉 You've completed all dressings! Module marked as done.
          </div>
          <button
            onClick={() => setShowCompletionBanner(false)}
            className="text-green-900/60 hover:text-green-900 text-xl font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* ── Body: Sidebar + Main ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-green-900 to-emerald-900 flex flex-col gap-1 py-6 overflow-y-auto flex-shrink-0">
          <p className="text-lime-300 text-xs font-bold uppercase tracking-widest px-5 mb-3">Dressing Types</p>
          {dressingData.map((d, i) => (
            <button
              key={d.id}
              onClick={() => selectDressing(i)}
              className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-all border-l-4 ${
                selectedDressing === i
                  ? "border-lime-400 bg-white/10 text-white"
                  : "border-transparent text-green-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-xl">{d.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${selectedDressing === i ? "font-extrabold" : "font-medium"}`}>
                  {d.name}
                </p>
                {completed.has(d.id) && (
                  <p className="text-xs text-lime-400 font-semibold mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Done
                  </p>
                )}
              </div>
            </button>
          ))}

          {/* Back to course link in sidebar */}
          <div className="mt-auto pt-6 px-5">
            <button
              onClick={() => window.location.href = "/navigation"}
              className="w-full flex items-center gap-2 text-green-400 hover:text-white text-sm font-semibold transition-colors group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Navigation
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: dressing.bg }}>

          {/* Dressing title + step progress */}
          <div className="px-8 py-6 border-b-2" style={{ borderColor: dressing.color + "40" }}>
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                style={{ background: `linear-gradient(135deg, ${dressing.color}66, ${dressing.color})` }}
              >
                {dressing.emoji}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: dressing.color }}>
                  {dressing.tagline}
                </p>
                <h2 className="text-2xl font-extrabold" style={{ color: dressing.accent }}>
                  {dressing.name}
                </h2>
              </div>
            </div>

            {/* Step dots progress */}
            <div className="flex gap-2">
              {dressing.steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  className="flex-1 h-2 rounded-full transition-all duration-300 cursor-pointer"
                  style={{ background: i <= currentStep ? dressing.color : dressing.color + "33" }}
                />
              ))}
            </div>
            <p className="text-xs font-semibold mt-2" style={{ color: dressing.accent + "88" }}>
              Step {currentStep + 1} of {totalSteps}
            </p>
          </div>

          {/* Step Card */}
          <div className="flex-1 flex flex-col justify-center px-8 py-8 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${dressing.id}-${currentStep}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="max-w-2xl"
              >
                {/* Visual card */}
                <div
                  className="bg-white rounded-3xl p-8 mb-6 text-center border-2 shadow-lg"
                  style={{ borderColor: dressing.color + "44", boxShadow: `0 8px 32px ${dressing.color}22` }}
                >
                  <div className="text-5xl tracking-widest mb-4">{step.visual}</div>
                  <span
                    className="inline-block text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full"
                    style={{ background: dressing.color + "22", color: dressing.accent }}
                  >
                    Step {currentStep + 1}
                  </span>
                </div>

                {/* Text */}
                <h3 className="text-2xl font-extrabold mb-3" style={{ color: dressing.accent }}>
                  {step.title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-700 mb-5">
                  {step.description}
                </p>

                {/* Tip box — matches landing page card style */}
                <div
                  className="rounded-2xl p-4 flex items-start gap-3 border-2"
                  style={{ background: dressing.color + "18", borderColor: dressing.color + "55" }}
                >
                  <span className="text-lg mt-0.5">💡</span>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: dressing.accent }}>
                      Chef&apos;s Tip:{" "}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: dressing.accent + "cc" }}>
                      {step.tip}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation footer */}
          <div
            className="px-8 py-5 flex justify-between items-center border-t-2"
            style={{ borderColor: dressing.color + "33" }}
          >
            <button
              onClick={() => goToStep(currentStep - 1)}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm transition-all border-2 ${
                currentStep === 0
                  ? "opacity-30 cursor-not-allowed border-gray-200 text-gray-400"
                  : "bg-white hover:shadow-md hover:scale-105"
              }`}
              style={currentStep > 0 ? { borderColor: dressing.color, color: dressing.accent } : {}}
            >
              ← Previous
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {dressing.steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === currentStep ? 24 : 8,
                    background: i === currentStep ? dressing.color : dressing.color + "44",
                  }}
                />
              ))}
            </div>

            {currentStep < totalSteps - 1 ? (
              <button
                onClick={() => goToStep(currentStep + 1)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm transition-all hover:scale-105 hover:shadow-lg text-green-900"
                style={{
                  background: `linear-gradient(to right, #fde68a, #bef264, ${dressing.color})`,
                  boxShadow: `0 4px 16px ${dressing.color}55`,
                }}
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : completed.size < dressingData.length - 1 ? (
              /* More dressings remaining */
              <button
                onClick={handleNextDressing}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm transition-all hover:scale-105 hover:shadow-xl text-green-900"
                style={{ background: "linear-gradient(to right, #fde68a, #bef264, #4ade80)" }}
              >
                Next Dressing
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              /* All done — go back to navigation */
              <button
                onClick={() => {
                  setCompleted((prev) => new Set([...prev, dressing.id]));
                  window.location.href = "/navigation";
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm transition-all hover:scale-105 hover:shadow-xl text-green-900"
                style={{ background: "linear-gradient(to right, #fde68a, #bef264, #4ade80)" }}
              >
                <Award className="w-4 h-4" />
                Back to Course →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}