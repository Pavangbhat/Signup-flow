import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "../../context/auth/context";

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
