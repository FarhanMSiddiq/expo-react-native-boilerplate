import React from "react";
import { View, Text, Image } from "react-native";
import { Product } from "../../models/Product";

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <View className="flex-row flex-wrap justify-between">
      {products.map((item) => (
        <View
          key={item.id}
          className="bg-white p-4 rounded-2xl mb-4 shadow w-[48%]"
        >
          <Image
            source={{ uri: item.thumbnail }}
            className="w-full h-36 rounded-xl mb-3"
            resizeMode="cover"
          />
          <Text className="font-bold text-base text-blue-900 mb-1">
            {item.title}
          </Text>
          <Text className="text-gray-500 text-sm mb-2" numberOfLines={2}>
            {item.description}
          </Text>
          <Text className="text-blue-700 font-semibold text-base">
            ${item.price}
          </Text>
        </View>
      ))}
    </View>
  );
}
