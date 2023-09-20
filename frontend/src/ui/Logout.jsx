import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getShowLogout, showLogout } from "../features/auth/authSlice";
import { useNavigate } from "react-router";

import ConfirmationModal from "./ConfirmationModal";

export default function Logout() {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  const showLogoutModal = useSelector(getShowLogout);
  const navigate = useNavigate();

  const isLoading = false;

  function handleLogout() {
    removeCookie("jwt");
    removeCookie("user");
    localStorage.removeItem("showBanner");
    navigate("/");
    location.reload();
  }

  return (
    <ConfirmationModal
      modalHeading="Logout"
      modalIsOpen={showLogoutModal}
      onClose={() => dispatch(showLogout(false))}
      modalSubHeading={`Are you sure you want to logout?`}
      buttons={[
        {
          secondaryButton: true,
          btnText: "Cancel",
          onClick: () => dispatch(showLogout(false)),
        },
        {
          secondaryButton: false,
          btnText: `${isLoading ? "Logging out..." : "Logout"}`,
          onClick: () => handleLogout(),
        },
      ]}
    />
  );
}
