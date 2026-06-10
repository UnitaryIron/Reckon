import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faLeaf,
  faWandMagicSparkles,
  faRobot,
  faLock,
  faThumbsUp,
  faCamera,
  faClipboard,
  faFlask,
  faEye,
  faEnvelope,
  faBrain,
  faStethoscope,
  faSprout,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import paperBg from "@/assets/paper-bg.jpg";
import blobRust from "@/assets/blob-rust.png";
import blobMustard from "@/assets/blob-mustard.png";
import botMascot from "@/assets/bot-mascot.png";

export const Route = createFileRoute("/")({
  component: Landing,
});

type SkinType = "dry" | "oily" | "combo" | "sensitive";

const skinCopy: Record<SkinType, { title: string; body: string; pick: string }> = {
  dry: {
    title: "Thirsty cheeks? Same.",
    body: "We'll lean into squalane, ceramides, and a gentle occlusive. No tight feeling by 3pm.",
    pick: "Likely match: a creamy cleanser + barrier balm",
  },
  oily: {
    title: "Shine has its place. Foreheads? Debatable.",
    body: "We'll suggest a niacinamide friend and a lightweight gel moisturizer that won't smother.",
    pick: "Likely match: BHA toner + oil-free hydrator",
  },
  combo: {
    title: "T-zone drama, dry corners. Classic.",
    body: "We'll mix it up — multi-mask vibes with a single, smart routine.",
    pick: "Likely match: gentle exfoliant + zone-specific moisturizers",
  },
  sensitive: {
    title: "Red flags? We respect them.",
    body: "Fragrance-free, fuss-free, and tested-with-care suggestions only.",
    pick: "Likely match: oat cleanser + centella serum",
  },
};

function Landing() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-ink">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60 mix-blend-multiply"
        style={{ backgroundImage: `url(${paperBg})`, backgroundSize: "600px" }}
      />
      <CustomCursor />
      <Nav />
      <Hero />
      <TrustRow />
      <HowItWorks />
      <SkinDemo />
      <Reassurance />
      <Footer />
    </main>
  );
}

function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [icon, setIcon] = useState<"droplet" | "leaf" | "spark">("droplet");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
      }
      const el = e.target as HTMLElement;
      const zone = el?.closest?.("[data-zone]")?.getAttribute("data-zone");
      if (zone === "dry") setIcon("droplet");
      else if (zone === "oily") setIcon("spark");
      else if (zone === "combo" || zone === "sensitive") setIcon("leaf");
      else setIcon("droplet");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 items-center justify-center rounded-full bg-cream text-ink shadow-[3px_3px_0_var(--ink)] md:flex"
      style={{ border: "2px solid var(--ink)", transition: "transform 60ms linear" }}
    >
      <span className="text-base leading-none">
        <FontAwesomeIcon
          icon={icon === "droplet" ? faDroplet : icon === "leaf" ? faLeaf : faWandMagicSparkles}
          className="w-4 h-4"
        />
      </span>
    </div>
  );
}

function Nav() {
  return (
    <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10">
      <a href="/" className="flex items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-full border-[2.5px] border-ink bg-mustard shadow-[3px_3px_0_var(--ink)]">
          <FontAwesomeIcon icon={faLeaf} className="w-5 h-5" />
        </span>
        <span className="font-display text-2xl font-extrabold tracking-tight">Reckon</span>
        <span className="ml-1 hidden font-hand text-xl text-rust md:inline">est. 1998 (vibes)</span>
      </a>
      <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
        <a href="#how" className="hover:text-rust">How it works</a>
        <a href="#demo" className="hover:text-rust">Try the demo</a>
        <a href="#trust" className="hover:text-rust">Your data</a>
      </nav>
      <a href="#cta" className="sticker px-4 py-2 text-sm font-semibold">Start →</a>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-10 pt-6 md:px-10 md:pt-12">
      <img
        src={blobMustard}
        alt=""
        aria-hidden
        className="float-slow pointer-events-none absolute -left-16 top-10 hidden w-72 opacity-80 md:block"
      />
      <img
        src={blobRust}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-20 top-40 hidden w-80 rotate-12 opacity-70 md:block"
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            <span className="inline-block h-2 w-2 rounded-full bg-teal blink-dot" />
            beta · be gentle with us
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] md:text-7xl">
            We don't guess.
            <br />
            We <span className="scribble-underline text-rust">scan,</span>{" "}
            ask, and <span className="italic">match</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            Selfie + 4 fun questions ={" "}
            <span className="font-semibold text-ink">your personalized skincare shortlist.</span>{" "}
            No 47-step routines. No mystery actives. No vibes-only marketing.
          </p>

          <div id="cta" className="mt-10 flex flex-col gap-4 sm:flex-row">
            <SelfieCta />
            <QuizCta />
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-cream">
              <FontAwesomeIcon icon={faLock} className="w-3 h-3" />
            </span>
            <span>Your selfie never leaves your device. <span className="font-hand text-lg text-rust"><FontAwesomeIcon icon={faThumbsUp} className="w-4 h-4" /></span></span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-md">
          <div className="sticker relative p-6">
            <span className="tape -top-2 left-8 rotate-[-6deg]" />
            <span className="tape -top-2 right-8 rotate-[5deg]" />
            <div className="rounded-2xl bg-paper p-4">
              <img src={botMascot} alt="Reckon, the friendly skincare bot" className="mx-auto h-56 w-auto wobble" width={400} height={400} />
            </div>
            <p className="mt-4 text-center font-hand text-2xl text-ink">
              "Hi! I'm Reckon. I've read every ingredient label so you don't have to."
            </p>
            <div className="mt-3 flex justify-center gap-1">
              <span className="h-2 w-2 rounded-full bg-rust blink-dot" />
              <span className="h-2 w-2 rounded-full bg-rust blink-dot" style={{ animationDelay: "0.2s" }} />
              <span className="h-2 w-2 rounded-full bg-rust blink-dot" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelfieCta() {
  const [scanning, setScanning] = useState(false);
  return (
    <button
      onClick={() => {
        setScanning(true);
        setTimeout(() => setScanning(false), 3200);
      }}
      className="sticker group relative flex min-w-[240px] items-center gap-4 px-5 py-4 text-left"
      style={{ background: "var(--rust)", color: "var(--cream)" }}
    >
      <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-cream bg-ink text-xl">
        <FontAwesomeIcon icon={faCamera} className="w-5 h-5 text-cream" />
        <span className="absolute inset-0 animate-ping rounded-full border-2 border-cream opacity-60 group-hover:opacity-100" />
      </span>
      <span className="flex-1">
        <span className="block font-display text-lg font-bold">Snap a Selfie</span>
        <span className="block text-xs opacity-90">
          {scanning ? "AI scanning… analyzing pores, dewpoints, vibes…" : "Tap. Smile. Science."}
        </span>
        {scanning && (
          <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-cream/30">
            <span className="block h-full bg-mustard" style={{ animation: "loadbar 3s linear forwards" }} />
          </span>
        )}
      </span>
    </button>
  );
}

function QuizCta() {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="sticker group relative flex min-w-[240px] items-center gap-4 bg-cream px-5 py-4 text-left"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-mustard text-xl">
        <FontAwesomeIcon icon={faClipboard} className="w-5 h-5" />
      </span>
      <span className="flex-1">
        <span className="block font-display text-lg font-bold">Take the 30‑Second Skin Quiz</span>
        <span className="block text-xs text-muted-foreground">4 questions. Zero homework.</span>
        <span
          className="mt-2 block overflow-hidden text-xs font-medium text-rust transition-all"
          style={{ maxHeight: hover ? 60 : 0, opacity: hover ? 1 : 0 }}
        >
          Q1: By 3pm, your face feels…<br />
          <span className="font-hand text-base text-ink">a) like a desert  b) like a slip 'n slide  c) <FontAwesomeIcon icon={faWandMagicSparkles} className="w-3 h-3 inline" /> both <FontAwesomeIcon icon={faWandMagicSparkles} className="w-3 h-3 inline" /></span>
        </span>
      </span>
    </button>
  );
}

function TrustRow() {
  const items = [
    { icon: faFlask, t: "1,400+ ingredients indexed" },
    { icon: faEye, t: "On-device selfie scan" },
    { icon: faEnvelope, t: "No spam. Promise." },
    { icon: faEnvelope, t: "Dermatologist-reviewed copy" },
  ];
  return (
    <section id="trust" className="border-y-2 border-dashed border-ink/30 bg-cream/40 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-x-8 gap-y-3 px-5 text-sm font-medium md:px-10">
        {items.map((i) => (
          <span key={i.t} className="flex items-center gap-2">
            <FontAwesomeIcon icon={i.icon} className="w-4 h-4 text-lg" />
            {i.t}
          </span>
        ))}
      </div>
    </section>
  );
}



function HowItWorks() {
  const steps = [
    { n: "01", e: faCamera, t: "Selfie (or skip)", b: "On-device computer vision..." },
    { n: "02", e: faClipboard, t: "4 lil' questions", b: "How does your skin feel..." },
    { n: "03", e: faBrain, t: "We match", b: "Our algorithm filters..." },
  ];
  return (
    <section id="how" className="relative mx-auto max-w-7xl px-5 py-24 md:px-10">
      <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-hand text-2xl text-rust">how the sausage gets matched →</span>
          <h2 className="mt-1 font-display text-4xl font-extrabold md:text-5xl">Three steps. No mystery actives.</h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          We built Reckon because skincare shouldn't feel like a chemistry exam written by a marketing intern.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.n} className="sticker relative p-6" style={{ transform: `rotate(${i === 1 ? 0.8 : i === 0 ? -1.2 : 1.5}deg)` }}>
            <span className="font-hand text-3xl text-rust">{s.n}</span>
            <div className="mt-2 text-4xl"><FontAwesomeIcon icon={s.e} className="w-8 h-8" /></div>
            <h3 className="mt-3 font-display text-2xl font-bold">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkinDemo() {
  const [active, setActive] = useState<SkinType>("dry");
  const zones: { id: SkinType; label: string; cx: number; cy: number; rx: number; ry: number; fill: string }[] = [
    { id: "oily",      label: "Forehead — Oily",     cx: 150, cy: 60,  rx: 70, ry: 28, fill: "var(--mustard)" },
    { id: "combo",     label: "Nose — Combo",        cx: 150, cy: 130, rx: 18, ry: 36, fill: "var(--clay)" },
    { id: "dry",       label: "Cheeks — Dry",        cx: 78,  cy: 145, rx: 32, ry: 26, fill: "var(--teal)" },
    { id: "sensitive", label: "Chin — Sensitive",    cx: 150, cy: 215, rx: 40, ry: 22, fill: "var(--rust)" },
  ];
  const copy = skinCopy[active];

  return (
    <section id="demo" className="relative bg-cream/50 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-2">
        <div>
          <span className="font-hand text-2xl text-rust">live demo (no signup) ↓</span>
          <h2 className="mt-1 font-display text-4xl font-extrabold md:text-5xl">
            Poke a zone. Watch the advice change.
          </h2>
          <p className="mt-4 text-muted-foreground">
            This is roughly how our recommender thinks — zones in, suggestions out. Real version uses your actual selfie.
          </p>

          <div key={active} className="sticker mt-8 animate-[fade-in_0.4s_ease-out] p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rust">
              <span className="inline-block h-2 w-2 rounded-full bg-rust" /> matched zone: {active}
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold">{copy.title}</h3>
            <p className="mt-2 text-muted-foreground">{copy.body}</p>
            <p className="mt-4 rounded-md border-2 border-dashed border-ink/40 bg-paper p-3 font-hand text-lg">
              {copy.pick}
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="sticker p-6">
            <svg viewBox="0 0 300 280" className="w-full">
              <path
                d="M150 18 C 220 18 250 80 248 150 C 246 220 200 264 150 264 C 100 264 54 220 52 150 C 50 80 80 18 150 18 Z"
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <circle cx="115" cy="115" r="4" fill="var(--ink)" />
              <circle cx="185" cy="115" r="4" fill="var(--ink)" />
              <path d="M125 195 Q 150 210 175 195" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

              {zones.map((z) => (
                <g key={z.id} data-zone={z.id} onClick={() => setActive(z.id)} className="cursor-pointer">
                  <ellipse
                    cx={z.cx} cy={z.cy} rx={z.rx} ry={z.ry}
                    fill={z.fill}
                    fillOpacity={active === z.id ? 0.75 : 0.35}
                    stroke="var(--ink)"
                    strokeWidth={active === z.id ? 3 : 1.5}
                    strokeDasharray={active === z.id ? "0" : "4 3"}
                    style={{ transition: "all 200ms" }}
                  />
                </g>
              ))}
            </svg>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {zones.map((z) => (
                <button
                  key={z.id}
                  data-zone={z.id}
                  onClick={() => setActive(z.id)}
                  className={`rounded-lg border-2 border-ink px-3 py-2 text-left text-xs font-semibold transition ${
                    active === z.id ? "bg-ink text-cream" : "bg-paper hover:bg-mustard/50"
                  }`}
                >
                  {z.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reassurance() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const badges = [
    { e: faStethoscope, t: "No medical claims", s: "Just smart suggestions." },
    { e: faLock, t: "Selfie stays local", s: "We never upload your face." },
    { e: faSprout, t: "Real ingredients", s: "Cited, sourced, no fluff." },
    { e: faDollarSign, t: "Budget-aware", s: "From drugstore to splurge." },
  ];

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <h2 className="max-w-2xl font-display text-4xl font-extrabold md:text-5xl">
        Things we promise <span className="scribble-underline text-rust">out loud.</span>
      </h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b, i) => (
          <div
            key={b.t}
            className="sticker bg-cream p-5"
            style={{
              animation: visible ? `peel-in 0.7s ${i * 0.12}s ease-out both` : "none",
              opacity: visible ? undefined : 0,
              transform: `rotate(${i % 2 === 0 ? -2 : 2.5}deg)`,
            }}
          >
            <span className="tape -top-2 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
            <div className="text-3xl"><FontAwesomeIcon icon={b.e} className="w-8 h-8" /></div>
            <h3 className="mt-3 font-display text-lg font-bold">{b.t}</h3>
            <p className="text-sm text-muted-foreground">{b.s}</p>
          </div>
        ))}
      </div>

      <div className="sticker mx-auto mt-16 max-w-3xl bg-mustard p-8 text-center">
        <p className="font-hand text-3xl">ok cool, let's actually do the thing →</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#cta" className="sticker flex items-center gap-2 px-6 py-3 font-display text-lg font-bold" style={{ background: "var(--rust)", color: "var(--cream)" }}>
            <FontAwesomeIcon icon={faCamera} className="w-5 h-5" /> Snap a Selfie
          </a>
          <a href="#cta" className="sticker flex items-center gap-2 bg-paper px-6 py-3 font-display text-lg font-bold">
            <FontAwesomeIcon icon={faClipboard} className="w-5 h-5" /> Take the Quiz
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-dashed border-ink/30 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground md:flex-row md:px-10">
        <div className="font-hand text-lg text-ink">dewy © {new Date().getFullYear()} — made with dry hands</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-rust">Privacy (the good kind)</a>
          <a href="#" className="hover:text-rust">Sources</a>
          <a href="#" className="hover:text-rust">Say hi</a>
        </div>
      </div>
    </footer>
  );
}
