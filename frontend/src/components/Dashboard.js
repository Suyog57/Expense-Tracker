import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Authcontext from "../context/Authcontext";
import jwt from "jwt-decode";
const Dashboard = () => {
  const navigate = useNavigate();
  const authContext = useContext(Authcontext);
  const name=jwt(localStorage.getItem("token")).name;

  const handleClick = () => {
    authContext.handleLogout();
    navigate("/login");
  };

  // const [expenses, setExpenses] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/expense", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => console.log(data));
  }, []);
  return (
    <>
      <div className="text-white flex justify-center h-screen items-center flex-col">
        <h1 className="text-3xl text-black text-center font-bold mb-10">Welcome, <span className="text-blue-700">{name}</span>!</h1>
        <div>
        <Link to="/expense">
          {" "}
          <button className="bg-black text-xl p-2 m-2 rounded-lg">
            View expenses
          </button>
        </Link>
        <Link to="/expense/add">
          {" "}
          <button className="bg-black text-xl p-2 m-2 rounded-lg">
            Add expenses
          </button>
        </Link>
        <button
          className="bg-black text-xl p-2 m-2 rounded-lg"
          onClick={handleClick}
        >
          Logout
        </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
