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

test("renders movement and reset buttons", () => {
  render(<AppFunctional />);
  expect(screen.getByText(/left/i)).toBeInTheDocument();
  expect(screen.getByText(/right/i)).toBeInTheDocument();
  expect(screen.getByText(/up/i)).toBeInTheDocument();
  expect(screen.getByText(/down/i)).toBeInTheDocument();
  expect(screen.getByText(/reset/i)).toBeInTheDocument();
});

test("email input updates the value", () => {
  render(<AppFunctional />);
  const input = screen.getByPlaceholderText(/type email/i);
  fireEvent.change(input, { target: { value: "tester@example.com" } });
  expect(input.value).toBe("tester@example.com");
});

test("active square contains the letter B and has active class", () => {
  render(<AppFunctional />);
  const active = screen.getByText("B");
  expect(active).toBeInTheDocument();
  expect(active.className).toMatch(/active/);
});

test("reset button resets both coordinates and steps", () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText(/right/i));
  fireEvent.click(screen.getByText(/down/i));

  fireEvent.click(screen.getByText(/reset/i));

  expect(screen.getByText(/coordinates \(2, 2\)/i)).toBeInTheDocument();
  expect(screen.getByText(/you moved 0 times/i)).toBeInTheDocument();
});
