export default function OrderUpdateSentToBox({ data }) {
  return (
    <div className="flex flex-col gap-3 bg-gray-50 px-3 py-3 shadow-lg">
      <p className="text-base font-bold text-[#282c35]">Updates sent to</p>
      <p className="text-sm text-[#696e79]">
        <i className="fa-solid fa-phone mr-2" />
        {data.address.phoneNumber}
      </p>
      <p className="text-sm text-[#696e79]">
        <i className="fa-regular fa-envelope mr-2 " />
        {data.user.email}
      </p>
    </div>
  );
}
