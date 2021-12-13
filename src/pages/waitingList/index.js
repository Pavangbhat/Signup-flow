import React from "react";
import "./style.css";

const WaitingList = () => {
  return (
    <div data-testid="cardWrapper" className="cardWrapper">
      <p>You are added to the waiting list !!</p>
      <p>Only 34 people ahead of you</p>
    </div>
  );
};

export default WaitingList;
