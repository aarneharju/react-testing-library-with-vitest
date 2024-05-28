import { render, screen } from "../../../test-utils/testing-library-utils";
import { HttpResponse, http } from "msw";
import { server } from "../../../mocks/server";
import OrderConfirmation from "../OrderConfirmation";

test("Server error on order confirmation page", async () => {
    // Reset mock service worker to return error on order endpoint
    server.resetHandlers(
        http.post("http://localhost:3030/order", "no data", () => {
            return new HttpResponse(null, { status: 500 });
        })
    )

    // Render OrderConfirmation component
    render(<OrderConfirmation />);

    // Assert that the error message and new order buttons are shown
    const elementAlert = await screen.findByRole("alert");
    const elementButtonNewOrder = screen.getByRole("button");

    expect(elementAlert).toBeInTheDocument();
    expect(elementButtonNewOrder).toBeInTheDocument();
});