import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../../ui/Container";
import BreadCrumbNav from "../../ui/BreadCrumbNav";
import DefaultAddress from "../../features/address/DefaultAddress";
import EmptyBag from "../../features/bag/EmptyBag";
import BagItem from "../../features/bag/BagItem";
import BagSummary from "../../features/bag/BagSummary";
import FixedBottomButton from "./../../ui/FixedBottomButton";

import MoreFromWishlist from "../../features/bag/MoreFromWishlist";
import ToggleAll from "../../features/bag/ToggleAll";
import NotLoggedIn from "../../ui/NotLoggedIn";
import Error from "../../ui/Error";

import { getIsLoggedIn } from "../../features/auth/authSlice";
import { useGetMyBag } from "../../hooks/useBag";
import { useGetAllAddress } from "../../hooks/useAddress";
import {
  addItem,
  getCheckedItemsLength,
  getTotalPriceAfterDiscount,
} from "../../features/bag/bagSlice";

export default function MyBag() {
  // Navigator
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn);

  // Checked items length
  const checkedItemsLength = useSelector(getCheckedItemsLength);
  // Setting the order button text and heading
  const btnHeading =
    checkedItemsLength === 0
      ? "No item selected, select at least one item to place order."
      : `${checkedItemsLength} ${
          checkedItemsLength === 1 ? "item" : "items"
        } selected for order`;

  // Getting total price (after discount)
  const totalPriceAfterDiscount = useSelector(getTotalPriceAfterDiscount);

  // Getting address data
  const { data: addressesData, error: getAddressError } = useGetAllAddress();

  // Getting the bag data
  const {
    data: bagData,
    isFetching: getBagIsFetching,
    error: getBagError,
  } = useGetMyBag();

  // All bag items
  const bagItems = bagData?.data?.list;

  // Adding all checked items to the bag state
  useEffect(() => {
    if (bagItems) {
      const itemsToAdd = bagItems.filter((item) => item.isChecked);
      dispatch(addItem(itemsToAdd));
    }
  }, [bagItems, dispatch]);

  if (!isLoggedIn) return <NotLoggedIn currentPage="/my-bag" />;
  // If Error found in getting the bag
  if (getBagError || getAddressError) return <Error error={getBagError} />;

  // Main Variables
  const hasItemsInBag = bagItems?.length > 0;
  const hasItemsInAddress = addressesData?.data?.length > 0;

  return (
    <Container>
      <BreadCrumbNav
        showBackArrow
        navLinks={[{ name: "My Profile", linkTo: "/my-profile", type: "link" }]}
        currentPageName="Bag"
      />

      {/* When the bag data has loaded but it empty */}
      {bagData && !hasItemsInBag && !getBagIsFetching && <EmptyBag />}

      {/* When the address data has loaded */}
      {bagData && hasItemsInBag && addressesData && hasItemsInAddress && (
        <DefaultAddress address={addressesData.data[0]} />
      )}

      {/* Toggle all checkbox */}
      <ToggleAll
        checkedItemsLength={checkedItemsLength}
        totalItemsLength={bagItems?.length}
        totalPriceAfterDiscount={totalPriceAfterDiscount}
      />

      {/* When the address data has loaded */}
      {bagData && hasItemsInBag && (
        <>
          <div className="mt-1 flex flex-col gap-3">
            {bagItems.map((item) => (
              <BagItem key={item._id} item={item} />
            ))}
          </div>

          <MoreFromWishlist />

          <BagSummary
            checkedItemsLength={checkedItemsLength}
            totalPriceAfterDiscount={totalPriceAfterDiscount}
          />

          {/* For giving margin for order button */}
          <div className=" mb-20"></div>

          <FixedBottomButton
            btnHeading={btnHeading}
            checkedItemsLength={checkedItemsLength}
            onClick={() => navigate("/checkout/address")}
          />
        </>
      )}
    </Container>
  );
}
