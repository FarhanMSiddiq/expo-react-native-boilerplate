import React from "react";
import { View, Text, Image } from "react-native";

type Props = {
  recipe: {
    id: number;
    name: string;
    image: string;
    rating: number;
    cuisine: string;
  };
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <View className="bg-white m-2 p-3 rounded-lg shadow">
      <Image
        source={{ uri: recipe.image }}
        className="w-full h-40 rounded-lg mb-2"
        resizeMode="cover"
      />
      <Text className="text-xl font-bold mb-1">{recipe.name}</Text>
      <Text className="text-gray-600">
        ⭐ {recipe.rating} | {recipe.cuisine}
      </Text>
    </View>
  );
}
