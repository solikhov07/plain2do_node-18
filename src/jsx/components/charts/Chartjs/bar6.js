import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart6 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Orange",
          backgroundColor: "rgba(235, 129, 83, 1)",
          hoverBackgroundColor: "rgba(235, 129, 83, 1)",
          data: ["12", "12", "12", "12", "12", "12", "12"],
        },
        {
          label: "Blue",
          backgroundColor: "rgba(64,24,157, 1)",
          hoverBackgroundColor: "rgba(64,24,157, 1)",
          data: ["12", "12", "12", "12", "12", "12", "12"],
        },
        {
          label: "Green",
          backgroundColor: "rgba(91,207,197, 1)",
          hoverBackgroundColor: "rgba(91,207,197, 1)",
          data: ["12", "12", "12", "12", "12", "12", "12"],
        },
      ],
    };
    const options = {
      plugins:{
		  legend: {
			display: false,
		  },
		  title: {
			display: false,
		  },
		  tooltips: {
			mode: "index",
			intersect: false,
		  },
		  responsive: true,
	  },
      scales: {
        x:
          {
            stacked: true,
          },
        y:
          {
            stacked: true,
          },
      },
    };

    return (
      <>
        <Bar data={data} height={150} options={options} />
      </>
    );
  }
}

export default BarChart6;
