import React from "react";
import ReactApexChart from "react-apexcharts";

class CardAreaCharts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		series: [{
            name: 'Net Profit',
            data: [100,300, 100, 400, 200, 400,100,300, 100, 400, 200, 400,400, 200, 400],         
        }],
      options: {
        chart: {
            type: 'area',
			height: 70,
			width: 600,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
        },
		colors:['var(--primary)'],
        dataLabels: {
            enabled: false,
        },  
        legend: {
            show: false,
        },
        stroke: {
            show: true,
            width: 6,
            curve:'smooth',
            colors:[props.color1],
        },
        grid: {
			show:false,
			borderColor: '#eee',
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		},
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0
                }
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0
                }
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'none',
                    value: 0
                }
            }
        },
        xaxis: {
			// categories: ['Jan', 'feb', 'Mar', 'Apr', 'May','June','July','Aug','Sep', 'Oct', 'Nov','Dec', 'Jan', 'Feb', 'Mar'],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false
			},
			labels: {
				show: false,
				style: {
					fontSize: '12px',
				}
			},
			
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
        yaxis: {
			show: false,
		},
		fill: {
			type:'solid',
            opacity: 0.3,
            // colors:'rgba(113, 117, 121, 0.14)'
            colors : props.color2
		},
		tooltip: {
			enabled:false,
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "$" + val + " thousands"
				}
			}
		}
      },
    };
  }
	render() {
		return (
			<div id="totalInvoices">                
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="area"
				  height={70}
                  width= {600}
				/>                
			</div>
		);
	}
}

export default CardAreaCharts;
