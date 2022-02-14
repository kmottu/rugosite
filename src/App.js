import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import './App.css';
import { useSelector } from "react-redux";

function App() {
  const history = useNavigate();
  const user = useSelector((state) => state.auth)
  console.log(user);

  useEffect(() => {
    console.log('App - UseEffect')
    if (!user.isLoggedIn && !user.user) {
      console.log('App - Login')
      history("/login")
    }
    else {
      console.log("App - Register")
      history("/home")
    }
  }, [])

  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={<Dashboard />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
