import React, { useState } from "react";
import Auth from "./context";

const AuthContext = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Auth.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </Auth.Provider>
  );
};

export default AuthContext;
