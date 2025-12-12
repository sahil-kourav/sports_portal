import React from "react";

const CallToAction = () => {
  return (
    <section className="relative  py-24 px-6 md:px-0 flex flex-col items-center text-center">
      {/* Decorative background circles */}

      {/* Content */}
      <h1 className="relative text-2xl md:text-4xl text-gray-900 font-extrabold mb-4 max-w-2xl">
        Compete Anytime, Anywhere!
      </h1>
      <p className="relative text-gray-600 sm:text-base md:text-lg max-w-3xl mb-8">
        Join thrilling tournaments, test your skills, and rise to the top. Play, compete, and make your mark in the world of sports!
      </p>

      {/* Buttons */}
      <div className="relative flex flex-col sm:flex-row items-center gap-4">
        <button className="px-8 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-all font-semibold">
          Get Started
        </button>
        <button className="px-8 py-3 rounded-xl text-blue-600 border border-blue-600 hover:bg-blue-50 transition-all font-semibold">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
