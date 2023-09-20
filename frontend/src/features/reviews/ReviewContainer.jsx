import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReviewStars from "./ReviewStars";

export default function ReviewContainer({ reviews }) {
  const reviewsArr = reviews?.reviews;

  return (
    <div className="mt-3">
      <h1 className="mb-2 font-semibold text-gray-900">Product reviews:</h1>
      <Carousel
        showThumbs={false}
        showIndicators={false}
        autoPlay
        transitionTime={1000}
        infiniteLoop
        showStatus={false}
        interval={5000}
      >
        {reviewsArr?.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </Carousel>
    </div>
  );
}

function ReviewItem({ review }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 rounded-sm bg-gray-100 px-4 pb-3 pt-5">
      <img
        className="h-10 rounded-full"
        alt="user image"
        src={`/user-images/${review.user.photo}`}
      />
      <div className="text-start">
        <h1 className="text-sm font-semibold capitalize leading-tight text-gray-800">
          {review.user.name}
        </h1>
        <h1 className="mb-0.5 text-xs font-medium text-gray-600">
          {review.user.email}
        </h1>
        <ReviewStars star={review.stars} />
        <h1 className="mt-1 text-sm font-normal">{review.review}</h1>
      </div>
    </div>
  );
}
