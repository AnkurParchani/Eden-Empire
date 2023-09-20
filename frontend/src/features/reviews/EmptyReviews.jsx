import { useNavigate } from "react-router";
import EmptyList from "../../ui/EmptyList";

export default function EmptyReviews({ inTrash }) {
  const navigate = useNavigate();

  return (
    <div>
      {inTrash ? (
        <EmptyList
          iconSrc="/icons/empty-reviews.png"
          heading="No Reviews in Trash"
          description="No reviews currently in the trash. Deleted reviews find their place here"
          btnText="View my orders"
        />
      ) : (
        <EmptyList
          iconSrc="/icons/empty-reviews.png"
          heading="No Reviews Yet..."
          description="Review the items you've ordered and help others with your valuable feedback"
          btnText="View my orders"
          onClick={() => navigate("/my-orders")}
          hasActionButton
        />
      )}
    </div>
  );
}
