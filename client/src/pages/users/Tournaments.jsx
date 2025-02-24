import { Skeleton } from "@/components/ui/skeleton"
import React from "react";
import Tournament from "./Tournament";
const listOfTournaments = [1, 2, 3, 4, 5, 6];

const Tournaments = () => {
    const isLoading = false;
    return (
        <div>
            <div className="max-w-6xl mx-auto py-10 p-2">
                <h2 className="text-gray-700 font-bold text-3xl text-center mb-5">Learn from the best</h2>
                <p className="text-md text-gray-500 max-w-4xl text-center mx-auto mb-14">
                   Discover our top-rated tournaments across various categories. From local and national to international.</p> 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {
                        isLoading ? (
                            Array.from({ length: 8 }).map((_, index) => (
                                <TournamentSkeleton key={index} />
                            ))
                        ) : (
                            listOfTournaments.map((tournament, index) => <Tournament key={index} />)
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default Tournaments;

const CourseSkeleton = () => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
            <Skeleton className="w-full h-36" />
            <div className="px-5 py-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
    )
}