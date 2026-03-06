"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Ingredient {
  id: string;
  name: string;
  img: string;
  isCorrect: boolean;
}

interface Dressing {
  id: string;
  name: string;
  ingredients: Ingredient[];
  videoSrc: string;
  finalImageSrc: string;
  finalImageAlt: string;
  gradientFrom: string;
  gradientTo: string;
  accent: string;
}

// ─── Game Data ────────────────────────────────────────────────────────────────
const DECOYS: Ingredient[] = [
  { id: "ketchup", name: "Ketchup",     img: "/image/ingredients/ketchup.png",  isCorrect: false },
  { id: "mayo",    name: "Mayonnaise",  img: "/image/ingredients/mayo.png",     isCorrect: false },
  { id: "soy",     name: "Soy Sauce",   img: "/image/ingredients/soysauce.png", isCorrect: false },
  { id: "butter",  name: "Butter",      img: "/image/ingredients/butter.png",   isCorrect: false },
  { id: "lemon",   name: "Lemon Juice", img: "/image/ingredients/lemon.png",    isCorrect: false },
  { id: "sugar",   name: "Sugar",       img: "/image/ingredients/sugar.png",    isCorrect: false },
];

const DRESSINGS: Dressing[] = [
  {
    id: "permanent",
    name: "Permanent Dressing",
    ingredients: [
      { id: "egg-yolk", name: "Egg Yolk", img: "/image/ingredients/egg.png",     isCorrect: true },
      { id: "oil",      name: "Oil",      img: "/image/ingredients/oil.png",     isCorrect: true },
      { id: "vinegar",  name: "Vinegar",  img: "/image/ingredients/vinegar.png", isCorrect: true },
    ],
    videoSrc:      "/image/video/mixingAnimation.mp4",
    finalImageSrc: "/image/ingredients/permanent.png",
    finalImageAlt: "Finished Permanent Dressing",
    gradientFrom:  "#4d7c0f",
    gradientTo:    "#a16207",
    accent:        "#fbbf24",
  },
  {
    id: "oil-vinegar",
    name: "Oil & Vinegar Dressing",
    ingredients: [
      { id: "olive-oil", name: "Olive Oil", img: "/image/ingredients/oil.png",     isCorrect: true },
      { id: "vinegar2",  name: "Vinegar",   img: "/image/ingredients/vinegar.png", isCorrect: true },
      { id: "salt",      name: "Salt",      img: "/image/ingredients/salt.png",    isCorrect: true },
    ],
    videoSrc:      "/image/video/mixingAnimation.mp4",
    finalImageSrc: "/image/ingredients/oil&vin.png",
    finalImageAlt: "Finished Oil & Vinegar Dressing",
    gradientFrom:  "#166534",
    gradientTo:    "#047857",
    accent:        "#84cc16",
  },
];

type Scene = "memorize" | "pick" | "drag" | "video" | "result" | "congrats";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ─── Ingredient Card — big, NO shadow, NO border ──────────────────────────────
function IngCard({
  ing,
  size = 130,
  selected,
  dim,
  onClick,
  draggable,
  onDragStart,
  onDragEnd,
}: {
  ing: Ingredient;
  size?: number;
  selected?: boolean;
  dim?: boolean;
  onClick?: () => void;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}) {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: onClick || draggable ? "pointer" : "default",
        opacity: dim ? 0.25 : 1,
        transition: "opacity 0.2s, transform 0.2s",
        transform: selected ? "scale(1.1)" : "scale(1)",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {/* Pure image — no box, no shadow, no border. White ring only when selected */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: selected ? "50%" : 0,
          outline: selected ? "3px solid #fff" : "none",
          outlineOffset: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "outline 0.15s, border-radius 0.15s",
        }}
      >
        <img
          src={ing.img}
          alt={ing.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
            display: "block",
            filter: selected ? "drop-shadow(0 0 10px rgba(255,255,255,0.6))" : "none",
            transition: "filter 0.2s",
          }}
        />
      </div>

      {/* Tiny label */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: selected ? "#fff" : "rgba(255,255,255,0.7)",
          letterSpacing: 1,
          textTransform: "uppercase",
          textAlign: "center",
          maxWidth: size + 16,
          lineHeight: 1.2,
        }}
      >
        {ing.name}
      </span>
    </div>
  );
}

// ─── Kitchen Order Ticket ─────────────────────────────────────────────────────
function KitchenTicket({
  dressing,
  countdown,
}: {
  dressing: Dressing;
  countdown: number;
}) {
  return (
    <div
      style={{
        display: "inline-block",
        background: "#fffef5",
        color: "#1a1a1a",
        borderRadius: 4,
        padding: "20px 28px 24px",
        minWidth: 220,
        maxWidth: 280,
        boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)",
        fontFamily: "'Courier New', Courier, monospace",
        position: "relative",
        textAlign: "left",
        border: "1px solid #e5e0c8",
      }}
    >
      {/* Torn top edge effect */}
      <div
        style={{
          position: "absolute",
          top: -1,
          left: 0,
          right: 0,
          height: 8,
          background: "repeating-linear-gradient(90deg, #fffef5 0px, #fffef5 8px, transparent 8px, transparent 12px)",
          borderTop: "1px dashed #ccc",
        }}
      />

      {/* Header */}
      <div style={{ textAlign: "center", borderBottom: "1px dashed #bbb", paddingBottom: 10, marginBottom: 12 }}>
        <p style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#888", margin: "0 0 2px" }}>
          Kitchen Order
        </p>
        <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: "#333" }}>
          #247
        </p>
        <p style={{ fontSize: 10, color: "#666", margin: "4px 0 0", letterSpacing: 1 }}>
          {dressing.name.toUpperCase()}
        </p>
      </div>

      {/* Ingredients list */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#aaa", margin: "0 0 8px" }}>
          Ingredients:
        </p>
        {dressing.ingredients.map((ing, i) => (
          <div
            key={ing.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
              animation: `fadeSlide 0.3s ease ${i * 0.1}s both`,
            }}
          >
            <span style={{ fontSize: 11, color: "#555" }}>[ ]</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#222", letterSpacing: 0.5 }}>
              {ing.name}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px dashed #bbb", paddingTop: 10, textAlign: "center" }}>
        <p style={{ fontSize: 9, color: "#aaa", margin: 0, letterSpacing: 1 }}>
          MEMORIZE & PREPARE
        </p>
      </div>

      {/* Torn bottom edge effect */}
      <div
        style={{
          position: "absolute",
          bottom: -1,
          left: 0,
          right: 0,
          height: 8,
          background: "repeating-linear-gradient(90deg, #fffef5 0px, #fffef5 8px, transparent 8px, transparent 12px)",
          borderBottom: "1px dashed #ccc",
        }}
      />
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────────────────────
export default function DressingGame() {
  const [dressingIndex, setDressingIndex] = useState(0);
  const [scene, setScene]                 = useState<Scene>("memorize");
  const [countdown, setCountdown]         = useState(5);

  const [pickPool, setPickPool]       = useState<Ingredient[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [pickError, setPickError]     = useState<string | null>(null);
  const [submitted, setSubmitted]     = useState(false);

  const [dragPool, setDragPool]   = useState<Ingredient[]>([]);
  const [inBowl, setInBowl]       = useState<Set<string>>(new Set());
  const [dragging, setDragging]   = useState<string | null>(null);
  const [bowlShake, setBowlShake] = useState(false);
  const [bowlGlow, setBowlGlow]   = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const dressing = DRESSINGS[dressingIndex];

  // Memorize countdown
  useEffect(() => {
    if (scene !== "memorize") return;
    setCountdown(5);
    const id = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(id); initPickScene(); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, dressingIndex]);

  const initPickScene = useCallback(() => {
    const correctIds = new Set(dressing.ingredients.map((i) => i.id));
    const decoys = shuffle(DECOYS.filter((d) => !correctIds.has(d.id))).slice(0, 3);
    setPickPool(shuffle([...dressing.ingredients, ...decoys]));
    setSelectedIds(new Set());
    setPickError(null);
    setSubmitted(false);
    setScene("pick");
  }, [dressing]);

  const initDragScene = useCallback(() => {
    setDragPool(shuffle(dressing.ingredients));
    setInBowl(new Set());
    setScene("drag");
  }, [dressing]);

  const togglePick = (id: string) => {
    if (submitted) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setPickError(null);
  };

  const submitPick = () => {
    const correctIds = new Set(dressing.ingredients.map((i) => i.id));
    const allCorrect = [...selectedIds].every((id) => correctIds.has(id));
    const allSelected = correctIds.size === selectedIds.size;
    if (!allCorrect || !allSelected) {
      setPickError("Oops! Wrong ingredients. Try again!");
      setSelectedIds(new Set());
      return;
    }
    setSubmitted(true);
    setTimeout(() => initDragScene(), 700);
  };

  const handleDragStart = (id: string) => setDragging(id);
  const handleDragEnd   = ()           => setDragging(null);

  const handleDropOnBowl = (e: React.DragEvent) => {
    e.preventDefault();
    if (!dragging) return;
    setInBowl((prev) => { const n = new Set(prev); n.add(dragging); return n; });
    setBowlGlow(true);
    setTimeout(() => setBowlGlow(false), 600);
    setDragging(null);
  };

  const allInBowl =
    inBowl.size === dressing.ingredients.length &&
    dressing.ingredients.every((i) => inBowl.has(i.id));

  const handleBowlTap = () => {
    if (!allInBowl) {
      setBowlShake(true);
      setTimeout(() => setBowlShake(false), 500);
      return;
    }
    setScene("video");
  };

  const handleVideoEnded = () => setScene("result");

  useEffect(() => {
    if (scene === "video" && videoRef.current) videoRef.current.play().catch(() => {});
  }, [scene]);

  const goNext = () => {
    if (dressingIndex < DRESSINGS.length - 1) {
      setDressingIndex((i) => i + 1);
      setScene("memorize");
    } else {
      setScene("congrats");
    }
  };

  const bgGradient =
    scene === "congrats"
      ? "linear-gradient(135deg, #4d7c0f 0%, #16a34a 50%, #047857 100%)"
      : `linear-gradient(135deg, ${dressing.gradientFrom} 0%, ${dressing.gradientTo} 100%)`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bgGradient,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: "#fff",
        transition: "background 0.7s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blobs */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.18, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", background: "#fde047", top: -90, left: -90, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", width: 460, height: 460, borderRadius: "50%", background: "#86efac", bottom: -110, right: -110, filter: "blur(100px)" }} />
      </div>

      {/* Top bar */}
      {scene !== "congrats" && (
        <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 0", maxWidth: 640, margin: "0 auto" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 3, color: dressing.accent, margin: 0 }}>
              Round {dressingIndex + 1} of {DRESSINGS.length}
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "2px 0 0" }}>{dressing.name}</p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {(["memorize","pick","drag","video","result"] as Scene[]).map((s) => (
              <div key={s} style={{ height: 8, borderRadius: 4, background: scene === s ? dressing.accent : "rgba(255,255,255,0.2)", width: scene === s ? 28 : 8, transition: "all 0.4s" }} />
            ))}
          </div>
        </div>
      )}

      {/* ── Scene background images (outside stacking context so they render correctly) ── */}
      {scene === "pick" && (
        <>
          <div style={{
            position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none",
            backgroundImage: "url('/image/ingredients/table.png')",
            backgroundSize: "cover", backgroundPosition: "center",
          }} />
          <div style={{
            position: "fixed", inset: 0, zIndex: 6, pointerEvents: "none",
            background: `linear-gradient(135deg, ${dressing.gradientFrom}4d, ${dressing.gradientTo}4d)`,
          }} />
        </>
      )}
      {scene === "drag" && (
        <>
          <div style={{
            position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none",
            backgroundImage: "url('/image/ingredients/table.png')",
            backgroundSize: "cover", backgroundPosition: "center",
          }} />
          <div style={{
            position: "fixed", inset: 0, zIndex: 6, pointerEvents: "none",
            background: `linear-gradient(135deg, ${dressing.gradientFrom}4d, ${dressing.gradientTo}4d)`,
          }} />
        </>
      )}

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 70px)", padding: "24px 16px" }}>

        {/* ══ MEMORIZE — Kitchen Ticket ══ */}
        {scene === "memorize" && (
          <div style={{ width: "100%", maxWidth: 560, textAlign: "center" }}>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 3, color: dressing.accent, marginBottom: 6 }}>
              Your Order Ticket
            </p>
            <h1 style={{ fontSize: "clamp(22px,5vw,36px)", fontWeight: 800, margin: "0 0 4px", lineHeight: 1.1 }}>
              Memorize the Ingredients!
            </h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, marginBottom: 32 }}>
              Study your kitchen order — you'll need to recall it!
            </p>

            {/* The ticket */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
              <KitchenTicket dressing={dressing} countdown={countdown} />
            </div>

            {/* Countdown ring */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ position: "relative", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={72} height={72} style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
                  <circle cx={36} cy={36} r={30} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={5} />
                  <circle cx={36} cy={36} r={30} fill="none" stroke={dressing.accent} strokeWidth={5}
                    strokeDasharray={Math.PI * 60}
                    strokeDashoffset={Math.PI * 60 * (1 - countdown / 5)}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.9s linear" }} />
                </svg>
                <span style={{ fontSize: 22, fontWeight: 800, color: dressing.accent }}>{countdown}</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>Moving on in {countdown}s</p>
            </div>
          </div>
        )}

        {/* ══ PICK ══ */}
        {scene === "pick" && (
          <div style={{ width: "100%", maxWidth: 580, textAlign: "center", position: "relative" }}>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 3, color: dressing.accent, marginBottom: 8 }}>Pick the Ingredients</p>
            <h2 style={{ fontSize: "clamp(22px,5vw,34px)", fontWeight: 800, margin: "0 0 6px" }}>What goes in {dressing.name}?</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 36 }}>
              Select {dressing.ingredients.length} correct ingredients
            </p>

            {pickError && (
              <div style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.5)", color: "#fca5a5", borderRadius: 16, padding: "10px 20px", fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
                {pickError}
              </div>
            )}

            {/* 3-col grid — big images, no shadow */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, justifyItems: "center", marginBottom: 36 }}>
              {pickPool.map((ing) => (
                <IngCard
                  key={ing.id}
                  ing={ing}
                  size={130}
                  selected={selectedIds.has(ing.id)}
                  onClick={() => togglePick(ing.id)}
                />
              ))}
            </div>

            <button
              onClick={submitPick}
              disabled={selectedIds.size !== dressing.ingredients.length}
              style={{
                padding: "14px 48px",
                borderRadius: 50,
                border: "none",
                background: selectedIds.size === dressing.ingredients.length
                  ? `linear-gradient(135deg, ${dressing.accent}, #fff)`
                  : "rgba(255,255,255,0.1)",
                color: selectedIds.size === dressing.ingredients.length ? "#1a1a1a" : "rgba(255,255,255,0.3)",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: selectedIds.size === dressing.ingredients.length ? "pointer" : "not-allowed",
                boxShadow: selectedIds.size === dressing.ingredients.length ? `0 8px 32px ${dressing.accent}55` : "none",
                transition: "all 0.3s",
                fontFamily: "inherit",
              }}
            >
              Confirm →
            </button>
          </div>
        )}

        {/* ══ DRAG ══ */}
        {scene === "drag" && (
          <div style={{ width: "100%", maxWidth: 640, textAlign: "center", position: "relative" }}>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 3, color: dressing.accent, marginBottom: 8 }}>Build Your Dressing</p>
            <h2 style={{ fontSize: "clamp(22px,5vw,34px)", fontWeight: 800, margin: "0 0 6px" }}>Drag into the Bowl</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 32 }}>
              Drop all ingredients, then tap the bowl to mix!
            </p>

            {/* Draggable row — extra big */}
            <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginBottom: 36, minHeight: 190 }}>
              {dragPool.filter((ing) => !inBowl.has(ing.id)).map((ing) => (
                <IngCard
                  key={ing.id}
                  ing={ing}
                  size={160}
                  dim={dragging === ing.id}
                  draggable
                  onDragStart={() => handleDragStart(ing.id)}
                  onDragEnd={handleDragEnd}
                />
              ))}
              {allInBowl && (
                <p style={{ alignSelf: "center", fontSize: 15, fontWeight: 700, color: dressing.accent }}>All in! ✓</p>
              )}
            </div>

            {/* Bowl — image fills the full circle as background */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropOnBowl}
              onClick={handleBowlTap}
              style={{
                width: 260,
                height: 260,
                borderRadius: "50%",
                margin: "0 auto",
                position: "relative",
                overflow: "hidden",
                cursor: allInBowl ? "pointer" : "default",
                animation: bowlShake ? "shake 0.4s" : "none",
                transform: bowlGlow ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                boxShadow: bowlGlow
                  ? `0 0 70px ${dressing.accent}99`
                  : allInBowl
                  ? `0 0 40px ${dressing.accent}66`
                  : "0 8px 40px rgba(0,0,0,0.4)",
              }}
            >
              {/* Bowl image covers the full circle */}
              <img
                src="/image/ingredients/bowl.png"
                alt="Bowl"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                }}
              />

              {/* Glow / active overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: bowlGlow ? `${dressing.accent}33` : "rgba(0,0,0,0.1)",
                  border: `3px solid ${bowlGlow || allInBowl ? dressing.accent : "rgba(255,255,255,0.2)"}`,
                  borderRadius: "50%",
                  transition: "background 0.3s, border-color 0.3s",
                  pointerEvents: "none",
                }}
              />

              {/* Centered text overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  pointerEvents: "none",
                }}
              >
                {inBowl.size > 0 && (
                  <span style={{ fontSize: 24, fontWeight: 800, color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}>
                    {inBowl.size}/{dressing.ingredients.length}
                  </span>
                )}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: "#fff",
                    textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                    background: "rgba(0,0,0,0.4)",
                    padding: "4px 14px",
                    borderRadius: 20,
                  }}
                >
                  {allInBowl ? "Tap to Mix! 🔥" : "Drop here"}
                </span>
              </div>
            </div>

            {!allInBowl && (
              <p style={{ marginTop: 16, color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                {inBowl.size === 0 ? "Drag ingredients into the bowl" : `${dressing.ingredients.length - inBowl.size} more to go…`}
              </p>
            )}
          </div>
        )}

        {/* ══ VIDEO ══ */}
        {scene === "video" && (
          <div style={{ width: "100%", maxWidth: 580, textAlign: "center" }}>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 3, color: dressing.accent, marginBottom: 12 }}>Mixing…</p>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>{dressing.name}</h2>
            <video
              ref={videoRef}
              src={dressing.videoSrc}
              onEnded={handleVideoEnded}
              playsInline
              style={{ width: "100%", borderRadius: 28, boxShadow: "0 24px 64px rgba(0,0,0,0.55)", display: "block" }}
            />
            <p style={{ marginTop: 14, color: "rgba(255,255,255,0.35)", fontSize: 12 }}>Watch the magic happen…</p>
          </div>
        )}

        {/* ══ RESULT ══ */}
        {scene === "result" && (
          <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 3, color: dressing.accent, marginBottom: 12 }}>Voilà!</p>
            <h2 style={{ fontSize: "clamp(24px,5vw,36px)", fontWeight: 800, marginBottom: 24 }}>{dressing.name} Ready!</h2>
            <img
              src={dressing.finalImageSrc}
              alt={dressing.finalImageAlt}
              style={{ width: "100%", borderRadius: 28, aspectRatio: "4/3", objectFit: "cover", boxShadow: `0 24px 80px ${dressing.accent}55`, background: "rgba(255,255,255,0.05)", marginBottom: 32, display: "block" }}
            />
            <button
              onClick={goNext}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              style={{ padding: "14px 52px", borderRadius: 50, border: "none", background: `linear-gradient(135deg, ${dressing.accent}, #fff)`, color: "#1a1a1a", fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", boxShadow: `0 12px 40px ${dressing.accent}55`, transition: "transform 0.2s", fontFamily: "inherit" }}
            >
              {dressingIndex < DRESSINGS.length - 1 ? "Next Dressing →" : "Finish 🎉"}
            </button>
          </div>
        )}

        {/* ══ CONGRATS ══ */}
        {scene === "congrats" && (
          <div style={{ width: "100%", maxWidth: 480, textAlign: "center", padding: "0 16px" }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: "linear-gradient(135deg, #fde047, #a3e635)", boxShadow: "0 16px 48px rgba(253,224,71,0.45)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 52 }}>
              🏆
            </div>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 3, color: "#a3e635", marginBottom: 12 }}>Well Done, Chef!</p>
            <h1 style={{ fontSize: "clamp(38px,9vw,62px)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.05, background: "linear-gradient(135deg, #fff 30%, #a3e635)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Congratulations!
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
              You've mastered both dressings like a pro chef!
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              {DRESSINGS.map((d) => (
                <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 20px", borderRadius: 50, background: `${d.accent}1a`, border: `1.5px solid ${d.accent}44`, fontSize: 13, fontWeight: 800, color: d.accent }}>
                  ✓ {d.name}
                </div>
              ))}
            </div>
            <a
              href="/navigation"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              style={{ display: "inline-block", padding: "16px 56px", borderRadius: 50, background: "linear-gradient(135deg, #fde047, #a3e635)", color: "#1a1a1a", fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", boxShadow: "0 12px 48px rgba(163,230,53,0.4)", transition: "transform 0.2s", fontFamily: "inherit" }}
            >
              Continue to Module 3
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-9px); }
          40%     { transform: translateX(9px); }
          60%     { transform: translateX(-6px); }
          80%     { transform: translateX(6px); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}