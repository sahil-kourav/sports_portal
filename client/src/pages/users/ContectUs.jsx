import React from "react";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CONTACT_CARDS = [
  {
    icon: Mail,
    title: "Email Us",
    subtitle: "Have queries or proposals?",
    value: "support@sportxpert.in",
    href: "mailto:support@sportxpert.in",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Phone,
    title: "Call Us",
    subtitle: "Available Mon–Sat, 10 AM – 7 PM",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    subtitle: "Our sports innovation hub",
    value: "Bhopal, Madhya Pradesh",
    href: null,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

const SOCIALS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter,   href: "#", label: "Twitter"   },
  { icon: Linkedin,  href: "#", label: "LinkedIn"  },
];

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
    <section className="text-gray-800 px-6 py-6 text-center">
     <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto">
          Your Arena.{" "}
          <span className="text-blue-500">Your Energy.</span>{" "}
          Your Next Win.
        </h1>
      
        <p className="mt-6 text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Whether you're a player, sponsor, or organizer — we'd love to
          hear from you and work together.
        </p>
    </section>

      {/* Contact Cards */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          {CONTACT_CARDS.map(({ icon: Icon, title, subtitle, value, href, color, bg }) => (
            <div
              key={title}
              className="border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} mb-4`}>
                <Icon size={22} className={color} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-gray-400 text-sm mb-2">{subtitle}</p>
              {href ? (
                <a href={href} className={`text-sm font-medium ${color} hover:underline`}>
                  {value}
                </a>
              ) : (
                <p className="text-sm font-medium text-gray-700">{value}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="bg-gray-50 border-y border-gray-200 px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Join Our Community</h2>
        <p className="text-gray-500 text-base max-w-lg mx-auto mb-8 leading-relaxed">
          Stay updated with the latest tournaments, training sessions, and
          player meetups. Be part of the{" "}
          <span className="font-semibold text-gray-800">SportXpert Revolution.</span>
        </p>
        <div className="flex justify-center gap-3">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Ready to Level Up Your Game?
        </h2>
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          Connect with our team to explore tournaments, partnerships, and
          player opportunities across India.
        </p>
        <Button
          onClick={() => navigate("/register")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg"
        >
          Join SportXpert Today
        </Button>
      </section>

    </div>
  );
};

export default ContactUs;