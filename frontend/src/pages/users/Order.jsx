import { useParams } from "react-router";
import { useGetOrder } from "../../hooks/useOrders";

import PageNotFound from "../extras/PageNotFound";
import Container from "../../ui/Container";
import BreadCrumbNav from "../../ui/BreadCrumbNav";
import OrderDetailsBox from "../../features/orders/OrderDetailsBox";
import OrderAddressBox from "../../features/orders/OrderAddressBox";
import OrderInvoiceBox from "../../features/orders/OrderInvoiceBox";
import OrderTotalPriceBox from "../../features/orders/OrderTotalPriceBox";
import OrderUpdateSentToBox from "../../features/orders/OrderUpdateSentToBox";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";

export default function Order() {
  const { orderId } = useParams();

  const { isFetching, data, error } = useGetOrder(orderId);

  if (isFetching) return <Spinner type="fullPageFade" />;

  // If invalid orderId
  if (
    error &&
    (error.message === "Invalid order ID provided" ||
      error.message === "No order found")
  ) {
    return <PageNotFound />;
  }

  // Other errors
  if (error) return <Error error={error} />;

  return (
    <Container>
      <BreadCrumbNav
        navLinks={[
          { name: "My Account", linkTo: "/my-profile", type: "link" },
          { name: "Orders", type: "link", linkTo: "/my-orders" },
        ]}
        currentPageName={data.item.details.genericName}
      />
      <div className="flex flex-col gap-5">
        <OrderDetailsBox data={data} />
        <OrderAddressBox data={data} />
        <OrderTotalPriceBox data={data} />
        <OrderInvoiceBox data={data} />
        <OrderUpdateSentToBox data={data} />
      </div>
    </Container>
  );
}
