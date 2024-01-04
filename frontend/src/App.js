import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ViewExpense from "./components/ViewExpense";
import AddExpense from "./components/AddExpense";
import Authcontext from "./context/Authcontext";
import Home from "./components/Home";
import { useContext } from "react";
import EditExpense from "./components/EditExpense";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const authContext = useContext(Authcontext);

  return (
    <>
      <Routes>
        {authContext.isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expense" element={<ViewExpense />} />
            <Route path="/expense/add" element={<AddExpense />} />
            <Route path='/expense/:id' element={<EditExpense/>}/>
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
