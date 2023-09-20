export default function AuthBrandImg({ imgPath }) {
  return (
    <img
      src={`/logo-imgs/${imgPath}`}
      alt="Brand image"
      className=" "
      // className="h-52 w-full opacity-90 sm:h-60 "
    />
  );
}
