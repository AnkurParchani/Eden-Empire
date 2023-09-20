import FormInput from "../../ui/FormInput";
import Heading from "../../ui/Heading";
import Button from "./../../ui/Button";

export default function SignupForm({
  handleSubmit,
  register,
  mutate,
  isLoading,
}) {
  const inputFields = [
    { field: "Name", type: "text", registerName: "name", required: true },
    { field: "Email", type: "email", registerName: "email", required: true },
    {
      field: "Password",
      type: "password",
      registerName: "password",
      required: true,
    },
    {
      field: "Confirm Password",
      type: "password",
      registerName: "passwordConfirm",
      required: true,
    },
  ];

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <div className="px-3 py-3">
      <Heading>Hey there!</Heading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex flex-col gap-5"
      >
        {inputFields.map((input) => (
          <FormInput
            key={input.registerName}
            disabled={isLoading}
            input={input}
            register={register}
          />
        ))}

        <div>
          <Heading>For Admins only</Heading>

          <FormInput
            register={register}
            input={{
              field: "Admin Key",
              registerName: "adminKey",
              type: "password",
              required: false,
            }}
          />
        </div>

        <Button isLoading={isLoading}>
          {isLoading ? "registering..." : "sign up"}
        </Button>
      </form>
    </div>
  );
}
