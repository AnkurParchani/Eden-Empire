export default function CheckoutAddressItemDesciption({ items }) {
  return (
    <div className="mt-5">
      <h1 className="px-2 text-xs font-bold uppercase text-gray-700">
        Delivery Estimates
      </h1>

      <div className="flex flex-col">
        {items.map((item) => (
          <Item key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

function Item({ item }) {
  return (
    <div className="flex items-center gap-2 rounded-sm px-2 py-3 text-xs shadow-md">
      <img
        alt="item-image"
        className="h-12"
        src={`/items-images/${item.item.mainImageFilename}`}
      />
      <h1 className="text-gray-600">
        Estimated delivery by{" "}
        <span className="font-bold text-gray-800">Simulation Only</span>
      </h1>
    </div>
  );
}
