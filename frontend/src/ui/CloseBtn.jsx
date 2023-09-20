export default function CloseBtn({ onClick, className }) {
  return (
    <i
      className={`fa-solid fa-xmark cursor-pointer ${className}`}
      onClick={onClick}
    />
  );
}
