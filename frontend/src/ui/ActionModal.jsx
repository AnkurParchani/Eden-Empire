import { useForm } from "react-hook-form";

import ActionForm from "./ActionForm";
import ActionFormTemplate from "./ActionFormTemplate";
import Container from "./Container";
import Heading from "./Heading";

export default function ActionModal(props) {
  // Getting all the necessary props
  const {
    formHeading,
    closeModal,
    inputFields,
    isLoading,
    register,
    handleSubmit,
    onSubmit,
  } = props;

  // The modal structure
  return (
    <>
      <div
        onClick={closeModal}
        className="fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-50"
      ></div>
      <div className="fixed inset-x-0 top-0 z-20 mx-auto w-11/12 ">
        <Container>
          <ActionFormTemplate>
            <div className="relative">
              <i
                className="fa-solid fa-circle-xmark absolute -top-3 right-0 cursor-pointer text-2xl text-pink-600 duration-200 hover:text-pink-900"
                onClick={closeModal}
              />
              <div className="mt-5">
                <Heading>{formHeading}</Heading>
                <div className="max-h-[70vh] overflow-y-auto">
                  <ActionForm
                    isLoading={isLoading}
                    showCancelButton={true}
                    btnOnClick={closeModal}
                    inputs={inputFields}
                    notLoadingText="save"
                    onSubmit={onSubmit}
                    register={register}
                    handleSubmit={handleSubmit}
                    isLoadingText="saving..."
                  />
                </div>
              </div>
            </div>
          </ActionFormTemplate>
        </Container>
      </div>
    </>
  );
}
