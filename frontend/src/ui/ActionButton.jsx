export default function ActionButton({
  btnText,
  onClick,
  noBorderTop,
  disabled,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`cursor-pointer rounded-sm  border border-[#d4d5d9] px-3 py-3 text-center text-xs font-bold uppercase text-[#526cd0] duration-100  hover:bg-gray-100 ${
        noBorderTop && "border-t-0"
      }`}
    >
      {btnText}
    </button>
  );
}
