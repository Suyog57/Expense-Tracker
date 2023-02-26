import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ViewExpense from "./components/ViewExpense";
import AddExpense from "./components/AddExpense";
import { useEffect, useState } from "react";

function App() {
  // const [auth, setAuth] = useState(false);

  const token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (token) {
  //     setAuth(true);
  //   }
  // }, []);
  return (
    <>
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path='/expense' element={<ViewExpense/>}/>
            <Route path='/expense/add' element={<AddExpense/>}/>
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
