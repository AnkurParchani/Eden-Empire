export default function Select({ label, id, options, onChange, value }) {
  const optionIsString = typeof options === "string";
  const optionIsNumber = typeof options === "number";
  let newOptions;

  if (optionIsString) newOptions = optionIsString && options.split(",");
  if (optionIsNumber)
    newOptions = Array.from({ length: options }, (_, index) => index + 1);

  return (
    <div className="rounded-sm bg-gray-200 px-1 py-0.5 text-xs font-bold  ">
      <label htmlFor={id}>{label}</label>
      <select
        className="rounded-sm bg-gray-200 capitalize outline-pink-500"
        onChange={(e) => onChange({ [id]: e.target.value })}
        id={id}
        value={value}
      >
        {newOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
