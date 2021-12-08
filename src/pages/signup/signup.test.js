import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Signup from "./index";
import "@testing-library/jest-dom";



const setUp=(elementId)=>{
    //TODO: Helper function set up render of component
}

describe("Check if all elements are present or not in sign up page", () => {
  const { getAllByTestId } = render(<Signup />);
  const email = getAllByTestId("email")[0];
  const password = getAllByTestId("password")[0];
  const confirmPassword = getAllByTestId("confirmPassword")[0];
  const submitBtn = getAllByTestId("submitBtn")[0];
  const passwordStrengthStatus = getAllByTestId("passwordStrengthStatus")[0];

  test("email be present in document", () => {
    expect(email).toBeInTheDocument();
  });

  test("password be present in document", () => {
    expect(password).toBeInTheDocument();
  });

  test("confirmPassword be present in document", () => {
    expect(confirmPassword).toBeInTheDocument();
  });

  test("submitBtn be present in document", () => {
    expect(submitBtn).toBeInTheDocument();
  });

  test("passwordStrengthStatus be present in document", () => {
    expect(passwordStrengthStatus).not.toBeInTheDocument();
  });
});

describe("email", () => {
  const { getAllByTestId } = render(<Signup />);
  const email = getAllByTestId("email")[0];

  test("has required feild", () => {
    expect(email).toHaveAttribute("required");
  });

  test("type of email to be email", () => {
    expect(email).toHaveAttribute("type", "email");
  });

  test("border color not to be red by default", () => {
    expect(email).not.toHaveClass("borderRed");
  });

  test.todo("test email validator when email is valid", () => {});

  test.todo("test email validator when email is not valid", () => {});

  test("border color to be red when invaild email", () => {
    fireEvent.change(email, { target: { value: "invalidemail" } });
    expect(email.classList.contains("borderRed")).toBe(true);

    fireEvent.change(email, { target: { value: "invali demail" } });
    expect(email.classList.contains("borderRed")).toBe(true);

    fireEvent.change(email, { target: { value: "invalid.demail" } });
    expect(email.classList.contains("borderRed")).toBe(true);
  });

  test("border color not to be red if vaild email", () => {
    fireEvent.change(email, { target: { value: "valid@d.com" } });
    expect(email.classList.contains("borderRed")).toBe(false);
  });
});

describe("password", () => {
  const { getAllByTestId } = render(<Signup />);
  const password = getAllByTestId("password")[0];

  test("type of be password", () => {
    expect(password).toHaveAttribute("type", "password");
  });

  test.todo("password validator", () => {});

  test("border not be red when password is empty string or password is greater than or equal to 5", () => {
    fireEvent.change(password, { target: { value: "" } });
    expect(password.classList.contains("borderRed")).toBe(false);

    fireEvent.change(password, { target: { value: "2d23" } });
    expect(password.classList.contains("borderRed")).toBe(false);
  });

  test("border red when password is less than 5 character", () => {
    fireEvent.change(password, { target: { value: "2d3" } });
    expect(password.classList.contains("borderRed")).toBe(true);

    fireEvent.change(password, { target: { value: "2d23" } });
    expect(password.classList.contains("borderRed")).toBe(true);
  });
});

describe("confirm password", () => {
  const { getAllByTestId } = render(<Signup />);
  const confirmPassword = getAllByTestId("confirmPassword")[0];

  test("type of be password", () => {
    expect(confirmPassword).toHaveAttribute("type", "password");
  });

  test("border red if password doesnot match", () => {
    const { getAllByTestId } = render(<Signup />);
    const password = getAllByTestId("password")[0];

    fireEvent.change(password, { target: { value: "h22se" } });
    fireEvent.change(confirmPassword, { target: { value: "h21se" } });
    expect(confirmPassword.classList.contains("borderRed")).toBe(true);
  });

  test("not to have border red if password matches", () => {
    const { getAllByTestId } = render(<Signup />);
    const password = getAllByTestId("password")[0];

    fireEvent.change(password, { target: { value: "h22se" } });
    fireEvent.change(confirmPassword, { target: { value: "h22se" } });
    expect(confirmPassword.classList.contains("borderRed")).toBe(false);
  });
});

describe("status label", () => {
  const { getAllByTestId } = render(<Signup />);
  const passwordStrengthStatus = getAllByTestId("passwordStrengthStatus")[0];

  test("if password is empty string label should not be visible", () => {
    const { getAllByTestId } = render(<Signup />);
    const password = getAllByTestId("password")[0];

    fireEvent.change(password, { target: { value: "" } });
    expect(passwordStrengthStatus).not.toBeInTheDocument();
  });

  test.todo("status label determiner",()=>{

  })

  test("label to have string of Weak if password is weak",()=>{
    const { getAllByTestId } = render(<Signup />);
    const password = getAllByTestId("password")[0];

    fireEvent.change(password, { target: { value: "dea" } });
    expect(passwordStrengthStatus).toHaveTextContent('Weak')
  })

  test("label to have string of Medium if password is weak",()=>{
    const { getAllByTestId } = render(<Signup />);
    const password = getAllByTestId("password")[0];

    fireEvent.change(password, { target: { value: "deawf" } });
    expect(passwordStrengthStatus).toHaveTextContent('Medium')
  })

  test("label to have string of Strong if password is weak",()=>{
    const { getAllByTestId } = render(<Signup />);
    const password = getAllByTestId("password")[0];

    fireEvent.change(password, { target: { value: "deadfres" } });
    expect(passwordStrengthStatus).toHaveTextContent('Strong')
  })


});

describe("submit button", () => {
  const { getAllByTestId } = render(<Signup />);
  const submitBtn = getAllByTestId("submitBtn")[0];
  
  test('submit button to be disabled by default',()=>{
      expect(submitBtn).toHaveTextContent('disabled')
  })

  test.todo('if password  or email is not vaild button to be disabled',()=>{

  })

  test.todo('if password does not match button to be disabled',()=>{
    const { getAllByTestId } = render(<Signup />);
    const password = getAllByTestId("password")[0];
    const confirmPassword = getAllByTestId("password")[0];

    fireEvent.change(password, { target: { value: "h22se" } });
    fireEvent.change(confirmPassword, { target: { value: "h21se" } });
    expect(submitBtn).toHaveTextContent('disabled')
  })

});
