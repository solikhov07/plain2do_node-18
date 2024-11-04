import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from 'apexcharts';
import { Link } from "react-router-dom";

class StatisticBarChart extends React.Component {
  // componentDidMount() {
  //   var incomeBlog = document.querySelector("#dzIncomeSeries");
  //   var incomeClass = document.querySelector(".income-value");
  //     function toggleFunc2() {
  //       return incomeBlog.classList.toggle("disabled"), incomeBlog.classList.toggleSeries('Income')
  //     }  
  //     incomeClass.addEventListener("click", toggleFunc2);


  //   var expenseBlog = document.querySelector("#dzExpenseSeries");
  //   var expenseClass = document.querySelector(".expense-value");
  //     function toggleFunc() {
  //       return expenseBlog.classList.toggle("disabled")
  //     }  
  //     expenseClass.addEventListener("click", toggleFunc);   
	
  // }

//  componentDidMount() {
//     function toggleSeries(
//       id,
//       series,
//       e
//     ) {
//       const functionName =
//         e.target.value === hideText ? "hideSeries" : "showSeries";
//         e.target.value = e.target.value === hideText ? showText : hideText;
//         const chartSeries: ApexAxisChartSeries | undefined = series
//           ? (series as ApexAxisChartSeries)
//           : undefined;
//         const chartId = id ? id : "";

//         chartSeries?.forEach((ser) => {
//           ApexCharts.exec(chartId, functionName, ser.name);
//         });
//     }

//       return lineChartItems;
//     }
//   }

	constructor(props) {
		super(props);
		this.state = {
			series: [
				{
					name: 'Income',
					data: [31, 40, 28,31, 40, 28,31, 40, 28,31, 40, 28]
				}, 
				{
				  name: 'Expense',
				  data: [11, 32, 45,38, 25, 20,36, 45, 15,11, 32, 45]
				}, 
            ],
			options: {
				chart: {
					id: 'assetDistribution',
					type: "bar",
					height: 350,
					toolbar: {
						show: false,
					},
				},
				plotOptions: {
				bar: {
					horizontal: false,
					endingShape:'rounded',
					columnWidth: '45%',
					borderRadius: 5,                    
				},
          },
          colors:['#', '#77248B'],
          dataLabels: {
              enabled: false,
          },
          markers: {
              shape: "circle",
          },			
          legend: {
              show: false,
              fontSize: '12px',
              labels: {
                  colors: '#000000',
                  
                  },
              markers: {
              width: 30,
              height: 30,
              strokeWidth: 0,
              strokeColor: '#fff',
              fillColors: undefined,
              radius: 35,	
              }
          },
          stroke: {
            show: true,
            width: 6,
            colors: ['transparent']
          },
          grid: {
              borderColor: 'rgba(252, 252, 252,0.2)',
          },
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar','Apr','May','Jun','Jul','Agu', 'Sep', 'Oct','Nev','Dec'],
            labels: {
              style: {
                  colors: '#ffffff',
                  fontSize: '13px',
                  fontFamily: 'poppins',
                  fontWeight: 100,
                  cssClass: 'apexcharts-xaxis-label',
                },		
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
              borderType: 'solid',
              color: '#78909C',
              height: 6,
              offsetX: 0,
              offsetY: 0
          },
          crosshairs: {
            show: false,
            }
          },
          yaxis: {
              labels: {
                offsetX:-16,
                style: {
                      colors: '#ffffff',
                    fontSize: '13px',
                    fontFamily: 'poppins',
                    fontWeight: 100,
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
          },
          fill: {
            opacity: 1,
            colors:['#ffffff', '#FFD125'],
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val + "thousands"
              }
            }
          },
          responsive: [{
            breakpoint: 575,
            options: {
                plotOptions: {
                    bar: {
                        columnWidth: '1%',
                        borderRadius: -1,
                    },
                },
                chart:{
                    height:250,
                },
                series: [
                    {
						name: 'Projects',
                        data: [31, 40, 28,31, 40, 28,31, 40]
                    }, 
                    {
                    name: 'Projects',
                        data: [11, 32, 45,31, 40, 28,31, 40]
                    }, 
                    
                ],
             }
          }]
                  
                    
			}, 
		};
	}

  
	render() {

		  return (
			  <div id="chartBarRunning">            
				    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350}  />
			  </div>
		  );
	}
}

export default StatisticBarChart;