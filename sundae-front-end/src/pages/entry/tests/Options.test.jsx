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