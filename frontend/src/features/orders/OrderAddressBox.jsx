export default function OrderAddressBox({ data }) {
  return (
    <div className="flex flex-col gap-3 rounded-sm bg-gray-50 px-3 py-3 shadow-xl">
      <h1 className="text-base font-bold text-[#282c35]">Delivery Address</h1>
      <div className="text-[#282c3f]">
        <h1 className="mb-2 text-sm font-semibold capitalize">
          {data.address.fullName} <span className="text-[#696e79]">|</span>{" "}
          {data.address.phoneNumber}
        </h1>
        <h1 className="text-xs capitalize leading-normal text-[#696e79]">
          {data.address.flatNumber} {data.address.flatArea}, {data.address.city}{" "}
          {data.address.state}, {data.address.state}-{data.address.pincode}
        </h1>
      </div>
    </div>
  );
}
