import Button from "./../../ui/Button";
import Heading from "../../ui/Heading";
import FormInput from "../../ui/FormInput";

export default function LoginForm({
  handleSubmit,
  register,
  mutate,
  isLoading,
}) {
  function onSubmit(data) {
    mutate(data);
  }

  const inputFields = [
    {
      field: "Email",
      type: "email",
      registerName: "email",
    },
    {
      field: "Password",
      type: "password",
      registerName: "password",
    },
  ];

  return (
    <div className="px-3 py-3">
      <Heading>Welcome Back!</Heading>

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

        <Button isLoading={isLoading}>
          {isLoading ? "logging in..." : "login"}
        </Button>
      </form>
    </div>
  );
}
