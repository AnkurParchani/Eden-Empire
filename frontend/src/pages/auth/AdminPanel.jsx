import ActionBox from "../../ui/ActionBox";
import Heading from "../../ui/Heading";
import Container from "../../ui/Container";
import { useSelector } from "react-redux";
import { getRole } from "../../features/auth/authSlice";
import NotAuthorized from "../../ui/NotAuthorized";

export default function AdminPanel() {
  const role = useSelector(getRole);

  return (
    <Container>
      <Heading textPink>EdenEmpire&apos;s settings-</Heading>

      {(role === "user" || !role) && <NotAuthorized />}

      <div className="relative">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 ">
          {/* Add this line to cover the links */}
          {(role === "user" || !role) && (
            <div className=" absolute left-0 top-0 h-full w-full bg-gray-800 bg-opacity-30" />
          )}

          <ActionBox
            iconSrc="icons/item.png"
            actionText="Add an Item"
            actionDescription="Add a new Item to the app"
            linkTo="/add-item"
          />
          <ActionBox
            iconSrc="icons/color.png"
            actionText="Add item Color"
            actionDescription="Add color images of an item"
            linkTo="/add-item-color"
          />
          <ActionBox
            iconSrc="icons/user.png"
            actionText="Delete a User"
            actionDescription="Delete any user from the app"
            linkTo="/not-implemented"
          />
        </div>
      </div>
    </Container>
  );
}
