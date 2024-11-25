import React from "react";
import { Pie } from "react-chartjs-2";

const ChartPie = ({ data, labels, colors, height, width }) => {
  const chartData = {
    datasets: [
      {
        data: data || [0, 0], // Default to [0, 0] if no data is passed
        borderWidth: 0,
        backgroundColor: colors || ["#496ecc", "#68e365"], // Default colors
        hoverBackgroundColor: colors || ["#496ecc", "#68e365"],
      },
    ],
    labels: labels || ["Label1", "Label2"], // Default labels
  };

  const options = {
    responsive: true,
    legend: {
      display: false, // Show legend for labels
      position: "bottom",
    },
    maintainAspectRatio: false,
  };

  return (
    <Pie
      data={chartData}
      height={height || 200}
      width={width || 200}
      options={options}
    />
  );
};

export default ChartPie;