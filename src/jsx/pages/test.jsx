import React from "react";
import ReactApexChart from "react-apexcharts";

const SubscriptionChart = () => {
  // Static data for the example
  const chartData = {
    series: [
      {
        name: "Basic Subscription",
        data: [200, 150, 250, 300, 400, 350, 300, 250, 200, 280, 320, 400],
      },
      {
        name: "Standard Subscription",
        data: [300, 400, 350, 450, 500, 550, 600, 450, 500, 520, 530, 600],
      },
      {
        name: "Premium Subscription",
        data: [500, 600, 700, 650, 800, 900, 1000, 750, 850, 900, 950, 1100],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 400,
      },
      title: {
        text: "Monthly Subscription Spending",
        align: "center",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          text: "Amount Spent ($)",
        },
      },
      colors: ["#8884d8", "#82ca9d", "#ffc658"],
      tooltip: {
        y: {
          formatter: (val) => `$${val}`,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={400}
      />
    </div>
  );
};

export default SubscriptionChart;
