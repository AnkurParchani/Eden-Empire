import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import BreadCrumbNav from "../../ui/BreadCrumbNav";
import Container from "../../ui/Container";
import ActionFormTemplate from "../../ui/ActionFormTemplate";
import ActionForm from "../../ui/ActionForm";
import Heading from "../../ui/Heading";

import { deleteAccount } from "../../services/apiUsers";

export default function DeleteAccount() {
  // useNavigate to navigate the user
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [cookies, setCookies, removeCookie] = useCookies();

  // Getting all the necessary form hooks
  const { register, handleSubmit, reset } = useForm();

  // If the request has beeen made to edit the user
  const { mutate, isLoading: deleteAccountIsLoading } = useMutation({
    mutationFn: (data) => deleteAccount(data, cookies?.user),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
      removeCookie("jwt", { path: "/" });
      removeCookie("user", { path: "/" });
      navigate("/");
      toast.success("Account deleted successfully");
    },
  });

  // Input fields for the form
  const inputFields = [
    {
      field:
        "I hereby confirm that by proceeding, I acknowledge the irreversible nature of this action. Subsequent to this step, my account shall be permanently expunged, along with all associated data encompassing addresses, orders, reviews, wishlist items, and other pertinent information. I am fully cognizant that the EdenEmpire bears no responsibility for ensuing ramifications, and once the account deletion is effected, reinstatement becomes unfeasible. With this understanding, I willingly proceed and affirm my acceptance of these conditions.",
      type: "checkbox",
      registerName: "hasAcceptedPrivacyConditions",
      required: false,
    },
    {
      field: "Enter your Password",
      type: "password",
      registerName: "password",
    },
  ];
  function onSubmit(data) {
    mutate(data);
  }

  // The JSX
  return (
    <Container>
      <BreadCrumbNav
        navLinks={[{ name: "Settings", linkTo: "/settings", type: "link" }]}
        currentPageName="Delete Account"
      />

      <ActionFormTemplate>
        <Heading>Delete my Account</Heading>
        <ActionForm
          onSubmit={onSubmit}
          register={register}
          handleSubmit={handleSubmit}
          isLoading={deleteAccountIsLoading}
          showCancelButton={true}
          btnOnClick={() => navigate("/settings")}
          isLoadingText="deleting..."
          notLoadingText="delete"
          inputs={inputFields}
        />
      </ActionFormTemplate>
    </Container>
  );
}
