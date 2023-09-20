import React from "react";

function BreakupRow({ children, isConclusion }) {
  return (
    <div
      className={`flex ${
        isConclusion && "mt-3 border-t border-gray-500"
      } items-center justify-between py-2 text-sm font-semibold`}
    >
      {children}
    </div>
  );
}

export default function BreakupModal({
  data,
  openBreakupModal,
  conclusion,
  setOpenBreakupModal,
  breakupHeading,
}) {
  const discount = data.item.priceBeforeDiscount - data.item.priceAfterDiscount;

  return (
    <>
      {openBreakupModal && (
        <div
          className="fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-50"
          onClick={() => setOpenBreakupModal(false)}
        ></div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 rounded-sm bg-gray-100 px-3 pt-2 sm:bottom-auto sm:left-1/2 sm:top-1/2  sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:pb-5">
        <div className="absolute right-3 top-2 text-xl">
          <i
            className="fa-solid fa-xmark"
            onClick={() => setOpenBreakupModal(false)}
          />
        </div>
        <div className="mt-4">
          <BreakupRow>
            <h1 className="text-base font-semibold text-gray-800">
              {breakupHeading}
            </h1>
            <img
              className="h-16 rounded-full"
              alt="item-image"
              src={`/items-images/${data.item.mainImageFilename}`}
            />
          </BreakupRow>

          <BreakupRow>
            <h2 className=" text-gray-500">Total Quantity</h2>
            <p>{String(data.totalQuantity).padStart(2, "0")}</p>
          </BreakupRow>

          <BreakupRow>
            <h2 className="text-gray-500">MRP</h2>
            <p>₹{data.item.priceBeforeDiscount * data.totalQuantity}.00</p>
          </BreakupRow>

          <BreakupRow>
            <h2 className="text-gray-500">Total Discount</h2>
            <p className="text-green-600">
              ₹{discount * data.totalQuantity}.00
            </p>
          </BreakupRow>

          <BreakupRow isConclusion>
            <h2 className="font-bold">{conclusion}</h2>
            <p className="font-bold">₹{data.totalAmount}.00</p>
          </BreakupRow>
        </div>
      </div>
    </>
  );
}
