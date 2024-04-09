import { render, fireEvent, screen, logRoles } from "@testing-library/react";
import SummaryForm from "../summary/SummaryForm.jsx";

test("Checkbox is unchecked", () => {
    // Render
    const view = render(<SummaryForm />);

    // Log roles
    // eslint-disable-next-line testing-library/no-debugging-utils
    logRoles(view);

    // Find checkbox element
    const elementCheckbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    
    // Find confirm order button
    const elementConfirmOrderButton = screen.getByRole("button", { name: /confirm order/i });

    // Check that the checkbox is unchecked
    expect(elementCheckbox).not.toBeChecked();
    
    // Check that the confirm order button is not enabled
    expect(elementConfirmOrderButton).toBeDisabled();
    
    // Check the terms and conditions checkbox
    fireEvent.click(elementCheckbox);
    
    // Check that the checkbox is checked
    expect(elementCheckbox).toBeChecked();
    
    // Check that the confirm order button is enabled
    expect(elementConfirmOrderButton).toBeEnabled();
    
    // Uncheck the terms and conditions checkbox
    fireEvent.click(elementCheckbox);
    
    // Check that the terms and conditions checkbox is unchecked
    expect(elementCheckbox).not.toBeChecked();
    
    // Check that the confirm order button is disabled
    expect(elementConfirmOrderButton).toBeDisabled();
    
})