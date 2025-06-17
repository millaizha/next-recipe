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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{name}</h1>
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <div className="text-gray-700 dark:text-gray-300 mb-4">
        <p><strong>Cooking Time:</strong> {cookingTime}</p>
        <p><strong>Servings:</strong> {servings}</p>
      </div>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside space-y-1">
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}