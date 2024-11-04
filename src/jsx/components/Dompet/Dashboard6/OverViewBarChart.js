import React from "react";
import ReactApexChart from "react-apexcharts";
    
class OverViewBarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'series1',
                data: [800, 440, 360, 510, 420, 680, 400,200,700]
              }, {
                name: 'series2',
                data: [210, 320, 130, 320, 150, 310, 120,620,320]
              } ],
            options: {
                chart: {
                    height: 350,
                    type: 'area',
                    toolbar:false                    
                },               
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 4,
                    colors: ['#80ec67','#fe7d65'],
                },
                legend: {
                    show: false,
                },
                markers: {
                    size: 0,
                    border:0,
                    colors: ['#80ec67','#fe7d65'],
                    hover: {
                      size: 7,
                    }
                },
                yaxis: {
                      labels: {
                     style: {
                        colors: '#3e4954',
                        fontSize: '14px',
                         fontFamily: 'Poppins',
                        fontWeight: 100,
                        
                      },
                       formatter: function (y) {
                                return y.toFixed(0) + "k";
                              }
                    },
                },
                xaxis: {
                    type: 'month',
                    categories: ["April", "May", "June", "July", "August", "September", "October", "November", "Dec.."]
                },
                colors: ['#80ec67','#fe7d65'],
                fill: {
                    colors: ['#80ec67','#fe7d65'],
                },
                tooltip: {
                    x: {
                      format: 'month'
                    },
                },

                
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

export default OverViewBarChart;