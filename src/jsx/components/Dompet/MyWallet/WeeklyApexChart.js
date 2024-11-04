import React from "react";
import ReactApexChart from "react-apexcharts";

class WeeklyApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		series: [{
			name: "Income",
			data: [10, 30, 20, 40, 20, 45, 10]
			},
			{
				name: "Expense",
				data: [10, 15, 10, 30, 15, 35, 5]
			},
			{
				name: "Unknown",
				data: [5, 15, 5, 15, 10, 25, 5]
			}
		],
      options: {
        chart: {
          height: 170,
          type: "line",
          toolbar: {
            show: false,
			},
        },
		plotOptions: {
			bar: {
			  borderRadius: 8,
			  horizontal: false,
			  columnWidth: '57%',
			},
		  },
        colors:['#68e365','#ff4b4b','#969ba0'],
        legend: {
			show: false,
		},
		
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
		  width:3
        },
        grid:{
			xaxis: {
				lines: {
					show: true
				}
			},  
		},
        
        xaxis: {
			 categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		},
		yaxis: {
			show:false
		},
      },
    };
  }

	render() {
		return (
			<div id="chart">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="line"
				  height={170}
				/>
			</div>
		);
	}
}

export default WeeklyApexChart;
