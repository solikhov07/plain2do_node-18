import React, { Component } from "react";
import { Line } from 'react-chartjs-2';

import 'chart.js/auto'


class LineChart1 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "My First dataset",
          data: [25, 20, 50, 41, 55, 45, 70],
          borderColor: "rgba(91,207,197,1)",
          borderWidth: this.props.borderWidth ? this.props.borderWidth : "2",          
          backgroundColor: "rgba(91,207,197, 0)",
		      tension:0.4
        },
      ],
    };

    const options = {
      plugins:{		  
		  legend: {
			  display:false
		  }
	  },
      scales: {
        y: 
          {
             min: 0,	
			max: 100,
            ticks: {
              beginAtZero: true,    
              padding: 0,
            },
          },
        
        x: 
          {
            ticks: {
              padding: 0,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        
      },
    };
    return (
      <>
        <Line
          data={data}
          options={options}
          height={this.props.height ? this.props.height : 150}
        />
      </>
    );
  }

}

export default LineChart1;
