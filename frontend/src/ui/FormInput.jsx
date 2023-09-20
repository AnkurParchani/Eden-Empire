export default function FormInput({ register, input }) {
  const {
    type,
    registerName,
    field,
    required = true,
    multiple,
    defaultInputValue,
    textOfInputWithText,
    isLoading,
    placeholder,
    inputWithText,
    defaultDisabled,
    selectOptions,
    noCapitalize,
    handleChange,
    inputVariety,
  } = input;

  // Types of inputs
  let normalInputs =
    type === "text" ||
    type === "number" ||
    type === "email" ||
    type === "password";
  const selectInput = type === "select";
  const checkboxInput = type === "checkbox";
  const textareaInput = type === "textarea";
  const fileInput = type === "file";

  if (inputVariety) {
    normalInputs = undefined;
  }

  const inputClass = `border-b-2 ${
    type === "text" && !noCapitalize && "capitalize"
  } border-gray-600 text-sm bg-transparent px-0.5 py-1 outline-none focus:border-pink-600 duration-100`;

  const normalInput = (
    <input
      defaultValue={defaultInputValue}
      type={type}
      id={registerName}
      {...register(registerName)}
      className={inputClass}
      disabled={isLoading || defaultDisabled}
      placeholder={placeholder}
    />
  );

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={registerName}
        className={`text-sm font-semibold ${
          checkboxInput && "ml-6"
        }  text-gray-700 ${
          required && "after:text-pink-600 after:content-['*'] "
        }`}
      >
        {field}
      </label>

      {normalInputs && !inputWithText && normalInput}

      {normalInputs && inputWithText && (
        <div className="grid grid-cols-[auto_1fr] items-center gap-3">
          <span className=" rounded-sm bg-gray-100 px-1 text-base text-gray-700">
            +{textOfInputWithText}
          </span>
          {normalInput}
        </div>
      )}

      {selectInput && (
        <select
          defaultValue={defaultInputValue}
          id={registerName}
          {...register(registerName)}
          disabled={isLoading}
          className={inputClass}
          onChange={
            handleChange ? (e) => handleChange(e.target.value) : undefined
          }
        >
          {selectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      )}

      {checkboxInput && (
        <input
          type={type}
          id={registerName}
          disabled={isLoading}
          {...register(registerName)}
          className="absolute top-1 scale-125  accent-pink-500"
        />
      )}

      {textareaInput && (
        <textarea
          id={registerName}
          disabled={isLoading}
          {...register(registerName)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}

      {fileInput && (
        <input
          type="file"
          id={registerName}
          {...register(registerName)}
          disabled={isLoading}
          accept="image/*"
          name={registerName}
          multiple={multiple}
        />
      )}
    </div>
  );
}
