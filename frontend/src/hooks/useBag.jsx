import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToBagApi,
  changeIsCheckedApi,
  getMyBagApi,
  addDetailsApi,
  moveToWishlistFromBagApi,
  removeFromBagApi,
  toggleAllApi,
} from "../services/apiBag";
import { toast } from "react-hot-toast";

// Getting user's bag items
export const useGetMyBag = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["bag"],
    queryFn: getMyBagApi,
  });
  return { isFetching, data, error };
};

// Adding an item to bag
export const useAddToBag = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: addToBagApi,
    onSuccess: () => {
      toast.success("Item added to bag");
      queryClient.invalidateQueries(["bag"]);
      queryClient.invalidateQueries(["wishlistItems"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
};

// Function to add small details about the item
export const useAddDetails = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: addDetailsApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["bag"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isLoading };
};

// Function to change isChecked property in bag
export const useChangeIsChecked = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: changeIsCheckedApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["bag"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
};

// Removing from bag function
export const useRemoveFromBag = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: removeFromBagApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["bag"]);
      toast.success("Item removed from bag");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
};

// Removing from bag and adding to wishlist
export const useMoveToWishlistFromBag = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: moveToWishlistFromBagApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["bag"]);
      queryClient.invalidateQueries(["wishlistItems"]);
      toast.success("Item Moved to wishlist");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
};

// Toggle all using checkbox functionality
export const useToggleAll = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: toggleAllApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["bag"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
};
