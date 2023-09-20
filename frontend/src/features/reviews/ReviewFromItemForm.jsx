import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddReview } from "../../hooks/useReviews";

import Container from "../../ui/Container";
import ActionFormTemplate from "../../ui/ActionFormTemplate";
import ActionForm from "../../ui/ActionForm";
import ReviewContainerBtn from "./ReviewContainerBtn";

export default function ReviewFromItemForm({ itemId }) {
  const { register, handleSubmit } = useForm();
  const [showAddReview, setShowAddReview] = useState(false);
  const { mutate, isLoading } = useAddReview();

  function onSubmit(data) {
    const dataToSend = { ...data, item: itemId };
    mutate(dataToSend);
  }

  const inputFields = [
    // Normal inputs
    {
      field: "Review",
      type: "textarea",
      registerName: "review",
      noCapitalize: true,
    },
    {
      field: "Stars",
      type: "select",
      registerName: "stars",

      selectOptions: Array.from({ length: 5 }, (_, i) => {
        return { name: String(i + 1), value: String(i + 1) };
      }),
    },
  ];

  return (
    <div>
      {showAddReview ? (
        <Container>
          <ActionFormTemplate>
            <ActionForm
              formHeading="Add Review"
              isLoading={isLoading}
              showCancelButton={true}
              btnOnClick={() => setShowAddReview(false)}
              inputs={inputFields}
              notLoadingText="Add"
              onSubmit={onSubmit}
              register={register}
              handleSubmit={handleSubmit}
              isLoadingText="adding..."
            />
          </ActionFormTemplate>
        </Container>
      ) : (
        <div className="mb-5 flex flex-col gap-3 bg-gray-100 px-1.5 py-2 text-xs shadow-md">
          <h1 className="text-center font-semibold text-gray-700">
            Your Review Matters: Share Your Product Insights
          </h1>

          <ReviewContainerBtn
            onClick={() => setShowAddReview(true)}
            hoverBgColor="hover:bg-orange-600"
            bgColor="bg-orange-500"
            disabled={false}
          >
            Add a review
          </ReviewContainerBtn>
        </div>
      )}
    </div>
  );
}
