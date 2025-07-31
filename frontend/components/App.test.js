// Write your tests here
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";

test("sanity", () => {
  expect(true).toBe(true);
});

test("renders headings and coordinates", () => {
  render(<AppFunctional />);
  expect(screen.getByText(/coordinates/i)).toBeInTheDocument();
  expect(screen.getByText(/you moved/i)).toBeInTheDocument();
});


