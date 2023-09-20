import { Link } from "react-router-dom";

export default function OrderItem({ order }) {
  return (
    <div className="mt-3 rounded-sm bg-gray-50 px-2 py-3 shadow-xl">
      <div className="flex items-center gap-2 ">
        <img
          alt="Not delivered image"
          className="h-6"
          src="icons/not-delivered.png"
        />
        <div>
          <p className="text-sm font-semibold text-red-500">Not Delivered</p>
          <p className="text-xs leading-tight text-[#686b77]">
            Ordered on {order.orderDate}
          </p>
        </div>
      </div>

      <Link
        to={`/my-orders/${order._id}`}
        className="relative mt-2 flex gap-5 rounded-md bg-gray-100 px-2 py-2.5 shadow-sm duration-300 hover:bg-gray-200"
      >
        <i className="fa-solid fa-angle-right absolute right-8 top-1/2 -translate-y-1/2 text-xl"></i>
        <img
          className="h-20"
          alt="product-image"
          src={`items-images/${order.item.mainImageFilename}`}
        />
        <div className="flex flex-col justify-center text-sm  text-[#282c3f]">
          <h1 className="mb-1 font-semibold">
            {order.item.details.manufacturer}
          </h1>
          <h3 className="text-xs">{order.item.details.genericName}</h3>
          {order.orderSize && (
            <h3 className="text-xs">Size: {order.orderSize}</h3>
          )}
          {order.orderColor && (
            <h3 className="text-xs">Colour: {order.orderColor}</h3>
          )}
        </div>
      </Link>
    </div>
  );
}
