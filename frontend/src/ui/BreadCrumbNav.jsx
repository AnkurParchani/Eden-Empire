import { Link, useNavigate } from "react-router-dom";

export default function BreadCrumbNav({
  navLinks,
  currentPageName,
  onClick,
  showBackArrow,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-1">
      {showBackArrow && (
        <button onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left text-lg text-gray-700" />
        </button>
      )}

      <ul className="flex gap-0.5 text-xs font-medium ">
        {/* Looping over the link to render link / button */}
        {navLinks.map((link) => {
          return (
            <li key={link.name} className="text-[#565959]">
              {/* If link type is link */}
              {link.type === "link" && (
                <>
                  <Link
                    to={link.linkTo}
                    className="hover:text-pink-600 hover:underline"
                  >
                    {link.name}
                  </Link>
                  <span className="mx-0.5">&gt;</span>
                </>
              )}

              {/* If link type is button */}
              {link.type === "button" && (
                <>
                  <button
                    onClick={onClick}
                    className="hover:text-pink-600 hover:underline"
                  >
                    {link.name}
                  </button>
                  <span className="mx-0.5">&gt;</span>
                </>
              )}
            </li>
          );
        })}

        {/* the current page */}
        <li>
          <span className="capitalize text-pink-600">{currentPageName}</span>
        </li>
      </ul>
    </div>
  );
}
