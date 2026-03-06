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
    image: "/image/apetizer.png",
    audioPath: "/image/audio/Appetizer salad.aac",
    lectureNote: "Appetizer salads are crucial for setting the tone of a meal. They should be light enough to stimulate appetite without filling up your guests. Focus on crisp, fresh ingredients with bright, acidic dressings. Remember: presentation matters most in appetizer salads as they create the first impression.",
    examples: [
      {
        name: "Caesar Salad",
        image: "/image/examples/ceasarsalad.png",
        ingredients: ["Romaine lettuce", "Caesar dressing", "Croutons", "Parmesan cheese", "Black pepper"],
        process: "Toss romaine lettuce with Caesar dressing until coated. Top with croutons and shaved Parmesan. Season with black pepper and serve immediately."
      },
      {
        name: "Garden Salad",
        image: "/image/examples/gardensalad.png",
        ingredients: ["Mixed greens", "Cherry tomatoes", "Cucumber", "Red onion", "Vinaigrette"],
        process: "Combine all vegetables in a bowl. Drizzle with vinaigrette and toss lightly. Serve chilled."
      },
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
    examples: [
      {
        name: "Coleslaw",
        image: "/image/examples/coleslaw.png",
        ingredients: ["Shredded cabbage", "Carrots", "Mayonnaise", "Vinegar", "Sugar"],
        process: "Mix shredded cabbage and carrots. Stir together mayo, vinegar, and sugar. Toss with vegetables and chill before serving."
      },
      {
        name: "Mixed Green Salad",
        image: "/image/examples/mixsalad.png",
        ingredients: ["Mixed greens", "Bell pepper", "Red onion", "Olive oil", "Lemon juice"],
        process: "Combine greens and vegetables. Whisk olive oil and lemon juice together, drizzle over salad, and toss gently."
      },
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
    examples: [
      {
        name: "Chef Salad",
        image: "/image/examples/chef.png",
        ingredients: ["Romaine lettuce", "Ham", "Turkey", "Hard-boiled egg", "Cheddar cheese", "Thousand Island dressing"],
        process: "Layer lettuce with sliced ham, turkey, and egg. Add cheese strips on top. Serve with dressing on the side."
      },
      {
        name: "Cobb Salad",
        image: "/image/examples/cobb.png",
        ingredients: ["Romaine lettuce", "Grilled chicken", "Avocado", "Bacon bits", "Blue cheese", "Vinaigrette"],
        process: "Arrange lettuce as base. Place rows of chicken, avocado, and bacon on top. Crumble blue cheese and drizzle with vinaigrette."
      },
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
    examples: [
      {
        name: "Waldorf Salad",
        image: "/image/examples/waldrof.png",
        ingredients: ["Apples", "Celery", "Walnuts", "Grapes", "Mayonnaise", "Lemon juice"],
        process: "Dice apples and celery. Toss with lemon juice to prevent browning. Mix in walnuts and grapes. Fold in mayonnaise and chill."
      },
      {
        name: "Ambrosia Salad",
        image: "/image/examples/ambrosia.png",
        ingredients: ["Mandarin oranges", "Pineapple chunks", "Coconut flakes", "Mini marshmallows", "Whipped cream"],
        process: "Drain all canned fruits well. Fold together with coconut, marshmallows, and whipped cream. Refrigerate for at least 1 hour before serving."
      },
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
    examples: [
      {
        name: "Waldorf Salad",
        image: "/image/examples/waldrof.png",
        ingredients: ["Apples", "Celery", "Walnuts", "Grapes", "Mayonnaise", "Lemon juice"],
        process: "Dice apples and celery. Toss with lemon juice. Mix in walnuts and grapes. Fold in mayonnaise and serve chilled."
      },
      {
        name: "Ambrosia Salad",
        image: "/image/examples/ambrosia.png",
        ingredients: ["Mandarin oranges", "Pineapple chunks", "Coconut flakes", "Mini marshmallows", "Whipped cream"],
        process: "Drain fruits thoroughly. Combine with coconut and marshmallows. Fold in whipped cream and refrigerate before serving."
      },
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
    examples: [
      {
        name: "Coleslaw",
        image: "/image/examples/coleslaw.png",
        ingredients: ["Shredded cabbage", "Carrots", "Mayonnaise", "Apple cider vinegar", "Salt & pepper"],
        process: "Shred cabbage and carrots. Mix dressing ingredients and toss with vegetables. Chill for 30 minutes before serving."
      },
      {
        name: "Side Garden Salad",
        image: "/image/examples/gardensalad.png",
        ingredients: ["Romaine lettuce", "Tomatoes", "Cucumber", "Croutons", "Italian dressing"],
        process: "Chop vegetables and place over lettuce. Add croutons and drizzle with Italian dressing just before serving."
      },
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
    examples: [
      {
        name: "Caesar Salad",
        image: "/image/examples/caesar.png",
        ingredients: ["Romaine lettuce", "Caesar dressing", "Croutons", "Parmesan", "Lemon juice"],
        process: "Wash and dry romaine. Toss with Caesar dressing. Top with croutons, Parmesan, and a squeeze of lemon."
      },
      {
        name: "Garden Salad",
        image: "/image/examples/garden.png",
        ingredients: ["Spinach", "Arugula", "Tomatoes", "Cucumbers", "Olive oil", "Balsamic vinegar"],
        process: "Combine greens with vegetables. Whisk olive oil and balsamic together and drizzle over. Toss and serve immediately."
      },
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
    examples: [
      {
        name: "Pasta Salad",
        image: "/image/examples/pasta.png",
        ingredients: ["Rotini pasta", "Cherry tomatoes", "Olives", "Bell pepper", "Italian dressing"],
        process: "Cook pasta and cool completely. Toss with vegetables and Italian dressing. Chill for 1 hour before serving."
      },
      {
        name: "Bean Salad",
        image: "/image/examples/beansalad.png",
        ingredients: ["Kidney beans", "Chickpeas", "Green beans", "Red onion", "Vinegar", "Olive oil"],
        process: "Drain and rinse beans. Combine with green beans and onion. Toss with vinegar and olive oil. Marinate 30 minutes."
      },
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
    examples: [
      {
        name: "Potato Salad",
        image: "/image/examples/potato.png",
        ingredients: ["Potatoes", "Hard-boiled eggs", "Celery", "Mayonnaise", "Mustard", "Salt & pepper"],
        process: "Boil whole potatoes, cool, then dice. Mix mayo and mustard. Fold in eggs, celery, and potatoes. Chill before serving."
      },
      {
        name: "Chicken Salad",
        image: "/image/examples/chicken.png",
        ingredients: ["Cooked chicken breast", "Celery", "Red grapes", "Mayonnaise", "Lemon juice"],
        process: "Shred cooled chicken. Mix with celery and grapes. Fold in mayo and lemon juice. Refrigerate and serve chilled."
      },
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
    examples: [
      {
        name: "Fruit Cocktail",
        image: "/image/examples/fruitcocktail.png",
        ingredients: ["Pineapple chunks", "Peaches", "Pears", "Grapes", "Cherry", "Light syrup"],
        process: "Drain canned fruits and combine. Add fresh grapes and cherries. Toss in light syrup and chill before serving."
      },
      {
        name: "Tropical Fruit Salad",
        image: "/image/examples/tropical.png",
        ingredients: ["Mango", "Papaya", "Pineapple", "Kiwi", "Lime juice", "Honey"],
        process: "Dice all fruits into bite-sized pieces. Drizzle with lime juice and honey. Toss gently and serve immediately."
      },
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
    examples: [
      {
        name: "Cobb Salad",
        image: "/image/examples/cobb.png",
        ingredients: ["Romaine lettuce", "Grilled chicken", "Avocado", "Bacon", "Blue cheese", "Vinaigrette"],
        process: "Lay lettuce as base. Arrange rows of chicken, avocado, and bacon without mixing. Crumble blue cheese and drizzle dressing."
      },
      {
        name: "Niçoise Salad",
        image: "/image/examples/nicoise.png",
        ingredients: ["Mixed greens", "Tuna", "Hard-boiled eggs", "Green beans", "Olives", "Dijon vinaigrette"],
        process: "Arrange greens on plate. Place tuna, eggs, green beans, and olives in separate sections. Drizzle with Dijon vinaigrette."
      },
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
    examples: [
      {
        name: "Fruit Gelatin Salad",
        image: "/image/examples/gelatinfruit.png",
        ingredients: ["Flavored gelatin (Jell-O)", "Hot water", "Cold water", "Canned fruit cocktail"],
        process: "Dissolve gelatin in hot water, add cold water. Drain fruits and stir in. Pour into mold and refrigerate until firm."
      },
      {
        name: "Vegetable Aspic",
        image: "/image/examples/aspic.png",
        ingredients: ["Unflavored gelatin", "Vegetable broth", "Diced carrots", "Peas", "Celery"],
        process: "Dissolve gelatin in warm broth. Add diced vegetables and pour into mold. Refrigerate for 4 hours until fully set."
      },
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

      {/* ── Hero Header ── */}
      <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-green-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
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

        {/* ── LEFT COLUMN ── */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
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

          {/* Ingredients & Process */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-green-200">
            <h3 className="text-xl font-extrabold text-green-900 mb-5 flex items-center gap-2">
              🍽️ Ingredients & Process
            </h3>

            <div className="space-y-5">
              {salads[current].examples.map((example, idx) => (
                <div key={idx} className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl border-2 border-green-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-lime-500 to-green-600 px-4 py-2.5">
                    <span className="text-white font-extrabold text-sm">{example.name}</span>
                  </div>
                  <div className="p-4 grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-extrabold text-green-500 uppercase tracking-wider mb-2">Ingredients</p>
                      <div className="flex flex-wrap gap-1.5">
                        {example.ingredients.map((ing, iIdx) => (
                          <span
                            key={iIdx}
                            className="bg-white text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border-2 border-green-200"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-green-500 uppercase tracking-wider mb-2">Process</p>
                      <p className="text-green-800 text-sm leading-relaxed">{example.process}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Points */}
            <div className="mt-5">
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
        {/* ── END LEFT COLUMN ── */}

        {/* ── RIGHT COLUMN (SIDEBAR) ── */}
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
          {/* ── END RIGHT COLUMN ── */}
  
        </div>
      </div>
    );
  }