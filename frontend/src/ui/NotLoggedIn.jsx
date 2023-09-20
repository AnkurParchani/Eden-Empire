import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import Button from "./Button";

import { setPreviousPage } from "./../features/auth/authSlice";

export default function NotLoggedIn({ currentPage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="mt-10 flex flex-col gap-3 text-center">
      <h1 className="text-2xl font-bold text-red-600">Error 401!</h1>
      <p className="text-xs font-semibold text-gray-600">
        To access this page, please log in.
      </p>
      <div className="mt-3">
        <Button
          onClick={() => {
            navigate("/login");
            dispatch(setPreviousPage(currentPage));
          }}
          secondaryButton
        >
          Login
        </Button>
      </div>
    </div>
  );
}
