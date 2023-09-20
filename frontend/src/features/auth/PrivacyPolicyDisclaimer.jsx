import { Link } from "react-router-dom";

export default function PrivacyPolicyDisclaimer({ disclaimerIn }) {
  let disclaimer;
  if (disclaimerIn === "signup") {
    disclaimer =
      "By creating an account or logging in, you agree to EdenEmpire's ";
  }

  if (disclaimerIn === "login") {
    disclaimer = "By continuing, you agree to EdenEmpire's ";
  }

  return (
    <p className=" px-4 pb-4 pt-2 text-center text-xs font-medium leading-relaxed text-[#111]">
      {disclaimer}
      <Link
        className="text-[#0066c0] hover:text-black hover:underline"
        to="/privacy-policy"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
}
