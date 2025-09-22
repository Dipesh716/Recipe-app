import React from "react";
import IngredientsList from "./IngredientsList";
import GptRecipe from "./GptRecipe";
import { useState } from "react";
import { getRecipeFromGpt } from "../ai";

export default function Content() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const [loading, setLoading] = useState(false);

  async function getRecipe() {
    setLoading(true);
    const recipeMarkdown = await getRecipeFromGpt(ingredients); // ✅ await the Promise
    setRecipe(recipeMarkdown);
    setLoading(false);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <>
      <main>
        <form className="output_form" action={addIngredient}>
          <input type="text" placeholder="Add ingredients" name="ingredient" />
          <button>+ Add</button>
        </form>
        {ingredients.length > 0 && (
          <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
        )}

        {recipe && !loading && <GptRecipe recipe={recipe} />}
      </main>
    </>
  );
}
