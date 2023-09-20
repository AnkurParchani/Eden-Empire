import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Heading from "../../ui/Heading";
import ActionBox from "./../../ui/ActionBox";
import Container from "../../ui/Container";
import Warning from "../../ui/Warning";

import { getIsLoggedIn, setPreviousPage } from "../../features/auth/authSlice";

export default function MyProfile() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <Container>
      <Heading textPink>My-Profile</Heading>

      {!isLoggedIn && (
        <Warning>
          To access these features, please{" "}
          <Link
            onClick={() => dispatch(setPreviousPage("/my-profile"))}
            to="/login"
            className="text-[#0066c0] hover:underline"
          >
            Login
          </Link>
        </Warning>
      )}

      <div className="relative">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 ">
          {/* Add this line to cover the links */}
          {!isLoggedIn && (
            <div className=" absolute left-0 top-0 h-full w-full bg-gray-800 bg-opacity-30" />
          )}

          <ActionBox
            iconSrc="icons/address.png"
            actionText="Address"
            actionDescription="Add or delete your addresses"
            linkTo="/my-addresses"
          />
          <ActionBox
            iconSrc="icons/order.png"
            actionText="Orders"
            actionDescription="Browse and explore your orders"
            linkTo="/my-orders"
          />
          <ActionBox
            iconSrc="icons/review.png"
            actionText="Reviews"
            actionDescription="Dive into your reviews"
            linkTo="/my-reviews"
          />
          <ActionBox
            iconSrc="icons/wishlist.png"
            actionText="Wishlist"
            actionDescription="Discover Your Wishlist Wonders"
            linkTo="/my-wishlist"
          />
          <ActionBox
            iconSrc="icons/bag.png"
            actionText="Bag"
            actionDescription="Place an order from your bag"
            linkTo="/my-bag"
          />
        </div>
      </div>
    </Container>
  );
}
