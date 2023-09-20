import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CookiesConsentBanner() {
  const [showBanner, setShowBanner] = useState(
    localStorage.getItem("showBanner") || true,
  );

  return (
    <>
      {(showBanner === "true" || showBanner === true) && (
        <CookiesConsent setShowBanner={setShowBanner} />
      )}
    </>
  );
}

function CookiesConsent({ setShowBanner }) {
  const navigate = useNavigate();

  function removeBanner() {
    localStorage.setItem("showBanner", false);
    setShowBanner(false);
  }
  return (
    <div className="downSlide fixed bottom-10 right-0 z-20 flex w-11/12 flex-col gap-1 rounded-sm bg-gray-100 px-4 py-4 leading-none shadow-lg sm:w-4/5 md:w-3/5 lg:w-1/4">
      <h1 className="text-sm font-bold text-black">We use Cookies</h1>
      <p className="text-xs font-light text-gray-800">
        This website uses cookies to ensure you get the best experience on our
        website
      </p>
      <div className="mt-3 flex justify-end gap-3 text-sm tracking-tight text-blue-700">
        <button
          onClick={() => {
            navigate("/privacy-policy");
            removeBanner();
          }}
          className="hover:text-black hover:underline"
        >
          Learn more
        </button>
        <button
          className="hover:text-black  hover:underline"
          onClick={removeBanner}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
