import ConfirmationModal from "../../ui/ConfirmationModal";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteReviewApi,
  deleteTrashReviewApi,
} from "../../services/apiReviews";
import { toast } from "react-hot-toast";

export default function DeleteReviewModal({
  reviewId,
  deleteIsOpen,
  setDeleteIsOpen,
  inTrash,
}) {
  const queryClient = useQueryClient();

  // Delete address function
  const { isLoading, mutate } = useMutation({
    mutationFn: inTrash ? deleteTrashReviewApi : deleteReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["trash-reviews"]);
      setDeleteIsOpen(false);
      toast.success("Review deleted");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  // Mutate function
  function handleDeleteReview() {
    mutate(reviewId);
  }

  return (
    <ConfirmationModal
      marginLeft
      modalHeading="Delete Confirmation"
      modalIsOpen={deleteIsOpen}
      onClose={() => setDeleteIsOpen(false)}
      modalSubHeading="Are you sure you want to delete this review?"
      buttons={[
        {
          secondaryButton: true,
          btnText: "Cancel",
          onClick: () => setDeleteIsOpen(false),
        },
        {
          secondaryButton: false,
          btnText: `${isLoading ? "deleting..." : "delete"}`,
          onClick: handleDeleteReview,
        },
      ]}
    />
  );
}
