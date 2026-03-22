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
    ClipboardList,
    Menu,
    Home,
} from "lucide-react";
import { useModules } from "../components/ModuleContext";
import ChatWidget from "../components/ChatWidget";
import ResearchersButton from "../components/ResearchersButton";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────
// REFERENCES DATA — edit these to your actual sources
// ─────────────────────────────────────────────
const references = [
    // ─── Module 1 ─────────────────────────────────────────────────────────────
    {
        module: "Module 1",
        moduleColor: "from-lime-400 to-green-500",
        sources: [
            {
                title: "TLE 9 2nd Quarter Module",
                author: "Scribd",
                year: "2023",
                url: "https://www.scribd.com/document/526856466/TLE-9-2nd-Quarter-Module",
                type: "Module",
            },
        ],
    },

    // ─── Module 2 (all sources merged into one group) ─────────────────────────
    {
        module: "Module 2",
        moduleColor: "from-emerald-400 to-green-500",
        sources: [
            // Written Reference
            {
                title: "Module 5: Prepare Salad and Dressing",
                author: "Scribd",
                year: "2023",
                url: "https://www.scribd.com/document/469212585/MODULE-5-PREPARE-SALAD-AND-DRESSING",
                type: "Module",
            },
            // Base Images
            {
                title: "Lettuce – Base Image",
                author: "lettuceinfo.org",
                year: "2023",
                url: "https://lettuceinfo.org/products/arugula/",
                type: "Image",
            },
            {
                title: "Spinach – Base Image",
                author: "bedford.tennessee.edu",
                year: "2023",
                url: "https://bedford.tennessee.edu/spinach/",
                type: "Image",
            },
            {
                title: "Arugula – Base Image",
                author: "lettuceinfo.org",
                year: "2023",
                url: "https://lettuceinfo.org/products/arugula/",
                type: "Image",
            },
            {
                title: "Kale – Base Image",
                author: "healthyfood.com",
                year: "2023",
                url: "https://www.healthyfood.com/healthy-shopping/in-season-mid-winter-kale/",
                type: "Image",
            },
            // Body Images
            {
                title: "Body Ingredient 1 – Body Image",
                author: "rb.gy",
                year: "2023",
                url: "https://rb.gy/ch7isr",
                type: "Image",
            },
            {
                title: "Body Ingredient 2 – Body Image",
                author: "blinkurls.com",
                year: "2023",
                url: "https://blinkurls.com/R0W8j2",
                type: "Image",
            },
            {
                title: "Body Ingredient 3 – Body Image",
                author: "blinkurls.com",
                year: "2023",
                url: "https://blinkurls.com/O5vj1N",
                type: "Image",
            },
            {
                title: "Body Ingredient 4 – Body Image",
                author: "blinkurls.com",
                year: "2023",
                url: "https://blinkurls.com/Od6yqB",
                type: "Image",
            },
            // Garnish Images
            {
                title: "Garnish Image 1 – Garnish",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/xqQ3fy",
                type: "Image",
            },
            {
                title: "Garnish Image 2 – Garnish",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/Eci9f4",
                type: "Image",
            },
            {
                title: "Garnish Image 3 – Garnish",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/Y9VtUz",
                type: "Image",
            },
            {
                title: "Garnish Image 4 – Garnish",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/TTdIHf",
                type: "Image",
            },
            {
                title: "Garnish Image 5 – Garnish",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/7aLy0C",
                type: "Image",
            },
            {
                title: "Garnish Image 6 – Garnish",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/drZtQ8",
                type: "Image",
            },
            // Dressing Images
            {
                title: "Dressing Image 1 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/1gbpPq",
                type: "Image",
            },
            {
                title: "Dressing Image 2 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/HHZ1f0",
                type: "Image",
            },
            {
                title: "Dressing Image 3 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/emQfXz",
                type: "Image",
            },
            {
                title: "Other Dressing 1 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/YAnQ3v",
                type: "Image",
            },
            {
                title: "Other Dressing 2 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/TTdIHf",
                type: "Image",
            },
            {
                title: "Other Dressing 3 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/ZAaQjU",
                type: "Image",
            },
            {
                title: "Oil & Vinegar Dressing 1 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/vRR2id",
                type: "Image",
            },
            {
                title: "Oil & Vinegar Dressing 2 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/0vhDFU",
                type: "Image",
            },
            {
                title: "Oil & Vinegar Dressing 3 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/fcc9Lb",
                type: "Image",
            },
            {
                title: "Temporary Emulsion 1 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/IB082t",
                type: "Image",
            },
            {
                title: "Temporary Emulsion 2 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/j9mN1N",
                type: "Image",
            },
            {
                title: "Temporary Emulsion 3 – Dressing",
                author: "tinywebs.info",
                year: "2023",
                url: "https://tinywebs.info/jDWLQa",
                type: "Image",
            },
            {
                title: "Temporary Emulsion 4 – Dressing",
                author: "Google Photos",
                year: "2023",
                url: "https://share.google/maxeT2HMHEwdHy0yt",
                type: "Image",
            },
            {
                title: "Temporary Emulsion 5 – Dressing",
                author: "Google Photos",
                year: "2023",
                url: "https://share.google/wWzm0YQcc4tbotuwI",
                type: "Image",
            },
            {
                title: "Temporary Emulsion 6 – Dressing",
                author: "Google Photos",
                year: "2023",
                url: "https://share.google/5EwqouaCiQKvGdfrK",
                type: "Image",
            },
            {
                title: "Temporary Emulsion 7 – Dressing",
                author: "Google Photos",
                year: "2023",
                url: "https://share.google/kD04ucq09nUZYb0Wl",
                type: "Image",
            },
        ],
    },

    // ─── Module 3 ─────────────────────────────────────────────────────────────
    {
        module: "Module 3",
        moduleColor: "from-emerald-400 to-teal-500",
        sources: [
            {
                title: "Salad Dressing – Types and Classification",
                author: "Scribd / Educational Notes",
                year: "2023",
                url: "https://fr.scribd.com/presentation/357993974/Salad-Dressing",
                type: "Module",
            },
        ],
    },

    // ─── Module 4 ─────────────────────────────────────────────────────────────
    {
        module: "Module 4",
        moduleColor: "from-yellow-400 to-lime-500",
        sources: [
            {
                title: "Preparing Salad and Salad Dressing (Studocu)",
                author: "University of Santo Tomas Legazpi",
                year: "2023",
                url: "https://www.studocu.com/ph/document/university-of-santo-tomaslegazpi/food-and-beverages/preparing-salad-and-salad-dressing/100653525",
                type: "Module",
            },
        ],
    },

    // ─── Module 5 (sorted by type: Module → Article → Website → Recipe) ──────
    {
        module: "Module 5",
        moduleColor: "from-cyan-400 to-blue-500",
        sources: [
            // Article
            {
                title: "Caesar Salad",
                author: "Wikipedia",
                year: "2023",
                url: "https://en.wikipedia.org/wiki/Caesar_salad",
                type: "Article",
            },
            // Website
            {
                title: "Allrecipes General Recipe Source",
                author: "Allrecipes",
                year: "2023",
                url: "https://www.allrecipes.com",
                type: "Website",
            },
            // Recipes — sorted alphabetically by title
            {
                title: "Ambrosia Salad",
                author: "Life Love and Sugar",
                year: "2023",
                url: "https://www.lifeloveandsugar.com/ambrosia-salad",
                type: "Recipe",
            },
            {
                title: "Bean Salad",
                author: "A Couple Cooks",
                year: "2023",
                url: "https://www.acouplecooks.com/bean-salad",
                type: "Recipe",
            },
            {
                title: "Caprese Salad – The Real Italian Recipe",
                author: "Vincenzo's Plate",
                year: "2023",
                url: "https://www.vincenzosplate.com/how-to-make-caprese-salad-the-real-italian-recipe",
                type: "Recipe",
            },
            {
                title: "Chef's Salad",
                author: "Food Network",
                year: "2023",
                url: "https://www.foodnetwork.com/recipes/food-network-kitchen/chefs-salad-recipe-2011625.amp",
                type: "Recipe",
            },
            {
                title: "Classic Caesar Salad",
                author: "Allrecipes",
                year: "2023",
                url: "https://www.allrecipes.com/recipe/229063/classic-restaurant-caesar-salad",
                type: "Recipe",
            },
            {
                title: "Classic Chicken Salad",
                author: "Spend With Pennies",
                year: "2023",
                url: "https://www.spendwithpennies.com/classic-chicken-salad-recipe",
                type: "Recipe",
            },
            {
                title: "Cobb Salad",
                author: "Allrecipes",
                year: "2023",
                url: "https://www.allrecipes.com/recipe/14415/cobb-salad",
                type: "Recipe",
            },
            {
                title: "Coleslaw",
                author: "Simply Recipes",
                year: "2023",
                url: "https://www.simplyrecipes.com/recipes/coleslaw",
                type: "Recipe",
            },
            {
                title: "Fruit Cocktail Salad",
                author: "Nourished by Nic",
                year: "2023",
                url: "https://nourishedbynic.com/fruit-cocktail-salad/#recipe",
                type: "Recipe",
            },
            {
                title: "Garden Salad",
                author: "Allrecipes",
                year: "2023",
                url: "https://www.allrecipes.com/recipe/14369/garden-salad",
                type: "Recipe",
            },
            {
                title: "Nicoise Salad",
                author: "Simply Recipes",
                year: "2023",
                url: "https://www.simplyrecipes.com/recipes/nicoise_salad",
                type: "Recipe",
            },
            {
                title: "Simple Pasta Salad",
                author: "Allrecipes",
                year: "2023",
                url: "https://www.allrecipes.com/recipe/86353/simple-pasta-salad",
                type: "Recipe",
            },
            {
                title: "Simple Potato Salad",
                author: "Inspired Taste",
                year: "2023",
                url: "https://www.inspiredtaste.net/22809/simple-potato-salad-recipe",
                type: "Recipe",
            },
            {
                title: "Tropical Fruit Salad",
                author: "Dinner at the Zoo",
                year: "2023",
                url: "https://www.dinneratthezoo.com/tropical-fruit-salad",
                type: "Recipe",
            },
            {
                title: "Tropical Gelatin Fruit Salad",
                author: "Birds Eye Meeple",
                year: "2023",
                url: "https://birdseyemeeple.com/tropical-gelatin-fruit-salad",
                type: "Recipe",
            },
            {
                title: "Vegetable Aspic",
                author: "Vegesauri",
                year: "2023",
                url: "https://www.vegesauri.cz/en/vegetable-aspic",
                type: "Recipe",
            },
            {
                title: "Waldorf Salad",
                author: "FoodieCrush",
                year: "2023",
                url: "https://www.foodiecrush.com",
                type: "Recipe",
            },
        ],
    },

    // ─── AI-Generated Images ──────────────────────────────────────────────────
    {
        module: "AI-Generated Images",
        moduleColor: "from-purple-400 to-pink-500",
        sources: [
            {
                title: "Images generated with Google Gemini",
                author: "Google Gemini",
                year: "2026",
                url: "https://gemini.google.com",
                type: "Open Source AI Tool",
            },
        ],
    },
];

// ─────────────────────────────────────────────
// REFERENCES MODAL
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// TYPE BADGE COLORS
// ─────────────────────────────────────────────
const typeColors: Record<string, string> = {
    Book: "bg-lime-100 text-lime-800 border-lime-300",
    Journal: "bg-emerald-100 text-emerald-800 border-emerald-300",
    Website: "bg-yellow-100 text-yellow-800 border-yellow-300",
};
 
// ─────────────────────────────────────────────
// HAMBURGER NAV
// ─────────────────────────────────────────────
function HamburgerNav({
    modules,
    open,
    onClose,
}: {
    modules: { id: number; title: string; href: string }[];
    open: boolean;
    onClose: () => void;
}) {
 
    const navLinks = [
        { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
        { label: "Activity", href: "../activity", icon: <ClipboardList className="w-4 h-4" /> },
        { label: "Final Quiz", href: "../quiz", icon: <Award className="w-4 h-4" /> },
    ];
 
    return (
        <>
            {/* Backdrop */}
 
            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                    onClick={onClose}
                />
            )}
 
            {/* Slide-in drawer */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Drawer header */}
                <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 px-6 py-6 flex items-center justify-between flex-shrink-0">
                    <div>
                        <p className="text-lime-200 text-xs font-bold uppercase tracking-widest mb-0.5">Navigation</p>
                        <h2 className="text-white font-extrabold text-lg leading-tight">FCS Food Prep</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/30 text-white border border-white/20 transition-all hover:rotate-90 duration-300"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
 
                {/* Drawer body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    {/* Top-level links */}
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-green-800 hover:bg-gradient-to-r hover:from-lime-50 hover:to-green-50 hover:text-green-900 border-2 border-transparent hover:border-green-200 transition-all text-sm"
                        >
                            <span className="text-green-500">{link.icon}</span>
                            {link.label}
                        </a>
                    ))}
 
                    {/* Divider + Modules */}
                    <div className="pt-3 pb-1 px-4">
                        <p className="text-xs font-extrabold text-green-400 uppercase tracking-widest">Modules</p>
                    </div>
                    {modules.map((mod, idx) => (
                        <a
                            key={mod.id}
                            href={mod.href}
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-green-800 hover:bg-gradient-to-r hover:from-lime-50 hover:to-green-50 hover:text-green-900 border-2 border-transparent hover:border-green-200 transition-all text-sm"
                        >
                            <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-lime-400 to-green-500 text-white flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                                {idx + 1}
                            </span>
                            <span className="truncate">{mod.title}</span>
                        </a>
                    ))}
                </div>
 
                {/* Drawer footer */}
                <div className="px-4 py-4 border-t-2 border-green-100 bg-green-50 flex-shrink-0">
                    <p className="text-xs text-green-500 font-medium text-center">Salads &amp; Salad Dressings</p>
                </div>
            </div>
        </>
    );
}
 
// ─────────────────────────────────────────────
// REFERENCES ACCORDION (footer)
// ─────────────────────────────────────────────
function ReferencesAccordion() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
 
    return (
        <div>
            {/* Section heading */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-lime-200" />
                </div>
                <div>
                    <h4 className="text-white font-extrabold text-lg">References</h4>
                    <p className="text-green-300 text-xs">Materials used across all modules — click a group to expand</p>
                </div>
            </div>
 
            {/* Accordion list — single column, full width */}
            <div className="space-y-2">
                {references.map((group, gIdx) => {
                    const isOpen = openIdx === gIdx;
                    return (
                        <div
                            key={gIdx}
                            className="rounded-2xl overflow-hidden border border-white/15 bg-white/[0.07] backdrop-blur-sm"
                        >
                            {/* Accordion header / toggle */}
                            <button
                                onClick={() => setOpenIdx(isOpen ? null : gIdx)}
                                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                                    isOpen ? "bg-white/15" : "hover:bg-white/10"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {/* Colored dot matching the module gradient */}
                                    <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${group.moduleColor} flex-shrink-0`} />
                                    <span className="text-white font-bold text-sm">{group.module}</span>
                                    <span className="text-white/40 text-xs font-medium">
                                        {group.sources.length} source{group.sources.length !== 1 ? "s" : ""}
                                    </span>
                                </div>
                                {isOpen
                                    ? <ChevronUp className="w-4 h-4 text-lime-300 flex-shrink-0" />
                                    : <ChevronDown className="w-4 h-4 text-white/50 flex-shrink-0" />}
                            </button>
 
                            {/* Expandable sources */}
                            {isOpen && (
                                <div className="px-4 pb-4 pt-2 grid sm:grid-cols-2 gap-2 bg-white/[0.04]">
                                    {group.sources.map((src, sIdx) => (
                                        <div
                                            key={sIdx}
                                            className="flex items-start gap-2 p-2.5 bg-white/10 rounded-xl hover:bg-white/[0.18] transition-all"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-white text-xs leading-snug">{src.title}</p>
                                                <p className="text-green-300 text-xs mt-0.5">{src.author} · {src.year}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                                                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-lime-200 border border-white/20 whitespace-nowrap">
                                                    {src.type}
                                                </span>
                                                <a
                                                    href={src.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-6 h-6 rounded-lg bg-white/15 hover:bg-lime-400 hover:text-green-900 text-white flex items-center justify-center transition-all"
                                                    title="Open source"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
 
// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function NavigationPage() {
    const { modules } = useModules();
    const [expandedModule, setExpandedModule] = useState<number | null>(null);
    const [navOpen, setNavOpen] = useState(false);
 
    const completedCount = modules.filter((m) => m.completed).length;
    const progressPercent = (completedCount / modules.length) * 100;
 
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
 
            {/* ── Hamburger Nav Drawer ── */}
            <HamburgerNav modules={modules} open={navOpen} onClose={() => setNavOpen(false)} />
 
            {/* ── Hero Header ── */}
            <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 text-white relative overflow-hidden">
 
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/image/landingpage/bg.png')" }}
                />
 
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-lime-700/60 via-green-700/60 to-emerald-800/60" />
 
                {/* Decorative blobs */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl" />
                </div>
 
                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                    {/* Breadcrumb row with hamburger button */}
                    <div className="flex items-center gap-3 text-sm mb-6">
                        {/* Hamburger button — lives in the hero header */}
                        <button
                            onClick={() => setNavOpen(true)}
                            className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-md rounded-2xl border border-white/30 hover:bg-white/25 transition-all flex-shrink-0"
                            aria-label="Open navigation"
                        >
                            <Menu className="w-5 h-5 text-white" />
                        </button>
                        <span
                            onClick={() => (window.location.href = "/")}
                            className="text-lime-200 font-semibold hover:text-white cursor-pointer transition-colors"
                        >
                            Home
                        </span>
                        <span className="text-white/40">›</span>
                        <span className="text-white/80 font-medium">FCS Food Preparation</span>
                    </div>
 
                    {/* Title */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                            <span className="bg-gradient-to-r from-yellow-200 via-lime-200 to-green-200 bg-clip-text text-transparent">
                                FCS Food Preparation:
                            </span>
                            <br />
                            <span className="text-white text-3xl md:text-4xl">Salads and Salad Dressings</span>
                        </h1>
                        <p className="text-green-100 text-lg mb-6 max-w-2xl leading-relaxed">
                            Gain comprehensive knowledge of salad classification, components, types of dressings, and proper preparation guidelines. Designed for learners in Food and Consumer Services (FCS).
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                                <BookOpen className="w-5 h-5 text-lime-300" />
                                <span className="font-semibold">{modules.length} Modules</span>
                            </div>
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
                            <p className="text-green-600 font-medium mb-5">
                                {modules.length} modules • {completedCount} completed
                            </p>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-semibold text-green-700">{progressPercent.toFixed(0)}% Complete</span>
                                    <span className="font-semibold text-green-500">
                                        {completedCount}/{modules.length}
                                    </span>
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
                                    <button
                                        onClick={() =>
                                            setExpandedModule(expandedModule === module.id ? null : module.id)
                                        }
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
                                                {expandedModule === module.id ? (
                                                    <ChevronUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-green-400 flex-shrink-0" />
                                                )}
                                            </div>
                                        </div>
                                    </button>
 
                                    {expandedModule === module.id && (
                                        <div className="px-6 pb-6 pt-0 border-t border-green-100">
                                            <p className="text-green-800 mb-5 mt-4 leading-relaxed">
                                                {module.description}
                                            </p>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <button
                                                    onClick={() => (window.location.href = module.href)}
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
                                        </div>
                                    )}
                                </div>
                            ))}
 
                            {/* Activity Card */}
                            <div className="bg-gradient-to-br from-white to-lime-50 rounded-3xl shadow-sm border-2 border-lime-300 overflow-hidden hover:shadow-lg transition-all">
                                <div className="p-6">
                                    <div className="flex items-start gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <span className="text-2xl">🏆</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-extrabold text-lime-500 uppercase tracking-wider">
                                                    Practical Assessment
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-extrabold text-green-900 mb-2">Activity</h3>
                                            <p className="text-green-700 mb-5 leading-relaxed">
                                                Create and present a well-balanced salad demonstrating your understanding of classification, components, and dressing preparation.
                                            </p>
                                            <button
                                                onClick={() => (window.location.href = "../activity")}
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold rounded-2xl hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105 transition-all"
                                            >
                                                <span>🏆</span>
                                                Try this!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
 
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
                                                onClick={() => (window.location.href = "../quiz")}
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold rounded-2xl hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105 transition-all"
                                            >
                                                <Award className="w-5 h-5" />
                                                Try this!
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
 
                            {/* Researchers sidebar card */}
                            <div className="bg-gradient-to-br from-white to-lime-50 rounded-3xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all overflow-hidden">
                                <div className="bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 px-5 py-3 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-lime-200" />
                                    <span className="text-white font-extrabold text-sm">Research Team</span>
                                </div>
                                <div className="p-5">
                                    <p className="text-green-700 text-sm font-medium mb-4 leading-relaxed">
                                        This website was developed by Bachelor of Technology and Livelihood Education major in Home Economics students from the University of Rizal System – Morong Campus.
                                    </p>
                                    <ResearchersButton />
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
 
            {/* ══════════════════════════════════════════
                FOOTER WITH REFERENCES
            ══════════════════════════════════════════ */}
            <footer className="bg-gradient-to-br from-lime-700 via-green-700 to-emerald-800 text-white mt-16 relative overflow-hidden">
 
                {/* Decorative blobs */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl" />
                </div>
 
                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
 
                    {/* Footer top — brand + quick links */}
                    <div className="grid md:grid-cols-3 gap-10 mb-10">
 
                        {/* Brand */}
                        <div>
                            <h3 className="text-xl font-extrabold text-white mb-2">FCS Food Preparation</h3>
                            <p className="text-green-200 text-sm leading-relaxed">
                                Salads &amp; Salad Dressings — a structured learning module developed by BTLE Home Economics students of URS Morong Campus.
                            </p>
                        </div>
 
                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lime-300 text-xs font-extrabold uppercase tracking-widest mb-3">Quick Links</h4>
                            <ul className="space-y-2">
                                {[
                                    { label: "Home", href: "/" },
                                    { label: "Activity", href: "../activity" },
                                    { label: "Final Quiz", href: "../quiz" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-green-200 hover:text-white text-sm font-semibold transition-colors flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
 
                        {/* Modules quick links */}
                        <div>
                            <h4 className="text-lime-300 text-xs font-extrabold uppercase tracking-widest mb-3">Modules</h4>
                            <ul className="space-y-2">
                                {modules.map((mod, idx) => (
                                    <li key={mod.id}>
                                        <a
                                            href={mod.href}
                                            className="text-green-200 hover:text-white text-sm font-semibold transition-colors flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                                            Module {idx + 1}: {mod.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
 
                    {/* Divider */}
                    <div className="border-t border-white/20 mb-8" />
 
                    {/* References section */}
                    <ReferencesAccordion />
 
                    {/* Divider */}
                    <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                        <p className="text-green-300 text-xs font-medium">
                            © {new Date().getFullYear()} University of Rizal System – Morong Campus. All rights reserved.
                        </p>
                        <p className="text-green-300 text-xs font-medium">
                            All references cited in accordance with academic standards.
                        </p>
                    </div>
                </div>
            </footer>
 
            {/* Floating Chat Widget */}
            <ChatWidget />
        </div>
    );
}