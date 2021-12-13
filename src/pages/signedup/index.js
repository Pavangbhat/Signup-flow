import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import "./style.css";

const SignedUp = () => {
  const { referral } = useParams("referral");
  const navigation = useNavigate();

  useEffect(() => {
    referral !== "WE4ge" && navigation("/referral");
  });

  return (
    <div data-testid="cardWrapper" className="cardWrapper">
      <p>Congratulations! you got referred 🎉 by Pavan</p>
    </div>
  );
};

export default SignedUp;
