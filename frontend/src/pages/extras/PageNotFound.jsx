import { useLocation, useNavigate } from "react-router";
import Container from "../../ui/Container";
import Button from "../../ui/Button";
import Warning from "../../ui/Warning";

export default function PageNotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      <Warning>
        <h1 className="mb-3 text-sm">
          <i className="fa-solid fa-triangle-exclamation mr-1 text-base"></i>
          The page you&apos;re looking for could not be found
        </h1>
        <h2 className="text-xs">
          There is not route for "
          <span className="text-[#0066c0]">{location.pathname}</span>" on this
          app.
        </h2>
      </Warning>

      <div className="flex flex-col gap-3 text-center">
        <Button isLink linkTo="/">
          To Home
        </Button>
        <Button secondaryButton onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </Container>
  );
}
