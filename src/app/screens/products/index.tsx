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
  Modal,
  StyleSheet,
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
  const [sortBy, setSortBy] = useState<string>("title");
  const [order, setOrder] = useState<string>("asc");

  const [modalVisible, setModalVisible] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [currentTarget, setCurrentTarget] = useState<"sortBy" | "order">(
    "sortBy"
  );

  const sortByOptions = ["title", "price", "rating"];
  const orderOptions = ["asc", "desc"];

  const openDropdown = (target: "sortBy" | "order") => {
    setCurrentTarget(target);
    setCurrentOptions(target === "sortBy" ? sortByOptions : orderOptions);
    setModalVisible(true);
  };

  const handleSelect = (value: string) => {
    if (currentTarget === "sortBy") {
      setSortBy(value);
    } else {
      setOrder(value);
    }
    setModalVisible(false);
  };

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
    <View className="flex-1 p-5">
      <TextInput
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder={"🔍 Search products"}
        className="border border-gray-300 p-2 mb-4 bg-white text-black"
      />

      <View className="p-4 bg-blue-600 rounded-lg mb-4">
        <View className="flex-row justify-between">
          <View className="flex-1 mr-2">
            <Text className="text-white mb-1">Sort By</Text>
            <TouchableOpacity
              className="p-3 bg-white rounded-md mb-4"
              onPress={() => openDropdown("sortBy")}
            >
              <Text className="text-black">{sortBy}</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 mr-2">
            <Text className="text-white mb-1">Order</Text>
            <TouchableOpacity
              className="p-3 bg-white rounded-md"
              onPress={() => openDropdown("order")}
            >
              <Text className="text-black">{order}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal visible={modalVisible} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={currentOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => handleSelect(item)}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
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
          ListFooterComponent={
            <>
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
            </>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 10, marginBottom: 5 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    margin: 40,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
  },
  optionItem: {
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
