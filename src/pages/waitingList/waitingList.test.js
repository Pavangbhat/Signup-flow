import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import WaitingList from "./index";

const setup = (elementId) => {
  const utils = render(<WaitingList />);
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
  test("waiting list message", () => {
    const { element: card } = setup("cardWrapper");
    expect(card).toHaveTextContent("You are added to the waiting list");
  });
});
