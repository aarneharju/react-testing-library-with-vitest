import { render, screen } from "../test-utils/testing-library-utils.jsx";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx"

test("Order phases for happy path", async () => {
    // Setup user for click etc events
    const user = await userEvent.setup();

    // Render app
    render(<App />);

    // Debug ======
    screen.debug();
    // ============

    // Add a scoop and a topping
    const locatorScoopVanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
    user.clear(locatorScoopVanillaInput);
    user.type(locatorScoopVanillaInput, "1");

    const locatorToppingMMInput = await screen.findByRole("checkbox", { name: "M&Ms" });
    user.click(locatorToppingMMInput);

    // Find and click order button
    const locatorOrderButton = screen.getByRole("button");
    locatorOrderButton.click();

    // Check summary information based on order


    // Accept terms and conditions and click button to confirm order

    // Confirm order number on confirmation page

    // Click new order button on confirmation page to go back to beginning

    // Check that scoops and toppings subtotals have been reset
});