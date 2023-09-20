import { useDispatch, useSelector } from "react-redux";

import Container from "./../../ui/Container";
import ActionBox from "../../ui/ActionBox";
import Heading from "../../ui/Heading";

import {
  getIsLoggedIn,
  setPreviousPage,
  showLogout,
} from "../../features/auth/authSlice";
import Warning from "../../ui/Warning";
import { Link } from "react-router-dom";

export default function Settings() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <Container>
      {/* Relative for opacity */}
      <Heading textPink>Settings</Heading>

      {!isLoggedIn && (
        <Warning>
          To access these features, please{" "}
          <Link
            onClick={() => dispatch(setPreviousPage("/settings"))}
            to="/login"
            className="text-[#0066c0] hover:underline"
          >
            Login
          </Link>
        </Warning>
      )}

      <div className="relative">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 ">
          {/* Add this line to cover the links */}
          {!isLoggedIn && (
            <div className=" absolute left-0 top-0 h-full w-full bg-gray-800 bg-opacity-30" />
          )}

          <ActionBox
            iconSrc="icons/my-profile.png"
            actionText="Edit Profile"
            actionDescription="Refine your profile details here"
            linkTo="/edit-profile"
          />
          <ActionBox
            iconSrc="icons/change-password.png"
            actionText="Change Password"
            actionDescription="Change password of your account"
            linkTo="/change-password"
          />
          <ActionBox
            iconSrc="icons/admin-key.png"
            actionText="Role Update"
            actionDescription="Change role with Admin key"
            linkTo="/change-role"
          />
          <ActionBox
            iconSrc="icons/trash.png"
            actionText="Trash"
            actionDescription="Restore or Delete items"
            linkTo="/trash"
          />
          {isLoggedIn && (
            <ActionBox
              iconSrc="icons/logout.png"
              actionText="Logout"
              button
              onClick={() => dispatch(showLogout(true))}
              actionDescription="Logout from your account"
            />
          )}
          {isLoggedIn && (
            <ActionBox
              iconSrc="icons/warning.png"
              actionText="Delete Account"
              actionDescription="Securely remove Eden Account"
              linkTo="/delete-account"
            />
          )}
        </div>
      </div>
    </Container>
  );
}
