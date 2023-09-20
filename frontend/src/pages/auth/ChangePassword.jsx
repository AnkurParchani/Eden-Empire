import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import BreadCrumbNav from "../../ui/BreadCrumbNav";
import Container from "../../ui/Container";
import ActionFormTemplate from "../../ui/ActionFormTemplate";
import ActionForm from "../../ui/ActionForm";
import Heading from "../../ui/Heading";

import { changePassword } from "../../services/apiAuth";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../features/auth/authSlice";
import NotLoggedIn from "../../ui/NotLoggedIn";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading } = useMutation({
    mutationFn: changePassword,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      reset();
      toast.success("Password updated successfully");
      navigate("/settings");
    },
  });

  const isLoggedIn = useSelector(getIsLoggedIn);

  const inputFields = [
    {
      field: "Current Password",
      type: "password",
      registerName: "currentPassword",
    },
    { field: "New Password", type: "password", registerName: "password" },
    {
      field: "Confirm Password",
      type: "password",
      registerName: "passwordConfirm",
    },
  ];
  function onSubmit(data) {
    mutate(data);
  }

  if (!isLoggedIn) return <NotLoggedIn currentPage="/change-password" />;

  return (
    <Container>
      <BreadCrumbNav
        navLinks={[{ name: "Settings", linkTo: "/settings", type: "link" }]}
        currentPageName="Change Password"
      />

      <ActionFormTemplate>
        <Heading>Change Password</Heading>
        <ActionForm
          onSubmit={onSubmit}
          register={register}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          showCancelButton={true}
          btnOnClick={() => navigate("/settings")}
          isLoadingText="saving..."
          notLoadingText="save"
          inputs={inputFields}
        />
      </ActionFormTemplate>
    </Container>
  );
}
