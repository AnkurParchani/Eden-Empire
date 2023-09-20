import { useSelector } from "react-redux";

import BreadCrumbNav from "../../ui/BreadCrumbNav";
import Container from "../../ui/Container";
import Heading from "./../../ui/Heading";

import { useGetAllWishlist } from "../../hooks/useWishlist";
import WishlistItem from "../../features/wishlist/WishlistItem";
import EmptyWishlist from "../../features/wishlist/EmptyWishlist";
import { getIsLoggedIn } from "../../features/auth/authSlice";
import NotLoggedIn from "../../ui/NotLoggedIn";
import Error from "../../ui/Error";

export default function MyWishlist() {
  const { data: wishlistItems, error } = useGetAllWishlist();
  const listLength = wishlistItems?.data?.list?.length;
  const isLoggedIn = useSelector(getIsLoggedIn);

  if (error) return <Error error={error} />;

  if (!isLoggedIn) return <NotLoggedIn currentPage="/my-wishlist" />;

  return (
    <Container>
      <BreadCrumbNav
        navLinks={[{ name: "My Profile", linkTo: "/my-profile", type: "link" }]}
        currentPageName="My-wishlist"
      />

      {/* When the data has loaded but is empty */}
      {wishlistItems && !wishlistItems.data && <EmptyWishlist />}

      {/* When the data has loaded and has reviews */}
      {wishlistItems && listLength > 0 && (
        <div className="mt-4">
          <Heading noMarginBottom>My Wishlist</Heading>
          <p className="text-center font-semibold text-gray-700">
            {listLength === 1
              ? "01 item"
              : `${String(listLength).padStart(2, "0")} items`}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {wishlistItems.data.list.map((item) => (
              <WishlistItem key={item._id} item={item} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
