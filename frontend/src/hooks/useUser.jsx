import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editProfile, getUsersApi } from "../services/apiUsers";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

export const useGetUser = () => {
  const [cookies] = useCookies();

  const { isFetching, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersApi(cookies?.user),
  });

  return { data, isFetching, error };
};

export const useEditUserProfile = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => editProfile(data, cookies?.user),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["users"]);
    },
  });

  return { mutate, isLoading };
};
