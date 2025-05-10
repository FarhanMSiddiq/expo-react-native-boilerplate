import { useEffect, useState } from "react";
import {
  getRecipeTags,
  getRecipesByTag,
  getAllRecipes,
} from "../../api/recipesApi";

export function useRecipesByTag() {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loadingRecipes, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const tags = await getRecipeTags();
        setTags(tags);

        const allRecipes = await getAllRecipes(); // ✅ ambil resep awal
        setRecipes(allRecipes);
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
      const data = await getRecipesByTag(tag);
      setRecipes(data);
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
}
