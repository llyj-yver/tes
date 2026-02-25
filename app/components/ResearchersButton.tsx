"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Users } from "lucide-react";
import Image from "next/image";

// ── Researcher Data ──
const researchers = [
    {
        name: "RYZA MAE C. QUITIONG",
        role: "Lead Researcher",
        photo: "/image/researchers/RYZA MAE C. QUITIONG_.jpg",
        fallbackEmoji: "👩‍🔬",
        description:
            "Specializes in culinary education and food science. Led the curriculum design for this module series, ensuring accuracy and accessibility for all learners.",
        gradient: "from-lime-400 to-green-500",
    },
    {
        name: "ASHLEY JANE B. JAVIER",
        role: "Content Developer",
        photo: "/image/researchers/ASHLEY JANE B. JAVIER.jpg",
        fallbackEmoji: "👩‍💻",
        description:
            "Responsible for structuring lesson content and interactive elements. Passionate about making food education engaging and memorable for students.",
        gradient: "from-green-400 to-emerald-500",
    },
    {
        name: "JOY G. SOLIVERES",
        role: "Multimedia Designer",
        photo: "/image/researchers/JOY G. SOLIVERES.jpg",
        fallbackEmoji: "👩‍🎨",
        description:
            "Created all visual assets, illustrations, and UI designs for the course. Brings a creative eye that transforms complex topics into beautiful, clear visuals.",
        gradient: "from-emerald-400 to-teal-500",
    },
    {
        name: "KATRINA JANE G. JALAMAN",
        role: "Subject Matter Expert",
        photo: "/image/researchers/KATRINA JANE G. JALAMAN_.jpg",
        fallbackEmoji: "👩‍🍳",
        description:
            "Reviewed all technical content to ensure professional accuracy in salad preparation techniques and culinary standards.",
        gradient: "from-yellow-400 to-lime-500",
    },
    {
        name: "ASHLY ROSE B. QUILLOTES",
        role: "Educational Technologist",
        photo: "/image/researchers/ASHLY ROSE B. QUILLOTES_.jpg",
        fallbackEmoji: "👩‍🏫",
        description:
            "Designed the learning flow and assessment strategies. Ensured the module meets FCS curriculum standards and supports diverse learning styles.",
        gradient: "from-lime-500 to-green-600",
    },
    {
        name: "JULYNAH NADINE M. LLENA",           // ← replace with real name
        role: "Assets Editor",                  // ← replace with real role
        photo: "/image/researchers/JULYNAH NADINE M. LLENA_.jpg", // ← replace with real photo path
        fallbackEmoji: "👩‍🎓",
        description:
            "Add a short description for this researcher here.",
        gradient: "from-teal-400 to-emerald-500",
    },
];

// ── Avatar ──
function Avatar({
    photo,
    name,
    fallbackEmoji,
    gradient,
    size = "lg",
}: {
    photo: string;
    name: string;
    fallbackEmoji: string;
    gradient: string;
    size?: "lg" | "sm";
}) {
    const [imgError, setImgError] = useState(false);

    if (size === "sm") {
        return (
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center border-2 border-white overflow-hidden flex-shrink-0`}>
                {!imgError ? (
                    <Image
                        src={photo}
                        alt={name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <span className="text-xl">{fallbackEmoji}</span>
                )}
            </div>
        );
    }

    // Large — full rectangular portrait, not tiny circle
    return (
        <div className={`w-32 h-40 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xl border-4 border-white overflow-hidden flex-shrink-0`}>
            {!imgError ? (
                <Image
                    src={photo}
                    alt={name}
                    width={128}
                    height={160}
                    className="object-cover object-top w-full h-full"
                    onError={() => setImgError(true)}
                />
            ) : (
                <span className="text-6xl">{fallbackEmoji}</span>
            )}
        </div>
    );
}

// ── Modal ──
function ResearchersModal({ onClose }: { onClose: () => void }) {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">("right");

    const total = researchers.length;
    const researcher = researchers[current];

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const goTo = (next: number, dir: "left" | "right") => {
        if (animating) return;
        setDirection(dir);
        setAnimating(true);
        setTimeout(() => {
            setCurrent((next + total) % total);
            setAnimating(false);
        }, 220);
    };

    const slideStyle = {
        opacity: animating ? 0 : 1,
        transform: animating
            ? `translateX(${direction === "right" ? "-24px" : "24px"})`
            : "translateX(0)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,40,20,0.6)", backdropFilter: "blur(8px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-green-200 overflow-hidden"
                style={{ animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}
            >

                {/* ── Hero strip — portrait sits INSIDE here, not overlapping ── */}
                <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 relative overflow-hidden">
                    {/* Blobs */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-300 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-300 rounded-full blur-3xl" />
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:rotate-90 duration-300 border border-white/20 z-20"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* Header text + portrait side by side */}
                    <div className="relative z-10 flex items-end gap-5 px-7 pt-7 pb-0">
                        {/* Portrait — Now on the Left */}
                        <div style={slideStyle} className="flex-shrink-0 pb-1">
                            <Avatar
                                photo={researcher.photo}
                                name={researcher.name}
                                fallbackEmoji={researcher.fallbackEmoji}
                                gradient={researcher.gradient}
                                size="lg"
                            />
                        </div>

                        {/* Text — Now on the Right */}
                        <div className="flex-1 pb-5">
                            <p className="text-lime-200 text-xs font-bold uppercase tracking-widest mb-1">
                                About the Team
                            </p>
                            <h2 className="text-2xl font-extrabold text-white leading-tight">
                                Meet the<br />Researchers
                            </h2>
                        </div>
                    </div>
                </div>

                {/* ── Card body ── */}
                <div className="px-7 pt-5 pb-7">

                    {/* Name + role */}
                    <div className="mb-4" style={slideStyle}>
                        <h3 className="text-xl font-extrabold text-green-900 leading-tight mb-2">
                            {researcher.name}
                        </h3>
                        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest text-white bg-gradient-to-r ${researcher.gradient} shadow-md`}>
                            {researcher.role}
                        </span>
                    </div>

                    {/* Description */}
                    <div
                        className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl p-4 border-2 border-green-200 mb-5"
                        style={{ opacity: animating ? 0 : 1, transition: "opacity 0.22s ease" }}
                    >
                        <p className="text-green-800 leading-relaxed text-sm">
                            {researcher.description}
                        </p>
                    </div>

                    {/* Thumbnail strip */}
                    <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
                        {researchers.map((r, idx) => (
                            <button
                                key={idx}
                                onClick={() => goTo(idx, idx > current ? "right" : "left")}
                                title={r.name}
                                className={`transition-all duration-300 rounded-xl overflow-hidden border-2 ${idx === current
                                        ? "border-lime-500 scale-110 shadow-lg shadow-lime-500/30"
                                        : "border-green-200 opacity-60 hover:opacity-90 hover:border-green-400"
                                    }`}
                            >
                                <Avatar
                                    photo={r.photo}
                                    name={r.name}
                                    fallbackEmoji={r.fallbackEmoji}
                                    gradient={r.gradient}
                                    size="sm"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Prev / counter / Next */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => goTo(current - 1, "left")}
                            className="w-10 h-10 rounded-2xl bg-green-50 hover:bg-green-100 text-green-700 border-2 border-green-200 hover:border-green-400 flex items-center justify-center transition-all hover:scale-105"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <p className="text-xs text-green-400 font-semibold">{current + 1} of {total}</p>

                        <button
                            onClick={() => goTo(current + 1, "right")}
                            className="w-10 h-10 rounded-2xl bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 border-2 border-green-300 flex items-center justify-center transition-all hover:scale-105 hover:shadow-lg hover:shadow-lime-500/30"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
        </div>
    );
}

// ── Trigger button ──
export default function ResearchersButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold rounded-2xl hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105 transition-all text-sm border-2 border-green-300"
            >
                <Users className="w-4 h-4" />
                Meet the Researchers
            </button>

            {open && <ResearchersModal onClose={() => setOpen(false)} />}
        </>
    );
}