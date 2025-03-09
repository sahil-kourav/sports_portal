import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  return (
    <div className=" min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">Admin Dashboard</h1>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Total Sales */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-200 p-4 sm:p-6">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-gray-700">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600">₹20,000</p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-200 p-4 sm:p-6">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-gray-700">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl sm:text-4xl font-bold text-green-600">₹20,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Prices Chart */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white shadow-lg rounded-xl border border-gray-200 w-full max-w-full overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4 text-center sm:text-left">Course Prices</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="name" stroke="#6b7280" angle={-30} textAnchor="end" interval={0} />
            <YAxis stroke="#6b7280" />
            <Tooltip formatter={(value) => [`₹${value}`]} />
            <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={3} dot={{ stroke: "#2563eb", strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;