import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useGetCreatorTournamentQuery } from "@/features/api/tournamentApi";

// ✅ Reusable Stat Card Component
const StatCard = ({ title, value }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { data, isLoading } = useGetCreatorTournamentQuery();

  // ✅ Ensuring Hooks Order
  const tournaments = data?.tournaments || [];

  const tournamentData = useMemo(
    () =>
      tournaments.map((tournament) => ({
        name: tournament.tournamentTitle,
        registrationFee: tournament.registrationFee,
        enrolledUsers: tournament.enrolledUsers.length,
      })),
    [tournaments]
  );

  const totalRevenue = useMemo(
    () =>
      tournaments.reduce(
        (acc, tournament) => acc + tournament.registrationFee * (tournament.enrolledUsers.length || 0),
        0
      ),
    [tournaments]
  );

  const totalEnrollments = useMemo(
    () => tournaments.reduce((acc, tournament) => acc + tournament.enrolledUsers.length, 0),
    [tournaments]
  );

  // ✅ Loading state handled AFTER hooks
  if (isLoading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <StatCard title="Total Enrollments" value={totalEnrollments} />
      <StatCard title="Total Revenue" value={`₹${totalRevenue}`} />

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">Tournament Enrollments & Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tournamentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#6b7280" angle={-30} textAnchor="end" interval={0} />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value, name) => [`${value}`, name === "registrationFee" ? "Registration Fee" : "Enrolled Users"]} />
              <Line type="monotone" dataKey="registrationFee" stroke="#4a90e2" strokeWidth={3} dot={{ stroke: "#4a90e2", strokeWidth: 2 }} />
              <Line type="monotone" dataKey="enrolledUsers" stroke="#e24a4a" strokeWidth={3} dot={{ stroke: "#e24a4a", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>  
      </Card>
    </div>
  );
};

export default Dashboard;
