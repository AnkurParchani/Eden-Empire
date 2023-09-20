import { useNavigate } from "react-router";
import EmptyList from "../../ui/EmptyList";

export default function EmptyOrders() {
  const navigate = useNavigate();

  return (
    <EmptyList
      iconSrc="icons/empty-orders.png"
      heading="No Orders Yet?"
      description="Start shopping to see your order history and keep track of your purchases."
      btnText="Explore Products"
      onClick={() => navigate("/")}
      hasActionButton
    />
  );
}
