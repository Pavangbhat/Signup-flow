import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignedUp from "./index";

const setup = (elementId) => {
  const utils = render(<SignedUp />);
  const element = utils.getByTestId(elementId);
  return { element, ...utils };
};

describe("element present or not", () => {
  test("card message", () => {
    const { element: card } = setup("cardWrapper");
    expect(card).toBeInTheDocument();
  });
});

describe("valid card message", () => {
  test("signed up message", () => {
    const { element: card } = setup("cardWrapper");
    expect(card).toHaveTextContent("Congratulations! you got referred 🎉 by");
  });
});
