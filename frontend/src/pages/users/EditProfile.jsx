import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import BreadCrumbNav from "../../ui/BreadCrumbNav";
import Container from "../../ui/Container";
import ActionFormTemplate from "../../ui/ActionFormTemplate";
import ActionForm from "../../ui/ActionForm";
import Heading from "../../ui/Heading";

import { useEditUserProfile, useGetUser } from "../../hooks/useUser";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../features/auth/authSlice";
import NotLoggedIn from "../../ui/NotLoggedIn";
import Error from "../../ui/Error";

export default function EditProfile() {
  // useNavigate to navigate the user
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getIsLoggedIn);

  // Getting all the necessary form hooks
  const { register, handleSubmit } = useForm();

  // Getting the current user data and user update function
  const {
    data: userData,
    isFetching: userDataIsFetching,
    error,
  } = useGetUser();
  const { mutate, isLoading: editDataIsLoading } = useEditUserProfile();

  // Input fields for the form
  const inputFields = [
    {
      field: "Name",
      type: "text",
      registerName: "name",
      defaultInputValue: userData?.name,
    },
    {
      field: "Email",
      type: "email",
      registerName: "email",
      defaultInputValue: userData?.email,
    },
    {
      field: "Image",
      type: "file",
      registerName: "photo",
      defaultInputValue: userData?.photo,
    },
    {
      field: "Role",
      type: "text",
      defaultDisabled: true,
      registerName: "role",
      defaultInputValue: userData?.role,
    },
  ];
  function onSubmit(data) {
    const { email, name, photo, role } = data;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("role", role);
    formData.append("photo", photo[0]);

    mutate(formData);
  }

  if (error) return <Error error={error} />;

  if (!isLoggedIn) return <NotLoggedIn currentPage="/edit-profile" />;

  // The JSX
  return (
    <Container>
      <BreadCrumbNav
        navLinks={[{ name: "Settings", linkTo: "/settings", type: "link" }]}
        currentPageName="Edit Profile"
      />

      {!userDataIsFetching && (
        <ActionFormTemplate>
          <Heading>Edit Profile</Heading>

          <img
            src={`/user-images/${userData?.photo}`}
            className="mx-auto mb-6 h-32 w-auto rounded-full "
            alt="Images"
          />

          <ActionForm
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
            isLoading={editDataIsLoading}
            showCancelButton={true}
            btnOnClick={() => navigate("/settings")}
            isLoadingText="saving..."
            notLoadingText="save"
            inputs={inputFields}
          />
        </ActionFormTemplate>
      )}
    </Container>
  );
}
