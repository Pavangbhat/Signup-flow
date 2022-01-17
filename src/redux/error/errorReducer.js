import { AUTH_ERROR, AUTH_RESET } from "./actions.type";

const initialValue = {
  isError: false,
  errorMessage: "",
};

const errorReducer = (store = initialValue, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_ERROR: {
      return { ...store, isError: true, errorMessage: payload.data };
    }
    case AUTH_RESET: {
      return { ...store, isError: false, errorMessage: "" };
    }
    default: {
      return store;
    }
  }
};

export default errorReducer;
