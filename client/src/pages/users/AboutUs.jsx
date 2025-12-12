import React from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Target, Flame } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-black to-neutral-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-200"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your Arena. Your Energy. Your Next Win.
        </motion.h1>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          India’s ultimate sports portal — where top tournaments, expert guidance, and a passionate community come together.  
          <br />
          <span className="text-gray-200 font-medium">Compete. Connect. Conquer.</span>
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 md:px-16 bg-transparent backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400">
            Our Mission
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            At <span className="font-semibold text-white">SportXpert</span>, we aim to empower every athlete, gamer, and sports enthusiast to reach their true potential.  
            Our platform connects players, tournaments, and opportunities — celebrating talent, teamwork, and the power of sports.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mt-16">
          {[
            { icon: Trophy, title: "Top Tournaments", desc: "Discover the best tournaments tailored to your skills and passion." },
            { icon: Target, title: "Expert Guidance", desc: "Gain insights from professionals and elevate your sports IQ." },
            { icon: Users, title: "Vibrant Community", desc: "Connect, collaborate, and compete with players like you." },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <item.icon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-black/80 via-neutral-900/90 to-black/80">
        <div className="max-w-5xl mx-auto text-center">
          <Flame className="w-14 h-14 mx-auto mb-6 text-gray-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-100">
            Our Vision
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            To create India’s most trusted, inclusive, and tech-driven sports ecosystem —  
            a space that transforms raw passion into lasting legacy.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 md:px-16 bg-transparent backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-100 to-gray-400">
              Why Choose SportXpert?
            </h2>
            <ul className="space-y-3 text-gray-400 text-lg">
              <li>✔️ Clean, modern, and mobile-friendly design</li>
              <li>✔️ Transparent and verified tournament listings</li>
              <li>✔️ Real-time notifications and analytics</li>
              <li>✔️ Dashboard for players and organizers</li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-100">
              Join the Revolution
            </h3>
            <p className="text-gray-400 leading-relaxed">
              SportXpert isn’t just a platform — it’s the next evolution of Indian sports culture.  
              Be part of the movement that celebrates every athlete’s journey.
            </p>
            <button className="mt-6 bg-gradient-to-r from-gray-200 to-gray-400 text-black font-semibold px-6 py-3 rounded-full hover:from-white hover:to-gray-200 transition-all duration-300">
              Get Started
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
