import api from "./service/api";

export const getRecipeTags = async () => {
  const response = await api.get("/recipes/tags");
  return response.data;
};

export const getRecipesByTag = async (tag: string) => {
  const response = await api.get(`/recipes/tag/${tag}`);
  return response.data.recipes;
};

export const getAllRecipes = async () => {
  const response = await api.get("/recipes");
  return response.data.recipes;
};
