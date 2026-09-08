import React from "react";
import "./PriceSlider.css";

const PriceSlider = ({ values, onChange }) => {
  const minPrice = values[0];
  const maxPrice = values[1];

  const handleMinChange = (event) => {
    const newMin = Number(event.target.value);

    if (newMin <= maxPrice) {
      onChange([newMin, maxPrice]);
    }
  };

  const handleMaxChange = (event) => {
    const newMax = Number(event.target.value);

    if (newMax >= minPrice) {
      onChange([minPrice, newMax]);
    }
  };

  const formatSliderValue = (value) =>
    `₹${value.toLocaleString()}`;

  return (
    <div className="price-range-slider">
      <h3>Price Range</h3>

      <div
        className="range-bar"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="slider"
          style={{ marginBottom: "14%" }}
        >
          <p>Minimum Price</p>

          <input
            type="range"
            min="0"
            max="50000"
            step="100"
            value={minPrice}
            onChange={handleMinChange}
            className="slider-input"
          />

          <span className="slider-value">
            {formatSliderValue(minPrice)}
          </span>
        </div>

        <div className="slider">
          <p>Maximum Price</p>

          <input
            type="range"
            min="0"
            max="50000"
            step="100"
            value={maxPrice}
            onChange={handleMaxChange}
            className="slider-input"
          />

          <span className="slider-value">
            {formatSliderValue(maxPrice)}
          </span>
        </div>
      </div>

      <p className="range-text">
        {formatSliderValue(minPrice)} -{" "}
        {formatSliderValue(maxPrice)}
      </p>
    </div>
  );
};

export default PriceSlider;
// import React, { useState } from "react";
// import "./PriceSlider.css";
// import StayData from "./StayData";

// const PriceSlider = () => {
//  const [sliderValues, setSliderValues] = useState({ min: 130, max: 250 });

//   const handleSliderChange = (event) => {
//     const { name, value } = event.target;
//     setSliderValues({ ...sliderValues, [name]: parseInt(value, 10) });
//   };

//   const formatSliderValue = (value) => `₹${value.toLocaleString()}`;

  
//   return (
//     <div className="price-range-slider">
//       <div
//         className="range-bar"
//         style={{ display: "flex", flexDirection: "column" }}
//       >
//         <div className="slider" style={{ marginBottom: "14%" }}>
//           <p>Minimum Price</p>
//           <input
//             type="range"
//             min={130}
//             max={500}
//             name="min"
//             value={sliderValues.min}
//             onChange={handleSliderChange}
//             className="slider-input"
//           />
//           <span className="slider-value">
//             {formatSliderValue(sliderValues.min)}
//           </span>
//         </div>
//         <div className="slider">
//           <p>Maximum Price</p>
//           <input
//             type="range"
//             min={sliderValues.min}
//             max={10000}
//             name="max"
//             value={sliderValues.max}
//             onChange={handleSliderChange}
//             className="slider-input"
//           />
//           <span className="slider-value">
//             {formatSliderValue(sliderValues.max)}
//           </span>
//         </div>
//       </div>
//       <p className="range-text">
//         <input
//           type="text"
//           value={`${formatSliderValue(sliderValues.min)} - ${formatSliderValue(
//             sliderValues.max
//           )}`}
//           style={{
//             backgroundColor: `rgb(240, 230, ${Math.round(
//               (sliderValues.max / 500) * 255
//             )})`,
//             width: "50%",
//           }}
//           readOnly
//           className="range-text-input"
//         />
//       </p>
//     </div>
//   );
// };

// export default PriceSlider;
