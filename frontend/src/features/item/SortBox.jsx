import { useLocation, useNavigate } from "react-router-dom";

import OverlayClick from "../../ui/OverlayClick";
import CloseBtn from "../../ui/CloseBtn";

export default function SortBox({ isOpenSort, setIsOpenSort }) {
  function handleClick() {
    setIsOpenSort(false);
  }

  return (
    <>
      {isOpenSort && <OverlayClick onClick={handleClick} />}

      <div className="fixed bottom-0 left-16 right-0 z-50 flex  flex-col gap-2 bg-gray-300 px-2 pb-3 pt-1">
        <div className="pr-1 text-end text-lg">
          <CloseBtn onClick={handleClick} />
        </div>

        <SortLink sortBy="-priceAfterDiscount">Price: High to low</SortLink>
        <SortLink sortBy="priceAfterDiscount">Price: Low to high</SortLink>
        <SortLink sortBy="-discountPercentage">Discount: High to low</SortLink>
        <SortLink sortBy="discountPercentage">Discount: Low to high</SortLink>
        <SortLink sortBy={null}>None</SortLink>
      </div>
    </>
  );
}

function SortLink({ children, sortBy }) {
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(location.search);
  const hasSort = urlSearchParams.get("sort");

  function handleChangeUrl() {
    // Getting sort from the url (if present)

    // If the url already has sort then deleting it
    if (hasSort) urlSearchParams.delete("sort");

    // Adding sort to the url
    urlSearchParams.set("sort", sortBy);

    // If sortBy none selected by the user
    if (!sortBy) urlSearchParams.delete("sort");

    // Getting the whole urlSearchString and appending it to location.search
    const sortByString = urlSearchParams.toString();
    location.search = `?${sortByString}`;

    // navigating the user
    navigate(location.search);
  }

  return (
    <button
      onClick={handleChangeUrl}
      className={`duration-50 rounded-sm bg-gray-100 py-1.5 text-center hover:text-gray-900 ${
        hasSort === sortBy ? "text-pink-600" : "text-gray-500"
      } text-sm font-medium shadow-sm`}
    >
      {children}
    </button>
  );
}
