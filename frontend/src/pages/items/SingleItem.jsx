import { useParams } from "react-router";
import { useGetItem } from "../../hooks/useItems";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Spinner from "../../ui/Spinner";

import WishlistBtn from "../../features/wishlist/WishlistBtn";
import AddToBagBtn from "../../features/bag/AddToBagBtn";
import ReviewSummary from "../../features/reviews/ReviewSummary";
import ReviewContainer from "../../features/reviews/ReviewContainer";
import ReviewBtn from "../../features/reviews/ReviewBtn";

import { useGetItemReviews } from "../../hooks/useReviews";
import Error from "../../ui/Error";

export default function SingleItem() {
  const params = useParams();
  const queryClient = useQueryClient();
  const { data, error, isFetching } = useGetItem();
  const { data: reviews } = useGetItemReviews();

  useEffect(() => {
    queryClient.invalidateQueries(["item"]);
  }, [params.itemId]);

  if (error) return <Error error={error} />;

  if (isFetching) return <Spinner type="fullPageFade" />;

  return (
    <>
      <div className="mx-auto grid grid-cols-1 items-start gap-4 px-4 py-4 sm:px-5 md:grid-cols-2 md:px-7 lg:px-10">
        <Images data={data} />

        <div className="md:px-7">
          <IntroContainer data={data} />
          <ReviewSummary reviews={reviews} />
          <Price data={data} />
          <Size data={data} />
          <ActionButtons data={data} />
          <DeliveryContainer />
          <ProductDetails data={data} />
          {reviews?.results > 0 && <ReviewContainer reviews={reviews} />}
          <ReviewBtn data={data} reviews={reviews} />
          <OtherDetails data={data} />
          <ItemLink linkTo={data.description.visitLink} />
        </div>
      </div>
    </>
  );
}

// Images of the item
function Images({ data }) {
  return (
    <div className="grid grid-cols-2 gap-4 overflow-hidden">
      <div className="overflow-hidden">
        <img
          alt="item-image"
          className=" max-h-[546px] duration-500 hover:scale-110"
          src={`/items-images/${data.mainImageFilename}`}
        />
      </div>

      {data.extraImagesFilename?.map((img) => (
        <div className="overflow-hidden" key={img}>
          <img
            alt="item-image"
            className="max-h-[546px] duration-500 hover:scale-110"
            src={`/items-images/${img}`}
          />
        </div>
      ))}
    </div>
  );
}

// Intro container of the item
function IntroContainer({ data }) {
  return (
    <div className="mb-2">
      <h1 className="text-lg font-bold uppercase">
        {data.details.manufacturer}
      </h1>
      <h1 className="text-sm capitalize leading-snug tracking-normal text-gray-500">
        {data.name}
      </h1>
    </div>
  );
}

// Price container of the item
function Price({ data }) {
  return (
    <>
      <div className="mt-3 flex items-center gap-2">
        <h1 className="font-semibold text-gray-800">
          ₹{data.priceAfterDiscount}
        </h1>
        <h1 className="text-sm font-semibold text-gray-600 line-through">
          ₹{data.priceBeforeDiscount}
        </h1>
        <h1 className="font-medium text-orange-500">
          ({data.discountPercentage}%)
        </h1>
      </div>
      <h1 className="text-sm text-green-600">inclusive of all taxes</h1>
    </>
  );
}

// Size container of the item
function Size({ data }) {
  const sizeArr = data.description.size.split(",");
  const colorArr = data.description.color.split(",");

  return (
    <div className="mt-3">
      <Heading>Sizes available: </Heading>
      <SubHeading>You can select the size from your Bag</SubHeading>

      {sizeArr?.length && sizeArr[0] !== "" && (
        <div className="mt-2 flex gap-2 text-sm">
          {sizeArr.map((size) => (
            <p
              className="flex h-7 w-12 items-center justify-center rounded-full border border-gray-400 text-sm capitalize"
              key={size}
            >
              {size}
            </p>
          ))}
        </div>
      )}

      {colorArr?.length && colorArr[0] !== "" && (
        <div className="mt-3">
          <Heading>Colors available:</Heading>
          <SubHeading>You can select a color from your Bag</SubHeading>
          <div className="mt-1 flex gap-2">
            {colorArr.map((color) => (
              <p
                className={`mt-1 rounded-full border border-gray-400 px-3 py-0.5 text-sm capitalize`}
                key={color}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Buttons to add to bag or wishlist
function ActionButtons({ data }) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2 py-2 ">
      {/* Add to bag button */}
      <AddToBagBtn data={data} />

      {/* Wishlist button */}
      <WishlistBtn data={data} />
    </div>
  );
}

// Delivery box
function DeliveryContainer() {
  return (
    <div className="mt-5 flex flex-col gap-2">
      <Heading>Delivery details:</Heading>
      <div className="flex flex-col gap-1 text-sm font-medium leading-tight text-gray-700">
        <p>
          <i className="fa-solid fa-truck mr-2 text-lg text-pink-600"></i>
          Get it by{" "}
          <span className="font-semibold text-gray-800">Simulation only</span>
        </p>
        <p>
          <i className="fa-solid fa-hand-holding-dollar mr-2 text-lg text-pink-600"></i>
          Pay on delivery available
        </p>
        <p>
          <i className="fa-solid fa-right-left mr-2 text-lg text-pink-600"></i>
          Easy 2 days return & exchange available
        </p>
      </div>
    </div>
  );
}

// Product details / description box
function ProductDetails({ data }) {
  const instructions = data.instructions.split(".");

  return (
    <div className="mb-5 mt-3">
      <Heading>Product details:</Heading>
      <ul className="mt-1">
        {instructions.map((line, i) => (
          <li className=" text-sm leading-relaxed text-gray-700" key={i}>
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Miscelleneous details
function OtherDetails({ data }) {
  const {
    department,
    dimensions,
    countryOfOrigin,
    genericName,
    itemWeight,
    modelNumber,
    packer,
  } = data.details;

  return (
    <div className="mb-8 mt-4">
      <Heading>Other details: </Heading>
      <div className="mt-1 text-sm capitalize leading-relaxed">
        {department && <Row heading="Department: " value={department} />}
        {dimensions && <Row heading="Dimensions: " value={dimensions} />}
        {countryOfOrigin && (
          <Row heading="Manufactured in: " value={countryOfOrigin} />
        )}
        {genericName && <Row heading="Generic name: " value={genericName} />}
        {itemWeight && <Row heading="Item weight: " value={itemWeight} />}
        {modelNumber && <Row heading="Model number: " value={modelNumber} />}
        {packer && <Row heading="Seller: " value={packer} />}
      </div>
    </div>
  );
}

// Item link line
function ItemLink({ linkTo }) {
  return (
    <div className="rounded-sm bg-yellow-200 px-2 py-1.5">
      <h1 className=" text-center text-xs font-medium text-black">
        Note: This is a demo website.{" "}
        <Link
          target="_blank"
          to={linkTo}
          className="text-[#0066c0] hover:underline"
        >
          Click here{" "}
        </Link>
        for product information.
      </h1>
    </div>
  );
}

// Section heading
function Heading({ children }) {
  return <h1 className="font-semibold text-gray-900">{children}</h1>;
}

// Other details row
function Row({ heading, value }) {
  return (
    <p className="font-normal text-gray-700">
      {heading} <span className="font-semibold text-pink-600">{value}</span>
    </p>
  );
}

function SubHeading({ children }) {
  return <h1 className="-mt-0.5 text-xs text-orange-500">({children})</h1>;
}
