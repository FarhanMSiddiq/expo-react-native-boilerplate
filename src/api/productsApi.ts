import api from "./service/api";

export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
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
