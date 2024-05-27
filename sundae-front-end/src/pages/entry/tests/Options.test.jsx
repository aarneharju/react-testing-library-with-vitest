import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import { expect } from "vitest";

test("Displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

    // Find images
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i});

    // Confirm that the number of images matches the number in the mocked array
    expect(scoopImages).toHaveLength(2);

    // Confirm the alt text of the images
    const altTexts = scoopImages.map(element => element.alt)
    expect(altTexts).toEqual(["Mint chip scoop", "Vanilla scoop"]);

})

test("Displays image for each toppings option from server", async () => {
    render(<Options optionType={"toppings"} />)

    // Find images
    const toppingsImages = await screen.findAllByRole("img", { name: /topping$/i});

    // Confirm that the number of images matches the number in the mocked array
    expect(toppingsImages).toHaveLength(3);

    // Confirm the alt texts of the images
    const altTexts = toppingsImages.map(element => element.alt);
    expect(altTexts).toEqual(["M&Ms topping", "Hot fudge topping", "Peanut butter cups topping"]);
})

test("The scoops total should not update if input is invalid", async () => {
    // Setup user event
    const user = userEvent.setup();

    // Render Options
    render(<Options optionType="scoops" />);
    
    // Check that total starts at 0
    const elementScoopsTotal = screen.getByText("Scoops total", { exact: false });
    expect(elementScoopsTotal).toHaveTextContent("$0.00");

    // Add invalid input (decimal number) and check that total is 0
    const elementScoopVanillaInput = await screen.findByRole("spinbutton", { name: /vanilla/i });
    await user.click(elementScoopVanillaInput);
    await user.clear(elementScoopVanillaInput);
    await user.type(elementScoopVanillaInput, "2.5");
    expect(elementScoopsTotal).toHaveTextContent("$0.00");

    // Add invalid input (negative number) and check that total is 0
    await user.click(elementScoopVanillaInput);
    await user.clear(elementScoopVanillaInput);
    await user.type(elementScoopVanillaInput, "-2");
    expect(elementScoopsTotal).toHaveTextContent("$0.00");

    // Add invalid input (number greater than 10) and check that total is 0
    await user.click(elementScoopVanillaInput);
    await user.clear(elementScoopVanillaInput);
    await user.type(elementScoopVanillaInput, "20");
    expect(elementScoopsTotal).toHaveTextContent("$0.00");

})