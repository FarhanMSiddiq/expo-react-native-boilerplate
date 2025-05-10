import { useEffect, useState } from "react";
import { getReviews } from "../../api/reviewsApi";
import { Review } from "../../models/Review";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoading] = useState(false);
  const [errorReviews, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { reviews, loadingReviews, errorReviews };
}
