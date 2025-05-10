import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Recipe } from "../../models/Recipes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type Props = {
  recipe: Recipe;
};

type RootStackParamList = {
  Recipes: undefined;
  RecipesDetail: { recipe: Recipe };
};

export default function RecipeCard({ recipe }: Props) {
  type RecipesScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Recipes"
  >;

  const navigation = useNavigation<RecipesScreenNavigationProp>();

  return (
    <View className="bg-white m-2 p-3 rounded-lg shadow">
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipesDetail", { recipe: recipe })}
      >
        <Image
          source={{ uri: recipe.image }}
          className="w-full h-40 rounded-lg mb-2"
          resizeMode="cover"
        />
        <Text className="text-xl font-bold mb-1">{recipe.name}</Text>
        <Text className="text-gray-600">
          ⭐ {recipe.rating} | {recipe.cuisine}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
