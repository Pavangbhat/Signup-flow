import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "../../context/auth/context";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/error/actions";

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useContext(Context);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    dispatch(setError("Unauthenticated User"));
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
