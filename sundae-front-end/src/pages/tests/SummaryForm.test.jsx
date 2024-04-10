import { render, screen, logRoles } from "@testing-library/react";
import SummaryForm from "../summary/SummaryForm.jsx";
import userEvent from "@testing-library/user-event";

test("Checkbox flow", async () => {
    const user = userEvent.setup();

    // Render
    const { container } = render(<SummaryForm />);

    // Log roles
    // eslint-disable-next-line testing-library/no-debugging-utils
    logRoles(container);

    // Find checkbox element
    const elementCheckbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    
    // Find confirm order button
    const elementConfirmOrderButton = screen.getByRole("button", { name: /confirm order/i });

    // Check that the checkbox is unchecked
    expect(elementCheckbox).not.toBeChecked();
    
    // Check that the confirm order button is not enabled
    expect(elementConfirmOrderButton).toBeDisabled();
    
    // Check the terms and conditions checkbox
    await user.click(elementCheckbox);
    
    // Check that the checkbox is checked
    expect(elementCheckbox).toBeChecked();
    
    // Check that the confirm order button is enabled
    expect(elementConfirmOrderButton).toBeEnabled();
    
    // Uncheck the terms and conditions checkbox
    await user.click(elementCheckbox);
    
    // Check that the terms and conditions checkbox is unchecked
    expect(elementCheckbox).not.toBeChecked();
    
    // Check that the confirm order button is disabled
    expect(elementConfirmOrderButton).toBeDisabled();
    
})

test("Popover responds to hover", async () => {
    // Popover starts out hidden


    // Popover appears on mouseover of checkbox label


    // Popover disappears when mouse out
})