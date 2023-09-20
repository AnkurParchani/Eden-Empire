import { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import NotAuthorized from "../../ui/NotAuthorized";
import ActionForm from "../../ui/ActionForm";
import ActionFormTemplate from "../../ui/ActionFormTemplate";
import { addColor } from "../../services/apiItems";
import Container from "../../ui/Container";
import { useGetAllItems } from "./../../hooks/useItems";

export default function AddColorItem() {
  const [isAdmin, setIsAdmin] = useState(true);
  // Getting the items data
  const { data: itemsData, isLoading: dataIsLoading } = useGetAllItems();

  // React-hook-form
  const { register, handleSubmit, reset } = useForm();

  // To navigate the user
  const navigate = useNavigate();

  // The mutation function
  const { isLoading, mutate } = useMutation({
    mutationFn: addColor,
    onSuccess: () => {
      toast.success("color added to Item");
      navigate("/");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // Submitting the form with values
  function onSubmit() {
    return;
    // const formData = new FormData();
    // formData.append("color", data.color);
    // formData.append("item", data.item);

    // for (const file of data.images) {
    //   formData.append("itemColorImages", file);
    // }
    // mutate(formData);
  }

  // All Input fields
  const inputFields = [
    // normal input
    { field: "Color Name", type: "text", registerName: "color" },

    // Image input
    {
      field: "Images of item",
      type: "file",
      registerName: "images",
      multiple: true,
    },
    // select input
    {
      field: "For Item",
      type: "select",
      registerName: "item",
      selectOptions: dataIsLoading
        ? [{ name: "Loading...", value: "None" }]
        : itemsData.map((item) => {
            return {
              name: `${item.name} (${item.details.modelNumber})`,
              value: item._id,
            };
          }),
    },
  ];

  return (
    <div>
      {!isAdmin ? (
        <NotAuthorized fullPageView={true} />
      ) : (
        <Container>
          <ActionFormTemplate secondaryButton={true}>
            <ActionForm
              onSubmit={onSubmit}
              register={register}
              handleSubmit={handleSubmit}
              formHeading="Add color to item"
              isLoading={isLoading}
              isLoadingText="Adding color..."
              notLoadingText="Add Color"
              inputs={inputFields}
            />
          </ActionFormTemplate>
        </Container>
      )}
    </div>
  );
}
