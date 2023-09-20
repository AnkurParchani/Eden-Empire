import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import BreadCrumbNav from "../../ui/BreadCrumbNav";
import Container from "../../ui/Container";
import ActionFormTemplate from "../../ui/ActionFormTemplate";
import ActionForm from "../../ui/ActionForm";
import Heading from "../../ui/Heading";

import { changeRoleRequestApi } from "../../services/apiAuth";
import { getIsLoggedIn, getRole } from "../../features/auth/authSlice";
import NotLoggedIn from "../../ui/NotLoggedIn";

export default function ChangeRole() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const role = useSelector(getRole);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading } = useMutation({
    mutationFn: changeRoleRequestApi,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["users"]);
      toast.success("Role changed successfully");
    },
  });

  const inputFields = [
    {
      field: "To",
      type: "select",
      registerName: "role",
      selectOptions: [
        { value: "user", name: "User" },
        { value: "admin", name: "Admin" },
      ],
    },
    { field: "Admin Key", type: "password", registerName: "adminKey" },
  ];
  function onSubmit(data) {
    mutate(data);
  }

  if (!isLoggedIn) return <NotLoggedIn currentPage="/change-role" />;

  return (
    <Container>
      <BreadCrumbNav
        navLinks={[{ name: "Settings", linkTo: "/settings", type: "link" }]}
        currentPageName="Change Role"
      />

      <p className="mt-5 text-center text-xs tracking-wide  text-[#565959]">
        Your current role is
        <span className="font-bold uppercase tracking-tight text-pink-600">
          {" "}
          {role}
        </span>
      </p>

      <ActionFormTemplate>
        <Heading>Change Role</Heading>
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
