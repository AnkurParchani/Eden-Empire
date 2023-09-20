import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addReviewApi,
  getItemReviews,
  getReviewsApi,
  restoreReviewApi,
} from "../services/apiReviews";

// Getting all the orders of user
export const useGetAllReviews = () => {
  const { error, data, isFetching } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReviewsApi("profile"),
  });

  return { data, error, isFetching };
};

// Getting the reviews of a single item
export const useGetItemReviews = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["item-reviews"],
    queryFn: getItemReviews,
    cacheTime: 0,
  });

  return { data, isFetching, error };
};

// Getting all the trash reviews of the user
export const useGetAllTrashReviews = () => {
  const { error, data, isFetching } = useQuery({
    queryKey: ["trash-reviews"],
    queryFn: () => getReviewsApi("trash"),
  });

  return { error, data, isFetching };
};

// Restoring reviews from trash
export const useRestoreReview = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: restoreReviewApi,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["trash-reviews"]);
      toast.success("Review has successfully been restored");
    },
  });

  return { mutate, isLoading };
};

// Adding a review
export const useAddReview = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: addReviewApi,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Review added");
      queryClient.invalidateQueries("item-reviews");
    },
  });

  return { mutate, isLoading };
};
