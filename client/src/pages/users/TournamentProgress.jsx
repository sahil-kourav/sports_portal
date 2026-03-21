import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTournamentDetailWithStatusQuery } from "@/features/api/tournamentApi";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, Home, Calendar, MapPin, Trophy,
  Users, ArrowLeft, Clock, Swords,
} from "lucide-react";

/* ───────────────────────────── helpers ── */

const fmt = (d) => {
  if (!d) return "N/A";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });
};

/* ───────────────────────── enrollment animation ── */

const STEPS = [
  { label: "Verifying eligibility",  duration: 900 },
  { label: "Reserving your spot",    duration: 1100 },
  { label: "Confirming registration",duration: 900 },
  { label: "All set!",               duration: 600 },
];

const EnrollmentLoader = ({ onDone }) => {
  const [step, setStep]       = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone]       = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    let s = 0;
    const total = STEPS.reduce((a, x) => a + x.duration, 0);
    let elapsed = 0;

    const tick = (now) => {
      if (!startRef.current) startRef.current = now;
      const dt = now - startRef.current;
      startRef.current = now;
      elapsed += dt;

      // which step are we in?
      let acc = 0;
      for (let i = 0; i < STEPS.length; i++) {
        acc += STEPS[i].duration;
        if (elapsed < acc) { s = i; break; }
        s = STEPS.length - 1;
      }
      setStep(s);
      setProgress(Math.min((elapsed / total) * 100, 100));

      if (elapsed < total) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(onDone, 700);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Syne+Mono&display=swap');
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(44px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(44px) rotate(-360deg); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity:.6; }
          100% { transform: scale(1.8); opacity:0;  }
        }
        @keyframes trophy-drop {
          0%   { transform: translateY(-30px) scale(.8); opacity:0; }
          60%  { transform: translateY(6px)   scale(1.08); opacity:1; }
          100% { transform: translateY(0)     scale(1);    opacity:1; }
        }
        @keyframes checkmark {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0;  }
        }
        .orbit-dot { animation: orbit 1.4s linear infinite; }
        .pulse-ring { animation: pulse-ring 1.4s ease-out infinite; }
        .trophy-drop { animation: trophy-drop .6s cubic-bezier(.34,1.56,.64,1) forwards; }
      `}</style>

      <div className="flex flex-col items-center gap-10 px-6 text-center" style={{ fontFamily: "'Syne', sans-serif" }}>

        {/* ── icon ring ── */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* pulse rings */}
          <span className="absolute inset-0 rounded-full border border-[#d4af37]/30 pulse-ring" />
          <span className="absolute inset-0 rounded-full border border-[#d4af37]/20 pulse-ring" style={{ animationDelay: ".5s" }} />

          {/* orbiting dot */}
          {!done && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#d4af37] orbit-dot" />
          )}

          {/* centre icon */}
          <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center">
            {done ? (
              <svg viewBox="0 0 40 40" className="w-10 h-10 trophy-drop">
                <polyline
                  points="8,22 17,31 32,12"
                  fill="none" stroke="#d4af37" strokeWidth="3.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray="60" strokeDashoffset="60"
                  style={{ animation: "checkmark .5s ease forwards .1s" }}
                />
              </svg>
            ) : (
              <Trophy size={32} className="text-[#d4af37]" />
            )}
          </div>
        </div>

        {/* ── step label ── */}
        <div className="space-y-1">
          <p className="text-[11px] tracking-[.25em] text-[#d4af37] uppercase font-semibold" style={{ fontFamily: "'Syne Mono', monospace" }}>
            {done ? "Complete" : `Step ${step + 1} of ${STEPS.length}`}
          </p>
          <p className="text-white text-2xl font-bold tracking-tight transition-all duration-300">
            {done ? "You're in!" : STEPS[step].label}
          </p>
        </div>

        {/* ── progress bar ── */}
        <div className="w-72">
          <div className="h-[3px] bg-[#1e1e1e] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#d4af37] rounded-full"
              style={{ width: `${progress}%`, transition: "width .12s linear" }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[#555]" style={{ fontFamily: "'Syne Mono', monospace" }}>
            <span>0%</span>
            <span>{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* ── step dots ── */}
        <div className="flex gap-3">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === step && !done ? "28px" : "8px",
                background: i <= step || done ? "#d4af37" : "#2a2a2a",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── info row ── */
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
    <div className="shrink-0 w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mt-0.5">
      {icon}
    </div>
    <div>
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
);

/* ───────────────────────── stat chip ── */
const Stat = ({ label, value, accent }) => (
  <div className="flex flex-col items-center gap-1 px-5 py-4 rounded-2xl bg-white border border-gray-100">
    <span className={`text-2xl font-bold ${accent}`}>{value}</span>
    <span className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">{label}</span>
  </div>
);

/* ───────────────────────── main ── */
const TournamentProgress = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } =
    useGetTournamentDetailWithStatusQuery(tournamentId);

  // Show the enrollment animation once per visit (session flag)
  const sessionKey = `tp_seen_${tournamentId}`;
  const [showLoader, setShowLoader] = useState(
    () => !sessionStorage.getItem(sessionKey)
  );

  const handleLoaderDone = () => {
    sessionStorage.setItem(sessionKey, "1");
    setShowLoader(false);
  };

  /* ── render states ── */

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600&display=swap');
          @keyframes shimmer { 0%,100%{opacity:.3} 50%{opacity:1} }
          .shimmer { animation: shimmer 1.4s ease-in-out infinite; }
        `}</style>
        <div className="flex flex-col items-center gap-4">
          <Trophy size={36} className="text-amber-400 shimmer" />
          <p className="text-sm text-gray-400 font-semibold tracking-widest uppercase shimmer" style={{ fontFamily: "'Syne', sans-serif" }}>
            Loading tournament…
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-[#f7f6f2] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <Trophy size={48} className="text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-800">Failed to load progress</h2>
        <p className="text-gray-500 max-w-xs">We couldn't fetch the tournament details. Please try again.</p>
        <Button onClick={() => navigate(-1)} variant="outline" className="gap-2 mt-2">
          <ArrowLeft size={15} /> Go Back
        </Button>
      </div>
    );

  const { tournament } = data;
  const spotsLeft = tournament.maxTeams - (tournament.enrolledUsers?.length ?? 0);

  return (
    <>
      {showLoader && <EnrollmentLoader onDone={handleLoaderDone} />}

      <div
        className="min-h-screen text-gray-900"
        style={{ fontFamily: "'Syne', sans-serif", background: "#f7f6f2" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Syne+Mono&display=swap');
          @keyframes fade-up {
            from { opacity:0; transform:translateY(18px); }
            to   { opacity:1; transform:translateY(0);    }
          }
          .fade-up { animation: fade-up .55s cubic-bezier(.4,0,.2,1) both; }
          .delay-1 { animation-delay:.1s }
          .delay-2 { animation-delay:.2s }
          .delay-3 { animation-delay:.32s }
          .delay-4 { animation-delay:.44s }
          .delay-5 { animation-delay:.56s }
        `}</style>

        {/* ── header band ── */}
            <div className="max-w-6xl mx-auto px-6 py-4 space-y-8">
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 text-md text-gray-700 hover:text-gray-900 hover:font-semibold transition-colors"
            >
              <ArrowLeft size={15} /> Home
            </button>
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-tight">
              Enrollment Confirmed
            </span>
            <div className="w-16" />
          </div>
        </div>


          {/* ── success hero ── */}
          <div className="fade-up text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 mx-auto">
              <CheckCircle size={38} className="text-emerald-500" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                You're Enrolled!
              </h1>
              <p className="mt-2 text-gray-500 text-base max-w-md mx-auto leading-relaxed">
                Your spot in{" "}
                <span className="font-bold text-gray-800">
                  {tournament.tournamentTitle}
                </span>{" "}
                is confirmed. Prepare to compete.
              </p>
            </div>
          </div>

          {/* ── stat row ── */}
          <div className="fade-up delay-1 grid grid-cols-3 gap-3">
            <Stat label="Teams" value={tournament.maxTeams} accent="text-gray-900" />
            <Stat
              label="Spots Left"
              value={spotsLeft}
              accent={spotsLeft <= 3 ? "text-rose-500" : "text-emerald-600"}
            />
            <Stat label="Entry Fee" value={`₹${tournament.registrationFee}`} accent="text-amber-600" />
          </div>

          {/* ── main card ── */}
          <div className="fade-up delay-2 bg-white rounded-3xl border border-gray-200 shadow-lg shadow-gray-200/50 overflow-hidden">
            <div className="p-7">
              {/* title */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[.2em] mb-1">Tournament</p>
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    {tournament.tournamentTitle}
                  </h2>
                </div>
                <span className="shrink-0 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                  ✓ Enrolled
                </span>
              </div>

              {/* description */}
              {tournament.description && (
                <p className="text-sm text-gray-500 leading-relaxed mb-6 border-l-2 border-gray-100 pl-4">
                  {tournament.description}
                </p>
              )}

              {/* info rows */}
              <InfoRow icon={<Calendar size={16} className="text-sky-500" />}   label="Tournament Start Date"    value={fmt(tournament.startDate)} />
              <InfoRow icon={<Calendar size={16} className="text-rose-400" />}  label="Tournament End Date"      value={fmt(tournament.endDate)} />
              <InfoRow icon={<Clock    size={16} className="text-amber-500" />} label="Registration Deadline" value={fmt(tournament.registrationDeadline)} />
              <InfoRow icon={<MapPin   size={16} className="text-indigo-500" />} label="Venue"    value={tournament.location || "TBA"} />
              <InfoRow icon={<Users    size={16} className="text-teal-500" />}  label="Age Group" value={`${tournament.minAge}–${tournament.maxAge} years`} />
            </div>
          </div>

          {/* ── what's next card ── */}
          <div className="fade-up delay-3 bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Swords size={18} className="text-amber-500" />
              <h3 className="font-bold text-gray-800">What's Next?</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-gray-600">
              {[
                "Check your email for confirmation details and match schedule.",
                "Make sure your team is formed before the tournament starts.",
                `Arrive at ${tournament.location || "the venue"} at least 30 minutes early.`,
                "Keep an eye on the app for bracket updates.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[10px] font-bold text-amber-600">
                    {i + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TournamentProgress;