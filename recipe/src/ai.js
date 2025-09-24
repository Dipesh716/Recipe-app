export async function getRecipeFromGpt(ingredientsArr) {
  try {
    const response = await fetch(
      "https://recipe-app-rgb2.onrender.com/get-recipe",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredientsArr }),
      }
    );

    const data = await response.json();
    return data.recipe;
  } catch (err) {
    console.error(err);
    return "Could not generate recipe.";
  }
}
