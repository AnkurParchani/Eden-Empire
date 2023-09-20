import { useNavigate } from "react-router";
import EmptyList from "../../ui/EmptyList";

export default function EmptyWishlist() {
  const navigate = useNavigate();

  return (
    <EmptyList
      iconSrc="/icons/empty-bag.png"
      heading="Hey, it feels so light!"
      description="There is nothing in your bag. Let's add some items."
      btnText="add items from wishlist"
      onClick={() => navigate("/my-wishlist")}
      hasActionButton
    />
  );
}
