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
    ChevronUp,
    Users,
    ExternalLink,
    X,
    FileText,
} from "lucide-react";
import { useModules } from "../components/ModuleContext";
import ChatWidget from "../components/ChatWidget";
import ResearchersButton from "../components/ResearchersButton";

// ─────────────────────────────────────────────
// REFERENCES DATA — edit these to your actual sources
// ─────────────────────────────────────────────
const references = [
    {
        module: "Module 1",
        moduleColor: "from-lime-400 to-green-500",
        sources: [
            {
                title: "Classification of Salads",
                author: "National Restaurant Association Educational Foundation",
                year: "2022",
                url: "https://www.nraef.org",
                type: "Book",
            },
            {
                title: "Culinary Fundamentals: Salad Types and Preparation",
                author: "Johnson, A. & Rivera, M.",
                year: "2021",
                url: "https://www.culinaryinstitute.edu",
                type: "Journal",
            },
        ],
    },
    {
        module: "Module 2",
        moduleColor: "from-green-400 to-emerald-500",
        sources: [
            {
                title: "Components of a Healthy Salad",
                author: "Harvard T.H. Chan School of Public Health",
                year: "2023",
                url: "https://www.hsph.harvard.edu",
                type: "Website",
            },
            {
                title: "Nutritional Balance in Salad Preparation",
                author: "Torres, L.",
                year: "2020",
                url: "https://www.nutritionjournal.com",
                type: "Journal",
            },
        ],
    },
    {
        module: "Module 3",
        moduleColor: "from-emerald-400 to-teal-500",
        sources: [
            {
                title: "Types of Salad Dressings: Science and Art",
                author: "Food Science Institute",
                year: "2022",
                url: "https://www.foodscience.org",
                type: "Book",
            },
            {
                title: "Emulsification Techniques in Modern Cuisine",
                author: "Dela Rosa, P.",
                year: "2021",
                url: "https://www.modernkitchen.com",
                type: "Journal",
            },
        ],
    },
    {
        module: "Module 4",
        moduleColor: "from-yellow-400 to-lime-500",
        sources: [
            {
                title: "Food Hygiene and Safety in Salad Preparation",
                author: "World Health Organization",
                year: "2023",
                url: "https://www.who.int/foodsafety",
                type: "Website",
            },
            {
                title: "Professional Plating Techniques",
                author: "Culinary Arts Academy",
                year: "2022",
                url: "https://www.culinaryarts.edu",
                type: "Book",
            },
        ],
    },
];

// ─────────────────────────────────────────────
// REFERENCES MODAL
// ─────────────────────────────────────────────
const typeColors: Record<string, string> = {
    Book: "bg-lime-100 text-lime-800 border-lime-300",
    Journal: "bg-emerald-100 text-emerald-800 border-emerald-300",
    Website: "bg-yellow-100 text-yellow-800 border-yellow-300",
};

function ReferencesModal({ onClose }: { onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,40,20,0.55)", backdropFilter: "blur(8px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-green-200 overflow-hidden max-h-[90vh] flex flex-col"
                style={{ animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}
            >
                {/* Header */}
                <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 px-8 py-7 relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-300 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-300 rounded-full blur-3xl" />
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:rotate-90 duration-300 border border-white/20 z-10"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <div className="relative z-10">
                        <p className="text-lime-200 text-xs font-bold uppercase tracking-widest mb-1">Sources & Citations</p>
                        <h2 className="text-2xl font-extrabold text-white">References</h2>
                        <p className="text-green-100 text-sm mt-1">Materials used across all modules</p>
                    </div>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto p-6 space-y-5">
                    {references.map((group, gIdx) => (
                        <div key={gIdx} className="bg-gradient-to-br from-white to-green-50 rounded-2xl border-2 border-green-200 overflow-hidden">
                            <div className={`px-5 py-3 bg-gradient-to-r ${group.moduleColor} flex items-center gap-2`}>
                                <BookOpen className="w-4 h-4 text-white" />
                                <span className="text-white font-extrabold text-sm">{group.module}</span>
                            </div>
                            <div className="p-4 space-y-3">
                                {group.sources.map((src, sIdx) => (
                                    <div key={sIdx} className="flex items-start gap-3 p-3 bg-white rounded-xl border-2 border-green-100 hover:border-green-300 transition-all">
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-lime-100 to-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FileText className="w-4 h-4 text-green-700" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-extrabold text-green-900 text-sm leading-snug mb-0.5">{src.title}</p>
                                            <p className="text-green-600 text-xs font-medium">{src.author} • {src.year}</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full border-2 ${typeColors[src.type] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                                {src.type}
                                            </span>
                                            <a
                                                href={src.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 rounded-xl bg-green-50 hover:bg-gradient-to-r hover:from-yellow-300 hover:via-lime-400 hover:to-green-400 text-green-600 hover:text-green-900 border-2 border-green-200 hover:border-green-400 flex items-center justify-center transition-all hover:scale-105"
                                                title="Open source"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t-2 border-green-100 bg-green-50 flex-shrink-0">
                    <p className="text-xs text-green-500 font-medium text-center">
                        All references are cited in accordance with academic standards.
                    </p>
                </div>
            </div>
            <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.88) translateY(24px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
        </div>
    );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function NavigationPage() {
    const { modules } = useModules();
    const [expandedModule, setExpandedModule] = useState<number | null>(null);
    const [showReferences, setShowReferences] = useState(false);

    const completedCount = modules.filter(m => m.completed).length;
    const progressPercent = (completedCount / modules.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">

            {/* ── Hero Header ── */}
            <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-3 text-sm mb-6">
                        <span onClick={() => window.location.href = '/'} className="text-lime-200 font-semibold hover:text-white cursor-pointer transition-colors">
                            Home
                        </span>
                        <span className="text-white/40">›</span>
                        <span className="text-white/80 font-medium">FCS Food Preparation</span>
                    </div>

                    {/* Title + action buttons */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                                <span className="bg-gradient-to-r from-yellow-200 via-lime-200 to-green-200 bg-clip-text text-transparent">
                                    FCS Food Preparation
                                </span>
                                <br />
                                <span className="text-white text-3xl md:text-4xl">Salads and Salad Dressings</span>
                            </h1>
                            <p className="text-green-100 text-lg mb-6 max-w-2xl leading-relaxed">
                                Gain comprehensive knowledge of salad classification, components, types of dressings, and proper preparation guidelines. Designed for learners in Food and Consumer Services (FCS).
                            </p>
                            {/* Stats chips */}
                            <div className="flex flex-wrap items-center gap-3">
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

                        {/* ── Action buttons top-right of hero ── */}
                        <div className="flex flex-col gap-3 lg:items-end">
                            {/* Uses your existing ResearchersButton component as-is */}
                            <ResearchersButton />

                            <button
                                onClick={() => setShowReferences(true)}
                                className="flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md text-white font-extrabold rounded-2xl hover:bg-white/20 transition-all text-sm border-2 border-white/20 whitespace-nowrap"
                            >
                                <FileText className="w-4 h-4 text-lime-300" />
                                View References
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Course Content */}
                    <div className="lg:col-span-2">
                        {/* Progress Card */}
                        <div className="bg-white rounded-3xl shadow-sm border-2 border-green-200 p-6 mb-6">
                            <h2 className="text-2xl font-extrabold text-green-900 mb-1">Course Content</h2>
                            <p className="text-green-600 font-medium mb-5">{modules.length} modules • {completedCount} completed</p>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-semibold text-green-700">{progressPercent.toFixed(0)}% Complete</span>
                                    <span className="font-semibold text-green-500">{completedCount}/{modules.length}</span>
                                </div>
                                <div className="w-full bg-green-100 rounded-full h-2.5">
                                    <div className="bg-gradient-to-r from-lime-500 to-green-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                                </div>
                            </div>
                        </div>

                        {/* Module List */}
                        <div className="space-y-4">
                            {modules.map((module, index) => (
                                <div key={module.id} className="bg-white rounded-3xl shadow-sm border-2 border-green-200 overflow-hidden hover:border-green-400 hover:shadow-lg transition-all">
                                    <button
                                        onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                        className="w-full p-6 flex items-start gap-4 text-left hover:bg-green-50 transition-colors"
                                    >
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
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="text-lg font-extrabold text-green-900">
                                                    Module {module.id}: {module.title}
                                                </h3>
                                                {expandedModule === module.id
                                                    ? <ChevronUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                                                    : <ChevronDown className="w-5 h-5 text-green-400 flex-shrink-0" />}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-green-600 font-medium">
                                                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{module.lessons} lessons</span>
                                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{module.duration}</span>
                                            </div>
                                        </div>
                                    </button>

                                    {expandedModule === module.id && (
                                        <div className="px-6 pb-6 pt-0 border-t border-green-100">
                                            <p className="text-green-800 mb-5 mt-4 leading-relaxed">{module.description}</p>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <button
                                                    onClick={() => window.location.href = module.href}
                                                    disabled={module.locked}
                                                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold transition-all ${module.locked
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200"
                                                        : module.completed
                                                            ? "bg-green-50 text-green-700 hover:bg-green-100 border-2 border-green-300 hover:border-green-400"
                                                            : "bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105"
                                                        }`}
                                                >
                                                    {module.locked ? <><Lock className="w-5 h-5" /> Locked</>
                                                        : module.completed ? <><CheckCircle2 className="w-5 h-5" /> Review Module</>
                                                            : <><PlayCircle className="w-5 h-5" /> Start Module</>}
                                                </button>

                                                {/* Per-module Sources shortcut */}
                                                <button
                                                    onClick={() => setShowReferences(true)}
                                                    className="flex items-center gap-1.5 px-4 py-3 rounded-2xl font-semibold text-sm text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 transition-all"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    Sources
                                                </button>
                                            </div>
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
                                            <h3 className="text-xl font-extrabold text-green-900 mb-2">Final Quiz</h3>
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

                    {/* ── Sidebar ── */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-4">

                            {/* Progress Card */}
                            <div className="bg-white rounded-3xl shadow-sm border-2 border-green-200 overflow-hidden">
                                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,222,128,0.2),transparent_70%)]" />
                                    <span className="text-6xl relative z-10">🥗</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-extrabold text-xl text-green-900 mb-4">Your Progress</h3>
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
                                    <div className="w-full bg-green-100 rounded-full h-2 mb-6">
                                        <div className="bg-gradient-to-r from-lime-500 to-green-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                                    </div>
                                    <button className="w-full py-3 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold rounded-2xl hover:shadow-xl hover:shadow-lime-500/30 transition-all hover:scale-105">
                                        Continue Learning
                                    </button>
                                </div>
                            </div>

                            {/* ── Researchers sidebar card ── */}
                            <div className="bg-gradient-to-br from-white to-lime-50 rounded-3xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all overflow-hidden">
                                <div className="bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 px-5 py-3 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-lime-200" />
                                    <span className="text-white font-extrabold text-sm">Research Team</span>
                                </div>
                                <div className="p-5">
                                    <p className="text-green-700 text-sm font-medium mb-4 leading-relaxed">
                                        This course was developed by a dedicated team of culinary educators and researchers.
                                    </p>
                                    {/* Drop your component right here */}
                                    <ResearchersButton />
                                </div>
                            </div>

                            {/* ── References sidebar card ── */}
                            <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all overflow-hidden">
                                <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-lime-200" />
                                    <span className="text-white font-extrabold text-sm">References</span>
                                </div>
                                <div className="p-5">
                                    <p className="text-green-700 text-sm font-medium mb-4 leading-relaxed">
                                        All course materials are backed by verified academic and professional sources.
                                    </p>
                                    <div className="space-y-2 mb-4">
                                        {["Books", "Journals", "Websites"].map((type) => (
                                            <div key={type} className="flex items-center gap-2 text-xs font-semibold text-green-700">
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-lime-400 to-green-500" />
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setShowReferences(true)}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 font-extrabold rounded-2xl border-2 border-green-300 hover:border-green-500 transition-all text-sm hover:scale-105"
                                    >
                                        <FileText className="w-4 h-4" />
                                        View All References
                                    </button>
                                </div>
                            </div>

                            {/* Study Tips */}
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

            {/* ── References Modal ── */}
            {showReferences && <ReferencesModal onClose={() => setShowReferences(false)} />}

            {/* Floating Chat Widget */}
            <ChatWidget />
        </div>
    );
}