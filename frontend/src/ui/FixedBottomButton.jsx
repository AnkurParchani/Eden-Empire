import { useNavigate } from "react-router";

export default function OrderButton({
  checkedItemsLength,
  btnHeading,
  onClick,
}) {
  return (
    <div className=" fixed inset-x-0 bottom-0 flex flex-col bg-white px-1.5 py-3 text-center text-xs">
      <h1 className="mb-1.5 bg-[#fff6f4] py-1.5 font-semibold text-[#282c3f]">
        {btnHeading}
      </h1>

      <button
        onClick={onClick}
        disabled={!checkedItemsLength}
        className={`rounded ${
          !checkedItemsLength ? "bg-gray-400" : "bg-[#ff3f6c]"
        } py-2.5 text-sm font-semibold uppercase tracking-wider text-white duration-100 ${
          checkedItemsLength && "hover:bg-[#be2649]"
        }`}
      >
        Place order
      </button>
    </div>
  );
}
