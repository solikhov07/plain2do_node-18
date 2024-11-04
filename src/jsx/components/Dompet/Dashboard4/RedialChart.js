import React from "react";
import ReactApexChart from "react-apexcharts";

class RedialChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [75],
			options: {
				chart: {
					type: 'radialBar',
					width: 180,
					height: 180,
				},
				colors:["#1EBA62"],
				plotOptions: {
					radialBar: {
						startAngle: -180,
						endAngle: 120,
						hollow: {
							size: '60%',
							background: 'var(--rgba-primary-1)',
							margin:15
						},
						dataLabels: {
							show: true,
							  name: {
								offsetY: 20,
								show: false,
								color: '#888',
								fontSize: '14px'
							},
							value: {
								formatter: function(val) {
								  return val + "%"
								},
								offsetY: 10,
								color: '#000000',
								fontWeight:700,
								fontSize: '18px',
								show: true,
							},
							
						},
						track: {
							background: '#FFF',
						}
					},
				
					
					stroke: {
					  lineCap: 'round'
					},
					labels: [''],
					responsive: [{
						breakpoint: 575,
						options: {
							chart: {
								height: 280,
							},
						}
					}],		
					
				},
			}					
			
		};
	}

	render() {
		return (
			<div id="redial" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="radialBar"
				  height={180} 
				  width={180} 
				/>
			</div>
		);
	}
}

export default RedialChart;