import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

// Type for recipe object
interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  image: string;
}

// Handle GET requests to /api/recipes
export async function GET() {
  // Resolve the full path to the local JSON file
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');

  // Read the file contents as a string
  const rawData = readFileSync(filePath, 'utf-8');

  // Parse the JSON string into a JavaScript array of Recipe objects
  const recipes: Recipe[] = JSON.parse(rawData);

  // Respond with the parsed recipes as JSON
  return NextResponse.json(recipes);
}