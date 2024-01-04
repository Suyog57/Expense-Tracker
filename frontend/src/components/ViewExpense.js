import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ExpenseChart from "./ExpenseChart";
import BarChart from "./BarChart";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
// import { get } from "mongoose";

const ViewExpense = () => {
  const [searchvalue, setSearchvalue] = useState("");

  const handleChange = (e) => {
    setSearchvalue(e.target.value);
  };

  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [map, setData] = useState({});

  const calculate = (datas) => {
    console.log("Dataaaa0", datas);
    setData({});
    console.log("Mapp", map);
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
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/expense`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      params: { searchvalue },
    });

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    getExpenses().then((data) => {
      setExpenses(data);
      // console.log("Expense ", data);
      calculate(data);
    });
  }, [searchvalue]);

  const deleteRequest = async (id) => {
    const res = await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/expense/${id}`)
      .catch((err) => console.log(err));

    const data = res.data;
    return data;
  };

  const handleDelete = (id) => {
    // console.log("hi"+id);
    deleteRequest(id)
      .then(() => navigate("/dashboard"))
      .then(() => navigate("/expense"));
  };

  const handleEdit = (id) => {
    navigate(`/expense/${id}`);
  };

  return (
    <>
      <Link to="/dashboard">
        <button className="bg-black p-2 text-white mt-4 ml-4 rounded-lg">
          Dashboard
        </button>
      </Link>
      <Link to="/expense/add">
        <button className="bg-black p-2 text-white mt-4 ml-4 rounded-lg">
          Add expense
        </button>
      </Link>

      {expenses.length === 0 ? (
        <h1 className="text-2xl font-semi-bold mt-10 text-center">
          No expenses yet, add to view!
        </h1>
      ) : (
        <>
          <form
            className="mt-4 space-y-4 md:space-y-6 flex justify-center"
            onSubmit={getExpenses}
          >
            <div className="">
              <input
                type="text"
                name="search"
                id="search"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search expenses"
                required=""
                value={searchvalue}
                onChange={handleChange}
              />
            </div>
          </form>
          <div className="flex justify-center items-center mt-4 flex-col">
            <h1 className="text-2xl font-semi-bold m-10">
              {" "}
              Here are all your expenses till date!
            </h1>
            <table class="table-fixed w-8/12 border-2 border-black">
              <thead>
                <tr>
                  <th className="w-1/2 border border-black">Date</th>
                  <th className="w-1/2 border border-black">Category</th>
                  <th className="w-1/2 border border-black">Description</th>
                  <th className="w-1/2 border border-black">Amount</th>
                  <th className="w-1/2 border border-black">Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {expenses &&
                  expenses.map((expense, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-black">
                        {expense.createdAt.split("T")[0]}
                      </td>
                      <td className="border border-black">
                        {expense.category}
                      </td>
                      <td className="border border-black p-2">
                        {expense.description}
                      </td>
                      <td className="border border-black">{expense.amount}</td>
                      <td className="border border-black">
                        <button onClick={() => handleEdit(expense._id)}>
                          <RiEdit2Line />
                        </button>
                        <button onClick={() => handleDelete(expense._id)}>
                          <RiDeleteBin6Line />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center flex-col mt-16 mb-16">
              <h1 className="text-xl font-semibold text-center mb-4">
                Expense distribution category-wise
              </h1>
              <ExpenseChart expenses={map} />
            </div>

            <div className="flex justify-center items-center flex-col mt-16 mb-16">
              <h1 className="text-xl font-semibold text-center mb-4">
                Expense distribution month-wise
              </h1>
              <BarChart expenses={expenses} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewExpense;
