import { View, Text, Button, ActivityIndicator } from "react-native";
import { FC } from "react";
import useBestProducts from "../../../hooks/products/useBestProducts";
import ProductCarousel from "../../components/ProductCarousel";

type Props = {
  navigation: any;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const { bestProducts, loadingBestProducts, errorBestProducts } =
    useBestProducts("groceries", "?sortBy=rating&order=desc");

  if (loadingBestProducts) return <ActivityIndicator size="large" />;
  if (errorBestProducts) return <Text>Error</Text>;

  return (
    <View>
      <View className="p-2">
        <ProductCarousel products={bestProducts ?? []} />
      </View>
      <Text>Home</Text>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate("Products")}
      />
    </View>
  );
};

export default HomeScreen;
