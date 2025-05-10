import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Product } from "../../models/Product";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
  products: Product;
};

type RootStackParamList = {
  Products: undefined;
  ProductDetail: { product: Product };
};

export default function ProductGrid({ products }: Props) {
  type ProductScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Products"
  >;

  const navigation = useNavigation<ProductScreenNavigationProp>();

  return (
    <View
      key={products.id}
      className="bg-white p-4 rounded-2xl mb-4 shadow-lg w-[48%] mx-1"
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetail", { product: products })
        }
      >
        <Image
          source={{ uri: products.thumbnail }}
          className="w-full h-36 rounded-xl mb-3"
          resizeMode="cover"
        />
        <Text className="font-bold text-base text-blue-900 mb-1">
          {products.title}
        </Text>
        <Text className="text-gray-500 text-sm mb-2" numberOfLines={2}>
          {products.description}
        </Text>
        <Text className="text-blue-700 font-semibold text-base">
          ${products.price}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
