import { useState } from "react";
import { useSelector } from "react-redux";

import Spinner from "./../../ui/Spinner";
import EmptyAddress from "../../features/address/EmptyAddress";
import AddAddressForm from "../../features/address/AddAddressForm";
import AddressContainer from "../../features/address/AddressContainer";
import ActionButton from "../../ui/ActionButton";
import BreadCrumbNav from "../../ui/BreadCrumbNav";
import Container from "../../ui/Container";

import { useGetAllAddress } from "./../../hooks/useAddress";
import { getIsLoggedIn } from "../../features/auth/authSlice";
import NotLoggedIn from "../../ui/NotLoggedIn";
import Error from "../../ui/Error";

export default function Address() {
  // Getting the address data
  const { isFetching, data: addresses, error } = useGetAllAddress();
  const isLoggedIn = useSelector(getIsLoggedIn);

  // Setting form open and close
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Function to open and close form
  function handleOpenForm() {
    setIsFormOpen((open) => !open);
  }

  // If the user is not logged in
  if (!isLoggedIn) return <NotLoggedIn currentPage="/my-addresses" />;

  // If the data is loading
  if (isFetching) return <Spinner type="fullPageFade" />;

  // If the data has been loaded but there is an error
  if (error) return <Error error={error} />;

  // If there are no address and the form is closed
  if (!addresses.data.length && !isFormOpen)
    return <EmptyAddress onClick={handleOpenForm} />;

  // If there are no address and the form is open
  if (!addresses.data.length && isFormOpen)
    return (
      <AddAddressForm isLoading={isFetching} setIsFormOpen={setIsFormOpen} />
    );

  if (addresses.data.length && isFormOpen) {
    return (
      <AddAddressForm isLoading={isFetching} setIsFormOpen={setIsFormOpen} />
    );
  }

  // If there are addresses
  return (
    <Container>
      <div className="flex flex-col gap-3">
        <BreadCrumbNav
          navLinks={[
            { name: "My Profile", linkTo: "/my-profile", type: "link" },
          ]}
          currentPageName="Addresses"
        />

        {/* Add new Address button functionality */}
        <div className="grid grid-cols-1">
          <ActionButton
            btnText="+Add new Address"
            onClick={() => {
              setIsFormOpen(true);
            }}
          />
        </div>

        {/* Whole address container */}
        <AddressContainer addresses={addresses.data} />
      </div>
    </Container>
  );
}
