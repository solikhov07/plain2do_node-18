import React from "react";
import ReactApexChart from "react-apexcharts";

class ProjectAreaChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [{
                name: "Persent",
                data: [60, 70, 80, 50, 60, 70, 100]
              },
              {
                name: "Visitors",
				data: [40, 50, 40, 60, 70, 90, 100]
            }],
			options: {
				chart: {
					id: 'assetDistribution2',
					height: 300,
                    type: 'area',
                    group: 'social',
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    },
				},
				dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: [3, 3, 3],
                    colors:['var(--secondary)','var(--primary)'],
                    curve: 'straight'
                },
                legend: {
					show:false,
				    tooltipHoverFormatter: function(val, opts) {
					    return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
				    },
				    markers: {
                        fillColors:['var(--secondary)','var(--primary)'],
                        width: 10,
                        height: 10,
                        strokeWidth: 0,
                        radius: 16
				    }
				},
                markers: {
                    size: [8,8],
                    strokeWidth: [4,4],
                    strokeColors: ['var(--secondary)','var(--primary)'],
                    border:2,
                    radius: 2,
                    colors:['#fff','#fff','#fff'],
                    hover: {
                      size: 10,
                    }
                },
                xaxis: {
                    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'],
                    labels: {
                     style: {
                        colors: '#3E4954',
                        fontSize: '14px',
                        fontFamily: 'Poppins',
                        fontWeight: 100,
                        
                      },
                    },
                    axisBorder:{
                        show: false,
                    }
                },	
                yaxis: {
					labels: {
						minWidth: 20,
						offsetX:-16,
						style: {
						  colors: '#3E4954',
						  fontSize: '14px',
						   fontFamily: 'Poppins',
						  fontWeight: 100,
						  
						},
					},
				},
				fill: {
					colors:['#fff','#fff'],
					type:'gradient',
					opacity: 1,
					gradient: {
						shade:'light',
						shadeIntensity: 1,
						colorStops: [ 
						  [
							{
							  offset: 0,
							  color: '#fff',
							  opacity: 0
							},
							{
							  offset: 0.6,
							  color: '#fff',
							  opacity: 0
							},
							{
							  offset: 100,
							  color: '#fff',
							  opacity: 0
							}
						  ],
						  [
							{
							  offset: 0,
							  color: '#fff',
							  opacity: .4
							},
							{
							  offset: 50,
							  color: '#fff',
							  opacity: 0.25
							},
							{
							  offset: 100,
							  color: '#fff',
							  opacity: 0
							}
						  ]
						]
		
				    },
				},
				colors:['#1EA7C5','#FF9432'],
				grid: {
				  borderColor: '#f1f1f1',
				  xaxis: {
					lines: {
					  show: true
					}
				  },
				  yaxis: {
					lines: {
					  show: false
					}
				  },
				},
				
				responsive: [{
					breakpoint: 1602,
					options: {
						markers: {
							 size: [6,6,4],
							 hover: {
								size: 7,
							  }
						},chart: {
				    		height: 230,
						},	
					},
					
				}]
			}, 
		};
	}

	render() {
		return (
			<div id="activity" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="area"
				  height={300} 
				/>
			</div>
		);
	}
}

export default ProjectAreaChart;