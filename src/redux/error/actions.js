import { AUTH_ERROR, AUTH_RESET } from "./actions.type";

export const setError = (errorMessage) => {
  return {
    type: AUTH_ERROR,
    payload: {
      data: errorMessage,
    },
  };
};

export const resetError = () => {
  return {
    type: AUTH_RESET,
  };
};
