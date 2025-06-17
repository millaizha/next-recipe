'use client';

import { useEffect, useState } from 'react';

import RecipeCard from '@/app/components/RecipeCard';

interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
}

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Noodle Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>
    </main>
  );
}