import { Link } from "react-router-dom";
import CopyrightLine from "../../ui/CopyrightLine";

export default function AuthFooter() {
  return (
    <>
      <div className="mx-auto flex max-w-xs justify-center gap-8 text-xs text-[#0066c0]">
        <Link className="hover:text-black hover:underline" to="/">
          Privacy Policy
        </Link>
        <Link className="hover:text-black hover:underline" to="/">
          Help
        </Link>
      </div>

      <CopyrightLine />
    </>
  );
}
