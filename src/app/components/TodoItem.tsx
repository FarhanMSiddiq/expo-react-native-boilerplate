import React from "react";
import { Text, View, Platform, Dimensions } from "react-native";
import { Todo } from "../../models/Todo";

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const { width: screenWidth } = Dimensions.get("window");
  const maxContentWidth = Platform.OS === "web" ? 300 : screenWidth;

  const baseClass =
    "p-3 rounded-lg mb-2 " + (todo.completed ? "bg-red-100" : "bg-blue-200");

  const textClass =
    "text-base " +
    (todo.completed ? "line-through text-gray-400" : "text-blue-900");

  return (
    <View className={baseClass} style={{ maxWidth: maxContentWidth }}>
      <Text className={textClass}>{todo.todo}</Text>
    </View>
  );
};

export default TodoItem;
