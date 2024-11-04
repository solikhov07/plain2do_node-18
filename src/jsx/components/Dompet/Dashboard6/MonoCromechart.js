import React from "react";
import ReactApexChart from "react-apexcharts";

class MonoCromechart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [38, 62],	
			options:{
				chart: {
					type: 'pie',
          width: '100%',					
				},
        labels: ["", ""],
        theme: {
            monochrome: {
              enabled: true
            }
        },
				plotOptions: {
            pie: {
              dataLabels: {
                offset: -5
              }
            }
        },
        fill: {
            colors:['#FFB067','var(--primary)']
        },
				// stroke: {
				// 	width: 0,
				// },
        dataLabels: {
            textAnchor: 'middle',
            style: {
              colors: ["#fff"],
              fontSize: '16px',
              fontWeight: 'light',
            },
            dropShadow: {
              enabled: false,
            },
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed() + '%']
            }
        },
        legend: {
          show: false
        }
				
			},					
		};
	}

	render() {
		return (
			<div id="monocromeChart" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="pie"
				//   height={200} 
				/>
			</div>
		);
	}
}

export default  MonoCromechart;