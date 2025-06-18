import { Clock, Users } from "lucide-react";

interface RecipeDetailProps {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
}

export default function RecipeDetail({
  id,
  name,
  image,
  ingredients,
  instructions,
  cookingTime,
  servings,
}: RecipeDetailProps) {
  // Split the recipe name so we can accent the second word for a bit of visual flair
  const words = name.split(" ");
  const accentIndex = 1; // highlights the second word

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Text Block */}
          <div>
            <p className="text-sm tracking-widest uppercase text-yellow-400 font-semibold mb-2">
              Let's Cook
            </p>

            <h1 className="font-extrabold leading-tight text-4xl sm:text-5xl lg:text-6xl">
              {words.map((word, i) => (
                <span
                  key={i}
                  className={
                    i === accentIndex ? "text-yellow-400" : "inherit"
                  }
                >
                  {word + (i < words.length - 1 ? " " : "")}
                </span>
              ))}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-8 mt-8 text-base">
              <span className="flex items-center gap-3">
                <Users className="w-5 h-5 text-yellow-400" />
                {servings} Servings
              </span>
              <span className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                {cookingTime}
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full h-80 md:h-[420px] rounded-2xl shadow-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              Ingredients
            </h2>
            <div className="bg-yellow-100 rounded-2xl p-6 space-y-2 shadow-lg">
              {ingredients.map((item, idx) => (
                <p key={idx} className="text-lg font-medium leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              Instructions
            </h2>
            <ol className="space-y-8 relative">
  {instructions.map((step, idx) => (
    <li key={idx} className="relative pl-20">
      {/* Step badge */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-white font-semibold text-lg">
        {String(idx + 1).padStart(2, "0")}
      </span>
      <p className="text-lg lg:text-2xl font-medium leading-relaxed">
        {step}
      </p>
    </li>
  ))}
</ol>
          </div>
        </div>
      </section>
    </div>
  );
}
