import Button from "./Button";
import ConfirmationModalHeading from "./ConfirmationModalHeading";
import ConfirmationModalSubHeading from "./ConfirmationModalSubHeading";
import ConfirmationModalTemplate from "./ConfirmationModalTemplate";
import OverlayClick from "./OverlayClick";

export default function ConfirmationModal({
  modalIsOpen,
  modalHeading,
  modalSubHeading,
  onClose,
  buttons,
  marginLeft,
}) {
  return (
    <>
      {modalIsOpen && <OverlayClick onClick={onClose} />}

      <ConfirmationModalTemplate marginLeft={marginLeft}>
        <div className="flex flex-col gap-1 py-4 sm:py-4">
          <ConfirmationModalHeading>{modalHeading}</ConfirmationModalHeading>

          <ConfirmationModalSubHeading>
            {modalSubHeading}
          </ConfirmationModalSubHeading>
        </div>
        <div className="grid grid-cols-2 sm:mx-4 sm:gap-3">
          {buttons.map((button) => (
            <Button
              key={button.btnText}
              onClick={button.onClick}
              secondaryButton={button.secondaryButton}
            >
              {button.btnText}
            </Button>
          ))}
        </div>
      </ConfirmationModalTemplate>
    </>
  );
}
