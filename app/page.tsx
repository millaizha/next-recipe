"use client";

import { useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@heroui/react";
import RecipeCard from "@/app/components/RecipeCard";
import { motion } from "framer-motion";

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
      <div className="absolute inset-0 bg-yellow-50 z-0" />
      <div className="relative z-10 px-6 py-10">
        <div className="relative flex flex-col items-center justify-center min-h-[50vh] pt-10">
          <span
            aria-hidden
            className="absolute -top-24 md:-top-32 left-1/2 -translate-x-1/2
                 w-[550px] h-[275px] md:w-[700px] md:h-[350px]
                 bg-gradient-to-b from-yellow-200/80 to-yellow-50
                 rounded-b-[350px]   /* bottom‑only curvature */
                 -z-10"
          />
          <motion.h1
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl text-center font-extrabold text-yellow-500 drop-shadow-sm tracking-tight"
          >
            🍜 The Noodle & Pasta Hub
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-2 h-1 w-32 origin-left bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full shadow-sm"
          />
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-2xl md:text-4xl text-gray-700 text-center max-w-2xl mx-auto leading-relaxed"
          >
            Your Ultimate Source for{" "}
            <span className="font-semibold text-yellow-500">Delicious</span>{" "}
            Noodle and Pasta Recipes from Around the World
          </motion.p>
        </div>
        <div className="sticky top-4 z-20 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-md mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-96">
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
              size="md"
              className="w-full text-zinc-800"
              classNames={{
                popoverContent: "bg-white text-zinc-800",
                listbox: "bg-white",
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>
          <div className="w-full sm:w-96">
            <Select
              label="Filter by Noodles"
              placeholder="Select noodle types"
              selectionMode="multiple"
              selectedKeys={selectedNoodles}
              onSelectionChange={(keys) =>
                setSelectedNoodles(Array.from(keys).map(String))
              }
              size="md"
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
            {selectedNoodles.length > 0 && (
              <button
                onClick={() => setSelectedNoodles([])}
                className="mt-2 text-sm text-yellow-600 hover:underline"
              >
                Clear Filter
              </button>
            )}
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
