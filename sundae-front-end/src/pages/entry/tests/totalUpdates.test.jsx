import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { expect } from "vitest";

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
})