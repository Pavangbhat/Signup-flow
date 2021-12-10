import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Signup from "./index";
import "@testing-library/jest-dom";
import isEmailValid from "../../helpers/emailValidator";
import isPasswordValid from "../../helpers/passwordValidator";
import getPasswordStrength from "../../helpers/passwordStrengthDecider";
import isAllCredentialsValid from "../../helpers/isAllCredentialsValid";
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const setup = (elementId) => {
  const utils = render(<Signup />);
  const input = utils.getByTestId(elementId);
  return { input, ...utils };
};

describe("Check if all elements are present or not in sign up page", () => {
  test("email be present in document", () => {
    const { input: email } = setup("email");
    expect(email).toBeInTheDocument();
  });

  test("password be present in document", () => {
    const { input: password } = setup("password");
    expect(password).toBeInTheDocument();
  });

  test("confirmPassword be present in document", () => {
    const { input: confirmPassword } = setup("confirmPassword");
    expect(confirmPassword).toBeInTheDocument();
  });

  test("submitBtn be present in document", () => {
    const { input: submitBtn } = setup("submitBtn");
    expect(submitBtn).toBeInTheDocument();
  });

  test("passwordStrengthStatus be present in document", () => {
    const { input: passwordStrengthStatusWrapper } = setup(
      "passwordStrengthStatusWrapper"
    );
    expect(passwordStrengthStatusWrapper).not.toHaveTextContent(
      "Password Strength:"
    );
  });
});

describe("email", () => {
  test("has required feild", () => {
    const { input: email } = setup("email");
    expect(email).toHaveAttribute("required");
  });

  test("type of email to be email", () => {
    const { input: email } = setup("email");
    expect(email).toHaveAttribute("type", "email");
  });

  test("border color not to be red by default", () => {
    const { input: email } = setup("email");
    expect(email).not.toHaveClass("borderRed");
  });

  test("email validator to return true when email is valid", () => {
    expect(isEmailValid("sinaie")).toBe(false);
    expect(isEmailValid("")).toBe(false);
    expect(isEmailValid(" ")).toBe(false);
    expect(isEmailValid("sinaie@.com")).toBe(false);
    expect(isEmailValid("sinaie.com")).toBe(false);
    expect(isEmailValid("sinaie@f.")).toBe(false);
  });

  test("email validator to return false when email is valid", () => {
    expect(isEmailValid("bhat@mail.com")).toBe(true);
  });

  test("border color to be red when invaild email", () => {
    const { input: email } = setup("email");
    fireEvent.change(email, { target: { value: "invaild" } });
    fireEvent.blur(email);
    expect(email.classList.contains("borderRed")).toBe(true);
  });

  test("border color not to be red if vaild email", () => {
    const { input: email } = setup("email");
    fireEvent.focus(email);
    fireEvent.change(email, { target: { value: "valid@d.com" } });
    fireEvent.blur(email);
    expect(email.classList.contains("borderRed")).toBe(false);
  });
});

describe("password", () => {
  test("type of be password", () => {
    const { input: password } = setup("password");
    expect(password).toHaveAttribute("type", "password");
  });

  test("password validator", () => {
    expect(isPasswordValid("swjxi")).toBe(true);
    expect(isPasswordValid("swjx")).toBe(false);
    expect(isPasswordValid("")).toBe(false);
    expect(isPasswordValid("     ")).toBe(false);
  });

  test("border not be red when password is empty string or password is greater than or equal to 5", () => {
    const { input: password } = setup("password");
    fireEvent.change(password, { target: { value: "" } });
    fireEvent.blur(password);
    expect(password.classList.contains("borderRed")).not.toBe(true);
    fireEvent.change(password, { target: { value: "wdw2a" } });
    fireEvent.blur(password);
    expect(password.classList.contains("borderRed")).not.toBe(true);
  });

  test("border red when password is less than 5 character", () => {
    const { input: password } = setup("password");
    fireEvent.change(password, { target: { value: "2d3" } });
    fireEvent.blur(password);
    expect(password.classList.contains("borderRed")).toBe(true);

    fireEvent.change(password, { target: { value: "2d23" } });
    expect(password.classList.contains("borderRed")).toBe(true);
  });
});

describe("confirm password", () => {
  test("type of be password", () => {
    const { input: confirmPassword } = setup("confirmPassword");
    expect(confirmPassword).toHaveAttribute("type", "password");
  });

  test("border red if password doesnot match", () => {
    const { input: confirmPassword } = setup("confirmPassword");
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "h22se" },
    });
    fireEvent.change(confirmPassword, { target: { value: "h21se" } });
    fireEvent.blur(confirmPassword);
    expect(confirmPassword.classList.contains("borderRed")).toBe(true);
  });

  test("not to have border red if password matches", () => {
    const { input: confirmPassword } = setup("confirmPassword");
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "h22se" },
    });
    fireEvent.change(confirmPassword, { target: { value: "h22se" } });
    fireEvent.blur(confirmPassword);
    expect(confirmPassword.classList.contains("borderRed")).toBe(false);
  });
});

describe("status label", () => {
  test("if password is empty string label should not be visible", () => {
    const { input: passwordStrengthStatusWrapper } = setup(
      "passwordStrengthStatusWrapper"
    );
    expect(passwordStrengthStatusWrapper).not.toHaveTextContent(
      "Password Strength:"
    );
  });

  test("status label determiner", () => {
    expect(getPasswordStrength("dec2q")).toBe("Weak");
    expect(getPasswordStrength("        ")).toBe("Weak");
    expect(getPasswordStrength("hsenjes")).toBe("Strong");
  });

  test("label to have string of Weak if password is weak", () => {
    const { input: password } = setup("password");
    fireEvent.change(password, { target: { value: "s" } });
    expect(screen.getByTestId("passwordStrengthStatus")).toHaveTextContent(
      "Weak"
    );
  });

  test("label to have string of Strong if password is greater than or equal 7", () => {
    const { input: password } = setup("password");
    fireEvent.change(password, { target: { value: "saedxsq" } });
    expect(screen.getByTestId("passwordStrengthStatus")).toHaveTextContent(
      "Strong"
    );
  });

  test("status to be red if password is weak", () => {
    const { input: password } = setup("password");
    fireEvent.change(password, { target: { value: "saedx" } });
    expect(
      screen
        .getByTestId("passwordStrengthStatus")
        .classList.contains("colorRed")
    ).toBe(true);
  });

  test("status to be green if password is Strong", () => {
    const { input: password } = setup("password");
    fireEvent.change(password, { target: { value: "saedxse" } });
    expect(
      screen
        .getByTestId("passwordStrengthStatus")
        .classList.contains("colorGreen")
    ).toBe(true);
  });
});

describe("submit button", () => {
  test("submit button to be disabled by default", () => {
    const { input: submitBtn } = setup("submitBtn");
    expect(submitBtn.hasAttribute("disabled")).toBe(true);
  });

  test("Is all credentials valid function", () => {
    expect(isAllCredentialsValid("slsdf", "12345", "12344")).toBe(false);
    expect(isAllCredentialsValid("slsdf@f.com", "123455", "12344")).toBe(false);
    expect(isAllCredentialsValid("slsdf@f.com", "12345", "12344")).toBe(false);
    expect(isAllCredentialsValid("bhat@f.com", "12345", "12345")).toBe(true);
  });

  test("if password  or email is not vaild button to be disabled", () => {
    const { input: submitBtn } = setup("submitBtn");
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "invalid" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "invalid" },
    });
    fireEvent.change(screen.getByTestId("confirmPassword"), {
      target: { value: "invalid" },
    });
    expect(submitBtn.hasAttribute("disabled")).toBe(true);
  });

  test("if all credentials are vaild button to be enabled", () => {
    const { input: submitBtn } = setup("submitBtn");
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@d.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "valid" },
    });
    fireEvent.change(screen.getByTestId("confirmPassword"), {
      target: { value: "valid" },
    });
    expect(submitBtn.hasAttribute("disabled")).toBe(false);
  });
});
