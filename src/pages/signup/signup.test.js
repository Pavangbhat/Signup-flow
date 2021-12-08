import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Signup from "./index";
import "@testing-library/jest-dom";

const setup = (elementId) => {
  const utils = render(<Signup />);
  const input = utils.getByTestId(elementId);
  return {input, ...utils}
};

describe("Check if all elements are present or not in sign up page", () => {
  test("email be present in document", () => {
    const {input:email} = setup('email')
    expect(email).toBeInTheDocument();
  });

  test("password be present in document", () => {
    const {input:password} = setup('password')
    expect(password).toBeInTheDocument();
  });

  test("confirmPassword be present in document", () => {
    const {input:confirmPassword} = setup('confirmPassword')
    expect(confirmPassword).toBeInTheDocument();
  });

  test("submitBtn be present in document", () => {
    const {input:submitBtn} = setup('submitBtn')
    expect(submitBtn).toBeInTheDocument();
  });

  test("passwordStrengthStatus be present in document", () => {
    const {input:passwordStrengthStatus} = setup('passwordStrengthStatus')
    expect(passwordStrengthStatus).toBeInTheDocument();
  });
});

describe("email", () => {
  test("has required feild", () => {
    const {input:email} = setup('email')
    expect(email).toHaveAttribute("required");
  });

  test("type of email to be email", () => {
    const {input:email} = setup('email')
    expect(email).toHaveAttribute("type", "email");
  });

  test("border color not to be red by default", () => {
    const {input:email} = setup('email')
    expect(email).not.toHaveClass("borderRed");
  });

  test.todo("test email validator when email is valid", () => {});

  test.todo("test email validator when email is not valid", () => {});

  test("border color to be red when invaild email", () => {
    const {input:email} = setup('email')
    fireEvent.change(email, { target: { value: "invalidemail" } });
    expect(email.classList.contains("borderRed")).toBe(true);

    fireEvent.change(email, { target: { value: "invali demail" } });
    expect(email.classList.contains("borderRed")).toBe(true);

    fireEvent.change(email, { target: { value: "invalid.demail" } });
    expect(email.classList.contains("borderRed")).toBe(true);
  });

  test("border color not to be red if vaild email", () => {
    const {input:email} = setup('email')
    fireEvent.change(email, { target: { value: "valid@d.com" } });
    expect(email.classList.contains("borderRed")).toBe(false);
  });
});

describe("password", () => {
  test("type of be password", () => {
    const {input:password} = setup('password')
    expect(password).toHaveAttribute("type", "password");
  });

  test.todo("password validator", () => {});

  test("border not be red when password is empty string or password is greater than or equal to 5", () => {
    const {input:password} = setup('password')
    fireEvent.change(password, { target: { value: "" } });
    expect(password.classList.contains("borderRed")).toBe(false);

    fireEvent.change(password, { target: { value: "2d23" } });
    expect(password.classList.contains("borderRed")).toBe(false);
  });

  test("border red when password is less than 5 character", () => {
    const {input:password} = setup('password')
    fireEvent.change(password, { target: { value: "2d3" } });
    expect(password.classList.contains("borderRed")).toBe(true);

    fireEvent.change(password, { target: { value: "2d23" } });
    expect(password.classList.contains("borderRed")).toBe(true);
  });
});

describe("confirm password", () => {
  test("type of be password", () => {
    const {input:confirmPassword} = setup('confirmPassword')
    expect(confirmPassword).toHaveAttribute("type", "password");
  });

  test("border red if password doesnot match", () => {
    const {input:password} = setup('password')
    const {input:confirmPassword} = setup('confirmPassword')
    fireEvent.change(password, { target: { value: "h22se" } });
    fireEvent.change(confirmPassword, { target: { value: "h21se" } });
    expect(confirmPassword.classList.contains("borderRed")).toBe(true);
  });

  test("not to have border red if password matches", () => {
    const {input:password} = setup('password')
    const {input:confirmPassword} = setup('confirmPassword')
    fireEvent.change(password, { target: { value: "h22se" } });
    fireEvent.change(confirmPassword, { target: { value: "h22se" } });
    expect(confirmPassword.classList.contains("borderRed")).toBe(false);
  });
});

describe("status label", () => {
  test("if password is empty string label should not be visible", () => {
    const {input:passwordStrengthStatus} = setup('passwordStrengthStatus')
    const {input:password} = setup('password')
    fireEvent.change(password, { target: { value: "" } });
    expect(passwordStrengthStatus).not.toBeInTheDocument();
  });

  test.todo("status label determiner", () => {});

  test("label to have string of Weak if password is weak", () => {
    const {input:passwordStrengthStatus} = setup('passwordStrengthStatus')
    const {input:password} = setup('password')
    fireEvent.change(password, { target: { value: "dea" } });
    expect(passwordStrengthStatus).toHaveTextContent("Weak");
  });

  test("label to have string of Medium if password is weak", () => {
    const {input:passwordStrengthStatus} = setup('passwordStrengthStatus')
    const {input:password} = setup('password')
    fireEvent.change(password, { target: { value: "deawf" } });
    expect(passwordStrengthStatus).toHaveTextContent("Medium");
  });

  test("label to have string of Strong if password is weak", () => {
    const {input:passwordStrengthStatus} = setup('passwordStrengthStatus')
    const {input:password} = setup('password')
    fireEvent.change(password, { target: { value: "deadfres" } });
    expect(passwordStrengthStatus).toHaveTextContent("Strong");
  });
});

describe("submit button", () => {
  const {input:submitBtn} = setup('submitBtn')
  test("submit button to be disabled by default", () => {
    expect(submitBtn).toHaveTextContent("disabled");
  });

  test.todo(
    "if password  or email is not vaild button to be disabled",
    () => {}
  );

  test.todo("if password does not match button to be disabled", () => {
    const {input:password} = setup('password')
    const {input:confirmPassword} = setup('confirmPassword')
    fireEvent.change(password, { target: { value: "h22se" } });
    fireEvent.change(confirmPassword, { target: { value: "h21se" } });
    expect(submitBtn).toHaveTextContent("disabled");
  });
});
