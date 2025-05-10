import { useState, useEffect } from "react";
import { getProducts } from "../../api/productsApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../../models/Product";

const useProducts = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cachedProducts = await AsyncStorage.getItem("products");
        if (cachedProducts) {
          setProducts(JSON.parse(cachedProducts));
        } else {
          const fetchedProducts = await getProducts();
          setProducts(fetchedProducts);
          await AsyncStorage.setItem(
            "products",
            JSON.stringify(fetchedProducts)
          );
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, loading, error };
};

export default useProducts;
