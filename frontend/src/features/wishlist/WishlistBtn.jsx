import { useState } from "react";
import { useAddToWishlist, useGetAllWishlist } from "../../hooks/useWishlist";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../auth/authSlice";
import LoginWarning from "../../ui/LoginWarning";

export default function WishlistBtn({ data }) {
  const [showNotLoggedInModal, setShowNotLoggedInModal] = useState(false);
  // Both muutation and fetching functions for wishlist
  const { mutate: addToWishlistMutation, isLoading: addToWishListIsLoading } =
    useAddToWishlist();
  const { data: wishlistData } = useGetAllWishlist();
  const isLoggedIn = useSelector(getIsLoggedIn);

  // Getting all the wishlist id from the wishlistData
  const wishlistDataIdArr = wishlistData?.data?.list.map(
    (wishlist) => wishlist.item._id,
  );

  // Checking if the item id is in wishlist or not
  const hasInWishlist = wishlistDataIdArr?.includes(data._id);

  // Handling the add To wishlist function for when the user will click on the button
  function handleAddToWishlist() {
    if (!isLoggedIn) return setShowNotLoggedInModal(true);
    addToWishlistMutation({ item: data._id });
  }

  // Text for wishlist button
  let wishlistText;
  if (hasInWishlist) wishlistText = "Wishlisted";
  if (!hasInWishlist) wishlistText = "Wishlist";

  // The JSX
  return (
    <>
      {showNotLoggedInModal && (
        <LoginWarning
          warningMessage="Please log in first in order to add items to your wishlist"
          modalIsOpen={showNotLoggedInModal}
          setModalIsOpen={setShowNotLoggedInModal}
        />
      )}

      <button
        onClick={handleAddToWishlist}
        disabled={hasInWishlist}
        className={`${
          hasInWishlist ? "bg-[#535766] text-white" : "hover:bg-gray-100"
        } rounded-sm border border-black py-1.5 text-sm  font-medium uppercase duration-200 `}
      >
        <i
          className={`fa-regular fa-heart mr-2 ${
            hasInWishlist && "text-pink-500"
          }`}
        ></i>
        {addToWishListIsLoading ? "Adding..." : wishlistText}
      </button>
    </>
  );
}
