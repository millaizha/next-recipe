"use client";

import { useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@heroui/react";
import RecipeCard from "@/app/components/RecipeCard";

interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
}

const noodleTypes = [
  "spaghetti",
  "penne",
  "elbow macaroni",
  "fettuccine",
  "lasagna",
  "ramen noodles",
  "ziti",
  "egg noodles",
  "instant ramen",
  "tagliatelle",
  "fusilli pasta",
  "bowtie",
  "gnocchi",
  "rigatoni",
];

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNoodles, setSelectedNoodles] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
      });
  }, []);

  useEffect(() => {
    let filtered = [...recipes];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(q)
      );
    }

    if (selectedNoodles.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedNoodles.some((noodle) =>
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(noodle))
        )
      );
    }

    setFilteredRecipes(filtered);
  }, [searchQuery, selectedNoodles, recipes]);

  return (
    <main className="relative min-h-screen">
      {/* Overlay */}
      <div className="absolute inset-0 bg-yellow-50 z-0" />

      {/* Content */}
      <div className="relative z-10 px-6 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            The Noodle & Pasta Hub
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Your Ultimate Source for Delicious Noodle and Pasta Recipes from
            Around the World
          </p>
        </div>

        {/* Sticky Search/Filter Bar */}
        <div className="sticky top-4 z-20 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-md mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-64">
            <Autocomplete
              label="Search"
              placeholder="Search a recipe"
              inputValue={searchQuery}
              onInputChange={(value) => setSearchQuery(value)}
              allowsCustomValue
              defaultItems={recipes.map((recipe) => ({
                key: recipe.id,
                label: recipe.name,
              }))}
              size="lg"
              className="w-full text-zinc-800"
              classNames={{
                base: "text-zinc-800",
                popoverContent: "bg-white text-zinc-800",
                listbox: "bg-white",
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>

          <div className="w-full sm:w-64">
            <Select
              label="Filter by Noodles"
              placeholder="Select noodle types"
              selectionMode="multiple"
              onSelectionChange={(keys) =>
                setSelectedNoodles(Array.from(keys).map(String))
              }
              size="lg"
              className="w-full text-zinc-800"
              classNames={{
                base: "text-zinc-800",
                popoverContent: "bg-white text-zinc-800",
                listbox: "bg-white",
              }}
            >
              {noodleTypes.map((type) => (
                <SelectItem key={type}>{type}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </main>
  );
}
