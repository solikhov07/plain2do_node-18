import React from "react";

import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

const sampleData = [27, 31, 35, 28, 45, 52, 24, 4, 50, 11, 54, 49, 72, 59, 75];

function Clolesterol() {
  return (
    <Sparklines data={sampleData} height={50}>
      <SparklinesLine color="#5bcfc5" style={{ fill: "#5bcfc5" }} />
      <SparklinesSpots />
    </Sparklines>
  );
}

export default Clolesterol;
