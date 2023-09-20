import ConfirmationModalHeading from "../../ui/ConfirmationModalHeading";
import ConfirmationModalSubHeading from "../../ui/ConfirmationModalSubHeading";
import ConfirmationModalTemplate from "../../ui/ConfirmationModalTemplate";
import OverlayClick from "../../ui/OverlayClick";
import Button from "../../ui/Button";
import { useRemoveFromBag, useMoveToWishlistFromBag } from "../../hooks/useBag";
import CloseBtn from "../../ui/CloseBtn";

export default function ModifyBagItemModal({
  removeItemisOpen,
  setRemoveItemisOpen,
  item,
}) {
  // Remove from bag and add to wishlist function
  const {
    mutate: toWishlistFromBagMutation,
    isLoading: toWishlistFromBagIsLoading,
  } = useMoveToWishlistFromBag(item);

  // Remove from bag hook function
  const { mutate: removeFromBagMutation, isLoading: removeFromBagIsLoading } =
    useRemoveFromBag(item);

  // The mutation functions
  // 1). Remove item from bag
  function handleItemRemove(itemId) {
    removeFromBagMutation(itemId);
  }
  // 2). Add to wishlist
  function handleAddToWishlist(data) {
    toWishlistFromBagMutation(data);
  }

  return (
    <>
      {/* When modal is open */}
      {removeItemisOpen && (
        <OverlayClick onClick={() => setRemoveItemisOpen(false)} />
      )}

      {/* The modal */}
      <ConfirmationModalTemplate>
        <div className="relative flex px-3 py-2 sm:py-0">
          <div className="absolute -top-5 right-1.5 text-xl">
            <CloseBtn onClick={() => setRemoveItemisOpen(false)} />
          </div>

          <img
            className="h-20"
            alt="product-img"
            src={`/items-images/${item.item.mainImageFilename}`}
          />
          <div>
            <ConfirmationModalHeading>Move from Bag</ConfirmationModalHeading>

            <ConfirmationModalSubHeading>
              Are you sure you want to move this item form bag?
            </ConfirmationModalSubHeading>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:mx-4 sm:gap-3">
          <Button
            onClick={() => {
              handleAddToWishlist({ item: item.item._id, bagItemId: item._id });
            }}
            secondaryButton
          >
            {toWishlistFromBagIsLoading ? "Moving..." : "Move To Wishlist"}
          </Button>
          <Button onClick={() => handleItemRemove(item._id)}>
            {removeFromBagIsLoading ? "Removing..." : "Remove"}
          </Button>
        </div>
      </ConfirmationModalTemplate>
    </>
  );
}
