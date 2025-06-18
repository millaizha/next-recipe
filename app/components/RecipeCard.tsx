"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@heroui/react";

interface Recipe {
  id: string;
  name: string;
  image: string | undefined;
  cookingTime: string;
  servings: number;
}

interface RecipeCardProps {
  recipe: Recipe;
  isLoaded?: boolean;
}

export default function RecipeCard({ recipe, isLoaded }: RecipeCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const resolvedIsLoaded = isLoaded ?? isImageLoaded;

  return (
    <Link href={`/recipes/${recipe.id}`} className="block h-full">
      <div className="relative h-full flex transition-transform duration-300 hover:scale-105">
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <Skeleton
            isLoaded={resolvedIsLoaded}
            className="w-44 h-44 xl:w-52 xl:h-52 rounded-full"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-44 h-44 xl:w-52 xl:h-52 rounded-full object-cover border-4 border-white shadow-md"
              onLoad={() => setIsImageLoaded(true)}
            />
          </Skeleton>
        </div>
        <div
          className="p-8 pr-36 w-5/6 bg-white rounded-xl shadow-md 
             flex flex-col justify-between hover:shadow-lg"
        >
          <div>
            <Skeleton isLoaded={resolvedIsLoaded} className="rounded-md">
              <h2 className="text-xl lg:text-3xl font-semibold text-zinc-800 mb-2">
                {recipe.name}
              </h2>
            </Skeleton>
            <div className="text-sm text-zinc-500 space-y-1 mb-4">
              <Skeleton isLoaded={resolvedIsLoaded} className="rounded-md">
                <h3 className="text-lg lg:text-xl font-medium">
                  ⏱ {recipe.cookingTime}
                </h3>
              </Skeleton>
              <Skeleton isLoaded={resolvedIsLoaded} className="rounded-md">
                <h3 className="text-lg lg:text-xl font-medium">
                  🍽 {recipe.servings} Servings
                </h3>
              </Skeleton>
            </div>
          </div>
          <div className="mt-auto group">
            <div
              className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center 
               text-white transition-transform duration-300 -rotate-45 group-hover:rotate-0"
            >
              <ArrowRight className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
