import { AUTH_ERROR, AUTH_RESET } from "./actions.type";

const errorReducer = (store, action) => {
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
