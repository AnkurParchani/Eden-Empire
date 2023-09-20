import { useForm } from "react-hook-form";

import Container from "../../ui/Container";
import BreadCrumbNav from "../../ui/BreadCrumbNav";
import ActionFormTemplate from "../../ui/ActionFormTemplate";
import ActionForm from "../../ui/ActionForm";

import { useAddAddress, useAddressInputs } from "../../hooks/useAddress";

export default function AddAddressForm({ setIsFormOpen }) {
  // Implementing useForm functionality
  const { register, handleSubmit } = useForm();
  const addAddressMutation = useAddAddress(setIsFormOpen);

  // Input field of the form
  const inputFields = useAddressInputs();

  // When form data is submtted
  function onSubmit(data) {
    addAddressMutation.mutate(data);
  }

  return (
    <Container>
      <BreadCrumbNav
        navLinks={[
          { name: "My Account", linkTo: "/my-profile", type: "link" },
          { name: "Addresses", type: "button" },
        ]}
        onClick={() => setIsFormOpen(false)}
        currentPageName="New Address"
      />
      <ActionFormTemplate>
        <ActionForm
          isLoading={addAddressMutation.isLoading}
          showCancelButton={true}
          btnOnClick={() => setIsFormOpen(false)}
          inputs={inputFields}
          notLoadingText="save"
          onSubmit={onSubmit}
          register={register}
          handleSubmit={handleSubmit}
          isLoadingText="saving..."
        />
      </ActionFormTemplate>
    </Container>
  );
}
