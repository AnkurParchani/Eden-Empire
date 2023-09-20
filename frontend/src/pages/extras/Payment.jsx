import Container from "./../../ui/Container";
import Button from "./../../ui/Button";
import { Link } from "react-router-dom";

export default function Payment() {
  return (
    <Container>
      <div className="mt-4 flex flex-col items-center gap-3 bg-gray-50 px-2 py-4 text-center font-bold shadow-md">
        <h1 className="text-2xl leading-none tracking-tighter text-gray-900">
          Thank you for shopping with{" "}
          <span className="text-pink-500">EdenEmpire</span>
        </h1>
        <h2 className="text-sm font-semibold text-gray-600">
          (Your order has been added to your order list)
        </h2>
        <h3 className="text-xs font-semibold text-gray-900">
          The payment functionality has not been incorporated into this
          application, as it is designed solely for demonstration purposes. For
          more details, check EdenEmpire&apos;s{" "}
          <Link
            className="text-[#0066c0] hover:text-black hover:underline"
            to="/"
          >
            Privacy Policy
          </Link>
        </h3>
      </div>
      <div className="mt-3 flex justify-end gap-2 text-sm">
        <Button linkTo="/" secondaryButton isLink>
          Continue shopping
        </Button>
        <Button linkTo="/my-orders" secondaryButton isLink>
          See your orders
        </Button>
      </div>
    </Container>
  );
}
