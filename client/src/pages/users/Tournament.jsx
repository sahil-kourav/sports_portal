import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Tournament = () => {
  return (
    <div className="mb-6 px-4">
      <Card className="overflow-hidden rounded-xl shadow-lg dark:bg-gray-800 bg-white transform hover:scale-105 transition-all duration-300 w-400px max-w-[350px] mx-auto">
        <div className="relative">
          <img
            src="https://t4.ftcdn.net/jpg/04/28/40/41/360_F_428404142_xeY0I0sgtOWawFv7eLzZMaviRU3eGNv4.jpg"
            alt="tournament"
            className="w-full h-48 object-cover rounded-t-xl cursor-pointer"
          />
        </div>

        <CardContent className="px-6 py-5 space-y-4">
          <h1 className="hover:underline font-bold text-xl text-left truncate cursor-pointer">
            Tata IPL 2025
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-md cursor-pointer">Indore</h1>
            </div>
            <Badge className={'bg-blue-600 text-white px-3 py-1 text-sm rounded-full cursor-pointer'}>
              Paid
            </Badge>
          </div>

          <div className="text-lg font-bold text-left text-gray-900">
            <span>₹0.0</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tournament;
