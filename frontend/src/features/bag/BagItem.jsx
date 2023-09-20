import { useState } from "react";
import { Link } from "react-router-dom";

import Select from "../../ui/Select";
import CloseBtn from "./../../ui/CloseBtn";
import ModifyBagItemModal from "./ModifyBagItemModal";
import Spinner from "./../../ui/Spinner";

import { useAddDetails, useChangeIsChecked } from "../../hooks/useBag";

export default function BagItem({ item }) {
  // Functions to mutate the checked items state
  const {
    mutate: changeIsCheckedMutation,
    isLoading: changeIsCheckedIsLoading,
  } = useChangeIsChecked();

  // Function for adding item details
  const { mutate: itemDetailsMutation, isLoading: itemDetailsIsLoading } =
    useAddDetails();

  // State to track the removeItemModal
  const [removeItemIsOpen, setRemoveItemIsOpen] = useState(false);

  // Destucturing the items
  const itemId = item?.item?._id;
  const {
    mainImageFilename,
    name,
    priceBeforeDiscount,
    maxOrderQuantity,
    priceAfterDiscount,
  } = item.item;
  const { manufacturer, packer } = item.item.details;
  const { color, size } = item.item.description;

  // Calculating discount percentage
  const discountPercentage = Math.floor(
    ((priceBeforeDiscount - priceAfterDiscount) / priceBeforeDiscount) * 100,
  );

  // Functions
  function mutateBagItem(checked) {
    if (checked) {
      changeIsCheckedMutation({ bagItemId: item._id, isChecked: true });
    }

    if (!checked) {
      changeIsCheckedMutation({ bagItemId: item._id, isChecked: false });
    }
  }

  function handleOnChange(data) {
    itemDetailsMutation({ newData: data, bagId: item._id });
  }

  // The JSX
  return (
    <div className="relative flex gap-2 bg-gray-50 px-0.5 py-3  shadow-md">
      {/* Checkbox to include / exclude item */}
      <div className="absolute left-0.5 top-3 px-1 ">
        <input
          onChange={(e) => mutateBagItem(e.target.checked)}
          className="scale-110 cursor-pointer accent-pink-500 "
          type="checkbox"
          checked={item.isChecked}
        />
      </div>

      {(changeIsCheckedIsLoading || itemDetailsIsLoading) && (
        <Spinner type="fullPageFade" />
      )}

      {/* Remove bagItem button */}
      <div className="absolute right-1.5 top-0">
        <CloseBtn onClick={() => setRemoveItemIsOpen(true)} />
      </div>

      {/* Image */}
      <Link to={`/items/${itemId}`}>
        <img
          className="h-28"
          alt="item-image"
          src={`/items-images/${mainImageFilename}`}
        />
      </Link>

      {/* Details */}
      <div className=" flex flex-col gap-1 capitalize">
        {/* 1) Manufacturer */}
        <h1 className="flex items-center gap-1 text-sm font-semibold tracking-wide ">
          {manufacturer}
        </h1>

        {/* 2) Item name */}
        <Link to={`/items/${itemId}`}>
          <h2 className="text-xs capitalize text-gray-900">
            {name.slice(0, 25)}...
          </h2>
        </Link>

        {/* 3). Sold by */}
        <h2 className="text-xs text-gray-500">
          Sold by: {packer.slice(0, 13)}...
        </h2>

        {/* Select options */}
        <div className="mt-1 flex flex-col items-start gap-1 ">
          <div className="flex gap-1">
            <Select
              value={item?.size}
              label="Size:"
              id="size"
              options={size}
              onChange={handleOnChange}
            />
            <Select
              value={item?.quantity}
              label="Qty:"
              id="quantity"
              options={maxOrderQuantity}
              onChange={handleOnChange}
            />
          </div>
          <Select
            value={item?.color}
            label="Color:"
            id="color"
            options={color}
            onChange={handleOnChange}
          />
        </div>

        {/* Price box */}
        <div className="mt-2 flex gap-2 text-xs">
          <h2 className="font-bold">₹{priceAfterDiscount}</h2>
          <h2 className="text-gray-500 line-through">₹{priceBeforeDiscount}</h2>
          <h2 className="font-bold text-pink-500">{discountPercentage}% OFF</h2>
        </div>

        {/* Deliver by date */}
        <h2 className="text-xs">
          Delivery by:{" "}
          <span className="font-semibold text-gray-500">(Simulation only)</span>
        </h2>
      </div>

      {/* If someone clicks on remove item from bag */}
      {removeItemIsOpen && (
        <ModifyBagItemModal
          removeItemisOpen={removeItemIsOpen}
          setRemoveItemisOpen={setRemoveItemIsOpen}
          item={item}
        />
      )}
    </div>
  );
}
