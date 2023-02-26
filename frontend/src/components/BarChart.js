import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = (expenses) => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Your expense distribution",
        data: values,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(0,0,255)",
      },
    ],
  };
  return (
    <>
      <div>
        <Bar data={data} />
      </div>
    </>
  );
};

export default BarChart;
