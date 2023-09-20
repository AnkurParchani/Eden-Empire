import { Link } from "react-router-dom";

import Container from "../../ui/Container";
import ActionButton from "../../ui/ActionButton";

import { useRemoveFromWishlist } from "../../hooks/useWishlist";
import { useAddToBag } from "../../hooks/useBag";
import CloseBtn from "../../ui/CloseBtn";
import PriceContainer from "../../ui/PriceContainer";

export default function WishlistItem({ item }) {
  // Remove item function
  const { mutate: removeItemMutation, isLoading: removeItemIsLoading } =
    useRemoveFromWishlist();

  // Add to bag function
  const { mutate: addToBagMutation, isLoading: addToBagIsLoading } =
    useAddToBag();

  // All variables
  const listItemName =
    item.item.name.length > 20 ? item.item.name.slice(0, 20) : item.item.name;
  const discountedPrice = item.item.priceAfterDiscount;
  const originalPrice = item.item.priceBeforeDiscount;
  const discountPercentage = Math.floor(
    ((originalPrice - discountedPrice) / originalPrice) * 100,
  );

  // Function to remove item from the list
  function handleItemRemove(itemId) {
    removeItemMutation(itemId);
  }

  // Function to add to bag from the list
  function handleAddToBag(item) {
    addToBagMutation({
      item: item._id,
      quantity: 1,
      size: item.description?.size.split(",")[0] || "",
      color: item.description?.color.split(",")[0] || "",
    });
  }

  // The JSX
  return (
    <Container>
      <div
        className={`${
          (removeItemIsLoading || addToBagIsLoading) &&
          "pointer-events-none opacity-50"
        } relative flex flex-col gap-1 rounded-sm border text-center shadow-sm`}
      >
        <Link to={`/items/${item.item._id}`}>
          <img
            alt="Item images"
            className="h-72 w-full"
            src={`/items-images/${item.item.mainImageFilename}`}
          />
        </Link>
        <div className="absolute right-1 top-1 cursor-pointer rounded-full bg-white px-[5px] text-sm  text-black duration-200 hover:bg-gray-200 ">
          <CloseBtn onClick={() => handleItemRemove(item._id)} />
        </div>

        <p className="font-medium">{listItemName}...</p>

        <PriceContainer
          originalPrice={originalPrice}
          discountPercentage={discountPercentage}
          discountedPrice={discountedPrice}
        />

        <ActionButton
          disabled={removeItemIsLoading || addToBagIsLoading}
          onClick={() => {
            handleAddToBag(item.item);
            handleItemRemove(item._id);
          }}
          btnText={addToBagIsLoading ? "Moving..." : "Move to bag"}
        />
      </div>
    </Container>
  );
}
