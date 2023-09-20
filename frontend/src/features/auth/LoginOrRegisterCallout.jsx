import { Link } from "react-router-dom";

export default function LoginOrRegisterCallout({ type }) {
  return (
    <>
      <div className=" relative mx-auto mb-2 mt-4 max-w-xs text-center before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-full before:bg-gray-300 before:content-[''] ">
        <h5 className="relative z-20 inline-block bg-gray-100 px-2 text-xs font-normal tracking-wide text-[#767676] before:content-['']">
          {type !== "login" ? "New to EdenEmpire?" : "Already registered?"}
        </h5>
      </div>

      <div className=" flex justify-center">
        <Link
          className="w-full max-w-xs rounded-lg border border-pink-300  py-0.5 text-center text-sm text-gray-700 shadow-lg shadow-gray-300 duration-200 hover:bg-pink-50"
          to={type !== "login" ? "/signup" : "/login"}
        >
          {type !== "login"
            ? "Create your Eden account"
            : "Login to your Eden account"}
        </Link>
      </div>
    </>
  );
}
