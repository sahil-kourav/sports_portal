import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-black to-neutral-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="text-center px-6 py-24 md:py-32">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-200"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Let’s Connect & Collaborate
        </motion.h1>

        <motion.p
          className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          We’re here to make sports more connected, digital, and exciting.  
          Whether you’re a player, sponsor, or organizer — we’d love to collaborate!
        </motion.p>
      </section>

      {/* Contact Cards */}
      <section className="px-6 md:px-16 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <motion.div
            className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:scale-[1.03] transition-all duration-300"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="w-10 h-10 mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Email Us</h3>
            <p className="text-gray-400 mb-2">Have queries or proposals?</p>
            <p className="text-gray-300 font-medium">support@sportxpert.in</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:scale-[1.03] transition-all duration-300"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Phone className="w-10 h-10 mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Call Us</h3>
            <p className="text-gray-400 mb-2">Available Mon–Sat, 10 AM – 7 PM</p>
            <p className="text-gray-300 font-medium">+91 98765 43210</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:scale-[1.03] transition-all duration-300"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MapPin className="w-10 h-10 mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Visit Us</h3>
            <p className="text-gray-400 mb-2">Our sports innovation hub</p>
            <p className="text-gray-300 font-medium">Bhopal, Madhya Pradesh</p>
          </motion.div>
        </div>
      </section>

      {/* Social & Community Section */}
      <section className="text-center px-6 py-16 bg-white/5 border-y border-white/10 backdrop-blur-lg">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Join Our Community
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Stay updated with the latest tournaments, training sessions, and player meetups.  
          Be a part of the <span className="text-gray-200 font-medium">SportXpert Revolution.</span>
        </motion.p>

        <div className="flex justify-center gap-6">
          <a href="#" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition">
            <Instagram className="w-6 h-6 text-gray-300" />
          </a>
          <a href="#" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition">
            <Twitter className="w-6 h-6 text-gray-300" />
          </a>
          <a href="#" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition">
            <Linkedin className="w-6 h-6 text-gray-300" />
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="text-center px-6 py-24"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100">
          Ready to Level Up Your Game?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Connect with our team to explore tournaments, partnerships, and player opportunities.
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-gray-200 to-gray-400 text-black font-semibold rounded-full hover:from-white hover:to-gray-200 transition-all duration-300 shadow-lg">
          Join SportXpert Today
        </button>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} SportXpert. Built for Passionate Players.  
          <br /> “Compete. Connect. Conquer.”
        </p>
      </footer>
    </div>
  );
};

export default ContactUs;
