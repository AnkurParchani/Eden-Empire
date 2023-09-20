import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function NotAuthorized({ fullPageView }) {
  const navigate = useNavigate();

  return (
    <div className={`${fullPageView && "mx-auto mt-10 max-w-7xl px-8"}`}>
      <p className="mb-5 rounded-md bg-red-200 px-1 py-2 text-center text-xs font-medium leading-snug tracking-wide text-red-600">
        <i className="fa-solid fa-triangle-exclamation mr-2  text-base"></i>
        Only admins are allowed to perform actions on this page.
      </p>
      {fullPageView && (
        <div className="grid">
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </div>
      )}
    </div>
  );
}
