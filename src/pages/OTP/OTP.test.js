import React from "react";
import { render, fireEvent, screen, getByTestId } from "@testing-library/react";
import OTP from "./index";
import "@testing-library/jest-dom";
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const setup = (elementId) => {
  const utils = render(<OTP />);
  const element = utils.getByTestId(elementId);
  return { element, ...utils };
};

describe("test if all elements are present or not", () => {
  test("heading", () => {
    const { element: heading } = setup("heading");
    expect(heading).toBeInTheDocument();
  });

  test("all input boxes", () => {
    const { element: inputWtapper } = setup("inputWtapper");
    expect(inputWtapper).toBeInTheDocument();
    expect(screen.getByTestId("input1")).toBeInTheDocument();
    expect(screen.getByTestId("input2")).toBeInTheDocument();
    expect(screen.getByTestId("input3")).toBeInTheDocument();
    expect(screen.getByTestId("input4")).toBeInTheDocument();
  });

  test("OTP code text", () => {
    const { element: OTPCode } = setup("OTPCode");
    expect(OTPCode).toBeInTheDocument();
  });

  test("clear OTP button", () => {
    const { element: clearBtn } = setup("clearBtn");
    expect(clearBtn).toBeInTheDocument();
  });

  test("verify OTP button", () => {
    const { element: verifyBtn } = setup("verifyBtn");
    expect(verifyBtn).toBeInTheDocument();
  });
});

describe("input boxes", () => {
  test("must allow only numbers", () => {
    render(<OTP />);
    fireEvent.change(screen.getByTestId("input1"), { target: { value: "g" } });
    fireEvent.change(screen.getByTestId("input2"), { target: { value: "g" } });
    fireEvent.change(screen.getByTestId("input3"), { target: { value: "g" } });
    fireEvent.change(screen.getByTestId("input4"), { target: { value: "g" } });
    expect(screen.getByTestId("input1").value).not.toBe("g");
    expect(screen.getByTestId("input2").value).not.toBe("g");
    expect(screen.getByTestId("input3").value).not.toBe("g");
    expect(screen.getByTestId("input4").value).not.toBe("g");
  });

  test("not to have more than one character", () => {
    render(<OTP />);
    fireEvent.change(screen.getByTestId("input1"), { target: { value: 2 } });
    fireEvent.change(screen.getByTestId("input2"), { target: { value: 23 } });
    fireEvent.change(screen.getByTestId("input3"), { target: { value: "23" } });
    fireEvent.change(screen.getByTestId("input4"), { target: { value: "se" } });
    expect(screen.getByTestId("input1").value).toBe("2");
    expect(screen.getByTestId("input2").value).toBe("");
    expect(screen.getByTestId("input3").value).toBe("");
    expect(screen.getByTestId("input4").value).toBe("");
  });
});

describe("OTP doesnot match label", () => {
  test("Label not to be present by default", () => {
    const { element: OTPMissmatchLabel } = setup("OTPMissmatchLabel");
    expect(OTPMissmatchLabel).not.toHaveTextContent("OTP doesnot match");
  });

  test("label present when OTP doesnot match", () => {
    const { element: OTPMissmatchLabel } = setup("OTPMissmatchLabel");
    fireEvent.change(screen.getByTestId("input1"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input2"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input3"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input4"), { target: { value: 1 } });
    fireEvent.click(screen.getByTestId("verifyBtn"));
    expect(OTPMissmatchLabel).toHaveTextContent("OTP not valid");
  });
});

describe("verify OTP button", () => {
  test("disabled by default", () => {
    const { element: verifyBtn } = setup("verifyBtn");
    expect(verifyBtn).toHaveAttribute("disabled");
  });

  test("otp verifyer function", () => {
    const { element: verifyBtn } = setup("verifyBtn");
    fireEvent.change(screen.getByTestId("input1"), { target: { value: 5 } });
    fireEvent.change(screen.getByTestId("input2"), { target: { value: 7 } });
    fireEvent.change(screen.getByTestId("input3"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input4"), { target: { value: 6 } });
    expect(verifyBtn).not.toHaveAttribute("disabled");
  });

  test("enabled if all input is present", () => {
    const { element: verifyBtn } = setup("verifyBtn");
    fireEvent.change(screen.getByTestId("input1"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input2"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input3"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input4"), { target: { value: 1 } });
    expect(verifyBtn.hasAttribute("disabled")).toBe(false);
  });
});

describe("clear OTP button", () => {
  test("behaivour of clear button", () => {
    const { element: clearBtn } = setup("clearBtn");
    fireEvent.change(screen.getByTestId("input1"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input2"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input3"), { target: { value: 1 } });
    fireEvent.change(screen.getByTestId("input4"), { target: { value: 1 } });
    fireEvent.click(clearBtn);
    expect(screen.getByTestId("input1").value).toBe("");
    expect(screen.getByTestId("input2").value).toBe("");
    expect(screen.getByTestId("input3").value).toBe("");
    expect(screen.getByTestId("input4").value).toBe("");
  });
});
