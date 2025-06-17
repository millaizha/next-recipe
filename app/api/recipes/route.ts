import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  image: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const type = searchParams.get('type')?.toLowerCase() || '';
  const maxTime = parseInt(searchParams.get('maxTime') || '', 10);

  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const rawData = readFileSync(filePath, 'utf-8');
  let recipes: Recipe[] = JSON.parse(rawData);

  // Filter by type
  if (type) {
    recipes = recipes.filter((recipe) => recipe.id.toLowerCase().startsWith(type));
  }

  // Filter by search (name or ingredients)
  if (search) {
    recipes = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(search) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(search))
    );
  }

  // Filter by cooking time
  if (!isNaN(maxTime)) {
    recipes = recipes.filter((recipe) => {
      const minutesMatch = recipe.cookingTime.match(/\d+/);
      const minutes = minutesMatch ? parseInt(minutesMatch[0], 10) : NaN;
      return !isNaN(minutes) && minutes <= maxTime;
    });
  }

  return NextResponse.json(recipes);
}