import api from "./service/api";

export const getTodos = async () => {
  try {
    const response = await api.get("/todos");
    return response.data.todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};
