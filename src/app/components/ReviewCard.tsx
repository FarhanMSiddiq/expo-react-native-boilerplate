import { View, Text, Platform, Dimensions, Image } from "react-native";
import { FC } from "react";
import { Review } from "../../models/Review";
import { MaterialIcons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");
const maxContentWidth = Platform.OS === "web" ? 300 : screenWidth;

type Props = {
  review: Review;
};

const ReviewCard: FC<Props> = ({ review }) => {
  return (
    <View
      className="bg-white m-2 p-3 rounded-lg shadow"
      style={{ maxWidth: maxContentWidth }}
    >
      {/* Reviewer Info */}
      <View className="flex-row items-center mb-3">
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s",
          }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <View>
          <Text className="font-semibold text-base text-gray-800">
            {"Anonymous"}
          </Text>
        </View>
      </View>

      {/* Title & Body */}
      <Text className="text-lg font-semibold text-black mb-1">
        {review.title}
      </Text>
      <Text className="text-sm text-gray-700 mb-3">{review.body}</Text>

      {/* Tags */}
      <View className="flex-row flex-wrap mb-3">
        {review.tags.map((tag, index) => (
          <View
            key={index}
            className="bg-blue-100 px-2 py-1 rounded-full mr-2 mb-2"
          >
            <Text className="text-xs text-blue-700">#{tag}</Text>
          </View>
        ))}
      </View>

      {/* Reactions */}
      <View className="flex-row justify-between items-center">
        <Text className="text-xs text-gray-500">👁️ {review.views} views</Text>
        <Text className="text-xs text-gray-500">
          👍 {review.reactions.likes} | 👎 {review.reactions.dislikes}
        </Text>
      </View>
    </View>
  );
};

export default ReviewCard;
