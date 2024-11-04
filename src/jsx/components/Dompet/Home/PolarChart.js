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
	type : 'polarArea',
	defaultFontFamily: "Poppins",
	datasets: [
	   {
			data: [40, 35, 30, 20],
		  	//borderWidth: 0,
			backgroundColor: [
				"#496ecc",
				"#68e365",
				"#ffa755",
				"#c8c8c8"
		  ],
	   },
	],
};

const options = {
	type : 'polarArea',
	plugins:{   
		responsive: true,
	},
	maintainAspectRatio: false,
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
	tooltips:{
		enabled:false,
	}	
};



class PolarChart extends Component {
   render() {		
		return (			
			<PolarArea data={data} height={200} options={options} />			
		);
   }
}

export default PolarChart;
