"use client";

import { useState } from "react";
import {
    PlayCircle,
    CheckCircle2,
    Lock,
    Clock,
    BookOpen,
    Award,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { useModules } from "../components/ModuleContext";
import ChatWidget from "../components/ChatWidget";

export default function NavigationPage() {
    const { modules } = useModules();
    const [expandedModule, setExpandedModule] = useState<number | null>(null);

    const completedCount = modules.filter(m => m.completed).length;
    const progressPercent = (completedCount / modules.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">

            {/* Hero Header — matches landing page */}
            <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 text-white relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-3 text-sm mb-6">
                        <span
                            onClick={() => window.location.href = '/'}
                            className="text-lime-200 font-semibold hover:text-white cursor-pointer transition-colors"
                        >
                            Home
                        </span>
                        <span className="text-white/40">›</span>
                        <span className="text-white/80 font-medium">FCS Food Preparation</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                        <span className="bg-gradient-to-r from-yellow-200 via-lime-200 to-green-200 bg-clip-text text-transparent">
                            FCS Food Preparation
                        </span>
                        <br />
                        <span className="text-white text-3xl md:text-4xl">Master Salad Techniques</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-green-100 text-lg mb-8 max-w-2xl leading-relaxed">
                        Learn professional salad preparation from classification to presentation. Perfect for culinary students and food enthusiasts.
                    </p>

                    {/* Stats chips — same as landing page */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                            <BookOpen className="w-5 h-5 text-lime-300" />
                            <span className="font-semibold">{modules.length} Modules</span>
                        </div>
                        <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                            <Clock className="w-5 h-5 text-yellow-300" />
                            <span className="font-semibold">2 Hours Total</span>
                        </div>
                        <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                            <Award className="w-5 h-5 text-lime-300" />
                            <span className="font-semibold">Certificate Included</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Course Content — Main Area */}
                    <div className="lg:col-span-2">

                        {/* Progress Card */}
                        <div className="bg-white rounded-3xl shadow-sm border-2 border-green-200 p-6 mb-6">
                            <h2 className="text-2xl font-extrabold text-green-900 mb-1">Course Content</h2>
                            <p className="text-green-600 font-medium mb-5">
                                {modules.length} modules • {completedCount} completed
                            </p>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-semibold text-green-700">{progressPercent.toFixed(0)}% Complete</span>
                                    <span className="font-semibold text-green-500">{completedCount}/{modules.length}</span>
                                </div>
                                <div className="w-full bg-green-100 rounded-full h-2.5">
                                    <div
                                        className="bg-gradient-to-r from-lime-500 to-green-600 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Module List */}
                        <div className="space-y-4">
                            {modules.map((module, index) => (
                                <div
                                    key={module.id}
                                    className="bg-white rounded-3xl shadow-sm border-2 border-green-200 overflow-hidden hover:border-green-400 hover:shadow-lg transition-all"
                                >
                                    {/* Module Header */}
                                    <button
                                        onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                        className="w-full p-6 flex items-start gap-4 text-left hover:bg-green-50 transition-colors"
                                    >
                                        {/* Icon */}
                                        <div className="flex-shrink-0">
                                            {module.completed ? (
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center shadow">
                                                    <CheckCircle2 className="w-6 h-6 text-white" />
                                                </div>
                                            ) : module.locked ? (
                                                <div className="w-10 h-10 rounded-xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                                                    <Lock className="w-5 h-5 text-gray-400" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center text-white font-extrabold shadow">
                                                    {index + 1}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="text-lg font-extrabold text-green-900">
                                                    Module {module.id}: {module.title}
                                                </h3>
                                                {expandedModule === module.id
                                                    ? <ChevronUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                                                    : <ChevronDown className="w-5 h-5 text-green-400 flex-shrink-0" />
                                                }
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-green-600 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <BookOpen className="w-4 h-4" />
                                                    {module.lessons} lessons
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {module.duration}
                                                </span>
                                            </div>
                                        </div>
                                    </button>

                                    {/* Expanded Content */}
                                    {expandedModule === module.id && (
                                        <div className="px-6 pb-6 pt-0 border-t border-green-100">
                                            <p className="text-green-800 mb-5 mt-4 leading-relaxed">
                                                {module.description}
                                            </p>

                                            <button
                                                onClick={() => window.location.href = module.href}
                                                disabled={module.locked}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold transition-all ${
                                                    module.locked
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200"
                                                        : module.completed
                                                            ? "bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-300 hover:border-green-400"
                                                            : "bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105"
                                                }`}
                                            >
                                                {module.locked ? (
                                                    <><Lock className="w-5 h-5" /> Locked</>
                                                ) : module.completed ? (
                                                    <><CheckCircle2 className="w-5 h-5" /> Review Module</>
                                                ) : (
                                                    <><PlayCircle className="w-5 h-5" /> Start Module</>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Final Quiz Card */}
                            <div className="bg-gradient-to-br from-white to-yellow-50 rounded-3xl shadow-sm border-2 border-yellow-300 overflow-hidden hover:shadow-lg transition-all">
                                <div className="p-6">
                                    <div className="flex items-start gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <Award className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-extrabold text-green-900 mb-2">
                                                Final Quiz
                                            </h3>
                                            <p className="text-green-700 mb-5 leading-relaxed">
                                                Test your understanding of salad preparation concepts from all modules. Make sure you've reviewed all modules before attempting the quiz.
                                            </p>
                                            <button
                                                onClick={() => window.location.href = "../quiz"}
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold rounded-2xl hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105 transition-all"
                                            >
                                                <Award className="w-5 h-5" />
                                                Take Final Quiz
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-4">

                            {/* Progress Card */}
                            <div className="bg-white rounded-3xl shadow-sm border-2 border-green-200 overflow-hidden">
                                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,222,128,0.2),transparent_70%)]"></div>
                                    <span className="text-6xl relative z-10">🥗</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-extrabold text-xl text-green-900 mb-4">
                                        Your Progress
                                    </h3>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-green-600 font-medium">Completed</span>
                                            <span className="font-extrabold text-green-700">{completedCount}/{modules.length}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-green-600 font-medium">Time Invested</span>
                                            <span className="font-extrabold text-green-700">0h 0m</span>
                                        </div>
                                    </div>
                                    {/* Progress bar in sidebar */}
                                    <div className="w-full bg-green-100 rounded-full h-2 mb-6">
                                        <div
                                            className="bg-gradient-to-r from-lime-500 to-green-600 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${progressPercent}%` }}
                                        />
                                    </div>
                                    <button className="w-full py-3 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold rounded-2xl hover:shadow-xl hover:shadow-lime-500/30 transition-all hover:scale-105">
                                        Continue Learning
                                    </button>
                                </div>
                            </div>

                            {/* Tips Card — matches landing page highlight cards */}
                            <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all">
                                <h3 className="font-extrabold text-green-900 mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-500 rounded-xl flex items-center justify-center shadow">
                                        <BookOpen className="w-4 h-4 text-white" />
                                    </div>
                                    Study Tips
                                </h3>
                                <ul className="space-y-2 text-sm text-green-800 font-medium">
                                    <li>• Take notes as you learn</li>
                                    <li>• Practice techniques hands-on</li>
                                    <li>• Complete modules in order</li>
                                    <li>• Review before the quiz</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Chat Widget */}
            <ChatWidget />
        </div>
    );
}