import { useToggleAll } from "../../hooks/useBag";
import Spinner from "../../ui/Spinner";

export default function ToggleAll({
  checkedItemsLength,
  totalItemsLength,
  totalPriceAfterDiscount,
}) {
  const { mutate: toggleAllMutation, isLoading: toggleAllIsLoading } =
    useToggleAll();

  function handleCheckedToggle(checked) {
    toggleAllMutation({ isChecked: checked });
  }

  return (
    <>
      {toggleAllIsLoading && <Spinner type="fullPageFade" />}

      {totalItemsLength && (
        <div className="mt-4 flex gap-2 px-1.5 py-3 text-xs font-bold uppercase tracking-wide text-gray-600 shadow-sm">
          <label htmlFor="toggleAll" className="flex items-center gap-2">
            <input
              type="checkbox"
              id="toggleAll"
              className="scale-110 cursor-pointer accent-pink-500"
              checked={totalItemsLength === checkedItemsLength}
              onChange={(e) => handleCheckedToggle(e.target.checked)}
            />
            {checkedItemsLength}/{totalItemsLength} Items selected
          </label>
          {totalPriceAfterDiscount > 0 && (
            <h1 className="tracking-normal text-pink-600">
              (₹{totalPriceAfterDiscount})
            </h1>
          )}
        </div>
      )}
    </>
  );
}
