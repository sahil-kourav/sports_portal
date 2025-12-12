// import TextType from "../../components/ui/TextType";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// const HeroSection = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const searchHandler = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       navigate(`/tournament/search?query=${searchQuery}`);
//     }
//     setSearchQuery("");
//   };

//   return (
//     <div className="flex flex-col items-center bg-gradient-to-b from-blue-50 to-white px-6 sm:px-12 md:px-20 lg:px-32">
//       <div className="text-center max-w-3xl mt-10">

//         <TextType
//           text={[
//             "Discover tournaments that match your skills",
//             "Join exciting competitions near you",
//             "Your next challenge starts here",
//           ]}
//           typingSpeed={75}
//           pauseDuration={1500}
//           showCursor={true}
//           cursorCharacter="_"
//         />

//         <p className="text-base sm:text-lg text-gray-500 py-3 mb-10">
//           India’s ultimate sports portal—where top tournaments, expert guidance,
//           and a passionate community come together. Compete, connect, and
//           conquer!
//         </p>
//       </div>

//       <form
//         onSubmit={searchHandler}
//         className="flex flex-col sm:flex-row w-full max-w-xl items-center gap-6 py-4"
//       >
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full py-3 px-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
//           placeholder="Search for tournaments"
//         />
//         <Button
//           type="submit"
//           className="w-full sm:w-auto px-7 py-6 bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Search
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default HeroSection;










import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TextType from "../../components/ui/TextType";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/tournament/search?query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100vh] bg-white text-gray-900 px-6 sm:px-12 md:px-20 overflow-hidden">

      {/* Hero Content */}
      <div className="text-center max-w-3xl mt-10 relative z-10">
        <TextType
          text={[
            "Discover tournaments that match your skills",
            "Join exciting competitions near you",
            "Your next challenge starts here",
          ]}
          typingSpeed={70}
          pauseDuration={1300}
          showCursor={true}
          cursorCharacter="_"
        />

        <p className="text-gray-600 text-base sm:text-lg mt-6 leading-relaxed">
          India’s ultimate sports portal — where top tournaments, expert guidance,  
          and a passionate community come together.{" "}
          <span className="text-gray-800 font-semibold">Compete. Connect. Conquer.</span>
        </p>
      </div>

      {/* Search Box */}
      <form
        onSubmit={searchHandler}
        className="flex flex-col sm:flex-row w-full max-w-xl items-center gap-4 mt-10 relative z-10 bg-white border border-gray-200 rounded-2xl shadow-md p-3"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:outline-none placeholder-gray-400"
          placeholder="Search for tournaments..."
        />
        <Button
          type="submit"
          className="w-full sm:w-auto px-8 py-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow"
        >
          Search
        </Button>
      </form>

      {/* Tagline / CTA */}
      <div className="mt-16 text-center text-gray-500 text-sm sm:text-base relative z-10">
        <p>Explore. Compete. Rise above. 🏆</p>
      </div>
    </section>
  );
};

export default HeroSection;
