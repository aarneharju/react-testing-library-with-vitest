import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { describe, expect } from "vitest";
import OrderEntry from "../OrderEntry";

test("Updates scoop subtotal when scoops change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);

    // Make sure total starts out at $0.00
    const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    // Update vanilla scoops to 1, and check subtotal
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent("2.00");
    
    // Update mint chip scoops to 2 and check subtotal
    const mintChipInput = await screen.findByRole("spinbutton", { name: "Mint chip" });
    
    await user.clear(mintChipInput);
    await user.type(mintChipInput, "2");
    expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("Toppings subtotal when toppings change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />);
    
    // Make sure total starts out at $0.00
    const toppingsSubtotal = screen.getByText("Toppings total: $", { exact: false });
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    // Select M&Ms toppings and check subtotal
    let toppingsInput = await screen.findByRole("checkbox", { name: "M&Ms"});
    
    await user.click(toppingsInput);
    expect(toppingsSubtotal).toHaveTextContent("1.50");
    
    // Select Hot fudge topping and check subtotal
    toppingsInput = await screen.findByRole("checkbox", { name: "Hot fudge"});
    
    await user.click(toppingsInput);
    expect(toppingsSubtotal).toHaveTextContent("3.00");
    
    // deselect Hot fudge topping and check susbtotal
    await user.click(toppingsInput);
    expect(toppingsSubtotal).toHaveTextContent("1.50");
    
});

describe("Grand total", () => {
    test("Grand total starts at $0.00", () => {
        render(<OrderEntry/>);
        
        const elementGrandTotal = screen.getByRole("heading", { name: /Grand Total: \$/i });
        expect(elementGrandTotal).toHaveTextContent("0.00")
    });
    
    test("Grand total updates properly if a scoop is added first", async () => {
        const user = await userEvent.setup();
        render(<OrderEntry/>);
        
        // Add one Vanilla scoop
        const elementVanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
        await user.clear(elementVanillaInput);
        await user.type(elementVanillaInput, "1");
        
        const elementGrandTotal = await screen.findByRole("heading", { name: /Grand Total: \$/i });
        expect(elementGrandTotal).toHaveTextContent("2.00")
        
    });
    
    test("Grand total updates properly if a topping is added first", async () => {
        const user = await userEvent.setup();
        render(<OrderEntry/>);
  
        const elementHotFudge = await screen.findByRole("checkbox", { name: "Hot fudge" });
        await user.click(elementHotFudge);
        const elementGrandTotal = await screen.findByRole("heading", { name: /Grand Total: \$/i });
        expect(elementGrandTotal).toHaveTextContent("1.50")
        
    });

    test("Grand total updates properly if item is removed", async () => {
        const user = await userEvent.setup();
        render(<OrderEntry/>);
        
        const elementVanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
        await user.clear(elementVanillaInput);
        await user.type(elementVanillaInput, "1");
        
        const elementMintChipInput = await screen.findByRole("spinbutton", { name: "Mint chip" });
        await user.clear(elementMintChipInput);
        await user.type(elementMintChipInput, "1");
        
        await user.clear(elementVanillaInput);
        await user.type(elementVanillaInput, "0");

        const elementGrandTotal = await screen.findByRole("heading", { name: /Grand Total: \$/i });
        expect(elementGrandTotal).toHaveTextContent("3.50")
        
        
    });
})