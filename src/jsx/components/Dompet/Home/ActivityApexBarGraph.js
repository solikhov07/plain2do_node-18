import React from "react";
import ReactApexChart from "react-apexcharts";

class ActivityApexBarGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		series: [
			{
				name: 'Income',
				data: [50, 18, 70, 40],
				//radius: 12,	
			}, 
			{
			  name: 'Outcome',
			  data: [80, 40, 55, 20]
			}, 
			
		],
      options: {
        chart: {
			height: 200,
			type: "bar",
			toolbar: {
				show: false,
			},
        },
		plotOptions: {
			bar: {
				borderRadius: 6,
			  	horizontal: false,
			  	columnWidth: '57%',
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
          width: 4,
          colors: ['transparent'],
		 
        },
        grid:{
			borderColor: '#eee',
		},
        
        xaxis: {
			categories: ['Sun', 'Mon', 'Tue', 'Wed'],
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
			breakpoint: 1600,
			options: {
				chart: {
					height: 400,
				}
			},
		},
		{
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
				  height={200}
				/>
			</div>
		);
	}
}

export default ActivityApexBarGraph;