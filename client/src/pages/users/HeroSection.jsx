
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

            <div className="flex flex-col sm:flex-row w-full max-w-xl items-center gap-4 mb-6 py-4">
                <Input
                    className="w-full py-6 px-4 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search for tournaments"
                />
                <Button className="w-full sm:w-auto px-8 py-6 bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Search
                </Button>
            </div>

            <div className="text-center py-6">
                <p className="text-gray-600 font-medium py-6">
                Trusted by players, coaches, and sports lovers nationwide!
                </p>

                <div className="flex flex-wrap justify-center  py-4 gap-4 sm:gap-6 md:gap-8">
                    {[
                        { name: "t-one", logo: "https://marketplace.canva.com/EAFzNP09R9c/1/0/1600w/canva-colorful-abstract-illustrative-cricket-club-sports-logo-HPTinIp3XS8.jpg" },
                        { name: "t-two", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZknRn9UT0D-V8RiWHWs4q1PRk8VlOVLj19eQX6nu2YR6dbiJxhLqsmdgV90cO6Ujtbno&usqp=CAU" },
                        { name: "t-three", logo: "https://marketplace.canva.com/EAF0BoJNksI/2/0/1600w/canva-orange-and-brown-illustrative-cricket-club-sports-logo-8CIQQEwJHW4.jpg" },
                        { name: "t-four", logo: "https://static.vecteezy.com/system/resources/previews/038/017/473/non_2x/sr-cricket-logo-illustration-of-cricket-sport-free-vector.jpg" },
                        { name: "t-five", logo: "https://marketplace.canva.com/EAGGl1xzKVM/1/0/1600w/canva-colorful-abstract-illustrative-cricket-sports-logo-4U6R-dH_tJQ.jpg" },
                    ].map((tournament, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-center h-20 w-28 sm:w-36 md:w-40 p-8"
                        >
                            <img
                                src={tournament.logo}
                                alt={tournament.name}
                                className="h-20 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
