import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditExpense = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setAmount(value);
    }
    if (name === "category") {
      setCategory(value);
    }
    if (name === "description") {
      setDescription(value);
    }
  };

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/expense/${id}`, {
        amount: amount,
        category: category,
        description: description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/expense"));
  };

  const getData = async () => {
    const res = await axios
      .get(`http://localhost:5000/expense/${id}`)
      .catch((err) => console.log(err));

    const data = res.data;
    return data;
  };

  useEffect(() => {
    getData().then((data) => {
      setExpense(data);
      setAmount(data.expense.amount);
      setCategory(data.expense.category);
      setDescription(data.expense.description);
    });
  }, []);

  return (
    <>
      <section className="">
        <Link to="/dashboard">
          <button className="bg-black p-2 text-white mt-4 ml-4 rounded-lg">
            Dashboard
          </button>
        </Link>
        <Link to="/expense">
          <button className="bg-black p-2 text-white mt-4 ml-4 rounded-lg">
            Expenses
          </button>
        </Link>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-white text-center text-3xl font-bold leading-tight tracking-tight   ">
                Update expense
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-xl font-medium dark:text-white"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required=""
                    value={amount}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                  >
                    description
                  </label>
                  <input
                    type="string"
                    name="description"
                    id="description"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={description}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                  >
                    category
                  </label>
                  <input
                    type="string"
                    name="category"
                    id="category"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={category}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center "
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditExpense;
