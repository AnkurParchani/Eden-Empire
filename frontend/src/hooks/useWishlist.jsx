import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addToWishlistApi,
  removeFromWishlistApi,
  getWishlistApi,
} from "../services/apiWishlist";

// Getting all the liked items of user
export const useGetAllWishlist = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wishlistItems"],
    queryFn: getWishlistApi,
  });

  return { data, isLoading, error };
};

// Add to wishlist function
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: addToWishlistApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlistItems"]);
      toast.success("Item added to Wishlist");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { isLoading, mutate };
};

// Removing the item from the list
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: removeFromWishlistApi,
    onError: (err) => {
      return toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlistItems"]);
    },
  });

  return { mutate, isLoading };
};
