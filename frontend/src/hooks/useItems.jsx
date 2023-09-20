import { useQuery } from "@tanstack/react-query";
import { getAllItems, getItemApi, getItems } from "../services/apiItems";

// Get all items present in the website
export function useGetEveryItem() {
  const { isFetching, error, data } = useQuery({
    queryFn: getAllItems,
    queryKey: ["all-items"],
  });

  return { isFetching, error, data };
}

// Getting all the items according to the search
export function useGetAllItems() {
  const { isFetching, error, data } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  return { isFetching, error, data };
}

// Getting a single item
export function useGetItem() {
  const { isFetching, error, data } = useQuery({
    queryKey: ["item"],
    queryFn: getItemApi,
  });

  return { isFetching, error, data };
}
