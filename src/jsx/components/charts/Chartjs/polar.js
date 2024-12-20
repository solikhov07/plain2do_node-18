import React, { Component } from "react";
import { PolarArea  } from "react-chartjs-2";

const data = {
   defaultFontFamily: "Poppins",
   datasets: [
      {
         data: [15, 18, 9, 6, 19],
         borderWidth: 0,
         backgroundColor: [
            "rgba(91, 207, 193,1)",
            "rgba(112, 159, 186, 1)",
            "rgba(238, 60, 60, 1)",
            "rgba(54, 147, 255, 1)",
            "rgba(255, 92, 0, 1)",
         ],
      },
   ],
};

const options = {
   responsive: true,
   maintainAspectRatio: false,
};
class PolarChart extends Component {
   render() {
      return <PolarArea  data={data} options={options} height={150} />;
   }
}

export default PolarChart;
