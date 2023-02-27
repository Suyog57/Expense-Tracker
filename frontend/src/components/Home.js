import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="flex text-black flex-col h-screen justify-center items-center">
        <h1 className="text-2xl text-black m-2">Welcome to expense tracker...</h1>
        <h1 className="text-2xl text-black m-2">Only web-app to keep track of your expenses!!!</h1>
        <Link to='/signup'>
          <button className="bg-black rounded-lg text-white p-3 m-3 text-xl">Get started</button>
        </Link>{" "}
      </div>
    </>
  );
};

export default Home;
