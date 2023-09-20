import AuthBrandImg from "./AuthBrandImg";
import AuthFooter from "./AuthFooter";
import LoginOrRegisterCallout from "./LoginOrRegisterCallout";

export default function AuthTemplate({ children, calloutType }) {
  return (
    <>
      <div className="mb-5 bg-gray-50 px-10 py-6">
        <div className="mx-auto grid max-w-xs grid-cols-1 gap-2 overflow-hidden rounded-md bg-white">
          <div>
            <AuthBrandImg
              imgPath={
                calloutType !== "login"
                  ? "logo-color.png"
                  : "brandName-bg--white.png"
              }
            />

            {children}
          </div>
        </div>
        <LoginOrRegisterCallout type={calloutType} />
      </div>
      <AuthFooter />
    </>
  );
}
