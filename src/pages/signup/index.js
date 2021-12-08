import React from "react";
import CardHeading from "../../components/cardHeading/CardHeading";
import "./style.css";

const Signup = () => {
  return (
    <React.Fragment>
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
              <input placeholder="eg:bhat@gmail.com" data-testid="email"/>
            </div>
            <div className="inputWrapper">
              <label>Password</label>
              <input placeholder="Enter your password" data-testid="password"/>
            </div>
            <div className="passwordStrength">
              Password Strength:<span data-testid="passwordStrengthStatus">Weak</span>
            </div>
            <div className="inputWrapper">
              <label>Confirm Password</label>
              <input placeholder="Re-enter your password" data-testid="confirmPassword"/>
            </div>
          </div>

          <button className="submitBtn" data-testid="submitBtn">
              Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Signup;
