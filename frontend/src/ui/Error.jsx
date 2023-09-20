import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import Button from "./Button";
import Warning from "./Warning";
import Container from "./Container";
import { setPreviousPage } from "./../features/auth/authSlice";

export default function Error({ error }) {
  const navigate = useNavigate();

  const tokenExpiredError = error?.message === "Token expired, login again";
  if (tokenExpiredError) return <TokenExpired />;
  console.log(error);

  return (
    <div>
      <div className="mt-3 text-center">
        <Container>
          <Warning>Something went wrong. Please try again later</Warning>
          <Button onClick={() => navigate("/")} secondaryButton>
            Home page
          </Button>
        </Container>
      </div>
    </div>
  );
}

function TokenExpired() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div className="mt-3 text-center">
      <Container>
        <Warning>
          Your login session has ended. To continue, please sign in again.
        </Warning>
        <Button
          onClick={() => {
            dispatch(setPreviousPage(location.pathname));
            navigate("/login");
          }}
          secondaryButton
        >
          Login
        </Button>
      </Container>
    </div>
  );
}
