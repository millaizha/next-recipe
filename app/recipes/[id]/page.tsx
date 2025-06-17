'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import RecipeDetail from '@/app/components/RecipeDetail';
import { useState, useEffect } from 'react';

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
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r: Recipe) => r.id === recipeId);
        if (found) {
          setRecipe(found);
        } else {
          setError('Recipe not found.');
        }
      })
      .catch(() => setError('Failed to fetch recipe data.'));
  }, []);

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>{error}</p>
        <Link href="/" className="text-blue-600 underline">← Back to Home</Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="p-6 text-center">
        <p>Loading recipe...</p>
      </div>
    );
  }
  
  return (
    <div>
      <Link href="/" className="inline-block px-4 py-2 ml-6 mt-4 text-sm text-blue-600 underline">← Back to Home</Link>
      <RecipeDetail {...recipe} />
    </div>
  );
}
