import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { logRoles } from "@testing-library/react";
import { kebabCaseToTitleCase } from "./helpers";

test("The button click flow", () => {
    // Render app
    const { container } = render(<App/>);
    logRoles(container);

    // Find the button
    const elementButton = screen.getByRole("button", { name: /midnight blue/i });

    // Check the initial color
    expect(elementButton).toHaveClass("medium-violet-red");

    // Click the button
    fireEvent.click(elementButton);
    
    // Check button text
    expect(elementButton).toHaveTextContent(/medium violet red/i);
    
    // Check the button color
    expect(elementButton).toHaveClass("midnight-blue");
});

test("The checkbox flow", () => {
    render(<App/>);

    // Find elements
    const elementButton = screen.getByRole("button", {name: /midnight blue/i});
    const elementCheckBox = screen.getByRole("checkbox", { name: /disable button/i });

    // Check initial conditions
    expect(elementButton).toHaveClass("medium-violet-red");
    expect(elementButton).toBeEnabled();
    expect(elementCheckBox).not.toBeChecked();

    // Check the checkbox
    fireEvent.click(elementCheckBox);

    // Check that the checkbox is checked
    expect(elementCheckBox).toBeChecked();
    
    // Check that the button is disabled
    expect(elementButton).not.toBeEnabled();
    
    // Check that the button color is gray
    expect(elementButton).toHaveClass("gray");
    
    // Uncheck the checkbox
    fireEvent.click(elementCheckBox);
    
    // Check that the checkbox is not checked
    expect(elementCheckBox).not.toBeChecked();
    
    // Check that the button is enabled again
    expect(elementButton).toBeEnabled();
    
    // Check that the button is still red
    expect(elementButton).toHaveClass("medium-violet-red");
    
    // Click the button
    fireEvent.click(elementButton);
    
    // Check that the button is blue
    expect(elementButton).toHaveClass("midnight-blue");
    
    // Check the checkbox
    fireEvent.click(elementCheckBox);
    
    // Check that the checkbox is checked
    expect(elementCheckBox).toBeChecked();
    
    // Check that the button is gray
    expect(elementButton).toHaveClass("gray");
    
    // Check that the button is disabled
    expect(elementButton).not.toBeEnabled();
    
    // Uncheck the checkbox
    fireEvent.click(elementCheckBox);
    
    // Check that the button is enabled again
    expect(elementButton).toBeEnabled();
    
    // Check that the checkbox is not checked
    expect(elementCheckBox).not.toBeChecked();
    
    describe("kebabCaseToTitleCase()", () => {
    // Check that the button is still blue
    expect(elementButton).toHaveClass("midnight-blue");
    
});

    test("Works with no hyphens", () => {
        expect(kebabCaseToTitleCase("red")).toBe("Red");
    })
    
    test("Works with one hyphen", () => {
        expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
    })
    
    test("Works with multiple hyphens", () => {
        expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
    })
})