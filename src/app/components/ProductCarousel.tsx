import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Product } from "../../models/Product";

const { width: screenWidth } = Dimensions.get("window");

type Props = {
  products: Product[];
};

export default function ProductCarousel({ products }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 py-8">
      <Text className="text-center text-gray-600 mb-4">
        Select your destination in Indonesia
      </Text>

      <Carousel
        width={screenWidth * 0.8}
        height={screenWidth * 1.1}
        data={products}
        loop
        autoPlay
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View className="items-center">
            <View className="rounded-full overflow-hidden w-72 h-96 shadow-lg bg-white justify-end">
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
                  Rp {item.price.toLocaleString("id-ID")}
                </Text>
                <Text className="text-center text-yellow-500">
                  ⭐ {item.rating}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
