import React, { useState } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const ExpenseChart = (expenses) => {
  let labels = [],
    values = [];

  for (let key in expenses.expenses) {
    console.log(key, expenses.expenses[key]);

    labels.push(key);
    values.push(expenses.expenses[key]);
  }

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
        <Pie data={data} />
      </div>
    </>
  );
};

export default ExpenseChart;
