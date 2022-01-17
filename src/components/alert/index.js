import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect, useSelector } from "react-redux";
import { resetError } from "../../redux/error/actions";

const Alert = ({ errorMessage, resetError }) => {
  const store = useSelector((store) => store);

  if (store.isError) {
    resetError();
    toast.error(errorMessage);
  }

  return (
    <div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    errorMessage: store.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetError: () => {
      dispatch(resetError());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
