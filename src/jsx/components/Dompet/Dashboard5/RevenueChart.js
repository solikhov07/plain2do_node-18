import React from "react";
import ReactApexChart from "react-apexcharts";
    
class RevenueChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'Net Profit',
                data: [31, 40, 28, 51, 42, 109, 100],
                //radius: 12,	
            }, 
            {
              name: 'Revenue',
              data: [11, 32, 45, 32, 34, 52, 41]
            }, ],
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                    toolbar: {
                        show: false
                    },                    
                },
                plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: '55%',
                      endingShape: 'rounded'
                    },
                },
                colors:['#80ec67', '#fe7d65'],
                dataLabels: {
                    enabled: false
                },
                markers: {
                    shape: "circle",
                },
                legend: {
                    show: true,
                    fontSize: '12px',
                    
                    labels: {
                        colors: '#000000',
                        
                    },
                    position: 'top',
                    horizontalAlign: 'left', 	
                    markers: {
                        width: 19,
                        height: 19,
                        strokeWidth: 0,
                        strokeColor: '#fff',
                        fillColors: undefined,
                        radius: 4,
                        offsetX: -5,
                        offsetY: -5	
                    }
                },
                stroke: {
                    show: true,
                    width: 4,
                    colors:['#80ec67', '#fe7d65'],
                },                  
                grid: {
                    borderColor: '#eee',
                },
                xaxis: {				
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'],
                    labels: {
                        style: {
                          colors: '#3e4954',
                          fontSize: '13px',
                          fontFamily: 'Poppins',
                          fontWeight: 100,
                          cssClass: 'apexcharts-xaxis-label',
                      },
                    },
                    crosshairs: {
                        show: false,
                    }
                },
                yaxis: {
                    labels: {
                   style: {
                      colors: '#3e4954',
                      fontSize: '13px',
                       fontFamily: 'Poppins',
                      fontWeight: 100,
                      cssClass: 'apexcharts-xaxis-label',
                  },
                  },
                },
                fill: {
                  opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "$ " + val + " thousands"
                        }
                    }
                }
                
            }, 
        };
    }

    render() {
        return (
            <div id="chartBar" >
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="area"
                    height={350} 
                />
            </div>
        );
    }
}

export default RevenueChart;