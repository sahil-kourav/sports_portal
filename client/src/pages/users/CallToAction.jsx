import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-20 text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-2xl mx-auto">
        Compete Anytime,{" "}
        <span className="text-blue-500">Anywhere.</span>
      </h2>
      <p className="mt-4 text-gray-400 text-md max-w-xl mx-auto leading-relaxed">
        Join thrilling tournaments, test your skills, and rise to the top.
        Play, compete, and make your mark in Indian sports.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          onClick={() => navigate("/register")}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-lg"
        >
          Get Started <ArrowRight size={15} />
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/about-us")}
          className="px-7 py-3 rounded-lg border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent font-semibold"
        >
          Learn More
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;