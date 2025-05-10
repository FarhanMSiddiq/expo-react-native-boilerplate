import React from "react";
import { Text, View, Platform, Dimensions } from "react-native";
import { Todo } from "../../models/Todo";

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const { width: screenWidth } = Dimensions.get("window");
  const maxContentWidth = Platform.OS === "web" ? 300 : screenWidth;

  return (
    <View
      className="p-3 bg-gray-100 rounded-lg mb-2"
      style={{ maxWidth: maxContentWidth }}
    >
      <Text
        className={`text-base text-gray-80 ${
          todo.completed && "line-through text-gray-400"
        }`}
      >
        {todo.todo}
      </Text>
    </View>
  );
};

export default TodoItem;
