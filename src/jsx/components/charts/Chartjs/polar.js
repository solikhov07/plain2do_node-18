import React, { Component } from "react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea  } from "react-chartjs-2";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const data = {
   defaultFontFamily: "Poppins",
   datasets: [
      {
         data: [15, 18, 9, 6, 19],
         borderWidth: 0,
         backgroundColor: [
            "rgba(235, 129, 83,1)",
            "rgba(112, 159, 186, 1)",
            "rgba(238, 60, 60, 1)",
            "rgba(0, 161, 93, 1)",
            "rgba(91,207,197, 1)",
         ],
      },
   ],
};

const options = {
	type: 'polarArea',
   plugins:{   
	   responsive: true,
   },
   scales: {
		r:{
			ticks: {
				display: false,
			},
			grid: {
				display: false,
			},
		},
		
	},
   maintainAspectRatio: false,
};
class PolarChart extends Component {
   render() {
      return <PolarArea  data={data} options={options} height={150} />;
   }
}

export default PolarChart;
