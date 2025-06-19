"use client";

import { useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Chip,
} from "@heroui/react";
import { Search } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import { motion } from "framer-motion";

// Type for recipe objects
interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
}

// Noodle types for filtering
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
  // State hooks
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNoodles, setSelectedNoodles] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  // Fetch recipe data on mount
  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
        setLoading(false);
      });
  }, []);

  // Update filtered recipes on search or noodle filter change
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
      {/* Background layer */}
      <div className="absolute inset-0 bg-yellow-50 z-0" />

      {/* Main content */}
      <div className="relative z-10 px-12 py-10">

        {/* Hero section */}
        <div className="relative flex flex-col items-center justify-center min-h-[50vh] pt-10">
          {/* Decorative background shape */}
          <span
            aria-hidden
            className="fixed -top-24 md:-top-32 left-1/2 -translate-x-1/2
              w-[550px] h-[275px] md:w-[850px] md:h-[550px]
              bg-gradient-to-b from-yellow-200/80 to-yellow-50
              rounded-b-[450px] -z-10"
          />

          {/* Title */}
          <motion.h1
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl text-center font-extrabold text-yellow-700 drop-shadow-sm tracking-tight"
          >
            🍜 The Noodle & Pasta Hub
          </motion.h1>

          {/* Accent line under title */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-2 h-1 w-32 origin-left bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full shadow-sm"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-2xl md:text-4xl text-zinc-700 text-center max-w-2xl mx-auto leading-relaxed"
          >
            Your Ultimate Source for{" "}
            <span className="font-semibold text-yellow-700">Delicious</span>{" "}
            Noodle and Pasta Recipes from Around the World
          </motion.p>
        </div>

        {/* Filters (search and noodle type) */}
        <div className="sticky top-4 z-20 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-md mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          
          {/* Search bar */}
          <div className="w-full items-start">
            <Autocomplete
              aria-label="Search Recipes"
              placeholder="Search a recipe"
              inputValue={searchQuery}
              onInputChange={(value) => setSearchQuery(value)}
              allowsCustomValue
              defaultItems={recipes.map((recipe) => ({
                key: recipe.id,
                label: recipe.name,
              }))}
              size="lg"
              className="w-full text-yellow-800"
              radius="full"
              startContent={<Search className="text-default-400" />}
              variant="bordered"
              classNames={{
                popoverContent: "bg-white text-yellow-800",
                listbox: "bg-white",
                base: "data-[slot='popover-content']:data-ignore-lenis", // prevent Lenis from hijacking dropdown scroll
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>

          {/* Noodle type filter */}
          <div className="w-full">
            <Select
              aria-label="Filter by Noodles"
              placeholder="Filter by Noodles"
              selectionMode="multiple"
              selectedKeys={selectedNoodles}
              onSelectionChange={(keys) =>
                setSelectedNoodles(Array.from(keys).map(String))
              }
              size="lg"
              className="w-full text-yellow-800"
              radius="full"
              isMultiline
              variant="bordered"
              classNames={{
                base: "data-[slot='popover-content']:data-ignore-lenis", // prevent Lenis from hijacking dropdown scroll
                popoverContent: "bg-white text-yellow-800",
                listbox: "bg-white",
              }}
              renderValue={(items) => (
                <div className="flex flex-wrap gap-2 px-8 py-4 md:py-2 md:px-4">
                  {items.map((item) => (
                    <Chip
                      key={item.key}
                      color="warning"
                      variant="flat"
                      size="md"
                      onClick={() =>
                        setSelectedNoodles((prev) =>
                          prev.filter((val) => val !== item.key)
                        )
                      }
                      className="cursor-pointer hover:line-through transition-all duration-200"
                    >
                      {item.key}
                    </Chip>
                  ))}
                </div>
              )}
            >
              {noodleTypes.map((type) => (
                <SelectItem key={type}>{type}</SelectItem>
              ))}
            </Select>

            {/* Clear filter button */}
            {selectedNoodles.length > 0 && (
              <button
                onClick={() => setSelectedNoodles([])}
                className="mt-2 text-mlg text-yellow-600 hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Recipe card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {loading
            ? Array(6)
                .fill(null)
                .map((_, idx) => (
                  <RecipeCard
                    key={`skeleton-${idx}`}
                    isLoaded={false}
                    recipe={{
                      id: "",
                      name: "",
                      image: undefined,
                      cookingTime: "",
                      servings: 0,
                    }}
                  />
                ))
            : filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
        </div>
      </div>
    </main>
  );
}