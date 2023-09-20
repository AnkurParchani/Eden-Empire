import { useSelector } from "react-redux";

import {
  getBag,
  getCheckedItemsLength,
  getTotalPriceAfterDiscount,
  getTotalPriceBeforeDiscount,
} from "./bagSlice";

function PriceSummaryRow({ children }) {
  return <div className="flex justify-between">{children}</div>;
}

export default function BagSummary({
  checkedItemsLength,
  totalPriceAfterDiscount,
}) {
  // Total bag prices (before discount)
  const totalPriceBeforeDiscount = useSelector(getTotalPriceBeforeDiscount);

  // JSX
  return (
    <div className="mt-5 bg-gray-50 px-1 py-3 capitalize shadow-md">
      <h1 className="text-xs font-bold uppercase text-gray-800">
        Price Details{" "}
        <span className="capitalize">
          ({checkedItemsLength} {checkedItemsLength > 1 ? "items" : "item"})
        </span>
      </h1>

      <div className="mt-2 flex flex-col gap-2 border-t border-gray-300 pt-2 text-sm font-medium text-[#282c3f]">
        <PriceSummaryRow>
          <p>Total MRP</p>
          <p>₹{totalPriceBeforeDiscount}</p>
        </PriceSummaryRow>
        {checkedItemsLength > 0 && (
          <PriceSummaryRow>
            <p>Discount</p>
            <p className="text-[#03A685]">
              -₹{totalPriceBeforeDiscount - totalPriceAfterDiscount}
            </p>
          </PriceSummaryRow>
        )}
      </div>
      <div className="mt-2 border-t border-gray-300 pt-1.5 text-sm font-bold text-gray-800">
        <PriceSummaryRow>
          <p>Total Amount</p>
          <p>₹{totalPriceAfterDiscount}</p>
        </PriceSummaryRow>
      </div>
    </div>
  );
}
