import React, { useState } from "react";
import Flights from "./Flight";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";

const FlightData = () => {
  const location = useLocation();

  const [searchCriteria, setSearchCriteria] = useState(
    location.state?.searchCriteria || {
      from: "",
      to: "",
    }
  );

  return (
    <div>
      <Flights onSearch={setSearchCriteria} />

      <SideBar searchCriteria={searchCriteria} />
    </div>
  );
};

export default FlightData;
// import React from 'react'
// import Flights from './Flight'
// import SideBar from './SideBar'

// const FlightData = () => {
//   return (
//     <div>
//             <Flights/>
//             <SideBar/>
//     </div>
//   )
// }

// export default FlightData