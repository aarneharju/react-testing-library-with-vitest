import { http, HttpResponse } from 'msw';
import { server } from '../../../mocks/server';
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { expect } from 'vitest';
import userEvent from '@testing-library/user-event';

test("Handles error for  scoops and toppings routes", async () => {
    server.resetHandlers(
        http.get("http://localhost:3030/scoops", () => {
            return new HttpResponse(null, { status: 500 });
        }),
        http.get("http://localhost:3030/toppings", () => {
            return new HttpResponse(null, { status: 500 });
        }),
    );

    render(<OrderEntry />);

    const alerts = await screen.findAllByRole("alert") // name isn't going to work here because bootstrap alerts don't have the expected name value: , { name: "An unexpected error occurred. Please try again later."});
    expect(alerts).toHaveLength(2);
});

test("Order button should be disabled if no scoops are added to the order", async () => {
    // Setup userEvent
    const user = userEvent.setup();

    // Render OrderEntry component
    render(<OrderEntry />);

    // Check that the order button is disabled
    const locatorButtonOrder = screen.getByRole("button", { name: /order/i });
    expect(locatorButtonOrder).toBeDisabled();

    // Add a vanilla scoop
    const locatorScoopVanillaInput = await screen.findByRole("spinbutton", { name: /vanilla/i });
    await user.click(locatorScoopVanillaInput);
    await user.clear(locatorScoopVanillaInput);
    await user.type(locatorScoopVanillaInput, "1");
    
    // Check that the order button gets enabled
    expect(locatorButtonOrder).toBeEnabled();

    // Remove the vanilla scoop
    await user.click(locatorScoopVanillaInput);
    await user.clear(locatorScoopVanillaInput);
    await user.type(locatorScoopVanillaInput, "0");

    // Check that the order button is disabled again
    expect(locatorButtonOrder).toBeDisabled();
});