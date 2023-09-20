import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import LoginForm from "../../features/auth/LoginForm";
import AuthTemplate from "../../features/auth/AuthTemplate";
import PrivacyPolicyDisclaimer from "../../features/auth/PrivacyPolicyDisclaimer";

import { login } from "../../services/apiAuth";
import { useSelector } from "react-redux";
import { getPreviousPage } from "../../features/auth/authSlice";
import { useNavigate } from "react-router";

export default function Login() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt", "user"]);
  const previousPage = useSelector(getPreviousPage);

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setCookie("jwt", data.token, { path: "/" });
      setCookie("user", data.user, { path: "/" });
      navigate(previousPage || "/");
      location.reload();
      toast.success("Logged in successfully");

      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <AuthTemplate calloutType="signup">
      <LoginForm
        mutate={mutate}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        register={register}
      />
      <PrivacyPolicyDisclaimer disclaimerIn="login" />
    </AuthTemplate>
  );
}
