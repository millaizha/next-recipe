"use client";

import { useEffect, useState } from "react";
import { Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import RecipeCard from "@/components/RecipeCard";
import "@/styles/styles.scss";

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

// Noodle types for similar recipe filtering
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

export default function RecipeDetail({
  id,
  name,
  image,
  ingredients,
  instructions,
  cookingTime,
  servings,
}: Recipe) {
  // Split recipe name for accent styling
  const words = name.split(" ");
  const accentIndex = 1;

  // State hooks
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([]);
  const [noodleType, setNoodleType] = useState<string | null>(null);

  // Fetch all recipes on mount
  useEffect(() => {
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data: Recipe[]) => setAllRecipes(data));
  }, []);

  // Find noodle type in ingredients and filter similar recipes
  useEffect(() => {
    const currentNoodleType = noodleTypes.find((noodle) =>
      ingredients.some((ing) => ing.toLowerCase().includes(noodle))
    );

    if (currentNoodleType) {
      setNoodleType(currentNoodleType);
      const matches = allRecipes.filter(
        (recipe) =>
          recipe.id !== id &&
          recipe.ingredients.some((ing) =>
            ing.toLowerCase().includes(currentNoodleType)
          )
      );
      setSimilarRecipes(matches);
    }
  }, [allRecipes, ingredients, id]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="recipe-detail-container">
          {/* Recipe Title and Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-sm lg:text-2xl tracking-widest uppercase text-yellow-600 font-semibold mb-2">
              Let&apos;s Cook
            </p>
            <h1 className="font-extrabold leading-tight text-yellow-800 text-4xl sm:text-5xl lg:text-6xl">
              {/* Highlight accent word */}
              {words.map((word, i) => (
                <span
                  key={i}
                  className={i === accentIndex ? "text-yellow-600" : "inherit"}
                >
                  {word + (i < words.length - 1 ? " " : "")}
                </span>
              ))}
            </h1>
            <div className="flex flex-wrap gap-8 mt-8 text-md lg:text-2xl z-10">
              {/* Servings */}
              <span className="flex items-center gap-3">
                <Users className="w-5 h-5 text-yellow-600" />
                {servings} Servings
              </span>
              {/* Cooking Time */}
              <span className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-600" />
                {cookingTime}
              </span>
            </div>
          </motion.div>
          {/* Recipe Image */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="relative w-full h-80 md:h-[420px] rounded-2xl shadow-xl overflow-hidden z-10"
          >
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Ingredients & Instructions Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20 z-10 relative">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Ingredients List */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="ingredient-instructions-title">
              Ingredients
            </h2>
            <motion.div
              className="bg-yellow-100 rounded-2xl p-6 space-y-2 shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {/* Render each ingredient */}
              {ingredients.map((item, idx) => (
                <motion.p
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="ingredient-instructions-text"
                >
                  {item}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          {/* Instructions List */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="ingredient-instructions-title">
              Instructions
            </h2>
            <ol className="space-y-8 relative">
              {/* Render each instruction step */}
              {instructions.map((step, idx) => (
                <motion.li
                  key={idx}
                  className="relative pl-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <span className="ingredient-step-number">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="ingredient-instructions-text">
                    {step}
                  </p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>
      {/* Similar Recipes Section */}
      {similarRecipes.length > 0 && (
        <section className="max-w-8xl mx-auto px-4 pb-20 z-10 relative">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-yellow-600">
            Similar Dishes Using{" "}
            <span className="text-yellow-800">
              {/* Capitalize noodle type */}
              {noodleType?.replace(
                /\w\S*/g,
                (txt) => txt[0].toUpperCase() + txt.slice(1)
              )}
            </span>
          </h2>
          <div className="card-grid">
            {/* Render similar recipes */}
            {similarRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
