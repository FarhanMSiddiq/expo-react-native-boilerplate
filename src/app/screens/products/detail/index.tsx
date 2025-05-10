import { View, Text, ScrollView, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Product } from "../../../../models/Product";
import { MaterialIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";

type ProductDetailRouteProp = RouteProp<
  { ProductDetail: { product: Product } },
  "ProductDetail"
>;

export default function ProductDetailScreen() {
  const { params } = useRoute<ProductDetailRouteProp>();
  const product = params.product;

  // Fungsi untuk merender bintang
  const renderStars = (rating: number) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <MaterialIcons
          key={i}
          name={i < rating ? "star" : "star-border"}
          size={18}
          color="#f39c12"
        />
      );
    }
    return stars;
  };

  // Fungsi untuk memformat tanggal
  const formatDate = (date: string) => {
    return format(parseISO(date), "eeee, dd MMMM yyyy - hh:mm a");
  };

  return (
    <ScrollView className="flex-1 bg-blue-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-blue-900 mb-3">
          {product.title}
        </Text>
        <Image
          source={{ uri: product.images[0] }}
          className="w-full h-56 mb-5 rounded-xl shadow bg-white"
          resizeMode="cover"
        />

        <View className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <Text className="text-gray-700 mb-2">{product.description}</Text>
          <Text className="text-blue-700 font-semibold mb-1">
            Brand: {product.brand}
          </Text>
          <Text className="text-lg font-bold text-blue-800 mb-1">
            ${product.price}
          </Text>
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-600">
              Stock: {product.stock}
            </Text>
            <Text className="text-sm text-gray-600">
              Rating: {product.rating}
            </Text>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <Text className="text-blue-900 font-semibold mb-1">
            Shipping Info
          </Text>
          <Text className="text-gray-700">{product.shippingInformation}</Text>
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <Text className="text-blue-900 font-semibold mb-1">Warranty</Text>
          <Text className="text-gray-700">{product.warrantyInformation}</Text>
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <Text className="text-blue-900 font-semibold mb-1">
            Return Policy
          </Text>
          <Text className="text-gray-700">{product.returnPolicy}</Text>
        </View>

        {/* Reviews Section */}
        <View className="bg-white rounded-2xl p-4 shadow-md mb-4">
          <Text className="text-blue-900 font-semibold mb-2">Reviews</Text>
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <View key={index} className="flex-row mb-4 items-center">
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s",
                  }} // Ganti dengan URL avatar reviewer
                  className="w-10 h-10 rounded-full mr-3"
                />
                <View className="flex-1">
                  <Text className="font-semibold text-blue-800">
                    {review.reviewerName}
                  </Text>
                  <View className="flex-row">{renderStars(review.rating)}</View>
                  <Text className="text-sm text-gray-600">
                    {review.comment}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {formatDate(review.date)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-gray-500">No reviews yet.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
