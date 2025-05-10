import { useEffect, useState } from "react";
import {
  getRecipeTags,
  getRecipesByTag,
  getAllRecipes,
} from "../../api/recipesApi";
import { Recipe } from "../../models/Recipes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRecipesByTag = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const cachedTags = await AsyncStorage.getItem("recipe_tags");
        if (cachedTags) {
          setTags(JSON.parse(cachedTags));
        } else {
          const fetchedTags = await getRecipeTags();
          setTags(fetchedTags);
          await AsyncStorage.setItem(
            "recipe_tags",
            JSON.stringify(fetchedTags)
          );
        }

        const cachedAllRecipes = await AsyncStorage.getItem("all_recipes");
        if (cachedAllRecipes) {
          setRecipes(JSON.parse(cachedAllRecipes));
        } else {
          const allRecipes = await getAllRecipes();
          setRecipes(allRecipes);
          await AsyncStorage.setItem("all_recipes", JSON.stringify(allRecipes));
        }
      } catch (err) {
        console.error("Failed to fetch initial data", err);
      }
    };

    init();
  }, []);

  const fetchRecipes = async (tag: string) => {
    setLoading(true);
    setSelectedTag(tag);
    try {
      const cacheKey = `recipes_by_tag_${tag}`;
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        setRecipes(JSON.parse(cached));
      } else {
        const data = await getRecipesByTag(tag);
        setRecipes(data);
        await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
      }
    } catch (err) {
      console.error("Failed to fetch recipes", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    tags,
    selectedTag,
    recipes,
    loadingRecipes,
    fetchRecipes,
  };
};

export default useRecipesByTag;
