import React, { useState } from "react";
import Flights from "./Flight";
import SideBar from "./SideBar";

const FlightData = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    from: "",
    to: "",
  });

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