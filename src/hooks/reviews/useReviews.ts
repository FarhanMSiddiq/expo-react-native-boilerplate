import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReviews } from "../../api/reviewsApi";
import { Review } from "../../models/Review";

const STORAGE_KEY = "cached_reviews";

const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoading] = useState(false);
  const [errorReviews, setError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const cached = await AsyncStorage.getItem(STORAGE_KEY);
        if (cached) {
          setReviews(JSON.parse(cached));
        } else {
          const data = await getReviews();
          setReviews(data);

          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loadingReviews, errorReviews };
};

export default useReviews;
