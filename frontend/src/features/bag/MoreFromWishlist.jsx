import { Link } from "react-router-dom";

export default function MoreFromWishlist() {
  return (
    <Link
      to="/my-wishlist"
      className="mt-3 flex items-center justify-between bg-gray-50 px-2 py-3.5 shadow-lg "
    >
      <h1 className="flex items-center gap-1.5 text-sm font-semibold capitalize">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="16"
            fill="none"
            viewBox="0 0 12 16"
          >
            <path
              fill="#000"
              fillRule="evenodd"
              d="M10.993 14.62a.067.067 0 0 1-.103.058l-4.571-2.77a.638.638 0 0 0-.64 0l-4.57 2.77a.067.067 0 0 1-.102-.058V1.133A.13.13 0 0 1 1.139 1H3.5V3.5c0 .298.18.543.486.543s.515-.245.515-.543V1h6.36a.13.13 0 0 1 .133.133V14.62zM11.307 0H.693A.687.687 0 0 0 0 .68v14.719A.61.61 0 0 0 .617 16a.63.63 0 0 0 .315-.086l4.996-3.026a.14.14 0 0 1 .144 0l4.996 3.026a.628.628 0 0 0 .315.086.61.61 0 0 0 .617-.602V.679C12 .306 11.69 0 11.307 0z"
            ></path>
          </svg>
        </span>
        Add more from wishlist
      </h1>
      <i className="fa-solid fa-angle-right mr-2" />
    </Link>
  );
}
