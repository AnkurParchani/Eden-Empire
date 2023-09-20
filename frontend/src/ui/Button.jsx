import { Link } from "react-router-dom";

export default function Button({
  children,
  isLoading,
  isLink,
  linkTo,
  inActionForm,
  onClick,
  secondaryButton,
}) {
  const commonClass = `rounded-sm text-xs px-4 sm:text-base bg-pink-600 ${
    isLoading && "bg-pink-200"
  }  py-1 font-semibold uppercase tracking-wider text-white  duration-200 hover:bg-pink-800 ${
    inActionForm && "col-span-full"
  }`;

  const secondaryButtonClass =
    "px-4 py-0.5 text-sm rounded-sm bg-white border font-medium  border-pink-300 text-gray-700 shadow-sm shadow-gray-300 hover:bg-pink-50 text-black duration-200";

  return (
    <>
      {isLink ? (
        <Link
          className={secondaryButton ? secondaryButtonClass : commonClass}
          to={linkTo}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={secondaryButton ? secondaryButtonClass : commonClass}
          disabled={isLoading}
        >
          {children}
        </button>
      )}
    </>
  );
}
