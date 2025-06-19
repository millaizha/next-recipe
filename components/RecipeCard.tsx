"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Skeleton } from "@heroui/react";

// Type for recipe object
interface Recipe {
  id: string;
  name: string;
  image: string | undefined;
  cookingTime: string;
  servings: number;
}

// Props for RecipeCard component
interface RecipeCardProps {
  recipe: Recipe;
  isLoaded?: boolean;
}

export default function RecipeCard({ recipe, isLoaded }: RecipeCardProps) {
  // Track if the image has loaded
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Use parent-provided isLoaded if available, else use image load state
  const resolvedIsLoaded = isLoaded ?? isImageLoaded;

  return (
    <Link href={`/recipes/${recipe.id}`} className="block h-full">
      <div className="relative h-full flex transition-transform duration-300 hover:scale-105">
        {/* Recipe image with skeleton loader */}
        <div className="absolute top-1/2 right-[-4] md:right-4 transform -translate-y-1/2">
          <Skeleton
            isLoaded={resolvedIsLoaded}
            className="w-42 h-42 xl:w-52 xl:h-52 rounded-full"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-44 h-44 xl:w-52 xl:h-52 rounded-full object-cover border-4 border-white shadow-md"
              onLoad={() => setIsImageLoaded(true)}
            />
          </Skeleton>
        </div>
        {/* Recipe details */}
        <div
          className="p-8 pr-36 w-3/4 sm:w-5/6 bg-white rounded-2xl shadow-md 
             flex flex-col justify-between hover:shadow-lg"
        >
          <div>
            {/* Name, cooking time, and servings with skeleton loader */}
            <Skeleton isLoaded={resolvedIsLoaded} className="rounded-md">
              <h2 className="text-xl xl:text-3xl font-semibold text-yellow-700 mb-2">
                {recipe.name}
              </h2>
              <div className="text-sm text-zinc-700 mb-4 space-y-1">
                <div className="flex items-center gap-2 text-lg xl:text-2xl font-medium">
                  <Clock className="w-5 h-5" />
                  {recipe.cookingTime}
                </div>
                <div className="flex items-center gap-2 text-lg xl:text-2xl font-medium">
                  <Users className="w-5 h-5" />
                  {recipe.servings} Servings
                </div>
              </div>
            </Skeleton>
          </div>
          {/* Arrow button for navigation */}
          <div className="mt-auto group">
            <div
              className="w-10 h-10 xl:w-12 xl:h-12 bg-yellow-400 rounded-full flex items-center justify-center 
               text-white transition-transform duration-300 -rotate-45 group-hover:rotate-0"
            >
              <ArrowRight className="xl:w-8 xl:h-8" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
