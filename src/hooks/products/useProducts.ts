import { useState, useEffect } from "react";
import { getProducts, searchProducts } from "../../api/productsApi";
import { Product } from "../../models/Product";

export const useProducts = (
  searchQuery: string = "",
  page: number = 1,
  limit: number = 10,
  sortBy: string = "",
  order: string = ""
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(false);
      try {
        let fetchedProducts;
        if (searchQuery) {
          fetchedProducts = await searchProducts(searchQuery, sortBy, order);
        } else {
          const skip = (page - 1) * limit;
          fetchedProducts = await getProducts(skip, limit, sortBy, order);
        }

        setProducts(fetchedProducts.products);
        setTotalPages(Math.ceil(fetchedProducts.total / limit));
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, page, limit]);

  const refetchProducts = async (
    query: string,
    page: number,
    sortByNew: string = "",
    orderNew: string = ""
  ) => {
    setLoading(true);
    setError(false);
    try {
      let fetchedProducts;
      if (query) {
        fetchedProducts = await searchProducts(query, sortByNew, orderNew);
      } else {
        const skip = (page - 1) * limit;
        fetchedProducts = await getProducts(skip, limit, sortByNew, orderNew);
      }

      setProducts(fetchedProducts.products);
      setTotalPages(Math.ceil(fetchedProducts.total / limit));
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, totalPages, refetchProducts };
};
