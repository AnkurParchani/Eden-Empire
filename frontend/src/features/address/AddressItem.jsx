import { useState } from "react";
import ActionButton from "../../ui/ActionButton";
import DeleteAddressModal from "./DeleteAddressModal";
import EditAddressModal from "./EditAddressModal";
import RestoreAddressModal from "./RestoreAddressModal";

export default function AddressItem({ address, inTrash }) {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [restoreIsOpen, setRestoreIsOpen] = useState(false);

  const {
    flatArea,
    _id: addressId,
    flatNumber,
    pincode,
    phoneNumber,
    typeOfAddress,
    city,
    state,
    fullName,
  } = address;

  return (
    <>
      <div className=" relative mt-2 flex flex-col gap-2 bg-gray-50 pt-2 text-sm tracking-tight text-[#696e79] shadow-lg">
        <p className="absolute right-2 top-2  rounded-full  bg-gray-200 px-2 py-0.5 text-center text-xs font-bold uppercase md:px-3">
          {typeOfAddress}
        </p>
        <h1 className="px-2 text-base font-semibold capitalize tracking-normal">
          {fullName}
        </h1>
        <div className="px-2 leading-tight tracking-normal">
          <h3 className="capitalize ">{flatArea}</h3>
          <h3 className="capitalize">{flatNumber}</h3>
          <h3>
            {city} - {pincode}
          </h3>
          <h3>{state}</h3>
        </div>
        <h3 className="px-2 tracking-normal">Mobile: {phoneNumber}</h3>
        <div className="mt-2 grid grid-cols-2">
          {/* If user is not on Trash address page */}
          {!inTrash && (
            <ActionButton
              noBorderTop
              btnText="edit"
              onClick={() => setEditIsOpen(true)}
            />
          )}

          {/* If user is on Trash address page */}
          {inTrash && (
            <ActionButton
              noBorderTop
              btnText="restore"
              onClick={() => setRestoreIsOpen(true)}
            />
          )}

          {/* If user is in trash then Delete otherwise if he is in normal address page then remove */}
          <ActionButton
            onClick={() => setDeleteIsOpen(true)}
            noBorderTop
            btnText={inTrash ? "Delete" : "Remove"}
          />
        </div>
      </div>

      {/* If Delete Address */}
      {deleteIsOpen && (
        <DeleteAddressModal
          addressId={addressId}
          inTrash={inTrash}
          deleteIsOpen={deleteIsOpen}
          setDeleteIsOpen={setDeleteIsOpen}
        />
      )}

      {/*  If Edit Address */}
      {!inTrash && editIsOpen && (
        <EditAddressModal
          editIsOpen={editIsOpen}
          addressId={addressId}
          setEditIsOpen={setEditIsOpen}
          address={address}
        />
      )}

      {/*  If Restore Address */}
      {inTrash && restoreIsOpen && (
        <RestoreAddressModal
          restoreIsOpen={restoreIsOpen}
          addressId={addressId}
          setRestoreIsOpen={setRestoreIsOpen}
        />
      )}
    </>
  );
}
