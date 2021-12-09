const getPasswordStrength = (password) => {
  return password.trim().length < 7 ? "Weak" : "Strong";
};

export default getPasswordStrength;
