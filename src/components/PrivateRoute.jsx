import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/user";

const PrivateRoute = () => {
  const { user } = React.useContext(UserContext);

  return user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
