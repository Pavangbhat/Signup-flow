const passwordMatcher = (password, confirmPassword) => {
  return (
    password.trim() && confirmPassword.trim() && password === confirmPassword
  );
};

export default passwordMatcher;
