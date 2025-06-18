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
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  const rawData = readFileSync(filePath, 'utf-8');
  let recipes: Recipe[] = JSON.parse(rawData);

  return NextResponse.json(recipes);
}