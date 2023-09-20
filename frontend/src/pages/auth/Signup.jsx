import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import AuthTemplate from "../../features/auth/AuthTemplate";
import SignupForm from "../../features/auth/SignupForm";
import PrivacyPolicyDisclaimer from "../../features/auth/PrivacyPolicyDisclaimer";

import { signup } from "../../services/apiAuth";
import { getPreviousPage } from "../../features/auth/authSlice";

export default function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt", "user"]);
  const previousPage = useSelector(getPreviousPage);

  const { mutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setCookie("jwt", data.token, { path: "/" });
      setCookie("user", data.user, { path: "/" });
      toast.success("Account created");
      navigate(previousPage || "/");
      location.reload();
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <>
      <AuthTemplate calloutType="login">
        <SignupForm
          mutate={mutate}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          register={register}
        />

        <PrivacyPolicyDisclaimer disclaimerIn="signup" />
      </AuthTemplate>
    </>
  );
}
