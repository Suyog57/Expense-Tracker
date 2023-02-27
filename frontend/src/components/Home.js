import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
const Home = () => {
  return (
    <>
      <div className="flex text-black flex-col h-screen justify-center items-center">
        <h1 className="text-2xl text-black m-2 font-semibold">
          Welcome to Expense tracker...
        </h1>
        <h1 className="text-2xl text-black m-2">
          Only web-app to keep track of your expenses!!!
        </h1>

        <div className="flex flex-col justify-center items-center m-2">
          <h1 className="text-2xl m-5">Follow 3 simple steps:-</h1>
          <div className="flex">
            <div className=" m-3 text-lg bg-white shadow-2xl text-black font-semibold rounded-lg p-3 h-44 w-52 flex flex-col justify-center items-center">
              Create your account
            </div>
            <div className=" m-3 text-lg bg-white shadow-2xl text-black font-semibold rounded-lg p-3 h-44 w-52 flex flex-col justify-center items-center">
              Add expense
            </div>
            <div className=" m-3 text-lg bg-white shadow-2xl text-black font-semibold rounded-lg p-3 h-44 w-52 flex flex-col justify-center items-center">
              Keep a track
            </div>
          </div>
        </div>
        <Link to="/signup">
          <button className="bg-black font-semi-bold rounded-lg text-white p-3 m-5 text-xl flex justify-center items-center">
            <span className="mr-2 ">Get started </span>
            <FaArrowRight />
          </button>
        </Link>{" "}
      </div>
    </>
  );
};

export default Home;
