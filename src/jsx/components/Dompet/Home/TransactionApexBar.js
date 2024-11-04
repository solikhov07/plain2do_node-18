import React from "react";
import ReactApexChart from "react-apexcharts";

class TransactionApexBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		series: [
			{
				name: 'Income',
				data: [50, 18, 70, 40, 90, 50],
				//radius: 12,	
			}, 
			{
			  name: 'Outcome',
			  data: [80, 40, 55, 20, 50, 70]
			},  
			
		],
      options: {
        chart: {
          height: 400,
          type: "bar",
          toolbar: {
            show: false,
			},
        },
		plotOptions: {
			bar: {
			  borderRadius: 10,
			  horizontal: false,
			  columnWidth: '70%',
			},
		  },
        colors:['#80ec67', '#fe7d65'],
        legend: {
				position: 'top',
				horizontalAlign: 'right', 
				show: false,
				fontSize: '12px',
			labels: {
				colors: '#000000',
			},
			markers: {
				width: 18,
				height: 18,
				strokeWidth: 0,
				strokeColor: '#fff',
				fillColors: undefined,
				radius: 12,	
			}
		},
		fill: {
          opacity: 1,
		  colors:['#80ec67', '#fe7d65'],
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 5,
          colors: ['transparent'],
		 
        },
        grid:{
			borderColor: '#eee',
		},
        
        xaxis: {
			categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
			labels: {
				style: {
					colors: '#3e4954',
				    fontSize: '13px',
				    fontFamily: 'poppins',
				    fontWeight: 400,
				    cssClass: 'apexcharts-xaxis-label',
				},
			},
			crosshairs: {
				show: false,
			}
		},
		yaxis: {
			labels: {
				offsetX:-16,
				style: {
					colors: '#3e4954',
					fontSize: '13px',
					fontFamily: 'poppins',
					fontWeight: 400,
					cssClass: 'apexcharts-xaxis-label',
				},
			},
		},
        tooltip: {
			y: {
				formatter: function (val) {
					return "$ " + val + " thousands"
				}
			}
        },
		responsive: [{
			breakpoint: 575,
			options: {
				chart: {
					height: 250,
				}
			},
		}]
      },
    };
  }

	render() {
		return (
			<div id="chart">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="bar"
				  height={400}
				/>
			</div>
		);
	}
}

export default TransactionApexBar;