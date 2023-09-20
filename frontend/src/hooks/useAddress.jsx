import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAddressApi,
  changeDelilveryAddressApi,
  editAddressApi,
  getAddressApi,
  getTrashAddressApi,
} from "../services/apiAddress";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Country, State, City } from "country-state-city";

// Getting all the addresses of user
export const useGetAllAddress = () => {
  const { isFetching, error, data } = useQuery({
    queryKey: ["savedAddress"],
    queryFn: getAddressApi,
  });

  return { data, isFetching, error };
};

// Getting all the trash addresses of user
export const useGetAllTrashAddress = () => {
  const { isFetching, error, data } = useQuery({
    queryKey: ["trashAddress"],
    queryFn: getTrashAddressApi,
  });

  return { data, isFetching, error };
};

// Adding address
export const useAddAddress = (setIsFormOpen) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { reset } = useForm();

  return useMutation({
    mutationFn: addAddressApi,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      reset();
      toast.success("Address added");
      navigate("/my-addresses");
      queryClient.invalidateQueries(["savedAddress"]);
      setIsFormOpen(false);
    },
  });
};

// Editing address
export const useEditAddress = (setEditIsOpen) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newAddressData) => {
      return editAddressApi(newAddressData.addressId, newAddressData.data);
    },
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      toast.success("Address updated successfully");
      queryClient.invalidateQueries(["savedAddress"]);
      setEditIsOpen(false);
    },
  });
};

// Updating isDeliveryAddress function
export const useChangeDelilveryAddress = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: changeDelilveryAddressApi,
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(["savedAddress"]);
    },
  });

  return { mutate, isLoading };
};

// Dynamic address inputs
export const useAddressInputs = (address = {}) => {
  // About countries
  const CountryList = Country.getAllCountries();

  // Default selected
  const defaultSelectedCountry = CountryList.find(
    (country) => country.name === "India",
  );

  // State for remembering Country
  const [selectedCountry, setSelectedCountry] = useState(
    defaultSelectedCountry,
  );

  // State and city list according to selected country
  const StateList = State.getStatesOfCountry(selectedCountry.isoCode);
  function getState(stateName) {
    return StateList.find((state) => state.name === stateName);
  }

  // State for remembering States
  const [selectedState, setSelectedState] = useState(getState("Karnataka"));

  const CityList = City.getCitiesOfState(
    selectedCountry.isoCode,
    selectedState?.isoCode,
  );

  // If user changed his country
  function handleCountryChange(countryName) {
    setSelectedCountry(
      CountryList.find((country) => country.name === countryName),
    );
  }

  // If user changed his state
  function handleStateChange(stateName) {
    setSelectedState(StateList.find((state) => state.name === stateName));
  }

  // All input fields
  const inputFields = [
    // select input
    {
      field: "Country",
      type: "select",
      registerName: "country",
      defaultInputValue: address.country || selectedCountry.name,
      selectOptions: CountryList.map((country) => {
        return { name: country.name, value: country.name };
      }),
      handleChange: handleCountryChange,
    },

    // Normal inputs
    {
      field: "Full name",
      type: "text",
      registerName: "fullName",
      defaultInputValue: address.fullName ?? "",
    },
    {
      field: "Mobile number",
      type: "number",
      defaultInputValue: address.phoneNumber ?? "",
      inputWithText: true,
      textOfInputWithText: selectedCountry?.phonecode,
      registerName: "phoneNumber",
      placeholder: "Avoid inserting real number",
    },
    {
      field: "Pincode",
      type: "number",
      registerName: "pincode",
      defaultInputValue: address.pincode ?? "",
    },

    {
      field: "Flat, House no., Apartment",
      type: "text",
      registerName: "flatNumber",
      defaultInputValue: address.flatNumber ?? "",
    },
    {
      field: "Area, Street, Sector",
      type: "text",
      registerName: "flatArea",
      defaultInputValue: address.flatArea ?? "",
    },

    // Select inputs
    {
      field: "State",
      type: "select",
      registerName: "state",
      defaultInputValue: address.state || selectedState?.name,
      handleChange: handleStateChange,
      selectOptions: StateList.map((state) => {
        return { name: state.name, value: state.name };
      }),
    },
    {
      field: "Town/City",
      type: "select",
      registerName: "city",
      selectOptions: CityList.map((city) => {
        return { name: city.name, value: city.name };
      }),
      defaultInputValue: address.city ?? null,
    },
    {
      field: "Type of Address",
      type: "select",
      registerName: "typeOfAddress",
      selectOptions: [
        { name: "Home", value: "Home" },
        { name: "Office", value: "Office" },
      ],
      defaultInputValue: address.typeOfAddress ?? "",
    },
  ];

  return inputFields;
};
