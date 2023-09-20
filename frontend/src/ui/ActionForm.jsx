import Button from "./Button";
import FormInput from "./FormInput";
import Heading from "./Heading";

export default function ActionForm(props) {
  const {
    isLoading,
    inputs,
    formHeading,
    notLoadingText,
    onSubmit,
    register,
    handleSubmit,
    isLoadingText,
    btnOnClick,
    showCancelButton,
  } = props;

  {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex flex-col gap-5 md:grid md:items-center lg:gap-7"
      >
        {formHeading && (
          <div className="col-span-full">
            <Heading>{formHeading}</Heading>
          </div>
        )}

        {inputs.map((input) => (
          <FormInput
            key={input.registerName}
            isLoading={isLoading}
            register={register}
            input={input}
          />
        ))}

        <div className="flex justify-end gap-2">
          {showCancelButton && (
            <Button secondaryButton onClick={btnOnClick}>
              Cancel
            </Button>
          )}
          <Button isLoading={isLoading}>
            {isLoading ? isLoadingText : notLoadingText}
          </Button>
        </div>
      </form>
    );
  }
}
