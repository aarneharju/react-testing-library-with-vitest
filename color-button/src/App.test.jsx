import { render, screen } from "@testing-library/react";
import App from "./App";
import { logRoles } from "@testing-library/react";

test("Button starts with correct label and color", () => {
    const { container } = render(<App/>);
    logRoles(container);
    const elementButton = screen.getByRole("button", { name: /blue/i });
    expect(elementButton).toHaveClass("red");
});

test("Button starts with correct text", () => {

});

test("Button has correct color after click", () => {

});

test("Button has correct text after click", () => {

});

