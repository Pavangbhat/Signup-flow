import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react/cjs/react.development";
import CardHeading from "../../components/cardHeading/CardHeading";
import "./style.css";

const OTP = () => {
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const [isInputNotFilled, setIsInputNotFilled] = useState(true);
  const [OTPNotValid, setOTPNotValid] = useState(false);
  const verifyBtnEle = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { input1, input2, input3, input4 } = inputValues;
    input1 !== "" && input2 !== "" && input3 !== "" && input4 !== ""
      ? setIsInputNotFilled(false)
      : setIsInputNotFilled(true);
    setOTPNotValid(false);
  }, [inputValues]);

  const inputHandler = (e, inputElement) => {
    let emptyString = e.target.value === "";
    if (emptyString) {
      let obj = { ...inputValues };
      obj[inputElement] = "";
      setInputValues({ ...inputValues, ...obj });
    } else {
      const reg = new RegExp("^[0-9]$");
      if (reg.test(e.target.value)) {
        let obj = { ...inputValues };
        obj[inputElement] = e.target.value;
        setInputValues({ ...inputValues, ...obj });
        const form = e.target.form;
        const index = [...form].indexOf(e.target);
        index !== 3 && form.elements[index + 1].focus();
      }
    }
  };

  return (
    <div className="OTPWrapper">
      <div data-testid="heading">
        <CardHeading heading="Enter your OTP" />
      </div>
      <form className="OTPInputWrapper" data-testid="inputWtapper">
        <input
          required
          autoFocus
          maxLength="1"
          data-testid="input1"
          value={inputValues["input1"]}
          onChange={(e) => {
            inputHandler(e, "input1");
          }}
        />
        <input
          required
          maxLength="1"
          data-testid="input2"
          value={inputValues["input2"]}
          onChange={(e) => {
            inputHandler(e, "input2");
          }}
        />
        <input
          required
          maxLength="1"
          data-testid="input3"
          value={inputValues["input3"]}
          onChange={(e) => {
            inputHandler(e, "input3");
          }}
        />
        <input
          required
          maxLength="1"
          data-testid="input4"
          value={inputValues["input4"]}
          onChange={(e) => {
            inputHandler(e, "input4");
          }}
        />
      </form>
      <div className="OTPMatchError" data-testid="OTPMissmatchLabel">
        {OTPNotValid && <span className="OTPMatchError">OTP not valid</span>}
      </div>
      <div className="OTPLabel" data-testid="OTPCode">
        <span>Your OTP is 5716</span>
      </div>
      <div className="buttonWrapper">
        <button
          className="clearBtn"
          onClick={() => {
            setInputValues({
              input1: "",
              input2: "",
              input3: "",
              input4: "",
            });
          }}
          data-testid="clearBtn"
        >
          Clear OTP
        </button>
        <button
          className="verifyBtn"
          data-testid="verifyBtn"
          disabled={isInputNotFilled}
          ref={verifyBtnEle}
          onClick={() => {
            const { input1, input2, input3, input4 } = inputValues;
            if (input1 + input2 + input3 + input4 !== "5716") {
              setOTPNotValid(true);
            } else {
              navigate("/referral");
            }
          }}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTP;
