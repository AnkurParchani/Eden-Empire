import Container from "../../ui/Container";
import ActionBox from "../../ui/ActionBox";
import Heading from "../../ui/Heading";
import { getIsLoggedIn } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import Warning from "../../ui/Warning";
import { Link } from "react-router-dom";

export default function Trash() {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <Container>
      <Heading>Trash</Heading>

      {!isLoggedIn && (
        <Warning>
          To access these features, please{" "}
          <Link to="/login" className="text-[#0066c0] hover:underline">
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
            iconSrc="icons/address.png"
            actionText="Address"
            actionDescription="Restore or delete your address"
            linkTo="/trash-addresses"
          />
          <ActionBox
            iconSrc="icons/review.png"
            actionText="Reviews"
            actionDescription="Restore or delete your reviews"
            linkTo="/trash-reviews"
          />
        </div>
      </div>
    </Container>
  );
}
