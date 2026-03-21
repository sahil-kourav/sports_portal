import { useSelector } from "react-redux";
import EnrollTournamentButton from "@/components/EnrollTournamentButton";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, CheckCircle, AlertTriangle, Users, Trophy, Clock, ArrowLeft } from "lucide-react";
import { useGetTournamentDetailWithStatusQuery } from "@/features/api/tournamentApi";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* ─── helpers ─────────────────────────────────────────── */

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const calcAge = (dob) => {
  if (!dob) return null;
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());
  return beforeBirthday ? age - 1 : age;
};

const spotsLeft = (tournament) =>
  tournament.maxTeams - (tournament.enrolledUsers?.length ?? 0);

const isRegistrationOpen = (deadline) => {
  if (!deadline) return true;
  return new Date(deadline) > new Date();
};

/* ─── sub-components ──────────────────────────────────── */

const StatusBadge = ({ label, variant }) => {
  const variants = {
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    info: "bg-sky-50 text-sky-700 border border-sky-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    danger: "bg-rose-50 text-rose-700 border border-rose-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${variants[variant]}`}
    >
      {label}
    </span>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="group flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200">
    <div className="shrink-0 w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center transition-colors">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
        {title}
      </p>
      <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
    </div>
  </div>
);

/* ─── loading skeleton ────────────────────────────────── */

const Skeleton = () => (
  <div className="min-h-screen bg-[#f7f6f2] animate-pulse">
    <div className="h-64 bg-gray-200" />
    <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-6">
        <div className="h-8 bg-gray-200 rounded-xl w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
      <div className="h-96 bg-gray-200 rounded-3xl" />
    </div>
  </div>
);

/* ─── enroll button logic ─────────────────────────────── */

const EnrollSection = ({ tournament, enrolled, tournamentId, ageEligible }) => {
  const navigate = useNavigate();
  const full = spotsLeft(tournament) <= 0;
  const open = isRegistrationOpen(tournament.registrationDeadline);

  if (enrolled) {
    return (
      <Button
        className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
        onClick={() => navigate(`/tournament-progress/${tournamentId}`)}
      >
        Continue Tournament →
      </Button>
    );
  }
  if (full) {
    return (
      <Button disabled className="w-full h-12 rounded-xl bg-gray-100 text-gray-400 font-semibold cursor-not-allowed">
        Enrollment Full
      </Button>
    );
  }
  if (!open) {
    return (
      <Button disabled className="w-full h-12 rounded-xl bg-gray-100 text-gray-400 font-semibold cursor-not-allowed">
        Registration Closed
      </Button>
    );
  }
  if (!ageEligible) {
    return (
      <Button disabled className="w-full h-12 rounded-xl bg-gray-100 text-gray-400 font-semibold cursor-not-allowed">
        Age Criteria Not Met
      </Button>
    );
  }
  return <EnrollTournamentButton tournamentId={tournamentId} />;
};

/* ─── main component ──────────────────────────────────── */

const TournamentDetail = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError } =
    useGetTournamentDetailWithStatusQuery(tournamentId);

  // Derived values (memoised so they don't recompute on every render)
  const ageEligible = useMemo(() => {
    if (!data?.tournament) return false;
    const age = calcAge(user?.dob);
    const { minAge, maxAge } = data.tournament;
    return age !== null && age >= minAge && age <= maxAge;
  }, [data, user?.dob]);

  // Redirect if already enrolled
  useEffect(() => {
    if (data?.enrolled) {
      navigate(`/tournament-progress/${tournamentId}`, { replace: true });
    }
  }, [data?.enrolled, navigate, tournamentId]);

  /* ── render states ── */

  if (isLoading) return <Skeleton />;

  if (isError)
    return (
      <div className="min-h-screen bg-[#f7f6f2] flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertTriangle size={48} className="text-rose-400" />
        <h2 className="text-2xl font-bold text-gray-800">
          Couldn't load tournament
        </h2>
        <p className="text-gray-500 max-w-sm">
          Something went wrong while fetching the details. Please try again.
        </p>
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mt-2 gap-2"
        >
          <ArrowLeft size={16} /> Go back
        </Button>
      </div>
    );

  const { tournament, enrolled } = data;
  const remaining = spotsLeft(tournament);
  const spotsPercent = Math.round(
    ((tournament.enrolledUsers?.length ?? 0) / tournament.maxTeams) * 100
  );

  /* ── main render ── */

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#f7f6f2" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        .font-serif-display { font-family: 'DM Serif Display', serif; }
        .fill-bar { transition: width 0.8s cubic-bezier(.4,0,.2,1); }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative bg-white border-b border-gray-200">
        {/* Thumbnail strip */}
        {tournament.tournamentThumbnail && (
          <div
            className="absolute inset-0 opacity-[0.06] bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url(${tournament.tournamentThumbnail})` }}
          />
        )}

        <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-16">
          {/* Back link */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8"
          >
            <ArrowLeft size={15} /> All Tournaments
          </button>

          <div className="flex flex-wrap items-start gap-3 mb-5">
            <StatusBadge
              label={`${remaining} spots left`}
              variant={remaining <= 3 ? "danger" : "info"}
            />
            <StatusBadge
              label={`Ages ${tournament.minAge}–${tournament.maxAge}`}
              variant="success"
            />
            {!isRegistrationOpen(tournament.registrationDeadline) && (
              <StatusBadge label="Registration Closed" variant="warning" />
            )}
          </div>

          <h1 className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] max-w-3xl">
            {tournament.tournamentTitle}
          </h1>

          {tournament.subTitle && (
            <p className="mt-4 text-lg text-gray-500 max-w-2xl leading-relaxed">
              {tournament.subTitle}
            </p>
          )}

          {/* Progress bar */}
          <div className="mt-8 max-w-sm">
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
              <span className="flex items-center gap-1">
                <Users size={13} /> Enrollment
              </span>
              <span>
                {tournament.enrolledUsers?.length ?? 0} / {tournament.maxTeams}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="fill-bar h-full rounded-full"
                style={{
                  width: `${spotsPercent}%`,
                  background:
                    spotsPercent >= 90
                      ? "#ef4444"
                      : spotsPercent >= 60
                      ? "#f59e0b"
                      : "#10b981",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-10">
          {/* About */}
          <section>
            <h2 className="font-serif-display text-2xl text-gray-800 mb-4">
              About the Tournament
            </h2>
            <p className="text-gray-600 leading-[1.85] text-[15px]">
              {tournament.description}
            </p>
          </section>

          {/* Schedule grid */}
          <section>
            <h2 className="font-serif-display text-2xl text-gray-800 mb-5">
              Schedule & Venue
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <InfoCard
                icon={<MapPin size={18} className="text-indigo-500" />}
                title="Venue"
                value={tournament.location}
              />
              <InfoCard
                icon={<Trophy size={18} className="text-amber-500" />}
                title="Tournament Starts"
                value={formatDate(tournament.startDate)}
              />
              <InfoCard
                icon={<Calendar size={18} className="text-sky-500" />}
                title="Tournament Ends"
                value={formatDate(tournament.endDate)}
              />
              <InfoCard
                icon={<Clock size={18} className="text-rose-500" />}
                title="Registration Closes"
                value={formatDate(tournament.registrationDeadline)}
              />
            </div>
          </section>
        </div>

        {/* Right column – sticky card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/60 overflow-hidden sticky top-6">
            {/* Thumbnail */}
            {tournament.tournamentThumbnail ? (
              <div
                className="aspect-video h-36 w-32 bg-cover mx-auto bg-center"
                style={{
                  backgroundImage: `url(${tournament.tournamentThumbnail})`,
                }}
              />
            ) : (
              <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <Trophy size={40} className="text-gray-300" />
              </div>
            )}

            <div className="p-4 space-y-4">
              {/* Fee */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
                  Entry Fee
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{tournament.registrationFee}
                  <span className="text-sm font-normal text-gray-400 ml-1">
                    / team
                  </span>
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Stats */}
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Spots remaining</span>
                  <span
                    className={`font-bold ${
                      remaining <= 3 ? "text-rose-600" : "text-gray-800"
                    }`}
                  >
                    {remaining} / {tournament.maxTeams}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Age eligibility</span>
                  {ageEligible ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle size={14} /> Eligible
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-rose-500 font-semibold">
                      <AlertTriangle size={14} /> Not Eligible
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Age group</span>
                  <span className="font-semibold text-gray-800">
                    {tournament.minAge}–{tournament.maxAge} years
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* CTA */}
              <EnrollSection
                tournament={tournament}
                enrolled={enrolled}
                tournamentId={tournamentId}
                ageEligible={ageEligible}
              />

              <p className="text-xs text-center text-gray-400">
                Registration closes{" "}
                <span className="font-medium text-gray-600">
                  {formatDate(tournament.registrationDeadline)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;