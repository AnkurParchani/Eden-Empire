import { Link } from "react-router-dom";

export default function ShowSearchItems({ items, handleClose }) {
  return (
    <div className="absolute z-40 w-full rounded-sm bg-gray-50 px-2 py-2 shadow-md">
      {items.map((item) => (
        <Item key={item.linkTo} handleClose={handleClose} item={item} />
      ))}
    </div>
  );
}

function Item({ item, handleClose }) {
  const { img, linkTo, searchValue, matched } = item;

  return (
    <Link
      onClick={handleClose}
      to={`/items/${linkTo}`}
      className="duration-50 flex gap-3 border-b border-gray-300 py-2 hover:bg-gray-200"
    >
      <img
        alt="item-img"
        src={`/items-images/${img}`}
        className="h-16 sm:h-20"
      />
      <div className="flex flex-col gap-0.5 text-xs capitalize sm:text-sm">
        {matched.map((match, i) => {
          return (
            <h1 key={i} className="font-semibold text-gray-800">
              {match.key}:{" "}
              <span className="font-normal text-gray-600">{match.value}</span>
            </h1>
          );
        })}
      </div>
    </Link>
  );
}

export function NoItemsFound() {
  return (
    <div className="absolute z-40 w-full rounded-sm bg-gray-50 px-2 py-2 text-xs font-medium text-gray-600 shadow-md sm:text-sm">
      <h1>No Items found :(</h1>
    </div>
  );
}
