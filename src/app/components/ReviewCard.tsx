import { View, Text, Platform, Dimensions } from "react-native";
import { FC } from "react";
import { Review } from "../../models/Review";

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
      <Text className="text-lg font-semibold text-black mb-2">
        {review.title}
      </Text>

      <Text className="text-sm text-gray-700 mb-3">{review.body}</Text>

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
