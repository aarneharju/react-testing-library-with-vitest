import { render, screen } from "@testing-library/react";
import Options from "../Options";
import { expect } from "vitest";

test("Displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

    // Find images
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i});
    console.log(scoopImages);

    // Confirm that the number of images matches to the mocked array
    expect(scoopImages).toHaveLength(2);

    // Confirm the alt text of the images
    const altTexts = scoopImages.map(element => element.alt)
    expect(altTexts).toEqual(["Mint chip scoop", "Vanilla scoop"]);

})