import {
  View,
  Text,
  Button,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { FC, useState } from "react";
import useBestProducts from "../../../hooks/products/useBestProducts";
import ProductCarousel from "../../components/ProductCarousel";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useRecipesByTag } from "../../../hooks/recipes/useRecipesByTag";
import TagButton from "../../components/TagButton";
import RecipeCard from "../../components/RecipeCard";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  navigation: any;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const { bestProducts, loadingBestProducts, errorBestProducts } =
    useBestProducts("groceries", "?sortBy=rating&order=desc");

  const { tags, selectedTag, recipes, loadingRecipes, fetchRecipes } =
    useRecipesByTag();

  const [currentTab, setCurrentTab] = useState<"Home" | "Product">("Home");

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-white pb-10">
        <ScrollView contentContainerClassName="p-5">
          <Text className="text-center text-gray-600 mb-4">
            Products Groceries Best Rate
          </Text>
          <View className="p-2">
            <ProductCarousel products={bestProducts ?? []} />
          </View>

          <Text className="text-lg font-semibold mt-4 mb-2">
            Recipes {selectedTag ? `for "${selectedTag}"` : ""}
          </Text>

          <FlatList
            data={tags}
            renderItem={({ item }) => (
              <TagButton
                tag={item}
                selected={selectedTag === item}
                onPress={() => fetchRecipes(item)}
              />
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={true}
          />

          {loadingRecipes ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={recipes}
              renderItem={({ item }) => <RecipeCard recipe={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              scrollEnabled={true}
            />
          )}
        </ScrollView>
        <View className="flex-1 pb-4">
          <View className="flex-row justify-around items-center py-2 bg-white border-t border-gray-300">
            <TouchableOpacity
              onPress={() => setCurrentTab("Home")}
              className="items-center"
            >
              <Ionicons
                name="home-outline"
                size={24}
                color={currentTab === "Home" ? "#007aff" : "gray"}
              />
              <Text
                className={`text-xs ${
                  currentTab === "Home" ? "text-blue-500" : "text-gray-500"
                }`}
              >
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Products");
              }}
              className="items-center"
            >
              <Ionicons
                name="cart-outline"
                size={24}
                color={currentTab === "Product" ? "#007aff" : "gray"}
              />
              <Text
                className={`text-xs ${
                  currentTab === "Product" ? "text-blue-500" : "text-gray-500"
                }`}
              >
                Product
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
