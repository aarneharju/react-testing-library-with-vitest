import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";

test("Invalid values for scoops should not work", async () => {
    // Setup userEvent
    const user = userEvent.setup();

    // Render ScoopOption
    render(<ScoopOption name="Vanilla" imagePath="/images/vanilla.png" />);

    // Input and assert valid number
    const elementScoopVanillaInput = screen.getByRole("spinbutton");
    await user.click(elementScoopVanillaInput);
    await user.clear(elementScoopVanillaInput);
    await user.type(elementScoopVanillaInput, "1");
    expect(elementScoopVanillaInput).not.toHaveClass("is-invalid");

    // Input and assert negative number
    await user.click(elementScoopVanillaInput);
    await user.clear(elementScoopVanillaInput);
    await user.type(elementScoopVanillaInput, "-3");
    expect(elementScoopVanillaInput).toHaveClass("is-invalid");

    // Input and assert decimal number
    await user.click(elementScoopVanillaInput);
    await user.clear(elementScoopVanillaInput);
    await user.type(elementScoopVanillaInput, "1.3");
    expect(elementScoopVanillaInput).toHaveClass("is-invalid");

    // Input and assert number greater than 10
    await user.click(elementScoopVanillaInput);
    await user.clear(elementScoopVanillaInput);
    await user.type(elementScoopVanillaInput, "11");
    expect(elementScoopVanillaInput).toHaveClass("is-invalid");


});