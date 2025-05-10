import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Product } from "../../models/Product";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width: screenWidth } = Dimensions.get("window");

type Props = {
  products: Product[];
};

type RootStackParamList = {
  Products: undefined;
  ProductDetail: { product: Product };
};

export default function ProductCarousel({ products }: Props) {
  type ProductScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Products"
  >;

  const navigation = useNavigation<ProductScreenNavigationProp>();

  return (
    <View className="flex-1 items-center justify-center">
      <Carousel
        width={Platform.OS === "web" ? 390 : screenWidth}
        height={400}
        data={products}
        loop
        autoPlay
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetail", { product: item })
            }
          >
            <View className="items-center">
              <View className="rounded-full overflow-hidden w-72 h-96 shadow-lg bg-white justify-end border-[10px] border-blue-500">
                <Image
                  source={{ uri: item.images[0] }}
                  className="w-full h-full absolute"
                  resizeMode="cover"
                />
                <View className="bg-white bg-opacity-80 px-4 py-2">
                  <Text className="text-center text-xl font-bold text-black">
                    {item.title}
                  </Text>
                  <Text className="text-center text-gray-600">
                    ${item.price.toLocaleString("id-ID")}
                  </Text>
                  <Text className="text-center text-yellow-500">
                    ⭐ {item.rating}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
