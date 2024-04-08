import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { logRoles } from "@testing-library/react";

test("The button click flow", () => {
    // Render app
    const { container } = render(<App/>);
    logRoles(container);

    // Find the button
    const elementButton = screen.getByRole("button", { name: /blue/i });

    // Check the initial color
    expect(elementButton).toHaveClass("red");

    // Click the button
    fireEvent.click(elementButton);
    
    // Check button text
    expect(elementButton).toHaveTextContent(/red/i);
    
    // Check the button color
    expect(elementButton).toHaveClass("blue");
});

test("The checkbox flow", () => {
    render(<App/>);

    // Find elements
    const elementButton = screen.getByRole("button", {name: /blue/i});
    const elementCheckBox = screen.getByRole("checkbox", { name: /disable button/i });

    // Check initial conditions
    expect(elementButton).toHaveClass("red");
    expect(elementButton).toBeEnabled();
    expect(elementCheckBox).not.toBeChecked();
});
