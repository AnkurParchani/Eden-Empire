import { useState } from "react";

import ActionButton from "../../features/item/ActionButton";
import SortBox from "../../features/item/SortBox";
import FilterBox from "../../features/item/FilterBox";

export default function ItemActions() {
  const [isOpenSort, setIsOpenSort] = useState();
  const [isOpenFilter, setIsOpenFilter] = useState();

  function handleSortClick() {
    setIsOpenSort((open) => !open);
  }

  function handleFilterClick() {
    setIsOpenFilter((open) => !open);
  }

  return (
    <div className="mb-3 flex justify-end gap-2">
      <ActionButton
        onClick={handleSortClick}
        actionName="Sort"
        iconClass="fa-solid fa-sort"
      />
      <ActionButton
        onClick={handleFilterClick}
        actionName="Filter"
        iconClass="fa-solid fa-filter"
      />

      {isOpenSort && (
        <SortBox isOpenSort={isOpenSort} setIsOpenSort={setIsOpenSort} />
      )}

      {isOpenFilter && (
        <FilterBox
          isOpenFilter={isOpenFilter}
          setIsOpenFilter={setIsOpenFilter}
        />
      )}
    </div>
  );
}
