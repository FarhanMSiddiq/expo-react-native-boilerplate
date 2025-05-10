import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Platform,
  Alert,
} from "react-native";
import { FC, useState } from "react";
import useBestProducts from "../../../hooks/products/useBestProducts";
import ProductCarousel from "../../components/ProductCarousel";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import useRecipesByTag from "../../../hooks/recipes/useRecipesByTag";
import TagButton from "../../components/TagButton";
import RecipeCard from "../../components/RecipeCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import useReviews from "../../../hooks/reviews/useReviews";
import ReviewCard from "../../components/ReviewCard";
import useTodos from "../../../hooks/todos/useTodos";
import TodoItem from "../../components/TodoItem";

type Props = {
  navigation: any;
};

const NavbarBottom = ({ navigation }: { navigation: any }) => {
  const [currentTab, setCurrentTab] = useState<"Home" | "Product">("Home");

  return (
    <View className={`absolute bottom-0 left-0 right-0 z-10`}>
      <View className="flex-row justify-around items-center py-2 bg-white border-t border-gray-300">
        <TouchableOpacity
          onPress={() => setCurrentTab("Home")}
          className="items-center"
        >
          <Ionicons
            name="home"
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
            name="cart"
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

        <TouchableOpacity
          onPress={() => {
            const message =
              "Aplikasi ini dibuat menggunakan React Native dengan Expo.\n\nNode Version : v18.18.2\nVersi: 1.0\nAuthor: Farhan Maulana Siddiq";

            if (Platform.OS === "web") {
              window.alert(message);
            } else {
              Alert.alert("Info", message, [{ text: "OK", style: "default" }]);
            }
          }}
          className="items-center"
        >
          <Ionicons
            name="info"
            size={24}
            color={currentTab === "Product" ? "#007aff" : "gray"}
          />
          <Text
            className={`text-xs ${
              currentTab === "Product" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            Info
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ScrollViewsCustom = ({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: any;
}) => {
  if (Platform.OS === "web") {
    return (
      <>
        <ScrollView className="p-5 pb-32 bg-[url('/pattern-background.jpg')] bg-cover min-h-screen">
          {children}
        </ScrollView>
        <NavbarBottom navigation={navigation} />
      </>
    );
  }

  return (
    <ImageBackground
      source={require("../../../../public/pattern-background.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
        {children}
      </ScrollView>
      <NavbarBottom navigation={navigation} />
    </ImageBackground>
  );
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const { bestProducts } = useBestProducts(
    "groceries",
    "?sortBy=rating&order=desc"
  );

  const { tags, selectedTag, recipes, loadingRecipes, fetchRecipes } =
    useRecipesByTag();

  const { reviews } = useReviews();

  const { todos } = useTodos();
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        <ScrollViewsCustom navigation={navigation}>
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
          <Text className="text-xl font-semibold my-4">Testimoni Reviewer</Text>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ReviewCard review={item} />}
            horizontal
            scrollEnabled={true}
          />
          <Text className="text-xl font-semibold my-4">List Todos</Text>
          <FlatList
            data={todos}
            className="p-[16px]"
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TodoItem todo={item} />}
            scrollEnabled={false}
          />
        </ScrollViewsCustom>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
