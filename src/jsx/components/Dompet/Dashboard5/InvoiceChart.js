import React,{Component} from "react";
import { Bar } from "react-chartjs-2";

class InvoiceChart extends Component {
	render() {
		var activityData = [
			[35, 18, 15, 35, 40, 20, 30, 25, 22, 20, 45, 35, 35, 18, 15, 35, 40, 20, 30, 25, 22, 20, 45, 35, 30, 25, 22, 20, 45, 35],
			[50, 35, 10, 45, 40, 50, 60, 35, 10, 50, 34, 35, 50, 35, 10, 45, 40, 50, 60, 35, 10, 50, 34, 35, 60, 35, 10, 50, 34, 35],
			[20, 35, 60, 45, 40, 35, 30, 35, 10, 40, 60, 20, 20, 35, 60, 45, 40, 55, 30, 35, 10, 33, 60, 20, 30, 35, 55, 33, 60, 20],
			[25, 88, 25, 50, 21, 42, 60, 33, 50, 60, 50, 20, 25, 55, 25, 50, 18, 25, 22, 15, 50, 60, 50, 25, 60, 45, 50, 60, 50, 20],
		];
		const data = {
			labels: ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],
			datasets: [{
				label: "My First dataset",
				backgroundColor: 'rgba(91, 207, 197, 1)',
				borderColor: 'var(--primary)',
				data: activityData[this.props.dataActive],
				borderWidth: "0",
                borderRadius:8,
				barThickness:8,
				minBarLength:10,
				barPercentage: 0.3,
			}]
		};
		const options = {
			responsive: true,
			maintainAspectRatio: false,
			
			plugins:{
				legend:false,
                tooltip: {
                    mode: "index",
                    intersect: false,
                    titleColor: "#888",
                    bodyColor: "#555",
                    titleFontSize: 12,
                    bodyFontSize: 15,
                    backgroundColor: "rgba(255,255,255,1)",
                    displayColors: true,
                    xPadding: 10,
                    yPadding: 7,
                    borderColor: "rgba(220, 220, 220, 1)",
                    borderWidth: 1,
                    caretSize: 6,
                    caretPadding: 10
                }
			},
			scales: {
				y: {
					max: 60,
                    min: 0,
                    grid: {
                        color: "rgba(233,236,255,1)",
                        drawBorder: false,
                        dislay:false,
                    },
                    ticks: {
                        fontColor: "#3e4954",
                        stepSize: 20
                    },
				},
				x: {					
					grid: {
						display: false,
						zeroLineColor: "transparent"
					},
					ticks: {
						stepSize: 20,
						fontColor: "#6E6E6E",
						fontFamily: "Nunito, sans-serif"
					}
				}
			},
			
		};

		return (
		  <div style={{ minHeight: "250px" }}>
			<Bar
			  data={data}
			  width={this.props.width ? this.props.width : 433}
			  height={this.props.height ? this.props.height : 200}
			  options={options}
			/>
		  </div>
		);
   }
}

export default InvoiceChart;