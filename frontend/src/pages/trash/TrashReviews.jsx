import { useSelector } from "react-redux";

import Spinner from "./../../ui/Spinner";
import BreadCrumbNav from "../../ui/BreadCrumbNav";
import Container from "../../ui/Container";
import ReviewItem from "../../features/reviews/ReviewItem";

import EmptyReviews from "../../features/reviews/EmptyReviews";
import NotLoggedIn from "./../../ui/NotLoggedIn";

import { useGetAllTrashReviews } from "../../hooks/useReviews";
import { getIsLoggedIn } from "../../features/auth/authSlice";
import Error from "../../ui/Error";

export default function TrashReviews() {
  // Getting the address data
  const { isFetching, data: reviews, error } = useGetAllTrashReviews();
  const isLoggedIn = useSelector(getIsLoggedIn);

  if (!isLoggedIn) return <NotLoggedIn currentPage="/trash-reviews" />;

  // If the data has been loaded but there is an error
  if (error) return <Error error={error} />;

  // If there are no address and the form is closed
  if (!reviews?.data?.length) return <EmptyReviews inTrash />;

  // If there are reviews
  return (
    <Container>
      {isFetching && <Spinner type="fullPageFade" />}
      <div className="flex flex-col gap-3">
        <BreadCrumbNav
          navLinks={[
            { name: "Settings", linkTo: "/settings", type: "link" },
            { name: "Trash", linkTo: "/trash", type: "link" },
          ]}
          currentPageName="Reviews"
        />

        {reviews.data.map((review) => (
          <ReviewItem inTrash key={review._id} review={review} />
        ))}
      </div>
    </Container>
  );
}
