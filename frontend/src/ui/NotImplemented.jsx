import { useNavigate } from "react-router";

import Container from "./Container";
import Button from "./Button";

export default function NotImplemented() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="mt-10 flex flex-col items-center gap-2 px-4 text-center leading-snug">
        <h1 className="text-xl font-bold  text-gray-700">
          Still in Development :(
        </h1>
        <h1 className="mb-5 text-base text-gray-600">
          We're sorry, but this functionality hasn't been implemented yet
        </h1>
        <Button onClick={() => navigate(-1)} secondaryButton>
          Go back
        </Button>
      </div>
    </Container>
  );
}
