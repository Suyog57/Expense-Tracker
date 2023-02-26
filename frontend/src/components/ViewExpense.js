import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [map, setData] = useState({});

  const calculate = (datas) => {
    console.log("Dataaaa0", datas);
    setData({});
    console.log("Mapp", map)
    let map1 = {};
    datas.map((expense) => {
      if (map1[expense.category]) {
        map1[expense.category] += expense.amount;
      } else {
        map1[expense.category] = expense.amount;
      }
    });
    setData(map1);
    console.log(map1);
  };

  const getExpenses = async () => {
    const res = await axios.get("http://localhost:5000/expense", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    getExpenses().then((data) => {
      setExpenses(data);
      console.log("Expense ", data);
      calculate(data);
    });
    // .then(() => )
    // .then((data) => {
    //   console.log("Data " ,data)
    //   calculate(data);
    // });
  }, []);

  return (
    <>
      <Link to="/">
        <button className="bg-black p-2 text-white mt-4 ml-4 rounded-lg">
          Go back
        </button>
      </Link>
      <div className="flex justify-center items-center mt-12 flex-col">
        <h1 className="text-2xl semi-bold m-10">
          {" "}
          Here are all your expenses till date
        </h1>
        <table class="table-fixed w-8/12 border-2 border-black">
          <thead>
            <tr>
              <th className="w-1/2 border border-black">Date</th>
              <th className="w-1/2 border border-black">Category</th>
              <th className="w-1/2 border border-black">Description</th>
              <th className="w-1/2 border border-black">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses &&
              expenses.map((expense, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-black">
                    {expense.createdAt.split("T")[0]}
                  </td>
                  <td className="border border-black">{expense.category}</td>
                  <td className="border border-black">{expense.description}</td>
                  <td className="border border-black">{expense.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewExpense;
