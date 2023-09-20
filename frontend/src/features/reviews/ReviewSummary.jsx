import { useGetItemReviews } from "../../hooks/useReviews";

export default function ReviewSummary({ reviews }) {
  const reviewsArr = reviews?.reviews;

  // If the item has no reviews
  if (reviews?.data?.results === 0) return <EmptyReview />;

  // If the items has reviews
  if (reviews?.results > 0) {
    const totalRatings = (
      reviewsArr?.reduce((acc, currReview) => {
        return currReview.stars + acc;
      }, 0) / reviewsArr?.length
    ).toFixed(1);

    return (
      <span className="rounded-sm border border-gray-300 px-2 py-1 text-sm font-medium text-gray-600">
        {totalRatings} <i className="fa-solid fa-star text-yellow-400" /> |{" "}
        {reviewsArr.length} Ratings
      </span>
    );
  }
}

function EmptyReview() {
  return (
    <h1 className="text-xs font-semibold text-pink-600">
      (There are currently no reviews for this item. To leave a review, please
      place an order for this product)
    </h1>
  );
}
