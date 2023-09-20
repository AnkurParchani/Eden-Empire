import { useNavigate } from "react-router";
import EmptyList from "../../ui/EmptyList";

export default function EmptyWishlist() {
  const navigate = useNavigate();

  return (
    <>
      <EmptyList
        iconSrc="/icons/empty-wishlist.png"
        heading="Your Wishlist is empty"
        description="Add items that you like to your wishlist. Review them anytime and easily move them to the bag."
        btnText="continue shopping"
        onClick={() => navigate("/")}
        hasActionButton
      />
    </>
  );
}
