'use client';

import Link from 'next/link';

interface Recipe {
  id: string;
  name: string;
  image: string;
  cookingTime: string;
  servings: number;
  ingredients?: string[];
  instructions?: string[];
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <div className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 cursor-pointer">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-1">{recipe.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {recipe.cookingTime} &nbsp; {recipe.servings} servings
          </p>
        </div>
      </div>
    </Link>
  );
}