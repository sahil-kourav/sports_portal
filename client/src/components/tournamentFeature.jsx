import React from "react";

const events = [
  {
    id: 1,
    name: "Football Championship",
    date: "March 10, 2025",
    location: "National Stadium, Indore",
    image: "https://source.unsplash.com/400x300/?football",
    host: "Admin",
  },
  {
    id: 2,
    name: "Basketball League",
    date: "April 5, 2025",
    location: "City Sports Arena, Bhopal",
    image: "https://source.unsplash.com/400x300/?basketball",
    host: "Admin",
  },
  {
    id: 3,
    name: "Tennis Open",
    date: "May 20, 2025",
    location: "Central Park Tennis Court",
    image: "https://source.unsplash.com/400x300/?tennis",
    host: "Admin",
  },
  {
    id: 4,
    name: "Cricket Tournament",
    date: "June 15, 2025",
    location: "Indore Cricket Ground",
    image: "https://source.unsplash.com/400x300/?cricket",
    host: "Admin",
  },
];

const SportsEvents = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Upcoming Sports Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
                <p className="text-gray-600 text-sm">{event.date}</p>
                <p className="text-gray-500 text-sm">📍 {event.location}</p>
                <p className="text-gray-700 text-sm font-medium">🎤 Hosted by: {event.host}</p>
                <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsEvents;
