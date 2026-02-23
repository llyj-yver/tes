"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, SkipForward, SkipBack, CheckCircle2, XCircle, Award, BookOpen, Clock } from 'lucide-react';

interface QuizQuestion {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  aDescription: string;
  bDescription: string;
  cDescription: string;
  dDescription: string;
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  timePopUp: number;
}

const quizData: QuizQuestion[] = [
  {
    question: "Why is it important to wear proper PPE and wash all salad vegetables?",
    a: "To make the salad taste sweeter",
    b: "To reduce cooking time",
    c: "To maintain cleanliness and prevent food contamination",
    d: "To increase the size of the vegetables",
    aDescription: "Taste isn't affected by PPE.",
    bDescription: "Washing doesn't change cooking duration.",
    cDescription: "Correct! PPE and washing are essential for hygiene and food safety.",
    dDescription: "Washing does not grow the vegetables.",
    correctAnswer: "c",
    timePopUp: 11
  },
  {
    question: "In preparing the ingredients, why should we wash it thoroughly?",
    a: "To remove dirt and impurities",
    b: "To add extra bacteria for a better flavor profile",
    c: "To help the dressing slide off the leaves easily",
    d: "To increase the temperature of the vegetables before serving",
    aDescription: "Correct! Thorough washing removes physical and biological contaminants.",
    bDescription: "Bacteria should be removed, not added!",
    cDescription: "Dressing should adhere, not slide off.",
    dDescription: "Washing usually uses cool water, not hot.",
    correctAnswer: "a",
    timePopUp: 28
  },
  {
    question: "Why should potatoes be boiled whole before peeling and cutting?",
    a: "To reduce cooking time",
    b: "To make peeling easier",
    c: "To preserve nutrients",
    d: "To make the potatoes softer for frying",
    aDescription: "Boiling whole actually takes longer than small pieces.",
    bDescription: "While true, it's not the primary nutritional reason.",
    cDescription: "Correct! Cooking them whole keeps vitamins and minerals locked inside.",
    dDescription: "This is for salads, not frying.",
    correctAnswer: "c",
    timePopUp: 42
  },
  {
    question: "Why should vegetables be peeled only after cooling?",
    a: "To avoid burning your hands",
    b: "To prevent damage to the texture and avoid overcooking",
    c: "To make chopping faster",
    d: "To increase the size of the vegetables",
    aDescription: "Safety is a factor, but texture is the culinary priority.",
    bDescription: "Correct! Cooling stabilizes the vegetable so peeling doesn't turn it into mush.",
    cDescription: "Cooling actually adds a step to the process.",
    dDescription: "Vegetables don't grow after being cooked.",
    correctAnswer: "b",
    timePopUp: 51
  },
  {
    question: "Why should we chop all the ingredients into uniform pieces?",
    a: "To make sure some pieces stay raw while others are overcooked",
    b: "To prevent the salad dressing from touching the vegetables",
    c: "To make the salad much harder to chew and swallow",
    d: "To ensure visual appeal and easier mixing",
    aDescription: "Uniformity ensures even cooking/texture.",
    bDescription: "Uniformity helps dressing coat evenly.",
    cDescription: "Uniformity makes it easier to eat, not harder.",
    dDescription: "Correct! Evenly sized pieces look professional and mix better.",
    correctAnswer: "d",
    timePopUp: 63
  },
  {
    question: "Why should cooked ingredients be thoroughly cooled before mixing with mayonnaise?",
    a: "To improve the color of the salad",
    b: "To make chopping easier",
    c: "To prevent the mayonnaise from spoiling and ensure food safety",
    d: "To cook the mayonnaise faster",
    aDescription: "Cooling is about safety, not aesthetics.",
    bDescription: "Chopping should be done before mixing.",
    cDescription: "Correct! Heat can cause mayonnaise to break down and breed bacteria.",
    dDescription: "Mayonnaise should not be cooked in a salad.",
    correctAnswer: "c",
    timePopUp: 72
  },
  {
    question: "Why should the dressing be gently mixed into the salad?",
    a: "To cool the salad faster",
    b: "To add more salt",
    c: "To avoid crushing or damaging the main ingredients",
    d: "To make the salad thicker",
    aDescription: "Mixing doesn't significantly lower temperature.",
    bDescription: "Salt is in the dressing, not the mixing style.",
    cDescription: "Correct! Gentle mixing preserves the integrity and texture of the ingredients.",
    dDescription: "Gentle mixing maintains lightness.",
    correctAnswer: "c",
    timePopUp: 96
  },
  {
    question: "How should plating be done?",
    a: "Make it colorful and attractive",
    b: "Stack all ingredients randomly",
    c: "Serve in a separate bowl only",
    d: "Blend all ingredients together",
    aDescription: "Correct! Visual appeal is a key part of the dining experience.",
    bDescription: "Random stacking looks messy.",
    cDescription: "Plating can be done on plates or bowls.",
    dDescription: "Blending turns a salad into a smoothie!",
    correctAnswer: "a",
    timePopUp: 110
  },
  {
    question: "Why is it important to arrange salad ingredients properly according to color, shape, texture, and flavor?",
    a: "To make the salad heavier",
    b: "To maintain balance and enhance the appearance; the right combination makes it more visually appealing and tasty",
    c: "To make it cook faster",
    d: "To reduce the cost of ingredients",
    aDescription: "Arrangement doesn't change the weight.",
    bDescription: "Correct! We eat with our eyes first; balance is key.",
    cDescription: "Arrangement happens after cooking.",
    dDescription: "The cost remains the same regardless of placement.",
    correctAnswer: "b",
    timePopUp: 119
  },
  {
    question: "What is the main goal of following proper guidelines when making salad?",
    a: "To make the salad spicy",
    b: "To create a salad that is clean, safe to eat, tasty, and visually appealing",
    c: "To reduce the number of ingredients",
    d: "To make the salad heavier",
    aDescription: "Spiciness is a flavor choice, not a general goal.",
    bDescription: "Correct! The ultimate goal is a safe, high-quality, and delicious dish.",
    cDescription: "Guidelines don't dictate the count of ingredients.",
    dDescription: "Heaviness is not a quality standard.",
    correctAnswer: "b",
    timePopUp: 128
  }
];

const VideoQuizSystem: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'a' | 'b' | 'c' | 'd' | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [askedQuestions, setAskedQuestions] = useState<Set<number>>(new Set());
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const progress = (askedQuestions.size / quizData.length) * 100;

  useEffect(() => {
    const completedModules = localStorage.getItem('completedModules');
    if (completedModules) {
      const modules = JSON.parse(completedModules);
      if (modules.module4) setIsCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (askedQuestions.size === quizData.length && !isCompleted) {
      const completedModules = localStorage.getItem('completedModules');
      let modules = completedModules ? JSON.parse(completedModules) : {};
      modules.module4 = true;
      localStorage.setItem('completedModules', JSON.stringify(modules));
      setIsCompleted(true);
      window.dispatchEvent(new Event('moduleCompleted'));
    }
  }, [askedQuestions.size, isCompleted]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);
    for (let i = 0; i < quizData.length; i++) {
      if (!askedQuestions.has(i) && Math.abs(time - quizData[i].timePopUp) < 0.3) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowQuiz(true);
        setCurrentQuizIndex(i);
        setAskedQuestions(prev => new Set([...prev, i]));
        break;
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setVideoDuration(videoRef.current.duration);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const resetVideo = (): void => {
    setCurrentTime(0);
    setIsPlaying(false);
    setShowQuiz(false);
    setAskedQuestions(new Set());
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const skipTime = (seconds: number): void => {
    setCurrentTime(prev => Math.max(0, Math.min(videoDuration, prev + seconds)));
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * videoDuration);
  };

  const handleAnswerSelect = (answer: 'a' | 'b' | 'c' | 'd'): void => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = (): void => {
    if (selectedAnswer) setShowExplanation(true);
  };

  const handleNextQuestion = (): void => {
    const currentQuiz = quizData[currentQuizIndex];
    if (selectedAnswer === currentQuiz.correctAnswer) {
      setShowQuiz(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsPlaying(true);
      setTimeout(() => {
        videoRef.current?.play();
      }, 50);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuiz = quizData[currentQuizIndex];
  const isCorrect = selectedAnswer === currentQuiz?.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">

      {/* Hero Header — matches landing page hero style */}
      <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
          {/* Back button */}
          <button
            onClick={() => window.location.href = '/navigation'}
            className="flex items-center gap-2 text-green-100 hover:text-white transition-colors mb-6 group"
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
                  Module 4
                </span>
                <br />
                <span className="text-white text-3xl md:text-4xl">Interactive Video Quiz</span>
              </h1>
              <p className="text-green-100 text-lg">
                Watch the video and answer questions as they appear
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Stats chips — same as landing page */}
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                <BookOpen className="w-5 h-5 text-lime-300" />
                <span className="font-semibold">{quizData.length} Questions</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">{formatTime(videoDuration)}</span>
              </div>
              {isCompleted && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 px-5 py-3 rounded-full font-bold shadow-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

          {/* Left — Video + Quiz */}
          <div className="space-y-6">

            {/* Video Player Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-green-200">
              <div className="relative aspect-video bg-gray-950">
                <video
                  ref={videoRef}
                  src="https://drive.google.com/uc?export=download&id=1c6I8jWm0zKwMMvkT8QebP7bkgdDUebpF"
                  className="w-full h-full object-contain"
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  playsInline
                />
              </div>

              {/* Controls */}
              {!showQuiz && (
                <div className="bg-gradient-to-r from-lime-50 to-green-50 px-6 py-5">
                  {/* Timeline */}
                  <div className="mb-4">
                    <div
                      onClick={handleTimelineClick}
                      className="w-full bg-green-200 rounded-full h-2.5 cursor-pointer relative group"
                    >
                      {/* Quiz markers */}
                      {quizData.map((quiz, idx) => (
                        <div
                          key={idx}
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                          style={{ left: `${(quiz.timePopUp / videoDuration) * 100}%` }}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow transition-all ${askedQuestions.has(idx) ? 'bg-green-500' : 'bg-yellow-400 animate-pulse'}`} />
                        </div>
                      ))}
                      {/* Progress */}
                      <div
                        className="bg-gradient-to-r from-lime-500 to-green-600 h-full rounded-full transition-all"
                        style={{ width: `${(currentTime / videoDuration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-green-700 mt-2 font-medium">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(videoDuration)}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlayPause}
                      className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white p-3 rounded-full transition-all hover:scale-105 shadow-md"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button
                      onClick={() => skipTime(-10)}
                      className="bg-white hover:bg-green-50 text-green-700 p-2.5 rounded-full transition-all shadow-sm border-2 border-green-200 hover:border-green-400"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => skipTime(10)}
                      className="bg-white hover:bg-green-50 text-green-700 p-2.5 rounded-full transition-all shadow-sm border-2 border-green-200 hover:border-green-400"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                    <button
                      onClick={resetVideo}
                      className="bg-white hover:bg-green-50 text-green-700 p-2.5 rounded-full transition-all shadow-sm border-2 border-green-200 hover:border-green-400"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3 ml-auto">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="bg-white hover:bg-green-50 text-green-700 p-2.5 rounded-full transition-all shadow-sm border-2 border-green-200 hover:border-green-400"
                      >
                        {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
                        className="w-24 h-1 accent-green-600 cursor-pointer"
                      />
                      <button className="bg-white hover:bg-green-50 text-green-700 p-2.5 rounded-full transition-all shadow-sm border-2 border-green-200 hover:border-green-400">
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quiz Card — styled like landing page popup */}
            {showQuiz && currentQuiz && (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-green-200 animate-fade-in">

                {/* Quiz Header — matches landing page hero gradient */}
                <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 text-white px-8 py-6 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-300 rounded-full blur-3xl"></div>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-300 via-lime-400 to-green-400 flex items-center justify-center shadow-lg">
                        <span className="font-extrabold text-green-900 text-2xl">?</span>
                      </div>
                      <div>
                        <p className="text-lime-200 text-sm font-semibold uppercase tracking-widest mb-0.5">Knowledge Check</p>
                        <h3 className="font-extrabold text-xl">Question {currentQuizIndex + 1} of {quizData.length}</h3>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      ⏱ {formatTime(currentQuiz.timePopUp)}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Question */}
                  <h3 className="text-2xl font-extrabold text-green-900 mb-8 leading-snug">
                    {currentQuiz.question}
                  </h3>

                  {/* Answer Options */}
                  <div className="space-y-4 mb-8">
                    {(['a', 'b', 'c', 'd'] as const).map((option) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrectOption = option === currentQuiz.correctAnswer;
                      const showCorrect = showExplanation && isCorrectOption;
                      const showIncorrect = showExplanation && isSelected && !isCorrect;

                      return (
                        <button
                          key={option}
                          onClick={() => !showExplanation && handleAnswerSelect(option)}
                          disabled={showExplanation}
                          className={`w-full text-left p-5 border-2 rounded-2xl transition-all font-medium text-lg
                            ${showCorrect
                              ? 'border-green-500 bg-green-50 text-green-900'
                              : showIncorrect
                                ? 'border-red-400 bg-red-50 text-red-900'
                                : isSelected
                                  ? 'border-lime-500 bg-lime-50 text-green-900'
                                  : 'border-green-200 hover:border-green-400 hover:bg-green-50 text-green-800'
                            } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
                        >
                          <div className="flex items-center gap-4">
                            {/* Option badge */}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold text-sm transition-all
                              ${showCorrect
                                ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
                                : showIncorrect
                                  ? 'bg-red-400 text-white'
                                  : isSelected
                                    ? 'bg-gradient-to-br from-lime-500 to-green-600 text-white'
                                    : 'bg-green-100 text-green-700'
                              }`}>
                              {showCorrect
                                ? <CheckCircle2 className="w-5 h-5" />
                                : showIncorrect
                                  ? <XCircle className="w-5 h-5" />
                                  : option.toUpperCase()
                              }
                            </div>
                            <span>{currentQuiz[option]}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation box — matches landing page card style */}
                  {showExplanation && selectedAnswer && (
                    <div className={`p-5 rounded-2xl mb-6 border-2 ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-0.5">
                          {isCorrect
                            ? <CheckCircle2 className="w-6 h-6 text-green-600" />
                            : <XCircle className="w-6 h-6 text-red-500" />}
                        </div>
                        <div>
                          <h4 className={`font-extrabold text-lg mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {isCorrect ? '🎉 Correct!' : 'Not quite right'}
                          </h4>
                          <p className={`text-base leading-relaxed ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {currentQuiz[`${selectedAnswer}Description` as keyof QuizQuestion]}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action buttons — same style as landing page CTA */}
                  {!showExplanation ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={!selectedAnswer}
                      className="w-full bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-green-900 font-extrabold py-4 px-6 rounded-2xl transition-all text-lg shadow-md hover:shadow-xl hover:shadow-lime-500/30 hover:scale-[1.02]"
                    >
                      Check Answer
                    </button>
                  ) : isCorrect ? (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg shadow-md hover:shadow-xl hover:shadow-lime-500/30 hover:scale-[1.02]"
                    >
                      Continue Video
                      <Play className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => { setSelectedAnswer(null); setShowExplanation(false); }}
                      className="w-full bg-gradient-to-r from-red-400 to-orange-400 hover:from-red-500 hover:to-orange-500 text-white font-extrabold py-4 px-6 rounded-2xl transition-all text-lg shadow-md hover:scale-[1.02]"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-8 space-y-4">

              {/* Progress Card — matches landing page card style */}
              <div className="bg-white rounded-3xl shadow-sm border-2 border-green-200 overflow-hidden">
                <div className="w-full h-32 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,222,128,0.2),transparent_70%)]"></div>
                  <span className="text-6xl relative z-10">🥗</span>
                </div>

                <div className="p-6">
                  <h3 className="font-extrabold text-xl text-green-900 mb-5">Your Progress</h3>

                  {/* Progress bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-green-700">Quiz Completion</span>
                      <span className="font-extrabold text-green-700">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-lime-500 to-green-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-green-600 mt-2 font-medium">
                      {askedQuestions.size} of {quizData.length} quizzes done
                    </p>
                  </div>

                  <div className="space-y-2 text-sm mb-5">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Current time</span>
                      <span className="font-semibold text-green-700">{formatTime(currentTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total length</span>
                      <span className="font-semibold text-green-700">{formatTime(videoDuration)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quiz Timeline Card */}
              <div className="bg-white rounded-3xl shadow-sm border-2 border-green-200 p-6">
                <h4 className="font-extrabold text-green-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  Quiz Timeline
                </h4>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {quizData.map((quiz, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                        askedQuestions.has(idx)
                          ? 'bg-green-50 border-green-300'
                          : 'bg-lime-50 border-lime-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow ${
                        askedQuestions.has(idx)
                          ? 'bg-gradient-to-br from-lime-500 to-green-600'
                          : 'bg-gradient-to-br from-lime-300 to-green-400'
                      }`}>
                        {askedQuestions.has(idx)
                          ? <CheckCircle2 className="w-5 h-5 text-white" />
                          : <span className="text-white font-extrabold text-sm">{idx + 1}</span>
                        }
                      </div>
                      <div>
                        <p className="text-sm font-bold text-green-900">Quiz {idx + 1}</p>
                        <p className="text-xs text-green-600">{formatTime(quiz.timePopUp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completion badge — same award card style as landing page */}
              {progress === 100 && (
                <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl border-2 border-yellow-300 p-6 text-center shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-extrabold text-xl text-yellow-900 mb-2">Module Complete! 🎉</h4>
                  <p className="text-yellow-700 text-sm mb-5">Great job finishing all knowledge checks</p>
                  <button
                    onClick={() => window.location.href = '/navigation'}
                    className="w-full bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold py-3 px-4 rounded-2xl transition-all hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105"
                  >
                    Back to Course →
                  </button>
                </div>
              )}

              {/* Study Tips — matches landing page tips card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border-2 border-green-200">
                <h3 className="font-extrabold text-green-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  Study Tips
                </h3>
                <ul className="space-y-2 text-sm text-green-800 font-medium">
                  <li>• Answer each question before continuing</li>
                  <li>• Re-watch sections you found tricky</li>
                  <li>• Take notes on key hygiene steps</li>
                  <li>• Review all modules before the final quiz</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoQuizSystem;