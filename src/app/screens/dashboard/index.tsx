import {
  View,
  Text,
  Button,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { FC } from "react";
import useBestProducts from "../../../hooks/products/useBestProducts";
import ProductCarousel from "../../components/ProductCarousel";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useRecipesByTag } from "../../../hooks/recipes/useRecipesByTag";
import TagButton from "../../components/TagButton";
import RecipeCard from "../../components/RecipeCard";

type Props = {
  navigation: any;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const { bestProducts, loadingBestProducts, errorBestProducts } =
    useBestProducts("groceries", "?sortBy=rating&order=desc");

  const { tags, selectedTag, recipes, loadingRecipes, fetchRecipes } =
    useRecipesByTag();

  if (loadingBestProducts) return <ActivityIndicator size="large" />;
  if (errorBestProducts) return <Text>Error</Text>;

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-gray-100">
        <ScrollView contentContainerClassName="p-5">
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
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
