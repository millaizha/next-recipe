'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  image: string;
  cookingTime: string;
  servings: number;
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block h-full">
  <div className="relative transition-all h-full flex">
    {/* Floating Image (Right Center) */}
    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-52 h-52 rounded-full object-cover border-4 border-white shadow-md"
      />
    </div>

    {/* Content */}
    <div className="pr-36 2xl:pr-24 p-8 rounded-xl flex flex-col justify-between w-5/6 bg-white">
      <div>
        <h2 className="text-xl lg:text-3xl font-semibold text-gray-900 mb-2">{recipe.name}</h2>
        <div className="text-sm text-gray-500 space-y-1 mb-4">
          <h3 className="text-lg lg:text-xl font-medium">⏱ {recipe.cookingTime}</h3>
          <h3 className="text-lg lg:text-xl font-medium">🍽 {recipe.servings} Servings</h3>
        </div>
      </div>

      {/* Green Arrow Button at Bottom */}
      <div className="mt-auto">
        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white -rotate-45">
          <ArrowRight className="w-8 h-8" />
        </div>
      </div>
    </div>
  </div>
</Link>
  );
}
