import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class WeeklyPieChart extends Component {
   render() {
			
		const data = {
			weight: 5,	
			defaultFontFamily: 'Poppins',
			datasets: [{
				data: [50, 30, 20],
				borderWidth: 0, 
				borderColor: "rgba(255,255,255,1)",
				backgroundColor: [
					"#8df05f",
					"#ff4b4b",
					"#e3e3e3"
				],
				hoverBackgroundColor: [
					"#8df05f",
					"#ff4b4b",
					"#e3e3e3"
				]
			}],
		};
		const options = {
			weight: 1,	
			cutout: "70%",
			responsive: true,
			aspectRatio:5,
			maintainAspectRatio: false
		};

      return (
         <>
            <Pie data={data} height={160} options={options} />
         </>
      );
   }
}

export default WeeklyPieChart;
