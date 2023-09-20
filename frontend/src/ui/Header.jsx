import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import ShowSearchItems, {
  NoItemsFound,
} from "../features/others/ShowSearchItems";
import CloseBtn from "./CloseBtn";

import { getHeaderItems } from "../features/item/itemSlice";
import { getIsLoggedIn, setPreviousPage } from "../features/auth/authSlice";
import { useGetMyBag } from "./../hooks/useBag";
import { searchItems } from "../../utils/helper";

export default function Header() {
  const [searchItemsList, setSearchItemsList] = useState([]);
  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const searchInputRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const items = useSelector(getHeaderItems);

  const { data: bagData } = useGetMyBag();
  const itemsInBag = bagData?.results;

  // Manufacturing of a header item
  function headerItem(items) {
    const foundItems = items.map((item) => {
      const { mainImageFilename, _id } = item.item;

      return {
        img: mainImageFilename,
        linkTo: _id,
        searchValue: item.searchValue,
        matched: item.matchedProperties.map((matched) => {
          return {
            key: matched,
            value: item.item[matched] || item.item.details[matched],
          };
        }),
      };
    });

    setSearchItemsList(foundItems);
  }

  // The search funcitonality
  function handleSearch(e) {
    const { value } = e.target;

    if (value.length) {
      setShowCloseBtn(true);
    } else {
      setShowCloseBtn(false);
    }

    if (value.length >= 3) {
      const filteredItems = searchItems(value, items);
      headerItem(filteredItems);
    } else {
      setSearchItemsList([]);
    }
  }

  // Closing the whole search
  function clearSearch() {
    searchInputRef.current.value = null;
    setSearchItemsList([]);
    setShowCloseBtn(false);
  }

  return (
    <div className="bg-pink-200">
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto_auto] justify-center gap-3 bg-pink-200 px-2.5 py-2">
        <div className="relative">
          <div className="flex items-center">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Enter your search criteria (e.g., Item, Generic name, Manufacturer, Seller)"
              onChange={handleSearch}
              className="w-full rounded-sm bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-700 outline-none lg:text-sm"
            />

            {showCloseBtn && (
              <CloseBtn
                onClick={clearSearch}
                className="bg-gray-50 px-1 py-1 text-gray-600 sm:text-sm"
              />
            )}
          </div>

          {searchItemsList.length > 0 && (
            <ShowSearchItems
              handleClose={clearSearch}
              items={searchItemsList}
            />
          )}

          {searchInputRef.current?.value?.length > 2 &&
            searchItemsList.length === 0 && <NoItemsFound />}
        </div>

        {/* If the user is logged in */}
        {isLoggedIn && (
          <>
            <i
              className="fa-solid fa-heart cursor-pointer text-xl text-red-600 duration-100 hover:text-red-700"
              onClick={() => {
                dispatch(setPreviousPage(location.pathname));
                navigate("/my-wishlist");
              }}
            />
            <div className="relative">
              <i
                className="fa-solid fa-lock cursor-pointer text-xl text-pink-500 duration-100 hover:text-pink-600"
                onClick={() => {
                  dispatch(setPreviousPage(location.pathname));
                  navigate("/my-bag");
                }}
              />

              {/* When there are items in bag */}
              {itemsInBag > 0 && (
                <p className="absolute -right-2 top-0 h-4 w-4 rounded-full bg-red-600 text-center text-xs font-medium text-white">
                  {itemsInBag}
                </p>
              )}
            </div>
          </>
        )}

        {/* If user is not logged in */}
        {!isLoggedIn && (
          <div className="flex items-center gap-3">
            <img
              alt="sign-in img"
              src="/icons/signup.png"
              className=" h-5 cursor-pointer"
              onClick={() => navigate("/signup")}
            />
            <i
              className="fa-solid fa-right-to-bracket cursor-pointer text-xl text-orange-700 duration-100 hover:text-orange-800"
              onClick={() => navigate("/login")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
