import React, { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Authcontext from "../context/Authcontext";

const Dashboard = () => {
  const navigate = useNavigate();
  const authContext = useContext(Authcontext);

  const handleClick = () => {
    authContext.handleLogout();
    navigate("/");
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
      <div className="text-white flex justify-center h-screen items-center">
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
    </>
  );
};

export default Dashboard;
