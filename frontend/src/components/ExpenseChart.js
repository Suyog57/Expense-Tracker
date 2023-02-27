import React, { useState } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const ExpenseChart = (expenses) => {
  let labels = [],
    values = [],
    colors = [];

  const generateRandomColor = () => {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  };

  for (let key in expenses.expenses) {
    console.log(key, expenses.expenses[key]);

    labels.push(key);
    values.push(expenses.expenses[key]);

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
        <Pie data={data} />
      </div>
    </>
  );
};

export default ExpenseChart;
