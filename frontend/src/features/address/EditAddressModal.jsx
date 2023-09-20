import { useForm } from "react-hook-form";

import ActionModal from "../../ui/ActionModal";

import { useAddressInputs, useEditAddress } from "../../hooks/useAddress";

export default function EditAddress({ addressId, setEditIsOpen, address }) {
  const { register, handleSubmit } = useForm();

  // From useAddress
  const editAddressMutation = useEditAddress(setEditIsOpen);
  const inputFields = useAddressInputs(address);

  // Request with new updated Address data
  function onSubmit(data) {
    editAddressMutation.mutate({ addressId, data });
  }

  // The modal
  return (
    <ActionModal
      isLoading={editAddressMutation.isLoading}
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      closeModal={() => setEditIsOpen(false)}
      formHeading="Edit Address"
      inputFields={inputFields}
    />
  );
}
