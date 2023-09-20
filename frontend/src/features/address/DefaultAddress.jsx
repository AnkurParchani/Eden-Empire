export default function DefaultAddress({ address }) {
  return (
    <div className="mt-2 flex flex-col gap-1 rounded-sm  px-2 py-3 shadow-md">
      <h1 className="text-sm text-gray-600">
        Deliver to:{" "}
        <span className="font-semibold capitalize text-black">
          {address.fullName}, {address.pincode}
        </span>
      </h1>
      <h1 className="text-xs capitalize leading-tight text-gray-500">
        {address.flatNumber}, {address.flatArea}, {address.city}
      </h1>
      <div className="mt-2 flex rounded-sm bg-yellow-100 px-1.5 py-1.5 text-xs font-semibold leading-tight text-yellow-600">
        <i className="fa-solid fa-triangle-exclamation mr-1 text-xs" />
        <p className="">You can change your address on the next page</p>
      </div>
    </div>
  );
}
