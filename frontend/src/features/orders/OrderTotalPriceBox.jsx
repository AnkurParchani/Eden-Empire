import { useState } from "react";
import BreakupModal from "./BreakupModal";

export default function OrderTotalPriceBox({ data }) {
  const [openBreakupModal, setOpenBreakupModal] = useState(false);
  const discount = data.item.priceBeforeDiscount - data.item.priceAfterDiscount;

  return (
    <div className="grid grid-cols-[1fr_auto] gap-0.5 bg-gray-50 px-3 py-3 shadow-xl">
      <div className="justify-self-start">
        <p className="text-base font-bold text-[#282c35]">Total Order Price</p>
      </div>
      <div className="justify-self-end text-base font-bold text-[#282c35]">
        <p>₹{data.totalAmount}.00</p>
      </div>

      <div className="col-span-full mb-5 flex justify-between  text-xs leading-none text-[#696e79]">
        {/* If there's discount */}
        {discount && (
          <p className="w-1/2">
            Saved{" "}
            <span className="font-bold text-[#03A685]">
              ₹{data.totalQuantity * discount}.00
            </span>{" "}
            on this order
          </p>
        )}

        {/* To open the breakup modal */}
        <p
          onClick={() => setOpenBreakupModal(true)}
          className="cursor-pointer font-semibold text-red-600 hover:underline"
        >
          View Breakup
        </p>
      </div>

      {/* the breakup modal (if is open) */}
      {openBreakupModal && (
        <BreakupModal
          openBreakupModal={openBreakupModal}
          setOpenBreakupModal={setOpenBreakupModal}
          data={data}
          conclusion="Total Paid"
          breakupHeading="Payment Information"
        />
      )}

      {/* Pay on delivery img and text */}
      <div className="col-span-full flex gap-3 bg-gray-200 px-4 py-3 text-sm">
        <img alt="pay on delivery image" src="/icons/COD.svg" />
        <p>Pay on Delivery</p>
      </div>
    </div>
  );
}
