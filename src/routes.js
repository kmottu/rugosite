import { Navigate } from 'react-router-dom';

import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register";

const routes = (isLoggedIn) => [
  {
    path: "/login",
    element: isLoggedIn ? <Navigate to="/home" /> : <Login />,
  },
  {
    path: "/register",
    element: isLoggedIn ? <Navigate to="/home" /> : <Register />,
  },
  {
    path: '/',
    element: isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />,
  },
  {
    path: '/home',
    element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" />,
  },
];

export default routes;