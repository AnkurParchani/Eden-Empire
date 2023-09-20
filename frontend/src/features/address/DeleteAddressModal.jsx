import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import ConfirmationModal from "../../ui/ConfirmationModal";
import {
  deleteAddressApi,
  deleteTrashAddressApi,
} from "../../services/apiAddress";

export default function DeleteAddressModal({
  inTrash,
  addressId,
  deleteIsOpen,
  setDeleteIsOpen,
}) {
  const queryClient = useQueryClient();

  // Delete address function
  const { isLoading, mutate } = useMutation({
    // Function according to on which page the user is in
    mutationFn: inTrash ? deleteTrashAddressApi : deleteAddressApi,
    onSuccess: () => {
      // Invaliding addresses on both sides
      queryClient.invalidateQueries(["savedAddress"]);
      queryClient.invalidateQueries(["trashAddress"]);
      setDeleteIsOpen(false);
      toast.success(
        inTrash ? "Address deleted permanently" : "Address moved to Trash",
      );
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  // Mutate function
  function handleDeleteAddress() {
    mutate(addressId);
  }

  // The modal
  return (
    <ConfirmationModal
      modalHeading="Delete Confirmation"
      modalIsOpen={deleteIsOpen}
      onClose={() => setDeleteIsOpen(false)}
      modalSubHeading={`Are you sure you want to ${
        inTrash ? "permanently" : ""
      } delete this address?`}
      buttons={[
        {
          secondaryButton: true,
          btnText: "Cancel",
          onClick: () => setDeleteIsOpen(false),
        },
        {
          secondaryButton: false,
          btnText: `${isLoading ? "deleting..." : "delete"}`,
          onClick: () => handleDeleteAddress(),
        },
      ]}
    />
  );
}
