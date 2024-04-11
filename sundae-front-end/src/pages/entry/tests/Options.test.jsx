import { render, screen } from "@testing-library/react";
import Options from "../Options";
import { expect } from "vitest";

test("Displays image for each scoop option from server", () => {
    render(<Options optionType="scoops" />);

    // Find images
    const scoopImages = screen.getAllByRole("img", { name: /scoop$/i});

    // Confirm that the number of images matches to the mocked array
    expect(scoopImages).toHaveLength(2);

    // Confirm the alt text of the images
    const altTexts = scoopImages.map(element => element.alt)
    expect(altTexts).toEqual(["Mint-chip scoop", "Vanilla scoop"]);

})