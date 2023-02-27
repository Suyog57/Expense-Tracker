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

  let values = new Array(12).fill(0),
    colors = [];

  expenses.expenses.map((expense) => {
    let date = expense.createdAt.split("T")[0];
    let ind = Number(date.split("-")[1]);

    values[ind] += expense.amount;
  });

  const generateRandomColor = () => {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  };

  for(let i=0;i<12;i++){
    colors.push(generateRandomColor());
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Your expense distribution",
        data: values,
        backgroundColor: colors,
        borderColor: "rgb(0,0,0)",
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
