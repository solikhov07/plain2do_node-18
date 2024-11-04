import React from "react";
import ReactApexChart from "react-apexcharts";

class EmailPieChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [10,20,35,35],	
			options:{
				chart: {
					type: 'donut',
					height: 200,
                    innerRadius: 50,  
				},
				dataLabels: {
					enabled: false,					
				},
				stroke: {
					width: 0,
				},
                plotOptions: {
                    pie: {
                       startAngle: 0, 
                        endAngle: 360,
                       donut: {
                            size: '80%',
                       },
                   },
                },
                 colors:[ '#2A353A', '#2BC844' ,'#9568FF', 'var(--primary)'],
                legend: {
                    position: 'bottom',
                        show:false
                },
				responsive: [{
					breakpoint: 768,
                    options: { 
                    chart: {
                        width:200
                        },
                    }
				}]
				
			},					
		};
	}

	render() {
		return (
			<div id="pieChart" className="d-inline-block">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="donut"
				  height={200} 
				/>
			</div>
		);
	}
}

export default  EmailPieChart;