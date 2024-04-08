import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { logRoles } from "@testing-library/react";

test("The button click flow", () => {
    // Render app
    const { container } = render(<App/>);
    logRoles(container);

    // Find the button
    const elementButton = screen.getByRole("button", { name: /blue/i });

    // Click the button
    fireEvent.click(elementButton);
    
    // Check button text
    expect(elementButton).toHaveTextContent(/red/i);
    
    // Check the button color
    expect(elementButton).toHaveClass("blue");
});
