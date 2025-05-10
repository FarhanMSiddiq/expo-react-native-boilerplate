import React from "react";
import { TouchableOpacity, Text } from "react-native";

type Props = {
  tag: string;
  selected: boolean;
  onPress: () => void;
};

export default function TagButton({ tag, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      className={`px-4 py-2 rounded-full m-1 ${
        selected ? "bg-blue-600" : "bg-blue-300"
      }`}
      onPress={onPress}
    >
      <Text className="text-white font-semibold">{tag}</Text>
    </TouchableOpacity>
  );
}
