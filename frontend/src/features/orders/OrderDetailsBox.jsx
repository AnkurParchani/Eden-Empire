import { Link } from "react-router-dom";

export default function OrderDetailsBox({ data }) {
  return (
    <div className="mt-3 flex flex-col items-center gap-4 rounded-sm bg-gray-50 px-3 py-3 shadow-xl">
      <Link
        className="duration-200 hover:opacity-90"
        to={`/items/${data.item._id}`}
      >
        <img
          className="h-32"
          alt="product-image"
          src={`/items-images/${data.item.mainImageFilename}`}
        />
      </Link>
      <div className="flex flex-col items-center gap-1.5 text-center text-xs font-medium capitalize leading-none tracking-tight text-[#282c3f]">
        <h1 className="text-base font-bold">
          {data.item.details.manufacturer}
        </h1>
        <h1>{data.item.name}</h1>
        <h1>Generic name: {data.item.details.genericName}</h1>
        <h1>Size: {data.orderSize}</h1>
        <h1>Colour: {data.orderColor}</h1>
      </div>
      <div className="flex w-full items-center gap-2 rounded-sm bg-red-600 px-3 py-1.5 text-xs leading-none text-gray-100 ">
        <img alt="Not delivered image" className="h-5" src="/icons/box.svg" />
        <div>
          <p className="text-sm font-semibold">Not Delivered</p>
          <p className="text-xs">Ordered on: {data.orderDate}</p>
        </div>
      </div>
    </div>
  );
}
