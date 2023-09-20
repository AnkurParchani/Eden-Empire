import { useSelector } from "react-redux";

import EmptyReviews from "../../features/reviews/EmptyReviews";
import BreadCrumbNav from "../../ui/BreadCrumbNav";
import Container from "../../ui/Container";
import Heading from "./../../ui/Heading";
import ReviewItem from "../../features/reviews/ReviewItem";

import { useGetAllReviews } from "../../hooks/useReviews";
import { getIsLoggedIn } from "../../features/auth/authSlice";
import NotLoggedIn from "../../ui/NotLoggedIn";
import Error from "../../ui/Error";

export default function Reviews() {
  const { data: reviews, error } = useGetAllReviews("profile");
  const isLoggedIn = useSelector(getIsLoggedIn);

  if (error) return <Error error={error} />;

  if (!isLoggedIn) return <NotLoggedIn currentPage="/my-reviews" />;

  return (
    <Container>
      <BreadCrumbNav
        navLinks={[{ name: "My Profile", linkTo: "/my-profile", type: "link" }]}
        currentPageName="Reviews"
      />

      {/* When the data has loaded but is empty */}
      {reviews && !reviews.results && <EmptyReviews />}

      {/* When the data has loaded and has reviews */}
      {reviews && reviews.results > 0 && (
        <div className="mt-4">
          <Heading noMarginBottom>My Reviews</Heading>
          {reviews.data.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      )}
    </Container>
  );
}
