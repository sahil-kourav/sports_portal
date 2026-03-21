import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex items-center justify-center px-6">
      <div className="text-center max-w-md">

        {/* 404 */}
        <p className="text-8xl font-bold text-gray-100 select-none leading-none">
          404
        </p>

        <h1 className="text-2xl font-bold text-gray-900 mt-2">Page Not Found</h1>
        <p className="text-gray-400 text-sm mt-2 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button
            onClick={() => navigate("/")}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Home size={15} /> Go Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft size={15} /> Go Back
          </Button>
        </div>

      </div>
    </div>
  );
};

export default NotFound;