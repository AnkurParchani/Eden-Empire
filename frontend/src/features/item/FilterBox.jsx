import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import CloseBtn from "../../ui/CloseBtn";
import OverlayClick from "../../ui/OverlayClick";
import Button from "../../ui/Button";

export default function FilterBox({ isOpenFilter, setIsOpenFilter }) {
  const [filterQuery, setFilterQuery] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(location.search);

  function handleCloseClick() {
    setIsOpenFilter(false);
  }

  function handleFilterClick() {
    const { gender, priceAfterDiscountGT, priceAfterDiscountLT, category } =
      filterQuery;

    if (gender === "none") {
      urlSearchParams.delete("gender");
    } else if (gender && gender !== "none") {
      urlSearchParams.set("gender", gender);
    }

    if (category === "none") {
      urlSearchParams.delete("category");
    } else if (category && category !== "none") {
      urlSearchParams.set("category", category);
    }

    if (priceAfterDiscountLT === "none") {
      urlSearchParams.delete("priceAfterDiscount[lt]");
    } else if (priceAfterDiscountLT && priceAfterDiscountLT !== "none") {
      urlSearchParams.set("priceAfterDiscount[lt]", priceAfterDiscountLT);
    }

    if (priceAfterDiscountGT === "none") {
      urlSearchParams.delete("priceAfterDiscount[gt]");
    } else if (priceAfterDiscountGT && priceAfterDiscountGT !== "none") {
      urlSearchParams.set("priceAfterDiscount[gt]", priceAfterDiscountGT);
    }

    const urlSearch = urlSearchParams.toString();

    location.search = `?${urlSearch}`;
    navigate(location.search);
  }

  return (
    <>
      {isOpenFilter && <OverlayClick onClick={handleCloseClick} />}

      <div className="fixed bottom-0 left-16 right-0 z-50 flex flex-col gap-2 bg-gray-300 px-2 pb-3 pt-1">
        <div className="pr-1 text-end text-lg">
          <CloseBtn onClick={handleCloseClick} />
        </div>

        <div className="mb-2 flex flex-col gap-2.5">
          <FilterSelect
            filterName="gender"
            getName="gender"
            filterQuery={filterQuery}
            setFilterQuery={setFilterQuery}
            labelName="Gender"
            options={[
              { name: "All", value: "none" },
              { name: "Men", value: "men" },
              { name: "Women", value: "women" },
            ]}
          />
          <FilterSelect
            filterQuery={filterQuery}
            filterName="category"
            getName="category"
            setFilterQuery={setFilterQuery}
            labelName="Category"
            options={[
              { name: "All", value: "none" },
              { name: "Clothes", value: "clothes" },
              { name: "Shoes", value: "shoes" },
              { name: "Sunglasses", value: "sunglasses" },
              { name: "Watches", value: "watches" },
            ]}
          />

          <div className="flex gap-2">
            <p className="text-sm font-medium">Price:- </p>
            <FilterSelect
              filterQuery={filterQuery}
              getName="priceAfterDiscount[gt]"
              setFilterQuery={setFilterQuery}
              filterName="priceAfterDiscountGT"
              labelName="Min"
              options={[
                { name: "All", value: "none" },
                { name: "500", value: "500" },
                { name: "1000", value: "1000" },
                { name: "1500", value: "1500" },
                { name: "3000", value: "3000" },
              ]}
            />
            <FilterSelect
              filterQuery={filterQuery}
              getName="priceAfterDiscount[lt]"
              setFilterQuery={setFilterQuery}
              filterName="priceAfterDiscountLT"
              labelName="Max"
              options={[
                { name: "All", value: "none" },
                { name: "500", value: "500" },
                { name: "1000", value: "1000" },
                { name: "1500", value: "1500" },
                { name: "3000", value: "3000" },
              ]}
            />
          </div>
        </div>
        <Button onClick={handleFilterClick}>Apply</Button>
      </div>
    </>
  );
}

function FilterSelect({
  labelName,
  options,
  getName,
  filterQuery,
  setFilterQuery,
  filterName,
}) {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);

  function handleChange(e) {
    setFilterQuery({ ...filterQuery, [filterName]: e.target.value });
  }

  return (
    <label className="text-sm font-medium">
      {labelName}:
      <select
        defaultValue={urlSearchParams.get(getName)}
        className="ml-2 rounded-sm bg-gray-50 text-center text-sm font-normal"
        onChange={handleChange}
      >
        {options.map((option) => (
          <option value={option.value} key={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
}
