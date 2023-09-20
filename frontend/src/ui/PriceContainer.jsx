export default function PriceContainer({
  discountPercentage,
  discountedPrice,
  originalPrice,
}) {
  return (
    <div className="mb-3 flex items-center justify-center gap-1.5 ">
      <p className=" text-sm font-semibold text-gray-900">
        Rs.{discountedPrice}
      </p>

      <p className="text-xs text-gray-600 line-through">Rs.{originalPrice}</p>

      {discountPercentage && (
        <p className=" text-xs font-semibold text-pink-500">
          ({discountPercentage}% OFF)
        </p>
      )}
    </div>
  );
}
