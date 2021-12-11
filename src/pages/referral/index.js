import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Referral = () => {
  const [referralTrue, setReferralTrue] = useState(false);
  const [isReferralValid, setIsReferralValid] = useState(true);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  return (
    <div className="referralWrapper">
      <p data-testid="heading">Do you have any referral?</p>
      <div className="linkWrapper">
        <p
          data-testid="referralTrue"
          onClick={() => {
            setReferralTrue(true);
          }}
        >
          Yes I do have
        </p>
        <p
          data-testid="referralFalse"
          onClick={() => {
            navigate("/waiting-list");
          }}
        >
          No, I wish I had referral
        </p>
      </div>
      <div data-testid="referralCodeWrapper">
        {referralTrue && (
          <div className="referralCode">
            <p>Enter your referral code</p>
            <input
              maxLength="5"
              data-testid="inputBox"
              autoFocus
              value={value}
              onChange={(e) => {
                setIsReferralValid(true);
                setValue(e.target.value);
              }}
            />
            {!isReferralValid && isReferralValid !== "" && (
              <span
                className="referralMatchError"
                data-testid="referralMatchError"
              >
                Referral not valid
              </span>
            )}
            <button
              data-testid="verifyBtn"
              onClick={() => {
                value !== "WE4ge"
                  ? setIsReferralValid(false)
                  : navigate("/signed-in");
              }}
            >
              Verify
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Referral;
