import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alert = ({ message = "Error" }) => {
  const notify = (message) => toast.error(message);

  return (
    <div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};
export default Alert;
