import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { useProducts } from "../../../hooks/products/useProducts";
import { Product } from "../../../models/Product";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProductGrid from "../../components/ProductGrid";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

const ScrollViewsCustom = ({ children }: { children: React.ReactNode }) => {
  if (Platform.OS === "web") {
    return (
      <>
        <ScrollView className="p-5 pb-32 bg-[url('/pattern-background.jpg')] bg-cover min-h-screen">
          {children}
        </ScrollView>
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
    </ImageBackground>
  );
};

export default function Products() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [order, setOrder] = useState<string>("");

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { products, loading, error, totalPages, refetchProducts } = useProducts(
    searchQuery,
    page,
    10,
    sortBy,
    order
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePagination = (direction: "next" | "prev") => {
    if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchProducts(searchQuery, 1);
    setPage(1);
    setRefreshing(false);
  };

  useEffect(() => {
    refetchProducts(searchQuery, 1, sortBy, order);
    setPage(1);
  }, [sortBy, order]);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        <ScrollViewsCustom>
          <View className="flex-1 p-1">
            <TextInput
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="🔍 Search products"
              className="border border-gray-300 p-2 mb-4 bg-white"
            />

            <View className="p-4 bg-blue-600 rounded-lg mb-4">
              <Text className="text-lg font-semibold text-white mb-2">
                Sort Options
              </Text>
              <View className="flex-row justify-between">
                <View className="flex-1 mr-2">
                  <Text className="text-sm text-white mb-1">Sort By</Text>
                  <View className="bg-white rounded-md overflow-hidden">
                    <Picker
                      selectedValue={sortBy}
                      onValueChange={(itemValue) => setSortBy(itemValue)}
                      mode="dropdown"
                      style={{ color: "black" }} // memastikan teks picker tetap terbaca di atas bg putih
                    >
                      <Picker.Item label="Title" value="title" />
                      <Picker.Item label="Price" value="price" />
                      <Picker.Item label="Rating" value="rating" />
                    </Picker>
                  </View>
                </View>

                <View className="flex-1 ml-2">
                  <Text className="text-sm text-white mb-1">Order</Text>
                  <View className="bg-white rounded-md overflow-hidden">
                    <Picker
                      selectedValue={order}
                      onValueChange={(itemValue) => setOrder(itemValue)}
                      mode="dropdown"
                      style={{ color: "black" }}
                    >
                      <Picker.Item label="Ascending" value="asc" />
                      <Picker.Item label="Descending" value="desc" />
                    </Picker>
                  </View>
                </View>
              </View>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <FlatList
                key={2}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }: { item: Product }) => (
                  <ProductGrid products={item} />
                )}
                numColumns={2}
                refreshing={refreshing}
                onRefresh={onRefresh}
                scrollEnabled={false}
              />
            )}

            {/* Pagination */}
            <View className="flex-row justify-between items-center mt-4">
              <TouchableOpacity
                onPress={() => handlePagination("prev")}
                disabled={page === 1}
              >
                <Ionicons
                  name="arrow-back-circle"
                  size={30}
                  color={page === 1 ? "gray" : "blue"}
                />
              </TouchableOpacity>
              <Text>
                Page {page} of {totalPages}
              </Text>
              <TouchableOpacity
                onPress={() => handlePagination("next")}
                disabled={page === totalPages}
              >
                <Ionicons
                  name="arrow-forward-circle"
                  size={30}
                  color={page === totalPages ? "gray" : "blue"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollViewsCustom>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
