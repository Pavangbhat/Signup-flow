const isEmailValid = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export default isEmailValid;
