
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center bg-gradient-to-b from-blue-50 to-white px-6 sm:px-12 md:px-20 lg:px-32">
            <div className="text-center max-w-3xl mt-10">
                <h2 className="text-gray-700 text-4xl sm:text-5xl mt-10 pt-10 pb-5 font-serif">
                    Find the Best Tournaments for You
                </h2>


                <p className="text-base sm:text-lg text-gray-500 py-3 mb-10">
                India’s ultimate sports portal—where top tournaments, expert guidance, and a passionate community come together. Compete, connect, and conquer!                </p>
            </div>

            <div className="flex flex-col sm:flex-row w-full max-w-xl items-center gap-6 py-4">
                <Input
                    className="w-full py-6 px-4 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search for tournaments"
                />
                <Button className="w-full sm:w-auto px-8 py-6 bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Search
                </Button>
            </div>
        </div>
    );
};

export default HeroSection;
