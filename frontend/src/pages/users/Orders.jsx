import { useSelector } from "react-redux";

import EmptyOrders from "../../features/orders/EmptyOrders";
import OrderItem from "../../features/orders/OrderItem";
import BreadCrumbNav from "../../ui/BreadCrumbNav";
import Container from "../../ui/Container";
import Heading from "../../ui/Heading";

import { useGetAllOrders } from "../../hooks/useOrders";
import { getIsLoggedIn } from "../../features/auth/authSlice";
import NotLoggedIn from "../../ui/NotLoggedIn";
import Error from "../../ui/Error";

export default function Orders() {
  const { data: orders, error } = useGetAllOrders();
  const isLoggedIn = useSelector(getIsLoggedIn);

  if (error) return <Error error={error} />;

  if (!isLoggedIn) return <NotLoggedIn currentPage="/my-orders" />;

  return (
    <Container>
      <BreadCrumbNav
        navLinks={[{ name: "My Profile", linkTo: "/my-profile", type: "link" }]}
        currentPageName="Orders"
      />

      {/* When the data has loaded but is empty */}
      {orders && !orders.results && <EmptyOrders />}

      {/* When the data has loaded and has orders */}
      {orders && orders.results > 0 && (
        <div className="mt-4 capitalize">
          <Heading noMarginBottom>My Orders</Heading>

          {orders.data.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      )}
    </Container>
  );
}
