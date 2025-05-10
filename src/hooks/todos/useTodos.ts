import { useEffect, useState } from "react";
import { getTodos } from "../../api/todosApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../../models/Todo";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [loadingTodos, setLoading] = useState<boolean>(false);
  const [errorTodos, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cached = await AsyncStorage.getItem("todos");
        if (cached) {
          setTodos(JSON.parse(cached));
        } else {
          const fetched = await getTodos();
          setTodos(fetched);
          await AsyncStorage.setItem("todos", JSON.stringify(fetched));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { todos, loadingTodos, errorTodos };
};

export default useTodos;
