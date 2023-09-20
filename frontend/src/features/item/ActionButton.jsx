export default function ActionButton({ actionName, iconClass, onClick }) {
  return (
    <p
      onClick={onClick}
      className="cursor-pointer rounded-md border border-gray-400 px-2 py-1 text-sm text-gray-800"
    >
      {actionName}{" "}
      <span>
        <i className={`${iconClass} ml-0.5 text-pink-600`}></i>
      </span>
    </p>
  );
}
