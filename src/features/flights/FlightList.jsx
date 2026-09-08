import React, { useEffect, useState } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";
import API_URL from "../../services/api";

export default function FlightList({
  page,
  priceValue,
  searchCriteria,
  onTotalPages,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API_URL}/flight`);

        let filteredFlights = res.data;

        // Filter by departure city
        if (searchCriteria?.from) {
          filteredFlights = filteredFlights.filter(
            (flight) =>
              flight.from?.toUpperCase() ===
              searchCriteria.from.toUpperCase()
          );
        }

        // Filter by destination
        if (searchCriteria?.to) {
          filteredFlights = filteredFlights.filter(
            (flight) =>
              flight.to?.toUpperCase() ===
              searchCriteria.to.toUpperCase()
          );
        }

        // Filter by price
        if (priceValue !== "all") {
          const upperPrice = Number(priceValue) * 1000;
          const lowerPrice = upperPrice - 1000;

          filteredFlights = filteredFlights.filter((flight) => {
            const price = Number(flight.price);

            return (
              price >= lowerPrice &&
              price <= upperPrice
            );
          });
        }

        // Calculate pagination
        const totalPages = Math.max(
          1,
          Math.ceil(filteredFlights.length / 5)
        );

        onTotalPages(totalPages);

        const startIndex = (page - 1) * 5;
        const endIndex = startIndex + 5;

        setData(
          filteredFlights.slice(startIndex, endIndex)
        );
      } catch (error) {
        console.error("Flight fetch error:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [
    page,
    priceValue,
    searchCriteria,
    onTotalPages,
  ]);

  if (loading) {
    return <p>Loading flights...</p>;
  }

  if (data.length === 0) {
    return <p>No flights found for this search.</p>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <FlightCard data={item} />
        </div>
      ))}
    </div>
  );
}
// import React, { useEffect } from "react";
// import axios from "axios";
// import FlightCard from "./FlightCard";

// const getData = async (page, priceValue) => {
//   let res = await axios.get(
//     `https://makemytrip-api-data.onrender.com/flight?_page=${page}&_limit=5?&price_gte=${
//       priceValue - 2000
//     }&price_lte=${priceValue}`
//   );
//   return res.data;
// };

// export default function FlightList({ page, priceValue }) {
//   const [data, setData] = React.useState([]);

//   useEffect(() => {
//     getData(page, priceValue).then((res) => {
//       setData(res);
//     });
//   }, [page, priceValue]);

//   return (
//     <div>
//       {data.length > 0 &&
//         data.map((item) => {
//           return (
//             <div key={item.id}>
//               <FlightCard data={item} />
//             </div>
//           );
//         })}
//     </div>
//   );
// }
