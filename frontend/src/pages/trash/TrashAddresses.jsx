import { useSelector } from "react-redux";

import { useGetAllTrashAddress } from "./../../hooks/useAddress";
import Spinner from "./../../ui/Spinner";
import EmptyAddress from "../../features/address/EmptyAddress";
import AddressContainer from "../../features/address/AddressContainer";
import BreadCrumbNav from "../../ui/BreadCrumbNav";
import Container from "../../ui/Container";
import NotLoggedIn from "./../../ui/NotLoggedIn";

import { getIsLoggedIn } from "./../../features/auth/authSlice";
import Error from "../../ui/Error";

export default function TrashAddresses() {
  // Getting the address data
  const { isFetching, data: addresses, error } = useGetAllTrashAddress();
  const isLoggedIn = useSelector(getIsLoggedIn);

  if (!isLoggedIn) return <NotLoggedIn currentPage="/trash-addresses" />;

  // If the data is loading
  if (isFetching) return <Spinner type="fullPageFade" />;

  // If the data has been loaded but there is an error
  if (error) return <Error error={error} />;

  // If there are no address and the form is closed
  if (!addresses.data.length) return <EmptyAddress inTrash />;

  // If there are addresses
  return (
    <Container>
      <div className="flex flex-col gap-3">
        <BreadCrumbNav
          navLinks={[
            { name: "Settings", linkTo: "/settings", type: "link" },

            { name: "Trash", linkTo: "/trash", type: "link" },
          ]}
          currentPageName="Addresses"
        />

        <AddressContainer inTrash addresses={addresses.data} />
      </div>
    </Container>
  );
}
