import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreAddressApi } from "../../services/apiAddress";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { toast } from "react-hot-toast";

export default function RestoreAddressModal({
  restoreIsOpen,
  setRestoreIsOpen,
  addressId,
}) {
  const queryClient = useQueryClient();

  // Delete address function
  const { isLoading, mutate } = useMutation({
    mutationFn: restoreAddressApi,
    onSuccess: () => {
      // Invalidating from both sides
      queryClient.invalidateQueries(["savedAddress"]);
      queryClient.invalidateQueries(["trashAddress"]);
      setRestoreIsOpen(false);
      toast.success("Address restored successfully");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  // Mutate function
  function handleRestoreAddress() {
    mutate(addressId);
  }

  // The modal
  return (
    <ConfirmationModal
      modalHeading="Restore Confirmation"
      modalIsOpen={restoreIsOpen}
      onClose={() => setDeleteIsOpen(false)}
      modalSubHeading="Restore this address back with main addressses?"
      buttons={[
        {
          secondaryButton: true,
          btnText: "Cancel",
          onClick: () => setRestoreIsOpen(false),
        },
        {
          secondaryButton: false,
          btnText: `${isLoading ? "restoring..." : "restore"}`,
          onClick: () => handleRestoreAddress(),
        },
      ]}
    />
  );
}
