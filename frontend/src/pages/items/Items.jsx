import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import Item from "../../features/item/Item";
import Spinner from "../../ui/Spinner";
import Container from "./../../ui/Container";
import ItemActions from "./ItemActions";
import Button from "../../ui/Button";

import { useGetAllItems } from "../../hooks/useItems";
import { useGetUser } from "../../hooks/useUser";
import { addItems } from "../../features/item/itemSlice";
import { changeIsLoggedIn } from "../../features/auth/authSlice";
import Error from "../../ui/Error";

export default function Items() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const dispatch = useDispatch();

  const [cookies] = useCookies();

  // Fetching all the items data
  const { isFetching, error, data: items } = useGetAllItems();
  // Fetching the user data
  const { data: userData } = useGetUser();

  // Adding items to state after rendering
  useEffect(() => {
    dispatch(addItems(items));

    queryClient.invalidateQueries(["items"]);
  }, [location.search, items, dispatch, queryClient]);

  // If loading
  if (isFetching) return <Spinner type="fullPageFade" />;

  // If error
  if (error) return <Error error={error} />;

  return (
    <Container>
      <ItemActions />

      {!items.length && <EmptyItems />}

      <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-3">
        {items.map((item) => (
          <Item user={userData} item={item} key={item._id} />
        ))}
      </div>
    </Container>
  );
}

// When no items are found after applying filter
function EmptyItems() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="mt-10 text-center text-sm font-semibold text-orange-500">
        Sorry, we couldn't find any items that match your criteria :(
      </h1>
      <div className="text-center">
        <Button onClick={() => navigate(-1)} secondaryButton>
          Go back
        </Button>
      </div>
    </div>
  );
}
