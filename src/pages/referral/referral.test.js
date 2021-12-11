import React from "react";
import { render, fireEvent, screen, getByTestId } from "@testing-library/react";
import Referral from "./index";
import "@testing-library/jest-dom";
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const setup = (elementId) => {
  const utils = render(<Referral />);
  const element = utils.getByTestId(elementId);
  return { element, ...utils };
};

describe("All elements to be present", () => {
  test("heading", () => {
    const { element: heading } = setup("heading");
    expect(heading).toBeInTheDocument();
  });

  test("yes label for referral", () => {
    const { element: referralTrue } = setup("referralTrue");
    expect(referralTrue).toBeInTheDocument();
  });

  test("no label for referral", () => {
    const { element: referralFalse } = setup("referralFalse");
    expect(referralFalse).toBeInTheDocument();
  });
});

describe("referral code section", () => {
  test("not to be present by default", () => {
    const { element: referralCodeWrapper } = setup("referralCodeWrapper");
    expect(referralCodeWrapper).not.toHaveTextContent(
      "Enter your referral code"
    );
  });
});

describe("referral true label", () => {
  test("on click referral code section to be visible", () => {
    const { element: referralTrue } = setup("referralTrue");
    fireEvent.click(referralTrue);
    expect(screen.getByTestId("referralCodeWrapper")).toHaveTextContent(
      "Enter your referral code"
    );
  });
});

describe("referral false label", () => {
  test("on click referral code section not to be visible", () => {
    const { element: referralFalse } = setup("referralFalse");
    fireEvent.click(referralFalse);
    expect(screen.getByTestId("referralCodeWrapper")).not.toHaveTextContent(
      "Enter your referral code"
    );
  });
});

describe("input box", () => {
  test("to allow only 5 characters", () => {
    const { element: inputBox } = setup("inputBox");
    expect(inputBox).toHaveAttribute("maxLength", "5");
  });

  test("behavior", () => {
    const { element: inputBox } = setup("inputBox");
    fireEvent.change(inputBox, { target: { value: "WE4ge" } });
    expect(inputBox.value).toBe("WE4ge");
  });
});

describe("verify button",()=>{
    test('behavior',()=>{
        const { element: verifyBtn } = setup("verifyBtn");
        fireEvent.click(verifyBtn)
        expect(verifyBtn).not.toBeInTheDocument();
    })
})