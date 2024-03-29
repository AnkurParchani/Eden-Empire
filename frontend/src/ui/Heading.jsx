export default function Heading({ children, noMarginBottom, textPink }) {
  return (
    <h1
      className={`${
        noMarginBottom ? "mb-0" : "mb-5"
      } text-center text-lg  font-bold tracking-wide ${
        textPink ? "text-pink-600" : "text-gray-700"
      }`}
    >
      {children}
    </h1>
  );
}
