"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Clock, Volume2, VolumeX, RotateCcw, Play, Pause, Award, CheckCircle2 } from "lucide-react";
import { useModules } from "../components/ModuleContext";
import Image from "next/image";

const salads = [
  {
    id: 1,
    type: "Appetizer Salad",
    description: "Light and refreshing salads served at the beginning of a meal to stimulate the appetite. Usually small portions with crisp greens and a light vinaigrette.",
    image: "/image/Apetizercover.jpg",
    audioPath: "/image/audio/Appetizer salad.aac",
    lectureNote: "Appetizer salads are crucial for setting the tone of a meal. They should be light enough to stimulate appetite without filling up your guests. Focus on crisp, fresh ingredients with bright, acidic dressings. Remember: presentation matters most in appetizer salads as they create the first impression.",
    flashcard: {
      front: "What is the main purpose of an Appetizer Salad?",
      back: "To stimulate appetite and set the tone for the meal. It should be light, crisp, and visually appealing without being too filling."
    },
    examples: [
      { name: "Caesar Salad", image: "/image/examples/ceasarsalad.png" },
      { name: "Garden Salad", image: "/image/examples/gardensalad.png" },
    ],
    keyPoints: ["Small portions", "Crisp greens", "Light vinaigrette", "Served first"]
  },
  {
    id: 2,
    type: "Side Salad",
    description: "Accompanies the main course and complements the flavors of the entrée. Often features seasonal vegetables and simple dressings.",
    image: "/image/Sidesaladcover.png",
    audioPath: "/image/audio/Side salad.aac",
    lectureNote: "Side salads serve as a complementary dish to the main course. The key is balance - they should enhance, not overpower, the entrée. Consider the flavors and textures of your main dish when selecting ingredients. A simple vinaigrette often works best to keep the focus on the main course.",
    flashcard: {
      front: "How should a Side Salad relate to the main course?",
      back: "It should complement and enhance the main dish without overpowering it. Use simple dressings and consider the flavors of the entrée when choosing ingredients."
    },
    examples: [
      { name: "Coleslaw", image: "/image/examples/coleslaw.png" },
      { name: "Mixed Green Salad", image: "/image/examples/mixsalad.png" },
    ],
    keyPoints: ["Complements entrée", "Simple flavors", "Seasonal vegetables", "Balance is key"]
  },
  {
    id: 3,
    type: "Main Course Salad",
    description: "Substantial salads with protein like chicken, fish, or beans that serve as the primary dish. Nutritionally balanced and filling.",
    image: "/image/maincoursecover.png",
    audioPath: "/image/audio/main course salad.aac",
    lectureNote: "Main course salads must be nutritionally complete and satisfying. Include quality protein sources, complex carbohydrates, and healthy fats. These salads should be substantial enough to be the centerpiece of the meal. Pay attention to portion sizes and nutritional balance throughout.",
    flashcard: {
      front: "What makes a Main Course Salad nutritionally complete?",
      back: "It must include quality protein, complex carbohydrates, and healthy fats in substantial portions. It should be filling and serve as the meal's centerpiece."
    },
    examples: [
      { name: "Chef Salad", image: "/image/examples/chef.png" },
      { name: "Cobb Salad", image: "/image/examples/cobb.png" },
    ],
    keyPoints: ["Contains protein", "Nutritionally complete", "Substantial portions", "Meal centerpiece"]
  },
  {
    id: 4,
    type: "Dessert Salad",
    description: "Sweet salads made with fruits, nuts, and creamy dressings. Often served at the end of a meal or as a refreshing treat.",
    image: "/image/DessertSaladcover.png",
    audioPath: "/image/audio/DESSERT SALADS.aac",
    lectureNote: "Dessert salads offer a lighter alternative to traditional desserts. They combine fresh or preserved fruits with sweet, creamy dressings. Popular at gatherings and potlucks, these salads provide a refreshing end to a meal while still satisfying the sweet tooth.",
    flashcard: {
      front: "What role does a Dessert Salad play in a meal?",
      back: "It serves as a lighter alternative to traditional desserts, using fruits and sweet dressings to provide a refreshing yet sweet ending to the meal."
    },
    examples: [
      { name: "Waldorf Salad", image: "/image/examples/waldrof.png" },
      { name: "Ambrosia Salad", image: "/image/examples/ambrosia.png" }
    ],
    keyPoints: ["Sweet dressings", "Fresh fruits", "Light dessert option", "Refreshing finish"]
  },
  {
    id: 5,
    type: "Separate Course (Dessert) Salad",
    description: "Sweet salads served as a separate course or dessert, made with fruits, nuts, gelatin, or sweetened dressings.",
    image: "/image/DessertSaladcover.png",
    audioPath: "/image/audio/Separate course (dessert) salad.aac",
    lectureNote: "Dessert salads are served at the end of a meal as a lighter alternative to traditional desserts. They often use fruits, sweet dressings, whipped cream, or gelatin and should be refreshing rather than heavy.",
    flashcard: {
      front: "When is a dessert salad served?",
      back: "At the end of a meal as a light and refreshing dessert."
    },
    examples: [
      { name: "Waldorf Salad", image: "/image/examples/waldrof.png" },
      { name: "Ambrosia Salad", image: "/image/examples/ambrosia.png" }
    ],
    keyPoints: ["Sweet ingredients", "Served last", "Light dessert option", "Refreshing"]
  },
  {
    id: 6,
    type: "Accompaniment Salad",
    description: "Salads served alongside the main course to complement flavors and add freshness to the meal.",
    image: "/image/accompanimentcover.png",
    audioPath: "/image/audio/accompaniment salad.aac",
    lectureNote: "Accompaniment salads balance rich main dishes. They are usually simple, lightly dressed, and should not overpower the main course.",
    flashcard: {
      front: "What is the purpose of an accompaniment salad?",
      back: "To complement and balance the main dish."
    },
    examples: [
      { name: "Coleslaw", image: "/image/examples/coleslaw.png" },
      { name: "Side Garden Salad", image: "/image/examples/gardensalad.png" }
    ],
    keyPoints: ["Served with main dish", "Simple flavors", "Light dressing", "Enhances meal"]
  },
  {
    id: 7,
    type: "Green Salads",
    description: "Salads made primarily from leafy greens such as lettuce, spinach, or arugula, usually tossed with dressing.",
    image: "/image/greensaladcover.png",
    audioPath: "/image/audio/Green Salads.aac",
    lectureNote: "Green salads are the most common type of salad. Freshness, crispness, and proper drying of greens are essential for quality.",
    flashcard: {
      front: "What is the main ingredient of green salads?",
      back: "Leafy green vegetables like lettuce or spinach."
    },
    examples: [
      { name: "Caesar Salad", image: "/image/examples/caesar.png" },
      { name: "Garden Salad", image: "/image/examples/garden.png" }
    ],
    keyPoints: ["Leafy greens", "Fresh ingredients", "Light dressing", "Crisp texture"]
  },
  {
    id: 8,
    type: "Vegetable, Grain, Legume & Pasta Salads",
    description: "Hearty salads made with vegetables, grains, legumes, or pasta, often served chilled or at room temperature.",
    image: "/image/pastasaladcover.png",
    audioPath: "/image/audio/Vegetable grain.aac",
    lectureNote: "These salads are filling and versatile, often used for buffets or packed meals. Proper seasoning and cooling improve flavor.",
    flashcard: {
      front: "Why are pasta and grain salads considered hearty?",
      back: "Because they contain filling ingredients like pasta, beans, and grains."
    },
    examples: [
      { name: "Pasta Salad", image: "/image/examples/pasta.png" },
      { name: "Bean Salad", image: "/image/examples/beansalad.png" }
    ],
    keyPoints: ["Hearty ingredients", "Good for buffets", "Served cold", "Well-seasoned"]
  },
  {
    id: 9,
    type: "Bound Salads",
    description: "Salads held together with a thick dressing such as mayonnaise.",
    image: "/image/boundsaladcover.png",
    audioPath: "/image/audio/Bound Salad.aac",
    lectureNote: "Bound salads use creamy dressings that coat ingredients evenly. Proper chilling improves texture and flavor.",
    flashcard: {
      front: "What makes a salad a bound salad?",
      back: "A thick dressing like mayonnaise that binds the ingredients together."
    },
    examples: [
      { name: "Potato Salad", image: "/image/examples/potato.png" },
      { name: "Chicken Salad", image: "/image/examples/chicken.png" }
    ],
    keyPoints: ["Creamy dressing", "Thick consistency", "Served cold", "Well-mixed"]
  },
  {
    id: 10,
    type: "Fruit Salads",
    description: "Salads made primarily from fresh or preserved fruits, served sweet or lightly dressed.",
    image: "/image/fruitsaladcover.png",
    audioPath: "/image/audio/FRUIT SALADS.aac",
    lectureNote: "Fruit salads emphasize freshness and natural sweetness. Prevent browning by using citrus juice.",
    flashcard: {
      front: "What is the main ingredient in fruit salads?",
      back: "Fresh or preserved fruits."
    },
    examples: [
      { name: "Fruit Cocktail", image: "/image/examples/fruitcocktail.png" },
      { name: "Tropical Fruit Salad", image: "/image/examples/tropical.png" }
    ],
    keyPoints: ["Fresh fruits", "Natural sweetness", "Colorful presentation", "Light dressing"]
  },
  {
    id: 11,
    type: "Composed Salads",
    description: "Salads where ingredients are arranged neatly rather than mixed.",
    image: "/image/composedsaladcover.png",
    audioPath: "/image/audio/Composed salad.aac",
    lectureNote: "Composed salads focus on presentation. Ingredients are arranged artistically and dressed lightly or separately.",
    flashcard: {
      front: "How are composed salads prepared?",
      back: "By arranging ingredients neatly instead of tossing them together."
    },
    examples: [
      { name: "Cobb Salad", image: "/image/examples/cobb.png" },
      { name: "Niçoise Salad", image: "/image/examples/nicoise.png" }
    ],
    keyPoints: ["Arranged presentation", "Visual appeal", "Separate components", "Minimal mixing"]
  },
  {
    id: 12,
    type: "Gelatin Salads",
    description: "Salads made with gelatin combined with fruits, vegetables, or meats.",
    image: "/image/gelatin_cover.png",
    audioPath: "/image/audio/gelatin salads.aac",
    lectureNote: "Gelatin salads are popular for special occasions. Proper setting time and temperature are important.",
    flashcard: {
      front: "What ingredient gives gelatin salads their structure?",
      back: "Gelatin."
    },
    examples: [
      { name: "Fruit Gelatin Salad", image: "/image/examples/gelatinfruit.png" },
      { name: "Vegetable Aspic", image: "/image/examples/aspic.png" }
    ],
    keyPoints: ["Gelatin-based", "Chilled before serving", "Decorative", "Firm texture"]
  }
];

export default function Module1() {
  const { modules, updateModuleCompletion } = useModules();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isModuleCompleted = modules.find(m => m.id === 1)?.completed || false;
  const progressPercent = ((current + 1) / salads.length) * 100;

  const playAudio = () => {
    if (audioRef.current) { audioRef.current.play(); setIsPlaying(true); }
  };
  const pauseAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); setIsPlaying(false); }
  };
  const stopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; setIsPlaying(false); }
  };
  const toggleAutoPlay = () => { setAutoPlay(!autoPlay); if (isPlaying) stopAudio(); };

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    stopAudio();
    if (autoPlay && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [current, autoPlay]);

  useEffect(() => { setIsFlipped(false); }, [current]);

  useEffect(() => {
    if (current === salads.length - 1) {
      setShowCompletion(true);
      if (!isModuleCompleted) {
        setTimeout(() => {
          updateModuleCompletion(1, true);
          alert('🎉 Congratulations! Module 1 marked as complete!');
        }, 1000);
      }
    }
  }, [current, isModuleCompleted]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % salads.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + salads.length) % salads.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <audio
        ref={audioRef}
        src={salads[current].audioPath}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

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
                  Classification of Salad
                </span>
                <br />
                <span className="text-white text-3xl md:text-4xl">Module 1</span>
              </h1>
              <p className="text-green-100 text-lg">
                Learn the different types and classifications of salads
              </p>
            </div>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                <BookOpen className="w-5 h-5 text-lime-300" />
                <span className="font-semibold">12 Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Lesson {current + 1} of {salads.length}</span>
              </div>
              {isModuleCompleted && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 px-5 py-3 rounded-full font-bold shadow-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar in header */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-lime-200 font-semibold">Progress</span>
              <span className="text-lime-200 font-semibold">{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-300 to-lime-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">

        {/* Left — Main Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Image Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-green-200">
            <div className="aspect-video relative overflow-hidden">
              <Image
                key={salads[current].image}
                src={salads[current].image}
                alt={salads[current].type}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                className="object-cover scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              {/* Text overlay */}
              <div className="absolute inset-0 flex items-end p-8">
                <div className="max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-3">
                    {salads[current].type}
                  </h2>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed drop-shadow-md">
                    {salads[current].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav controls */}
            <div className="bg-gradient-to-r from-lime-50 to-green-50 px-6 py-4 flex items-center justify-between border-t-2 border-green-100">
              <button
                onClick={prevSlide}
                className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-green-50 text-green-700 font-extrabold rounded-2xl transition-all shadow-sm border-2 border-green-200 hover:border-green-400 hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              {/* Dot indicators */}
              <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
                {salads.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-2 rounded-full transition-all ${idx === current ? "bg-gradient-to-r from-lime-500 to-green-600 w-6" : "bg-green-200 hover:bg-green-300 w-2"}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold rounded-2xl transition-all hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Completion Card */}
          {showCompletion && current === salads.length - 1 && (
            <div className={`rounded-3xl p-6 shadow-lg border-2 ${
              isModuleCompleted
                ? "bg-gradient-to-br from-white to-green-50 border-green-300"
                : "bg-gradient-to-br from-white to-yellow-50 border-yellow-300"
            }`}>
              <div className="flex items-start gap-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  isModuleCompleted
                    ? "bg-gradient-to-br from-lime-400 to-green-500"
                    : "bg-gradient-to-br from-yellow-400 to-amber-500"
                }`}>
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold mb-2 text-green-900">
                    {isModuleCompleted ? "Module Already Completed!" : "🎉 Congratulations!"}
                  </h3>
                  <p className="text-green-700 mb-5 leading-relaxed">
                    {isModuleCompleted
                      ? "You've already completed Module 1: Classification of Salad. Great job!"
                      : "You've completed all lessons in Module 1: Classification of Salad. This module has been automatically marked as complete!"}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => { updateModuleCompletion(1, true); window.location.href = "/navigation"; }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold rounded-2xl hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105 transition-all"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Back to Course
                    </button>
                    {isModuleCompleted && (
                      <button
                        onClick={() => setCurrent(0)}
                        className="px-6 py-3 bg-white text-green-700 font-extrabold rounded-2xl hover:bg-green-50 transition-all border-2 border-green-300 hover:border-green-400"
                      >
                        Review Lessons
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Flashcard */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-green-200">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-extrabold text-green-900 flex items-center gap-2">
                🎴 Knowledge Check
              </h3>
              <button
                onClick={() => setIsFlipped(false)}
                className="flex items-center gap-1.5 text-sm text-green-600 hover:text-green-800 font-semibold transition-colors bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-xl border-2 border-green-200"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative w-full transition-all duration-500"
                style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                {/* Front */}
                <div
                  className={`bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl p-8 min-h-[200px] flex items-center justify-center text-center ${isFlipped ? "invisible" : "visible"}`}
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  <div>
                    <div className="text-5xl mb-4">❓</div>
                    <p className="text-xl font-extrabold text-white">{salads[current].flashcard.front}</p>
                    <p className="text-sm text-lime-100 mt-3 font-medium">Click to reveal answer</p>
                  </div>
                </div>
                {/* Back */}
                <div
                  className={`bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 min-h-[200px] flex items-center justify-center text-center absolute top-0 left-0 w-full ${!isFlipped ? "invisible" : "visible"}`}
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div>
                    <div className="text-5xl mb-4">✅</div>
                    <p className="text-lg font-semibold text-white leading-relaxed">{salads[current].flashcard.back}</p>
                    <p className="text-sm text-green-100 mt-3">Click to see question</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="mt-6">
              <h4 className="font-extrabold text-green-900 mb-3">Key Points:</h4>
              <div className="grid grid-cols-2 gap-2">
                {salads[current].keyPoints.map((point, idx) => (
                  <div key={idx} className="bg-green-50 border-2 border-green-200 rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2 hover:border-green-400 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-green-800 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Sidebar */}
        <div className="space-y-5">

          {/* Lecture Notes + Audio */}
          <div className="bg-white rounded-3xl p-6 border-2 border-green-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-green-900 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-500 rounded-xl flex items-center justify-center shadow">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                Lecture Notes
              </h3>
              {/* Audio controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAutoPlay}
                  title={autoPlay ? "Auto-play on" : "Auto-play off"}
                  className={`p-2 rounded-xl transition-all border-2 ${autoPlay ? "bg-gradient-to-r from-lime-500 to-green-600 text-white border-green-600" : "bg-green-50 text-green-700 border-green-200 hover:border-green-400"}`}
                >
                  {autoPlay ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                {isPlaying ? (
                  <button onClick={pauseAudio} className="p-2 bg-red-400 hover:bg-red-500 text-white rounded-xl transition-all border-2 border-red-400">
                    <Pause className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={playAudio} className="p-2 bg-gradient-to-r from-lime-500 to-green-600 text-white rounded-xl transition-all hover:shadow-md hover:scale-105">
                    <Play className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Playback speed */}
            <div className="mb-4 bg-green-50 rounded-2xl p-3 border-2 border-green-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-green-700">Playback Speed</label>
                <span className="text-xs font-extrabold text-green-700 bg-green-200 px-2 py-0.5 rounded-full">{playbackRate.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={playbackRate}
                onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-green-200 rounded-full appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-green-500 mt-1 font-medium">
                <span>0.5x</span>
                <span>1.0x</span>
                <span>2.0x</span>
              </div>
            </div>

            <p className="text-green-800 leading-relaxed text-sm">{salads[current].lectureNote}</p>
            <p className="mt-3 text-xs font-semibold text-green-500">Lesson {current + 1} of {salads.length}</p>
          </div>

          {/* Professor Card */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-6 border-2 border-green-200 shadow-lg hover:border-green-400 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center text-3xl shadow-lg">
                👨‍🏫
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-green-900">Professor Garcia</h3>
                <p className="text-sm text-green-600 font-medium">Culinary Instructor</p>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white rounded-3xl p-6 border-2 border-green-200 shadow-lg">
            <h4 className="font-extrabold text-green-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow">
                <span className="text-white text-sm">🍽️</span>
              </div>
              Examples
            </h4>
            <div className="space-y-3">
              {salads[current].examples.map((example, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-green-200 hover:border-green-400"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-green-100">
                    <img
                      src={example.image}
                      alt={example.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-5xl">🥗</div>';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-3 border-t-2 border-green-200">
                    <p className="font-extrabold text-green-900 text-sm text-center group-hover:text-green-700 transition-colors">
                      {example.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}