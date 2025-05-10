import { View, Text, ScrollView, Image, FlatList } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Recipe } from "../../../models/Recipes";
import { MaterialIcons } from "@expo/vector-icons";

type RecipesDetailRouteProp = RouteProp<
  { RecipesDetail: { recipe: Recipe } },
  "RecipesDetail"
>;

export default function RecipesDetailScreen() {
  const { params } = useRoute<RecipesDetailRouteProp>();
  const recipe = params.recipe;

  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <MaterialIcons
          key={i}
          name={i < Math.round(rating) ? "star" : "star-border"}
          size={18}
          color="#f39c12"
        />
      );
    }
    return stars;
  };

  return (
    <ScrollView className="flex-1 bg-blue-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-blue-900 mb-3">
          {recipe.name}
        </Text>
        <Image
          source={{ uri: recipe.image }}
          className="w-full h-56 rounded-xl mb-4 shadow"
          resizeMode="cover"
        />

        {/* Basic Info */}
        <View className="bg-white rounded-2xl p-4 shadow mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-gray-700">
              🕒 Prep: {recipe.prepTimeMinutes} min | Cook:{" "}
              {recipe.cookTimeMinutes} min
            </Text>
            <Text className="text-sm text-gray-700">
              🍽️ {recipe.servings} servings
            </Text>
          </View>
          <Text className="text-sm text-gray-700">
            🔥 Difficulty: {recipe.difficulty}
          </Text>
          <Text className="text-sm text-gray-700">
            🌍 Cuisine: {recipe.cuisine}
          </Text>
          <Text className="text-sm text-gray-700">
            ⚡ {recipe.caloriesPerServing} cal/serving
          </Text>
        </View>

        {/* Tags */}
        <View className="flex-row flex-wrap mb-4">
          {recipe.tags.map((tag, index) => (
            <Text
              key={index}
              className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs mr-2 mb-2"
            >
              #{tag}
            </Text>
          ))}
        </View>

        {/* Rating */}
        <View className="flex-row items-center mb-4">
          {renderStars(recipe.rating)}
          <Text className="text-sm text-gray-700 ml-2">
            {recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)
          </Text>
        </View>

        {/* Ingredients */}
        <View className="bg-white rounded-2xl p-4 shadow mb-4">
          <Text className="text-blue-900 font-semibold text-lg mb-2">
            Ingredients
          </Text>
          {recipe.ingredients.map((item, index) => (
            <Text key={index} className="text-gray-800 mb-1">
              • {item}
            </Text>
          ))}
        </View>

        {/* Instructions */}
        <View className="bg-white rounded-2xl p-4 shadow mb-4">
          <Text className="text-blue-900 font-semibold text-lg mb-2">
            Instructions
          </Text>
          {recipe.instructions.map((step, index) => (
            <Text key={index} className="text-gray-800 mb-2">
              {index + 1}. {step}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
