"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2, X, Sparkles, BookOpen } from 'lucide-react';
import { useModules } from '../components/ModuleContext';
import Image from "next/image";

const saladComponents = {
  base: {
    name: "Base",
    description: "The foundation of your salad, typically made of leafy greens that provide the primary texture and serve as the canvas for other ingredients.",
    examples: ["Lettuce", "Spinach", "Arugula", "Mixed Greens", "Kale"],
    nutrients: ["Fiber", "Vitamin A", "Vitamin C", "Vitamin K", "Folate", "Iron", "Antioxidants"],
    nutrientDescription: "Provides essential vitamins, minerals, and fiber that support digestion, immunity, and overall health.",
    color: "from-emerald-500 to-green-600"
  },
  body: {
    name: "Body",
    description: "The main substance of the salad that adds bulk, protein, and variety. This is where the salad gets its character and nutritional value.",
    examples: ["Grilled Chicken", "Chickpeas", "Quinoa", "Tofu", "Hard-boiled Eggs", "Cheese"],
    nutrients: ["Protein", "Healthy Fats", "Iron", "Calcium", "Magnesium", "B Vitamins", "Complex Carbohydrates"],
    nutrientDescription: "Supplies protein and key nutrients that help build muscles, provide energy, and keep you full longer.",
    color: "from-amber-500 to-orange-600"
  },
  garnish: {
    name: "Garnish",
    description: "Decorative and flavorful elements that add visual appeal, texture, and complementary tastes to complete the dish.",
    examples: ["Cherry Tomatoes", "Cucumber Slices", "Croutons", "Nuts", "Seeds", "Fresh Herbs"],
    nutrients: ["Antioxidants", "Vitamin C", "Vitamin E", "Fiber", "Healthy Fats (from nuts & seeds)", "Phytonutrients"],
    nutrientDescription: "Adds extra vitamins, antioxidants, and healthy fats that enhance flavor and boost nutritional value.",
    color: "from-rose-500 to-pink-600"
  },
  dressing: {
    name: "Dressing",
    description: "The liquid seasoning that brings all components together, adding moisture, flavor, and helping to unify the salad's taste profile.",
    examples: ["Vinaigrette", "Ranch", "Caesar", "Balsamic", "Olive Oil & Lemon"],
    nutrients: ["Healthy Fats (if oil-based)", "Vitamin E", "Omega-3 (if made with certain oils)", "Small amounts of vitamins depending on ingredients"],
    nutrientDescription: "Provides healthy fats and enhances nutrient absorption, especially fat-soluble vitamins.",
    color: "from-yellow-500 to-amber-600"
  }
};

const hotspots = [
  { id: 'base', label: 'Base', x: 20, y: 35 },
  { id: 'body', label: 'Body', x: 43, y: 78 },
  { id: 'garnish', label: 'Garnish', x: 70, y: 20 },
  { id: 'dressing', label: 'Dressing', x: 75, y: 75 }
];

const Module2 = () => {
  const router = useRouter();
  const { updateModuleCompletion } = useModules();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [viewedComponents, setViewedComponents] = useState<Set<string>>(new Set());
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const handleHotspotClick = (id: string) => {
    if (activeHotspot === id) {
      setActiveHotspot(null);
      setSelectedComponent(null);
    } else {
      setSelectedComponent(id);
      setViewedComponents((prev) => new Set([...prev, id]));
      setActiveHotspot(id);
    }
  };

  const handleComplete = () => {
    updateModuleCompletion(2, true);
    router.push('/navigation');
  };

  const handleBack = () => router.push('/navigation');

  const allViewed = viewedComponents.size === 4;
  const component = selectedComponent ? saladComponents[selectedComponent as keyof typeof saladComponents] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">

      {/* ── Hero Header — matches landing page ── */}
      <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-green-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-lime-200 hover:text-white transition-colors mb-6 group"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-semibold">Back to Course</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
                <span className="bg-gradient-to-r from-yellow-200 via-lime-200 to-green-200 bg-clip-text text-transparent">
                  Components of a Salad
                </span>
                <br />
                <span className="text-white text-3xl md:text-4xl">Module 2</span>
              </h1>
              <p className="text-green-100 text-lg">
                Click on the hotspots to zoom in and explore each component
              </p>
            </div>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                <BookOpen className="w-5 h-5 text-lime-300" />
                <span className="font-semibold">4 Components</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">{viewedComponents.size} / 4 Explored</span>
              </div>
              {allViewed && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 px-5 py-3 rounded-full font-bold shadow-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>All Explored!</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-lime-200 font-semibold">Exploration Progress</span>
              <span className="text-lime-200 font-semibold">{Math.round((viewedComponents.size / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-300 to-lime-400 h-2 rounded-full transition-all duration-700"
                style={{ width: `${(viewedComponents.size / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 py-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left — Image with Hotspots */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <motion.div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-green-200 sticky top-8">
              <div className="relative aspect-square w-full overflow-hidden">
                <motion.div
                  className="relative w-full h-full"
                  animate={activeHotspot ? {
                    scale: 1.8,
                    x: `${(50 - (hotspots.find(h => h.id === activeHotspot)?.x || 50)) * 1.2}%`,
                    y: `${(50 - (hotspots.find(h => h.id === activeHotspot)?.y || 50)) * 1.2}%`,
                  } : { scale: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Image
                    src="/image/mods2_2.jpg"
                    alt="Components of a Salad"
                    fill
                    className="object-contain rounded-2xl"
                    priority
                  />

                  {/* Hotspots */}
                  {hotspots.map((spot, index) => (
                    <motion.button
                      key={spot.id}
                      initial={{ scale: 0, opacity: 0, rotate: -180 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 300, damping: 15 }}
                      className={`absolute w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-extrabold shadow-2xl z-10 border-4 border-white transition-all
                        ${viewedComponents.has(spot.id)
                          ? 'bg-gradient-to-br from-lime-500 to-green-600'
                          : 'bg-gradient-to-br from-yellow-300 to-lime-500 animate-pulse'
                        }
                        ${activeHotspot === spot.id ? 'ring-4 ring-yellow-300 ring-offset-2' : ''}`}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
                      onClick={(e) => { e.stopPropagation(); handleHotspotClick(spot.id); }}
                    >
                      {viewedComponents.has(spot.id)
                        ? <CheckCircle2 className="h-7 w-7" />
                        : <span className="text-green-900">{spot.label[0]}</span>
                      }
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Component chips below image */}
              <div className="px-5 py-4 border-t-2 border-green-100 bg-gradient-to-r from-lime-50 to-green-50 flex flex-wrap gap-2">
                {hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => handleHotspotClick(spot.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-extrabold transition-all border-2 ${
                      activeHotspot === spot.id
                        ? 'bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 border-green-400 shadow-md'
                        : viewedComponents.has(spot.id)
                          ? 'bg-green-50 text-green-700 border-green-300 hover:border-green-500'
                          : 'bg-white text-green-600 border-green-200 hover:border-green-400'
                    }`}
                  >
                    {viewedComponents.has(spot.id) && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {spot.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Component Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {component ? (
                <motion.div
                  key={selectedComponent}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="bg-white rounded-3xl shadow-xl border-2 border-green-200 overflow-hidden sticky top-8"
                >
                  {/* Color top bar */}
                  <div className={`h-2 bg-gradient-to-r ${component.color}`} />

                  <div className="p-8 relative">
                    <button
                      className="absolute top-6 right-6 p-2 hover:bg-green-100 rounded-xl transition-all hover:rotate-90 duration-300 border-2 border-green-100"
                      onClick={() => { setSelectedComponent(null); setActiveHotspot(null); }}
                    >
                      <X className="h-5 w-5 text-green-700" />
                    </button>

                    <div className="pr-14">
                      <motion.h3
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        className={`text-4xl font-extrabold bg-gradient-to-r ${component.color} bg-clip-text text-transparent mb-3`}
                      >
                        {component.name}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-green-800 mb-6 leading-relaxed text-lg"
                      >
                        {component.description}
                      </motion.p>

                      {/* Examples */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl p-5 border-2 border-green-200 mb-4"
                      >
                        <span className="font-extrabold text-green-900 text-base block mb-3">Examples:</span>
                        <div className="flex flex-wrap gap-2">
                          {component.examples.map((example, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + idx * 0.05 }}
                              className="bg-white text-green-700 px-3 py-1.5 rounded-xl text-sm font-semibold border-2 border-green-200 shadow-sm hover:border-green-400 transition-colors"
                            >
                              {example}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Nutrients */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-2xl p-5 border-2 border-emerald-200"
                      >
                        <span className="font-extrabold text-green-900 text-base block mb-3">Nutrients:</span>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {component.nutrients.map((nutrient, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + idx * 0.05 }}
                              className="bg-white text-emerald-700 px-3 py-1.5 rounded-xl text-sm font-semibold border-2 border-emerald-200 shadow-sm hover:border-emerald-400 transition-colors"
                            >
                              {nutrient}
                            </motion.span>
                          ))}
                        </div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-green-700 text-sm leading-relaxed italic"
                        >
                          {component.nutrientDescription}
                        </motion.p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-3xl shadow-xl border-2 border-green-200 flex items-center justify-center min-h-[400px] sticky top-8"
                >
                  <div className="text-center p-12">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-lime-400 to-green-500 rounded-3xl flex items-center justify-center shadow-lg"
                    >
                      <Sparkles className="h-12 w-12 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-extrabold text-green-900 mb-3">Select a Component</h3>
                    <p className="text-green-600 text-lg leading-relaxed">
                      Click on the glowing hotspots on the image to learn about each salad component
                    </p>

                    {/* Mini guide chips */}
                    <div className="flex flex-wrap gap-2 justify-center mt-6">
                      {hotspots.map((spot) => (
                        <span
                          key={spot.id}
                          className="bg-green-50 border-2 border-green-200 text-green-700 text-sm font-semibold px-3 py-1.5 rounded-full"
                        >
                          {spot.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Complete Button ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center mt-12 gap-4"
        >
          {!allViewed && (
            <p className="text-green-600 font-semibold text-sm">
              Explore all 4 components to unlock completion ({viewedComponents.size}/4 done)
            </p>
          )}
          <motion.button
            onClick={handleComplete}
            disabled={!allViewed}
            whileHover={allViewed ? { scale: 1.05, y: -2 } : {}}
            whileTap={allViewed ? { scale: 0.95 } : {}}
            className={`px-10 py-4 rounded-2xl font-extrabold text-lg flex items-center gap-3 transition-all ${
              allViewed
                ? 'bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 shadow-xl hover:shadow-2xl hover:shadow-lime-500/30'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200'
            }`}
          >
            <CheckCircle2 className="h-6 w-6" />
            {allViewed ? 'Complete Module 2 →' : 'View all components to continue'}
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Module2;