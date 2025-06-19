"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Skeleton } from "@heroui/react";
import "@/styles/styles.scss";

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
      <div className="card-container">
        {/* Recipe image with skeleton loader */}
        <div className="card-image-container">
          <Skeleton
            isLoaded={resolvedIsLoaded}
            className="w-42 h-42 xl:w-52 xl:h-52 rounded-full"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="card-image"
              onLoad={() => setIsImageLoaded(true)}
            />
          </Skeleton>
        </div>
        {/* Recipe details */}
        <div
          className="card"
        >
          <div>
            {/* Name, cooking time, and servings with skeleton loader */}
            <Skeleton isLoaded={resolvedIsLoaded} className="rounded-md">
              <h2 className="card-title">
                {recipe.name}
              </h2>
              <div className="text-sm text-zinc-700 mb-4 space-y-1">
                <div className="card-info">
                  <Clock className="w-5 h-5" />
                  {recipe.cookingTime}
                </div>
                <div className="card-info">
                  <Users className="w-5 h-5" />
                  {recipe.servings} Servings
                </div>
              </div>
            </Skeleton>
          </div>
          {/* Arrow button for navigation */}
          <div className="mt-auto group">
            <div
              className="arrow-button"
            >
              <ArrowRight className="xl:w-8 xl:h-8" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
