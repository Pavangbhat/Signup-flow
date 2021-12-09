import isEmailValid from "./emailValidator";
import passwordMatcher from "./passwordMatcher";
import isPasswordValid from "./passwordValidator";

const isAllCredentialsValid = (email, passwrod, confirmPassword) => {
  return (
    isEmailValid(email) &&
    isPasswordValid(passwrod) &&
    passwordMatcher(passwrod, confirmPassword)
  );
};

export default isAllCredentialsValid;
