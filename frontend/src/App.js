import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ViewExpense from "./components/ViewExpense";
import AddExpense from "./components/AddExpense";
// import { useEffect, useState } from "react";
import Authcontext from "./context/Authcontext";
import { useContext } from "react";

function App() {
  // const [auth, setAuth] = useState(false);
  const authContext=useContext(Authcontext);

  // const token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (token) {
  //     setAuth(true);
  //   }
  // }, []);
  return (
    <>
      <Routes>
        {authContext.isLoggedIn? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/expense' element={<ViewExpense/>}/>
            <Route path='/expense/add' element={<AddExpense/>}/>
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
