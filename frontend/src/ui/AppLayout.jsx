import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useIsFetching } from "@tanstack/react-query";

import MySideNav from "../features/nav/MySideNav";
import Header from "./../ui/Header";
import Footer from "./../ui/Footer";
import Spinner from "./Spinner";
import Logout from "./Logout";

import { useGetUser } from "../hooks/useUser";
import { useGetEveryItem } from "../hooks/useItems";
import {
  changeIsLoggedIn,
  changeRole,
  getShowLogout,
} from "../features/auth/authSlice";
import { addHeaderItems } from "../features/item/itemSlice";

export default function AppLayout() {
  const { data: userData } = useGetUser();
  const { data: items } = useGetEveryItem();

  const isFetching = useIsFetching();
  const location = useLocation();
  const dispatch = useDispatch();
  const showLogout = useSelector(getShowLogout);

  // Setting the user role and isLoggedIn state
  useEffect(() => {
    if (userData && userData?.isLoggedIn) {
      dispatch(changeRole(userData?.role));
      dispatch(changeIsLoggedIn(true));
    } else {
      dispatch(changeIsLoggedIn(false));
    }
  }, [dispatch, userData]);

  // Setting the items
  useEffect(() => {
    dispatch(addHeaderItems(items));
  }, [items, dispatch]);

  // Specifying all the paths user should not see certain things
  const hideMySideNavPaths = ["/my-bag", "/checkout/address", "/payment"];
  const hideHeaderPaths = [
    "/my-bag",
    "/checkout/address",
    "/payment",
    "/delete-account",
  ];
  const hideFooterPaths = ["/my-bag", "/payment", "/delete-account"];

  // Creating a boolean for all of them
  let hideMySideNav = hideMySideNavPaths.includes(location.pathname);
  let hideHeader = hideHeaderPaths.includes(location.pathname);
  let hideFooter = hideFooterPaths.includes(location.pathname);

  if (location.pathname.startsWith("/my-orders/")) {
    hideMySideNav = true;
  }

  return (
    <>
      {!hideMySideNav && <MySideNav />}
      <div
        className={`${!hideMySideNav ? "ml-16" : "ml-0"} ${
          isFetching ? "pointer-events-none" : ""
        } flex min-h-screen flex-col`}
      >
        {!hideHeader && <Header />}

        {showLogout && <Logout />}

        <div className="relative z-20 min-h-[93vh] flex-1">
          {isFetching > 0 && <Spinner type="fullPageFade" />}
          <Outlet />
        </div>

        <div className="shrink-0">{!hideFooter && <Footer />}</div>
      </div>
    </>
  );
}
