"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import RecipeDetail from "@/components/RecipeDetail";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "@heroui/react";
import "@/styles/styles.scss";

// Type for recipe object
interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
}

export default function RecipeDetailPage() {
  const params = useParams();
  const recipeId = params?.id as string; // Get dynamic recipe ID from URL

  // State hooks
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch recipe data based on recipe ID
  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r: Recipe) => r.id === recipeId);
        if (found) {
          setRecipe(found);
        } else {
          setError("Recipe not found.");
        }
      })
      .catch(() => setError("Failed to fetch recipe data."));
  }, [recipeId]);

  // Show error message if fetch fails or recipe doesn't exist
  if (error) {
    return (
      <div className="error-loading">
        <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg w-full">
          {/* Emoji Icon */}
          <div className="text-6xl mb-4">😞</div>

          {/* Error Title */}
          <h1 className="text-3xl font-bold text-yellow-800 mb-8">
            Recipe Not Found
          </h1>

          {/* Back to Home Button */}
          <Link
            href="/"
            className="back-button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Show loading spinner while fetching recipe
  if (!recipe) {
    return (
      <div className="error-loading">
        <Spinner
          classNames={{ label: "card-info mt-4" }}
          label="Loading Recipe..."
          variant="wave"
          color="warning"
          size="lg"
        />
      </div>
    );
  }

  // Render recipe detail once loaded
  return (
    <div className="bg-yellow-50 text-zinc-800 h-full relative p-4 px-12">
      {/* Back to home button */}
      <div className="sticky top-4 z-30 p-4 lg:px-2">
        <Link
          href="/"
          className="back-button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Render detailed recipe view */}
      <RecipeDetail {...recipe} />

      {/* Decorative background shape */}
      <div className="decorative-hero-shape hero-shape-right" />
    </div>
  );
}
