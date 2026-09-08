import React from "react";
import { useSearchParams } from "react-router-dom";
import PriceSlider from "./PriceSlider";

export const Sidebar = ({
  selectedPriceRange,
  setSelectedPriceRange,
  sortConfig,
  setSortConfig,
}) => {
  const [, setSearchParams] = useSearchParams();

  const handlePriceChange = (e) => {
    const selectedOrder = e.target.value;
    const selectedSort = "price";
    setSortConfig({ sort: selectedSort, order: selectedOrder });
  };
 
  const handleRatingChange = (e) => {
    const selectedOrder = e.target.value;
    const selectedSort = "rating";
    setSortConfig({ sort: selectedSort, order: selectedOrder });
  };

  React.useEffect(() => {
    let params = {};
    if (sortConfig.sort) {
      params["_sort"] = sortConfig.sort;
      params["_order"] = sortConfig.order;
    }
    setSearchParams(params);
  }, [setSearchParams, sortConfig]);

  return (
    <div>
      <h3>Filter By Price</h3>
      <div>
        <input
          type="radio"
          name="price"
          value={"asc"}
          checked={
            sortConfig.sort === "price" && sortConfig.order === "asc"
          }
          onChange={handlePriceChange}
        />
        <label>Low to High</label>
        <br />
        <input
          type="radio"
          name="price"
          value={"desc"}
          checked={
            sortConfig.sort === "price" && sortConfig.order === "desc"
          }
          onChange={handlePriceChange}
        />
        <label>High to Low</label>
      </div>
      <br />
      <br />
      <h3>Filter By Rating</h3>
      <div>
        <input
          type="radio"
          name="rating"
          value={"asc"}
          checked={
            sortConfig.sort === "rating" && sortConfig.order === "asc"
          }
          onChange={handleRatingChange}
        />
        <label>Low to High</label>
        <br />
        <input
          type="radio"
          name="rating"
          value={"desc"}
          checked={
            sortConfig.sort === "rating" && sortConfig.order === "desc"
          }
          onChange={handleRatingChange}
        />
        <label>High to Low</label>
      </div>
      <br/>
      <br/>
      <br/>
      <div>
        <PriceSlider
          values={selectedPriceRange}
          onChange={setSelectedPriceRange}
        />
      </div>
    </div>
  );
};

export default Sidebar;
