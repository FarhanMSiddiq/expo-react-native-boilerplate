import { useState, useEffect } from "react";
import { getProductsPerCategory } from "../../api/productsApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../../models/Product";

const useBestProducts = (category: string, params: string | null = null) => {
  const [bestProducts, setProducts] = useState<Product[] | null>(null);
  const [loadingBestProducts, setLoading] = useState<boolean>(false);
  const [errorBestProducts, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Cek apakah data ada di AsyncStorage
        const cachedProducts = await AsyncStorage.getItem("best-products");
        if (cachedProducts) {
          setProducts(JSON.parse(cachedProducts));
        } else {
          const fetchedProducts = await getProductsPerCategory(
            category,
            params
          );
          setProducts(fetchedProducts);
          await AsyncStorage.setItem(
            "best-products",
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

  return { bestProducts, loadingBestProducts, errorBestProducts };
};

export default useBestProducts;
