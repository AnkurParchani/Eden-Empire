import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import ConfirmationModal from "./ConfirmationModal";

import { setPreviousPage } from "../features/auth/authSlice";

export default function LoginWarning({
  warningMessage,
  modalIsOpen,
  setModalIsOpen,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <ConfirmationModal
      modalHeading="Login Required"
      modalIsOpen={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
      modalSubHeading={warningMessage}
      buttons={[
        {
          secondaryButton: true,
          btnText: "Cancel",
          onClick: () => setModalIsOpen(false),
        },
        {
          secondaryButton: false,
          btnText: `Login`,
          onClick: () => {
            setModalIsOpen(false);
            dispatch(setPreviousPage(location.pathname));
            navigate("/login");
          },
        },
      ]}
    />
  );
}
