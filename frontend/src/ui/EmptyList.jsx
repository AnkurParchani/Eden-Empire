import ActionButton from "./ActionButton";

export default function EmptyList({
  iconSrc,
  heading,
  description,
  btnText,
  onClick,
  hasActionButton,
}) {
  return (
    <div className=" flex flex-col items-center gap-4 px-4 py-10">
      <img className="h-32 opacity-80" src={iconSrc} alt="Empty list icon" />
      <h1 className=" text-sm font-bold uppercase">{heading}</h1>
      <h3 className="mb-2 text-center text-xs text-[#767676]">{description}</h3>
      {hasActionButton && <ActionButton onClick={onClick} btnText={btnText} />}
    </div>
  );
}
