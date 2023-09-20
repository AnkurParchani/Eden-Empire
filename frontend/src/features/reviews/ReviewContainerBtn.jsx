export default function ReviewContainerBtn({
  children,
  onClick,
  disabled,
  bgColor,
  hoverBgColor,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-sm ${bgColor} px-3 py-1 duration-100 ${hoverBgColor} text-xs font-semibold uppercase text-white`}
    >
      {children}
    </button>
  );
}
