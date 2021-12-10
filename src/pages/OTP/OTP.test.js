import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import OTP from "./index";
import "@testing-library/jest-dom";

const setup = (elementId) => {
  const utils = render(<OTP />);
  const input = utils.getByTestId(elementId);
  return { input, ...utils };
};

describe("test if all elements are present or not", () => {
  test("heading", () => {
    const { input: heading } = setup("heading");
    expect(heading).toBeInTheDocument();
  });

  test("all input boxes", () => {
    const { input: inputWtapper } = setup("inputWtapper");
    expect(inputWtapper).toBeInTheDocument();
    expect(screen.getByTestId("input1")).toBeInTheDocument();
    expect(screen.getByTestId("input2")).toBeInTheDocument();
    expect(screen.getByTestId("input3")).toBeInTheDocument();
    expect(screen.getByTestId("input4")).toBeInTheDocument();
  });

  test("OTP code text", () => {
    const { input: OTPCode } = setup("OTPCode");
    expect(OTPCode).toBeInTheDocument();
  });

  test("clear OTP button", () => {
    const { input: clearBtn } = setup("clearBtn");
    expect(clearBtn).toBeInTheDocument();
  });

  test("verify OTP button", () => {
    const { input: verifyBtn } = setup("verifyBtn");
    expect(verifyBtn).toBeInTheDocument();
  });
});

describe("input boxes", () => {
  test("must allow only numbers", () => {
    fireEvent.change(screen.getByTestId("input1", { target: { value: "g" } }));
    fireEvent.change(screen.getByTestId("input2", { target: { value: "g" } }));
    fireEvent.change(screen.getByTestId("input3", { target: { value: "g" } }));
    fireEvent.change(screen.getByTestId("input4", { target: { value: "g" } }));
    expect(screen.getByTestId("input1")).not.toHaveTextContent("g");
    expect(screen.getByTestId("input2")).not.toHaveTextContent("g");
    expect(screen.getByTestId("input3")).not.toHaveTextContent("g");
    expect(screen.getByTestId("input4")).not.toHaveTextContent("g");
  });

  test("not to have more than one character", () => {
    fireEvent.change(screen.getByTestId("input1", { target: { value: 21 } }));
    fireEvent.change(screen.getByTestId("input2", { target: { value: 32 } }));
    fireEvent.change(screen.getByTestId("input3", { target: { value: 232 } }));
    fireEvent.change(
      screen.getByTestId("input4", { target: { value: "asw" } })
    );
    expect(screen.getByTestId("input1")).toHaveValue(2);
    expect(screen.getByTestId("input2")).toHaveValue(3);
    expect(screen.getByTestId("input3")).toHaveValue(2);
    expect(screen.getByTestId("input4")).toHaveValue("");
  });
});

describe("OTP doesnot match label", () => {
  test("Label not to be present by default", () => {
    const { input: OTPMissmatchLabel } = setup("OTPMissmatchLabel");
    expect(OTPMissmatchLabel).not.toHaveTextContent("OTP doesnot match");
  });
  test("label present when OTP doesnot match", () => {
    const { input: OTPMissmatchLabel } = setup("OTPMissmatchLabel");
    fireEvent.change(screen.getByTestId("input1"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input2"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input3"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input4"), { target: { value: 1 } });
    expect(OTPMissmatchLabel).toHaveTextContent("OTP doesnot match");
  });
});

describe("verify OTP button", () => {
  test("disabled by default", () => {
    const { input: verifyBtn } = setup("verifyBtn");
    expect(verifyBtn).toHaveAttribute("disabled");
  });

  test.todo("otp verifyer function");

  test("enabled if all input is present", () => {
    const { input: verifyBtn } = setup("verifyBtn");
    fireEvent.change(screen.getByTestId("input1", { target: { value: 1 } }));
    fireEvent.change(screen.getByTestId("input2", { target: { value: 1 } }));
    fireEvent.change(screen.getByTestId("input3", { target: { value: 1 } }));
    fireEvent.change(screen.getByTestId("input4", { target: { value: 1 } }));
    expect(verifyBtn.hasAttribute("disabled")).toBe(false);
  });
});

describe("clear OTP button", () => {
  const { input: clearBtn } = setup("clearBtn");
  fireEvent.change(screen.getByTestId("input1", { target: { value: 1 } }));
  fireEvent.change(screen.getByTestId("input2", { target: { value: 1 } }));
  fireEvent.change(screen.getByTestId("input3", { target: { value: 1 } }));
  fireEvent.change(screen.getByTestId("input4", { target: { value: 1 } }));
  fireEvent.click(clearBtn);
  expect(screen.getByTestId("input1")).toBe("");
  expect(screen.getByTestId("input2")).toBe("");
  expect(screen.getByTestId("input3")).toBe("");
  expect(screen.getByTestId("input4")).toBe("");
});
