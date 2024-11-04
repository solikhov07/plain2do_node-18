
import React from "react";
import ReactApexChart from "react-apexcharts";

class  PieChart7 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [34, 12, 41, 22],	
			options:{
				chart: {
					type: 'donut',
                    // width: '100%',
                    height:250					
				},
                dataLabels:{
                    enabled: false
                },
                stroke: {
                  width: 0,
                },
                colors:['#2BC155', '#FF7A30', '#FFEF5F', '#6418C3'],
                legend: {
                      position: 'bottom',
                      show:false
                    },
                responsive: [{
                  breakpoint: 768,
                  options: {
                   chart: {
                      height:200
                    },
                    
                  }
                }]
            }			
		};
	}

	render() {
		return (
			<div id="pieChart2" className="d-inline-block pieChart1">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="donut"
				  height={250} 
				/>
			</div>
		);
	}
}

export default PieChart7;
