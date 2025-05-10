import api from "./service/api";

export const getProducts = async (
  skip: number = 0,
  limit: number = 10,
  sortBy: string = "",
  order: string = ""
) => {
  try {
    const response = await api.get("/products", {
      params: { skip, limit, sortBy, order },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const searchProducts = async (
  query: string,
  sortBy: string = "",
  order: string = ""
) => {
  try {
    const response = await api.get(`/products/search?q=${query}`, {
      params: { sortBy, order },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

export const getProductsPerCategory = async (
  category: string,
  params: string | null
) => {
  try {
    const response = await api.get(
      `/products/category/${category}${params != null ? params : ""}`
    );
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products per category:", error);
    throw error;
  }
};
