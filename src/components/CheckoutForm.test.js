import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {});
render(<CheckoutForm/>)

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm/>)

    const firstNameInput = screen.getByLabelText(/First Name:/i);
    userEvent.type(firstNameInput,'Devon');
    const lastNameInput = screen.getByLabelText(/Last Name:/i);
    userEvent.type(lastNameInput,'Fails');
    const addressInput = screen.getByLabelText(/Address:/i);
    userEvent.type(addressInput,'12 Daisy Ave');
    const cityInput = screen.getByLabelText(/City:/i);
    userEvent.type(cityInput,'Knoxville');
    const stateInput = screen.getByLabelText(/State:/i);
    userEvent.type(stateInput,'TN');
    const zipInput = screen.getByLabelText(/Zip:/i);
    userEvent.type(zipInput,'37931');
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const firstNameDisplay = screen.queryByText('Devon')
        expect(firstNameDisplay).toBeInTheDocument
        const lastNameDisplay = screen.queryByText('Fails')
        expect(lastNameDisplay).toBeInTheDocument
        const addressDisplay = screen.queryByText('12 Daisy Ave')
        expect(addressDisplay).toBeInTheDocument
        const cityDisplay = screen.queryByText('Knoxville')
        expect(cityDisplay).toBeInTheDocument
        const stateDisplay= screen.queryByText('TN')
        expect(stateDisplay).toBeInTheDocument
        const zipDisplay = screen.queryByText('37931')
        expect(zipDisplay).toBeInTheDocument

    })

});
