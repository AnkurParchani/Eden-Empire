import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import NotAuthorized from "../../ui/NotAuthorized";
import ActionForm from "../../ui/ActionForm";
import ActionFormTemplate from "../../ui/ActionFormTemplate";
import Container from "../../ui/Container";

import { addItem } from "../../services/apiItems";

export default function AddItem() {
  const [isAdmin, setIsAdmin] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      toast.success("Item added to list");
      navigate("/");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    const {
      tag,
      size,
      visitLink,
      color,
      countryOfOrigin,
      department,
      dimensions,
      genericName,
      itemWeight,
      manufacturer,
      modelNumber,
      mainImage,
      mainItemExtraImages,
      packer,
      name,
      priceBeforeDiscount,
      priceAfterDiscount,
      inStock,
      category,
      gender,
      maxOrderQuantity,
      instructions,
    } = data;

    const details = {
      countryOfOrigin,
      department,
      dimensions,
      genericName,
      itemWeight,
      manufacturer,
      modelNumber,
      packer,
    };

    const description = { tag, size, color, visitLink };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("priceBeforeDiscount", priceBeforeDiscount);
    formData.append("priceAfterDiscount", priceAfterDiscount);
    formData.append("inStock", inStock);
    formData.append("category", category);
    formData.append("gender", gender);
    formData.append("maxOrderQuantity", maxOrderQuantity);
    formData.append("instructions", instructions);
    formData.append("details", JSON.stringify(details));
    formData.append("description", JSON.stringify(description));

    formData.append("mainImage", mainImage[0]);

    for (const image of mainItemExtraImages) {
      formData.append("mainItemExtraImages", image);
    }

    mutate(formData);
  }

  const inputFields = [
    // All Input fields
    // normal
    { field: "Name", type: "text", registerName: "name" },
    {
      field: "Price before Discount",
      type: "number",
      registerName: "priceBeforeDiscount",
    },
    {
      field: "Price after Discount",
      type: "number",
      registerName: "priceAfterDiscount",
      required: false,
    },
    {
      field: "Colour",
      type: "text",
      registerName: "color",
    },

    // file input
    {
      field: "Item main Image",
      type: "file",
      registerName: "mainImage",
    },

    {
      field: "Item extra Images",
      type: "file",
      registerName: "mainItemExtraImages",
      required: false,
      multiple: true,
    },

    // select input
    {
      field: "For",
      type: "select",
      registerName: "gender",
      selectOptions: [
        { value: "men", name: "Men" },
        { value: "women", name: "Women" },
      ],
    },

    {
      field: "Category",
      type: "select",
      registerName: "category",
      selectOptions: [
        { value: "clothes", name: "Clothes" },
        { value: "shoes", name: "Shoes" },
        { value: "sunglasses", name: "Sunglasses" },
        { value: "watches", name: "Watches" },
      ],
    },

    // checkbox input
    {
      field: "In Stock",
      type: "checkbox",
      registerName: "inStock",
    },

    // normal
    {
      field: "Max Order Quantity",
      type: "number",
      registerName: "maxOrderQuantity",
    },

    // Textarea
    {
      field: "Instructions (seperated by fullstop)",
      type: "textarea",
      registerName: "instructions",
    },

    // Item details
    {
      field: "Product Dimensions",
      type: "text",
      registerName: "dimensions",
      required: false,
    },
    {
      field: "Manufacturer",
      type: "text",
      registerName: "manufacturer",
    },
    {
      field: "Model number",
      type: "number",
      registerName: "modelNumber",
    },
    {
      field: "Country of Origin",
      type: "text",
      registerName: "countryOfOrigin",
      required: false,
    },
    {
      field: "Department",
      type: "text",
      registerName: "department",
      required: false,
    },
    {
      field: "Packer",
      type: "text",
      registerName: "packer",
    },
    {
      field: "Item weight",
      type: "text",
      registerName: "itemWeight",
      required: false,
    },
    {
      field: "Generic Name",
      type: "text",
      registerName: "genericName",
    },

    {
      field: "Size (seperated by commas)",
      type: "text",
      registerName: "size",
    },

    {
      field: "Tags (seperated by commas)",
      type: "text",
      registerName: "tag",
      required: false,
    },
    {
      field: "Visit link",
      type: "text",
      registerName: "visitLink",
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
              formHeading="Add an Item"
              isLoading={isLoading}
              isLoadingText="Adding Item..."
              notLoadingText="Add Item"
              inputs={inputFields}
            />
          </ActionFormTemplate>
        </Container>
      )}
    </div>
  );
}
