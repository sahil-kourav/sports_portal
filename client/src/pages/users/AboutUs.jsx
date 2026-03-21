import React from "react";
import { Trophy, Users, Target, Flame, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MISSION_CARDS = [
  {
    icon: Trophy,
    title: "Top Tournaments",
    desc: "Discover the best tournaments tailored to your skills and passion across India.",
  },
  {
    icon: Target,
    title: "Expert Guidance",
    desc: "Gain insights from professionals and elevate your game to the next level.",
  },
  {
    icon: Users,
    title: "Vibrant Community",
    desc: "Connect, collaborate, and compete with players who share your passion.",
  },
];

const WHY_US = [
  "Clean, modern, and mobile-friendly design",
  "Transparent and verified tournament listings",
  "Real-time notifications and updates",
  "Dedicated dashboards for players and organizers",
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="text-gray-800 px-6 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
          About SportXpert
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto">
          Your Arena.{" "}
          <span className="text-blue-500">Your Energy.</span>{" "}
          Your Next Win.
        </h1>
        <p className="mt-6 text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          India's ultimate sports portal — where top tournaments, expert
          guidance, and a passionate community come together.
        </p>
      </section>

      {/* Mission */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
            At <span className="font-semibold text-gray-900">SportXpert</span>,
            we empower every athlete and sports enthusiast to reach their true
            potential — connecting players, tournaments, and opportunities.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {MISSION_CARDS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 mb-4">
                <Icon size={22} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="bg-gray-50 border-y border-gray-200 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 mb-6">
            <Flame size={22} className="text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-500 text-base leading-relaxed">
            To create India's most trusted, inclusive, and tech-driven sports
            ecosystem — a space that transforms raw passion into lasting legacy.
          </p>
        </div>
      </section>

      {/* Why Us */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose SportXpert?
            </h2>
            <ul className="space-y-3">
              {WHY_US.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                  <CheckCircle size={17} className="text-blue-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-950 text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Join the Revolution</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              SportXpert isn't just a platform — it's the next evolution of
              Indian sports culture. Be part of the movement that celebrates
              every athlete's journey.
            </p>
            <Button
              onClick={() => navigate("/register")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;