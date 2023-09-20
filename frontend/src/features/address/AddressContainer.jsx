import AddressItem from "./AddressItem";

export default function AddressContainer({ addresses, inTrash }) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-lg font-bold  text-gray-700">
            {inTrash ? "Trash" : "Saved"} Addresses
          </h3>
          {addresses.map((address) => {
            return (
              <AddressItem
                inTrash={inTrash}
                key={address._id}
                address={address}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
