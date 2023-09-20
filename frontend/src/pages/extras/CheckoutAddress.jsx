import { useNavigate } from "react-router";

import Container from "../../ui/Container";
import BreadCrumbNav from "../../ui/BreadCrumbNav";
import EmptyList from "../../ui/EmptyList";
import CheckoutAddressItemDesciption from "../../features/checkout/CheckoutAddressItemDesciption";
import CheckoutAddressItem from "../../features/address/CheckoutAddressItem";
import FixedBottomButton from "./../../ui/FixedBottomButton";
import Spinner from "../../ui/Spinner";
import ActionButton from "../../ui/ActionButton";

import { useGetMyBag } from "./../../hooks/useBag";
import { useGetAllAddress } from "../../hooks/useAddress";
import { useCheckoutOrder } from "../../hooks/useOrders";

export default function CheckoutAddress() {
  const navigate = useNavigate();
  // Main order mutation function
  const { mutate, isLoading } = useCheckoutOrder();

  // Getting user's bag and address data
  const { data: bag } = useGetMyBag();
  const { data: addressesData } = useGetAllAddress();

  let currentDeliveryAddress, checkedItems, checkedItemsLength;

  // Extra address and bag variables
  const addresses = addressesData?.data;

  // 1). If there are no addresses in the user's list then sending the user to the add address route
  if (addresses?.length === 0 || addresses?.results === 0 || !addressesData) {
    return (
      <Container>
        <CheckoutAddressBreadCrumb />
        <EmptyList
          iconSrc="/icons/empty-address.svg"
          heading="You have no addresses"
          description="Please provide your delivery address to proceed with your order. Your address is necessary for delivery."
          btnText="Add address"
          onClick={() => navigate("/my-addresses")}
          hasActionButton
        />
      </Container>
    );
  }

  if (addresses) {
    currentDeliveryAddress = addresses?.find(
      (address) => address.isDeliveryAddress,
    );
    checkedItems = bag?.data?.list.filter((item) => item.isChecked);
    checkedItemsLength = checkedItems?.length;
  }

  // Situations
  // 2). If there are not items in the bag and the user have directly come to checkout address path
  if (checkedItemsLength === 0) {
    return (
      <Container>
        <CheckoutAddressBreadCrumb />
        <EmptyList
          iconSrc="/icons/empty-bag.png"
          heading="Your Bag is Empty"
          description="To proceed, please add items to your bag"
          btnText="View my bag"
          onClick={() => navigate("/my-bag")}
          hasActionButton
        />
      </Container>
    );
  }

  async function handleOrderClick() {
    const address = addresses.find((address) => address.isDeliveryAddress);
    if (!address) return;

    for (const bag of checkedItems) {
      const { _id, quantity, color, size } = bag;
      const totalAmount = bag.item.priceAfterDiscount * quantity;

      const data = {
        bag: _id,
        item: bag.item._id,
        address: address._id,
        totalQuantity: quantity,
        totalAmount,
        orderColor: color,
        orderSize: size,
      };

      mutate(data);
    }
  }

  // 3). If both conditions match (i.e there are items in bag and there are user addresses to show)
  if (checkedItemsLength > 0 && addresses.length > 0) {
    return (
      <Container>
        <CheckoutAddressBreadCrumb />

        <div className="mt-4 flex flex-col gap-4 px-2">
          <div className="flex flex-col gap-2">
            {addresses.map((address) => (
              <CheckoutAddressItem
                currentDeliveryAddress={currentDeliveryAddress}
                key={address._id}
                address={address}
              />
            ))}
          </div>

          <ActionButton
            onClick={() => navigate("/my-addresses")}
            btnText="Add new Address"
          />
        </div>

        {isLoading && <Spinner type="fullPageFade" />}

        <CheckoutAddressItemDesciption items={checkedItems} />

        {/* For giving margin for payment button */}
        <div className=" mb-12"></div>
        <FixedBottomButton
          onClick={handleOrderClick}
          checkedItemsLength={currentDeliveryAddress ? 1 : 0}
          btnHeading={
            !currentDeliveryAddress &&
            "Please select an address in order to continue"
          }
        />
      </Container>
    );
  }
}

function CheckoutAddressBreadCrumb() {
  return (
    <BreadCrumbNav
      showBackArrow
      navLinks={[
        { name: "My Profile", linkTo: "/my-profile", type: "link" },
        { name: "Bag", linkTo: "/my-bag", type: "link" },
      ]}
      currentPageName="Addresses"
    />
  );
}
