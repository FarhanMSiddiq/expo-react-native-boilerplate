import axios from "axios";
import { API_URL } from "@env";

const api = axios.create({
  baseURL: API_URL,
});

export const getReviews = async () => {
  const response = await api.get("/posts");
  return response.data.posts;
};
