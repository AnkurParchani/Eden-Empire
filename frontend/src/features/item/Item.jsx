import { Link } from "react-router-dom";
import { useState } from "react";

import PriceContainer from "../../ui/PriceContainer";
import ItemLike from "./ItemLike";

import {
  useAddToWishlist,
  useGetAllWishlist,
  useRemoveFromWishlist,
} from "../../hooks/useWishlist";
import Spinner from "../../ui/Spinner";
import LoginWarning from "../../ui/LoginWarning";

export default function Item({ item, user }) {
  // Modal to show when the user is not logged in
  const [showNotLoggedInModal, setShowNotLoggedInModal] = useState(false);
  // Getting all the wishlist data
  const { data: wishlistData } = useGetAllWishlist();

  // Adding and removing item to wishlist mutation
  const { mutate: addToWishlistMutation, isLoading: addToWishListIsLoading } =
    useAddToWishlist();
  const {
    mutate: removeFromWishlistMutation,
    isLoading: removeFromWishlistIsLoading,
  } = useRemoveFromWishlist();

  // Helper variables to track wishlist items
  const wishlist = wishlistData?.data?.list;
  const itemsInWishlist = wishlist && wishlist.map((item) => item.item._id);
  const inWishlist = itemsInWishlist && itemsInWishlist.includes(item._id);

  // Getting all the necessary variables from the item
  const { mainImageFilename, priceAfterDiscount, priceBeforeDiscount, _id } =
    item;
  const { manufacturer, genericName } = item.details;
  const discountPercentage = Math.floor(
    ((priceBeforeDiscount - priceAfterDiscount) / priceBeforeDiscount) * 100,
  );

  // If user clicked on the like button to add or remove item from wishlist
  function handleClick(itemId) {
    // If the user is not logged in
    if (!user || !user._id) {
      setShowNotLoggedInModal(true);
      return;
    }

    // If the item is in wishlist (i.e remove from wishlist)
    if (inWishlist) {
      const wishlistItemToRemove = wishlist.filter(
        (item) => String(item.item._id) === String(itemId),
      )[0];

      if (!wishlistItemToRemove) return;

      removeFromWishlistMutation(wishlistItemToRemove._id);

      // If the item is not in wishlist (i.e to add to wishlist)
    } else {
      addToWishlistMutation({ item: item._id });
    }
  }

  // The JSX
  return (
    <div className="relative mx-auto pb-4 shadow-md">
      <ItemLike
        addedToWishlist={inWishlist}
        onClick={(e) => {
          e.stopPropagation();
          handleClick(item._id);
        }}
      />

      {showNotLoggedInModal && (
        <LoginWarning
          warningMessage="Please log in first in order to add items to your wishlist"
          modalIsOpen={showNotLoggedInModal}
          setModalIsOpen={setShowNotLoggedInModal}
        />
      )}

      {(removeFromWishlistIsLoading || addToWishListIsLoading) && (
        <Spinner type="fullPageFade" />
      )}

      <Link to={`/items/${_id}`}>
        <img alt="Item-image" src={`/items-images/${mainImageFilename}`} />

        <div className="mt-2 flex flex-col items-center justify-end capitalize">
          <h1 className="text-sm font-semibold">{manufacturer}</h1>
          <p className="mb-1 text-xs font-medium text-gray-600">
            {genericName}
          </p>

          <PriceContainer
            originalPrice={priceBeforeDiscount}
            discountedPrice={priceAfterDiscount}
          />
          <p className="-mt-3 text-xs font-semibold text-pink-500">
            ({discountPercentage}% OFF)
          </p>
        </div>
      </Link>
    </div>
  );
}
