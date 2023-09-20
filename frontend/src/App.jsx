import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout";

import Items from "./pages/items/Items";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminPanel from "./pages/auth/AdminPanel";
import ChangeRole from "./pages/auth/ChangeRole";
import MyProfile from "./pages/users/MyProfile";
import Address from "./pages/users/Address";
import AddItem from "./pages/items/AddItem";
import AddColorItem from "./pages/items/AddColorItem";
import PageNotFound from "./pages/extras/PageNotFound";
import Orders from "./pages/users/Orders";
import Order from "./pages/users/Order";
import Reviews from "./pages/users/Reviews";
import NotImplemented from "./ui/NotImplemented";
import Settings from "./pages/users/Settings";
import ChangePassword from "./pages/auth/ChangePassword";
import EditProfile from "./pages/users/EditProfile";
import DeleteAccount from "./pages/auth/DeleteAccount";
import MyWishlist from "./pages/users/MyWishlist";
import MyBag from "./pages/users/MyBag";
import Trash from "./pages/trash/Trash";
import TrashAddresses from "./pages/trash/TrashAddresses";
import TrashReviews from "./pages/trash/TrashReviews";
import CheckoutAddress from "./pages/extras/CheckoutAddress";
import Payment from "./pages/extras/Payment";
import CookiesConsentBanner from "./features/others/CookiesConsentBanner";
import SingleItem from "./pages/items/SingleItem";
import Policy from "./pages/auth/Policy";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route
                index
                element={
                  <>
                    <Items />
                    <CookiesConsentBanner />
                  </>
                }
              />
              <Route path="/items/:itemId" element={<SingleItem />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/change-role" element={<ChangeRole />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/trash" element={<Trash />} />
              <Route path="/delete-account" element={<DeleteAccount />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/my-orders" element={<Orders />} />
              <Route path="/my-orders/:orderId" element={<Order />} />
              <Route path="/my-reviews" element={<Reviews />} />
              <Route path="/my-addresses" element={<Address />} />
              <Route path="/trash-addresses" element={<TrashAddresses />} />
              <Route path="/trash-reviews" element={<TrashReviews />} />
              <Route path="/my-bag" element={<MyBag />} />
              <Route path="/checkout/address" element={<CheckoutAddress />} />
              <Route path="/my-wishlist" element={<MyWishlist />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/privacy-policy" element={<Policy />} />
              <Route path="/not-implemented" element={<NotImplemented />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/add-item-color" element={<AddColorItem />} />

            {/* If there are no pages */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
