import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bg-gray-100 px-5 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            <FooterPart partHeading="Online shopping">
              <FooterLink linkTo="/?gender=men">Men</FooterLink>
              <FooterLink linkTo="/?gender=women">Women</FooterLink>
              <FooterLink linkTo="/?category=clothes">Clothes</FooterLink>
              <FooterLink linkTo="/?category=shoes">Shoes</FooterLink>
              <FooterLink linkTo="/?category=sunglasses">Sunglasses</FooterLink>
              <FooterLink linkTo="/?category=watches">Watches</FooterLink>
            </FooterPart>

            <FooterPart partHeading="Site map">
              <FooterLink linkTo="/my-profile">My-Profile</FooterLink>
              <FooterLink linkTo="/my-wishlist">Wishlist</FooterLink>
              <FooterLink linkTo="/my-orders">Orders</FooterLink>
              <FooterLink linkTo="/my-reviews">Reviews</FooterLink>
              <FooterLink linkTo="/my-addresses">Addresses</FooterLink>
              <FooterLink linkTo="/my-bag">Bag</FooterLink>
              <FooterLink linkTo="/trash">Trash</FooterLink>
            </FooterPart>

            <FooterPart fullWidth partHeading="Get to know us">
              <FooterLink blank linkTo="https://www.facebook.com/facebook/">
                Facebook
              </FooterLink>
              <FooterLink blank linkTo="https://www.twitter.com">
                Twitter
              </FooterLink>
              <FooterLink blank linkTo="https://www.instagram.com">
                Instagram
              </FooterLink>
              <FooterLink linkTo="/privacy-policy">Privacy Policy</FooterLink>
            </FooterPart>

            <FooterPart fullWidth partHeading="Registered office Addresses">
              <p>EdenEmpire Inc.</p>
              <p>456 Business Boulevard, Suite 789</p>
              <p>Corporate Plaza</p>
              <p>Cityville, XY 78901</p>
              <p>Fictional County</p>
            </FooterPart>
          </div>

          <FooterBottom />
        </div>
      </div>

      <div className="bg-gray-100">
        <p className="text-center text-xs text-gray-500 ">
          Copyright &copy; {currentYear}{" "}
          <Link
            className="font-bold hover:text-[#0066c0] hover:underline"
            to="https://ankurparchani.github.io/My-portfolio"
          >
            Ankur Parchani
          </Link>
        </p>
      </div>
    </>
  );
}

function FooterPart({ children, partHeading, fullWidth }) {
  return (
    <div className={`${fullWidth && "col-span-full md:col-auto"}`}>
      <h1 className="mb-1 text-xs font-bold uppercase text-gray-900">
        {partHeading}
      </h1>
      <div className="flex flex-col gap-1 text-xs text-gray-700">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ linkTo, children, blank }) {
  return (
    <span>
      <Link
        target={blank ? "_blank" : "_self"}
        className="hover:text-[#0066c0] hover:underline"
        to={linkTo}
      >
        {children}
      </Link>
    </span>
  );
}

function FooterBottom() {
  return (
    <>
      <div className="mt-5 flex items-center justify-between">
        <img
          alt="brand-img"
          className=" h-12 rounded-full"
          src="/logo-imgs/logo-color.png"
        />

        <div className="text-end text-xs font-medium text-gray-600">
          <p>CIN: U123456789</p>
          <p>Tel: +91-9876543210</p>
        </div>
      </div>
    </>
  );
}
