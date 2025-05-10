import React from "react";
import { Text, ActivityIndicator } from "react-native";
import useProducts from "../../../hooks/products/useProducts";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import ProductGrid from "../../components/ProductGrid";

export default function Products() {
  const { products, loading, error } = useProducts();

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-gray-100">
        <ScrollView contentContainerClassName="p-5">
          {products && <ProductGrid products={products} />}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
