"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import RecipeDetail from "@/app/components/RecipeDetail";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "@heroui/react";

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
  const recipeId = params?.id as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>{error}</p>
        <Link href="/" className="text-blue-600 underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-yellow-50">
        <Spinner
          classNames={{ label: "text-zinc-700 text-lg font-medium mt-6" }}
          label="Loading Recipe..."
          variant="wave"
          color="warning"
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 text-zinc-800 h-full relative p-4 px-12">
      <div className="sticky top-4 z-30 p-4 lg:px-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-md lg:text-xl font-medium text-white bg-yellow-800 hover:bg-amber-700 rounded-full shadow transition-all hover:scale-105 duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      <RecipeDetail {...recipe} />
      <div className="fixed right-0 -top-10 w-1/3 h-1/3 bg-gradient-to-b from-yellow-200/80 to-yellow-50 rounded-bl-[100%] pointer-events-none" />
    </div>
  );
}
