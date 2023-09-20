import { Link } from "react-router-dom";

export default function ActionBox({
  linkTo,
  actionDescription,
  actionText,
  iconSrc,
  button,
  onClick,
}) {
  return (
    <>
      {!button ? (
        <Link
          to={linkTo}
          className="duration-50 grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-[#d5d9d9] bg-white px-3 py-4 hover:bg-gray-50"
        >
          <img src={iconSrc} className="h-10" alt="action image" />
          <div>
            <h2 className="font-semibold ">{actionText}</h2>
            <p className="text-xs tracking-wide text-gray-500">
              {actionDescription}
            </p>
          </div>
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="duration-50 grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-[#d5d9d9] bg-white px-3 py-4 hover:bg-gray-50"
        >
          <img src={iconSrc} className="h-10" alt="action image" />
          <div className="text-start">
            <h2 className="font-semibold ">{actionText}</h2>
            <p className="text-xs tracking-wide text-gray-500">
              {actionDescription}
            </p>
          </div>
        </button>
      )}
    </>
  );
}
