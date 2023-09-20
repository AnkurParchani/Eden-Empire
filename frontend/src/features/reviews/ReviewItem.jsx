import { Link } from "react-router-dom";
import { useState } from "react";

import ReviewStars from "./ReviewStars";
import DeleteReviewModal from "./DeleteReviewModal";
import ActionButton from "../../ui/ActionButton";
import Spinner from "../../ui/Spinner";

import { useRestoreReview } from "../../hooks/useReviews";

export default function ReviewItem({ review, inTrash }) {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const { mutate, isLoading } = useRestoreReview();

  // For trashed reviews to restore function
  function handleRestoreReview() {
    mutate(review._id);
  }

  return (
    <>
      {isLoading && <Spinner type="fullPageFade" />}

      <div className="relative mt-3 flex flex-col rounded-sm bg-gray-50 px-2 pb-3 pt-5 shadow-xl">
        <p className="absolute right-2 top-1 text-xs font-semibold tracking-tight text-gray-600">
          {review.reviewDate}
        </p>
        <div className="flex items-center gap-2 ">
          <img
            alt="user profile image"
            className="h-10 self-start rounded-full"
            src={`/user-images/${review.user.photo}`}
          />
          <div>
            <p className="text-sm font-semibold capitalize text-[#282c3f]">
              {review.user.name}
            </p>
            <ReviewStars star={review.stars} />
            <p className="mt-1 text-xs leading-tight text-[#686b77]">
              {review.review}
            </p>
          </div>
        </div>
        <Link
          to={`/items/${review.item._id}`}
          className="relative mb-2.5 mt-2 flex gap-5 rounded-md bg-gray-100 px-2 py-2.5 shadow-sm duration-300 hover:bg-gray-200"
        >
          <i className="fa-solid fa-angle-right absolute right-8 top-1/2 -translate-y-1/2 text-xl"></i>
          <img
            className="h-20"
            alt="product-image"
            src={`items-images/${review.item.mainImageFilename}`}
          />
          <div className="flex flex-col justify-center text-sm capitalize text-[#282c3f]">
            <h1 className="font-semibold">
              {review.item.details.manufacturer}
            </h1>
            <h3 className="text-xs">{review.item.details.genericName}</h3>
          </div>
        </Link>

        {inTrash && (
          <div className="grid grid-cols-2 ">
            <ActionButton
              noBorderTop
              btnText="Restore"
              onClick={handleRestoreReview}
            />
            <ActionButton
              noBorderTop
              btnText="Delete"
              onClick={() => setDeleteIsOpen(true)}
            />
          </div>
        )}

        {!inTrash && (
          <ActionButton
            noBorderTop
            btnText="Delete"
            onClick={() => setDeleteIsOpen(true)}
          />
        )}

        {/* If Delete Address */}
        {deleteIsOpen && (
          <DeleteReviewModal
            inTrash={inTrash}
            reviewId={review._id}
            deleteIsOpen={deleteIsOpen}
            setDeleteIsOpen={setDeleteIsOpen}
          />
        )}
      </div>
    </>
  );
}
