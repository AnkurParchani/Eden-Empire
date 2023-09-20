import { useChangeDelilveryAddress } from "../../hooks/useAddress";
import Spinner from "./../../ui/Spinner";

export default function CheckoutAddressItem({
  address,
  isSelected,
  currentDeliveryAddress,
}) {
  const { mutate, isLoading } = useChangeDelilveryAddress();
  const isCurrentDeliveryAddress = currentDeliveryAddress?._id === address._id;

  // Getting all the data from address
  const {
    typeOfAddress,
    fullName,
    flatArea,
    flatNumber,
    city,
    state,
    pincode,
    phoneNumber,
  } = address;

  function handleAddressChange(checked) {
    mutate({ addressId: address._id, isChecked: checked });
  }

  return (
    <>
      {isLoading && <Spinner type="fullPageFade" />}

      <div
        className={`relative flex cursor-pointer gap-2 bg-gray-50 px-2 py-4 text-xs capitalize shadow-md ${
          !isCurrentDeliveryAddress ? "opacity-50" : ""
        }`}
      >
        <div>
          <input
            type="checkbox"
            id={address._id}
            checked={isCurrentDeliveryAddress}
            className="mt-0.5 cursor-pointer accent-pink-500"
            onChange={(e) => handleAddressChange(e.target.checked)}
          />
        </div>

        <label htmlFor={address._id}>
          <div className="flex flex-col gap-0.5">
            <p
              className={`absolute  right-1 top-1.5 ${
                isCurrentDeliveryAddress && "text-green-500"
              }`}
            >
              ({typeOfAddress})
            </p>
            <h1 className="font-bold tracking-wide">
              {fullName}{" "}
              {isSelected && (
                <span className="font-normal tracking-normal text-gray-500">
                  (Default)
                </span>
              )}
            </h1>
            <p>
              {flatArea}, {flatNumber}
            </p>
            <p>
              {city}, {state}-{pincode}
            </p>
            <p className="mt-2">
              Mobile: <span className="font-bold">{phoneNumber}</span>
            </p>
          </div>
        </label>
      </div>
    </>
  );
}
