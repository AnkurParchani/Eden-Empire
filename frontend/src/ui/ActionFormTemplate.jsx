import { useNavigate } from "react-router";
import Button from "./Button";

export default function ActionFormTemplate({ children, secondaryButton }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="mx-auto mt-5 max-w-xs grid-cols-1 overflow-hidden rounded-md bg-white px-3  pb-4 shadow-lg sm:max-w-sm md:max-w-md">
        {children}
      </div>

      {/* If we want to show back button */}
      {secondaryButton && (
        <div className="mx-auto mt-2 flex max-w-xs justify-end sm:max-w-sm md:max-w-md ">
          <Button secondaryButton={true} onClick={() => navigate(-1)}>
            Go back
          </Button>
        </div>
      )}
    </>
  );
}
