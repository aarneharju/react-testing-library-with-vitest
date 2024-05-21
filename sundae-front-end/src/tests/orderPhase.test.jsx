import { findByRole, getByRole, render, screen } from "../test-utils/testing-library-utils.jsx";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx"
import { expect } from "vitest";

test("Order phases for happy path", async () => {
    // Setup user for click etc events
    const user = await userEvent.setup();

    // Render app
    // No need to wrap in provider, already wrapped in App.jsx?
    // Destructure unmount from return value to use at the end of the test
    const { unmount } = render(<App />);

    // Add two different scoops and a topping
    const locatorScoopVanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
    user.clear(locatorScoopVanillaInput);
    user.type(locatorScoopVanillaInput, "1");
    
    const locatorScoopMintChipInput = screen.getByRole("spinbutton", { name: "Mint chip" }); // No need for await because if Vanilla has loaded, so has Mint chip
    user.clear(locatorScoopMintChipInput);
    user.type(locatorScoopMintChipInput, "1");
    
    const locatorToppingMMInput = await screen.findByRole("checkbox", { name: "M&Ms" }); // Topping needs await because it needs an axios call to a different endpoint (toppings)
    user.click(locatorToppingMMInput);
    
    // Find and click order button
    const locatorOrderButton = screen.getByRole("button", { name: /order sundae/i });
    await user.click(locatorOrderButton);
    
    // Check summary information based on order
    const locatorSummaryScoops = await screen.findByText("Scoops:", { exact: false });
    const locatorSummaryToppings = await screen.findByText("Toppings:", { exact: false });
    const locatorSummaryTotal = await screen.findByText("Total:", { exact: false });
    
    
    console.log("locatorSummaryScoops.textContent:", locatorSummaryScoops.textContent);
    console.log("locatorSummaryToppings.textContent:", locatorSummaryToppings.textContent);
    console.log("locatorSummaryTotal.textContent:", locatorSummaryTotal.textContent);
    
    expect(locatorSummaryScoops).toHaveTextContent("4.00");
    expect(locatorSummaryToppings).toHaveTextContent("1.50");
    expect(locatorSummaryTotal).toHaveTextContent("5.50");
    
    // Accept terms and conditions and click button to confirm order
    const locatorTACCheckbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const locatorButtonConfirmOrder = screen.getByRole("button", { name: /confirm order/i });
    await user.click(locatorTACCheckbox);
    await user.click(locatorButtonConfirmOrder);
    
    // Confirm order number on confirmation page
    // const locatorOrderNumber = await screen.findByRole("heading", { name: /order number/i });
    const locatorOrderNumber = await screen.findByText("order number", { exact: false })
    expect(locatorOrderNumber).toHaveTextContent("1234567890");

    // ============
    screen.debug();
    // ============
    
    // Click new order button on confirmation page to go back to beginning
    const locatorButtonNewOrder = screen.getByRole("button", { name: /new order/i });
    await user.click(locatorButtonNewOrder);

    // Check that scoops and toppings subtotals have been reset
    const locatorScoopsTotal = await screen.findByText("Scoops total: $0.00");
    const locatorToppingsTotal = await screen.findByText("Toppings total: $0.00");
    expect(locatorScoopsTotal).toBeInTheDocument();
    expect(locatorToppingsTotal).toBeInTheDocument();

    // Unmount the component to trigger cleanup and avoid
    // "not wrapped in act()" error
    unmount();
});