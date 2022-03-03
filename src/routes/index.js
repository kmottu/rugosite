import { Navigate } from "react-router-dom";

import Dashboard from "../Components/Dashboard";
import Login from "../Components/Login";
import Register from "../Components/Register";

const authProtectedRoutes = [
  { path: "/home", component: Dashboard },
  { path: "/", exact: true, component: () => <Navigate to="/home" /> },
]

const publicRoutes = [
  // { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
]

export { authProtectedRoutes, publicRoutes }