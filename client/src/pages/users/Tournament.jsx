import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Tournament = () => {
  return (
    <div className="mb-3">
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://t4.ftcdn.net/jpg/04/28/40/41/360_F_428404142_xeY0I0sgtOWawFv7eLzZMaviRU3eGNv4.jpg"
          alt="course"
          className="w-full h-36 object-cover rounded-t-lg cursor-pointer"
        />
      </div>

      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate cursor-pointer">Tata IPL 2025</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
       
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm cursor-pointer">Indore</h1>
          </div>
          <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full cursor-pointer'}>
            Paid
          </Badge>
        </div>

        <div className="text-lg font-bold">
            <span>₹0.0</span>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default Tournament;
