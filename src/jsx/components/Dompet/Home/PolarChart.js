import React from "react";
import { PolarArea } from 'react-chartjs-2';

const PolarChart = ({ data }) => {
  const chartData = {
    datasets: [
      {
        backgroundColor: ["#496ecc", "#68e365"],
        data: data,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scale: {
      scaleShowLine: false,
      display: false,
      pointLabels: {
        fontSize: 0, // Adjust as needed for better visibility
      },
    },
    tooltips: {
      enabled: false,
    },
  };

  return <PolarArea data={chartData} height={200} options={options} />;
};

export default PolarChart;