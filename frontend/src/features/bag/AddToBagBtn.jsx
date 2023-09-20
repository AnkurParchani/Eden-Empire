import { useState } from "react";
import { useAddToBag, useGetMyBag } from "../../hooks/useBag";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../auth/authSlice";
import LoginWarning from "../../ui/LoginWarning";

export default function AddToBagBtn({ data }) {
  const [showNotLoggedInModal, setShowNotLoggedInModal] = useState(false);
  // Getting both mutation function and fetching for the bag
  const { mutate: addToBagMutation, isLoading: addToBagIsLoading } =
    useAddToBag();
  const { data: bagData } = useGetMyBag();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const bagItemIdArr = bagData?.data?.list?.map((item) => item.item._id);
  const isInBag = bagItemIdArr?.includes(data._id);

  // when someone clicks on the add to bag
  function handleClick() {
    if (!isLoggedIn) return setShowNotLoggedInModal(true);

    addToBagMutation({
      item: data._id,
      quantity: 1,
      size: data.description?.size.split(",")[0] || "",
      color: data.description?.color.split(",")[0] || "",
    });
  }

  //   Add to bag text
  let addToBagText = "Add to Bag";
  if (addToBagIsLoading) addToBagText = "Adding...";
  if (isInBag) addToBagText = "Added to Bag";

  //   The JSX
  return (
    <>
      {showNotLoggedInModal && (
        <LoginWarning
          warningMessage="Please log in first in order to add items to your bag"
          modalIsOpen={showNotLoggedInModal}
          setModalIsOpen={setShowNotLoggedInModal}
        />
      )}

      <button
        onClick={handleClick}
        disabled={isInBag}
        className={`rounded-sm py-1.5 text-sm font-medium duration-200  ${
          isInBag
            ? "bg-orange-500 text-pink-500"
            : "bg-pink-600 hover:bg-pink-700"
        } text-white`}
      >
        <i className="fa-solid fa-bag-shopping mr-2" />
        {addToBagText}
      </button>
    </>
  );
}
