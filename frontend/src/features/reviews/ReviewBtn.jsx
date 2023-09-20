import { useCookies } from "react-cookie";
import { useGetAllOrders } from "../../hooks/useOrders";

import ReviewFromItemForm from "./ReviewFromItemForm";
import ReviewContainerBtn from "./ReviewContainerBtn";

export default function ReviewBtn({ data, reviews }) {
  // Getting all the orders
  const [cookies] = useCookies();
  const userId = cookies.user;
  const { data: orders } = useGetAllOrders();

  let hasReviewed;
  const curItemReviewsArr = reviews?.reviews?.map((review) => review.user._id);

  if (!curItemReviewsArr || !curItemReviewsArr.includes(userId)) {
    hasReviewed = false;
  } else {
    hasReviewed = true;
  }

  // Checking if user include that order or not
  const userOrdersItemArr = orders?.data?.map((order) => order.item._id);
  const hasOrdered = userOrdersItemArr?.includes(data._id);

  if (hasOrdered && !hasReviewed)
    return <ReviewFromItemForm itemId={data._id} />;

  if (!hasOrdered && !hasReviewed && curItemReviewsArr?.length)
    return <OrderToReview />;

  if (!hasOrdered && hasReviewed) return null;

  if (hasOrdered && hasReviewed) {
    return (
      <div className="flex flex-col py-3">
        <ReviewContainerBtn disabled bgColor="bg-gray-400">
          Already reviewed
        </ReviewContainerBtn>
      </div>
    );
  }
}

function OrderToReview() {
  return (
    <div>
      <h1 className="bg-gray-100 px-2 py-2 text-center text-xs font-medium text-orange-500 shadow-md">
        We appreciate your feedback. Please purchase this item to share your
        review
      </h1>
    </div>
  );
}
