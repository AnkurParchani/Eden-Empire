import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkoutOrderApi,
  getOrderApi,
  getOrdersApi,
} from "../services/apiOrders";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

// Getting all the orders of user
export const useGetAllOrders = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersApi,
  });

  return { data, isLoading, error };
};

// Getting a particular order
export const useGetOrder = (orderId) => {
  const { isFetching, error, data } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrderApi(orderId),
    cacheTime: 0,
  });

  return { data, isFetching, error };
};

// Checking out / ordering item from the app
export const useCheckoutOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: checkoutOrderApi,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["bag"]);
      navigate("/payment");
    },
  });

  return { isLoading, mutate };
};
