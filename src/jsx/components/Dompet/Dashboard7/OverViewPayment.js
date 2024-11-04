import React from "react";
import ReactApexChart from "react-apexcharts";
    
class OverViewPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'series1',
                data: [200, 300, 200, 300, 200, 300, 200,300]
              }, {
                name: 'series2',
                data: [600, 700, 600, 500, 600, 900, 500, 900]
              }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    toolbar:false                    
                },               
                colors:["#fe7d65","#80ec67"],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 7,
                },
                legend:{
                    show:false
                },
                grid:{
                    borderColor: '#AFAFAF',
                    strokeDashArray: 10,
                },
                yaxis: {
                    labels: {
                      style: {
                          colors: '#787878',
                          fontSize: '13px',
                          fontFamily: 'Poppins',
                          fontWeight: 400
                          
                      },
                      formatter: function (value) {
                        return value + "k";
                      }
                    },
                },
                xaxis: {
                    categories: ["April","May","June","July","August","September","October","November"],
                    labels:{
                        style: {
                          colors: '#787878',
                          fontSize: '13px',
                          fontFamily: 'Poppins',
                          fontWeight: 400
                          
                      },
                    },
                    axisBorder:{
                      show:false,  
                    },
                    axisTicks:{
                        show: false,
                  },
                    
                },
                tooltip: {
                    x: {
                      format: 'dd/MM/yy HH:mm'
                    },
                },

                
            }, 
        };
    }

    render() {
        return (
            <div id="marketChart" className="market-line">
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    height={350} 
                />
            </div>
        );
    }
}

export default OverViewPayment;