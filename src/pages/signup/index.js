import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/alert";
import CardHeading from "../../components/cardHeading/CardHeading";
import isEmailValid from "../../helpers/emailValidator";
import isAllCredentialsValid from "../../helpers/isAllCredentialsValid";
import passwordMatcher from "../../helpers/passwordMatcher";
import getPasswordStrength from "../../helpers/passwordStrengthDecider";
import isPasswordValid from "../../helpers/passwordValidator";
import "./style.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedElement, setFocusedElement] = useState(null);
  const [isCredentialsNotValid, setIsCredentialsNotValid] = useState(true);
  const navigate = useNavigate();

  const emailEle = useRef(null);
  const passwordEle = useRef(null);
  const confirmPasswordEle = useRef(null);

  useEffect(() => {
    isEmailValid(email) && emailEle.current.classList.remove("borderRed");
    isPasswordValid(password) &&
      passwordEle.current.classList.remove("borderRed");
    passwordMatcher(password, confirmPassword) &&
      confirmPasswordEle.current.classList.remove("borderRed");
    setIsCredentialsNotValid(
      !isAllCredentialsValid(email, password, confirmPassword)
    );
  }, [email, password, confirmPassword]);

  useEffect(() => {
    //email
    focusedElement !== "email" &&
      email !== "" &&
      !isEmailValid(email) &&
      emailEle.current.classList.add("borderRed");

    focusedElement !== "email" &&
      email !== "" &&
      isEmailValid(email) &&
      emailEle.current.classList.remove("borderRed");

    email === "" && emailEle.current.classList.remove("borderRed");

    //password
    focusedElement !== "password" &&
      password !== "" &&
      !isPasswordValid(password) &&
      passwordEle.current.classList.add("borderRed");

    focusedElement !== "password" &&
      password !== "" &&
      isPasswordValid(password) &&
      passwordEle.current.classList.remove("borderRed");

    password === "" && passwordEle.current.classList.remove("borderRed");

    //confirm password
    focusedElement !== "confirmPassword" &&
      confirmPassword !== "" &&
      !passwordMatcher(password, confirmPassword) &&
      confirmPasswordEle.current.classList.add("borderRed");

    focusedElement !== "confirmPassword" &&
      confirmPassword !== "" &&
      passwordMatcher(password, confirmPassword) &&
      confirmPasswordEle.current.classList.remove("borderRed");

    confirmPassword === "" &&
      confirmPasswordEle.current.classList.remove("borderRed");
  }, [focusedElement]);

  const inputHandler = (element) => {
    if (element.target.type === "email") {
      setEmail(element.target.value);
    } else if (element.target.name === "password") {
      setPassword(element.target.value);
    } else {
      setConfirmPassword(element.target.value);
    }
  };

  return (
    <React.Fragment>
      <Alert />
      <div className="signup">
        <CardHeading heading="Signup" />
        <form
          className="inputForm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <div className="inputWrapper">
              <label>Email</label>
              <input
                placeholder="eg:bhat@gmail.com"
                data-testid="email"
                required
                type="email"
                value={email}
                ref={emailEle}
                autoFocus
                onFocus={() => {
                  setFocusedElement("email");
                }}
                onBlur={() => {
                  setFocusedElement(null);
                }}
                onChange={inputHandler}
              />
            </div>
            <div className="inputWrapper">
              <label>Password</label>
              <input
                placeholder="Enter your password"
                data-testid="password"
                required
                name="password"
                type="password"
                ref={passwordEle}
                onFocus={() => {
                  setFocusedElement("password");
                }}
                onBlur={() => {
                  setFocusedElement(null);
                }}
                value={password}
                onChange={inputHandler}
              />
            </div>
            <div
              className="passwordStrength"
              data-testid="passwordStrengthStatusWrapper"
            >
              {password && (
                <div>
                  Password Strength:
                  <span
                    data-testid="passwordStrengthStatus"
                    className={
                      getPasswordStrength(password) === "Weak"
                        ? "colorRed"
                        : "colorGreen"
                    }
                  >
                    {getPasswordStrength(password)}
                  </span>
                </div>
              )}
            </div>
            <div className="inputWrapper">
              <label>Confirm Password</label>
              <input
                placeholder="Re-enter your password"
                data-testid="confirmPassword"
                type="password"
                value={confirmPassword}
                ref={confirmPasswordEle}
                onFocus={() => {
                  setFocusedElement("confirmPassword");
                }}
                onBlur={() => {
                  setFocusedElement(null);
                }}
                onChange={inputHandler}
              />
              {!passwordMatcher(password, confirmPassword) &&
                confirmPassword !== "" && (
                  <span
                    data-testid="passwordStrengthStatus"
                    className="colorRed"
                  >
                    Password does not match
                  </span>
                )}
            </div>
          </div>
          <button
            className="submitBtn"
            data-testid="submitBtn"
            disabled={isCredentialsNotValid}
            onClick={() => {
              navigate("/otp");
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Signup;
