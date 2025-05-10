import api from "./service/api";

export const getReviews = async () => {
  const response = await api.get("/posts");
  return response.data.posts;
};
