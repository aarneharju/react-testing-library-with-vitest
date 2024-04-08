import { render, screen } from "@testing-library/react";
import App from "./App";

test("Button starts with correct color", () => {
    render(<App/>);
    const elementButton = screen.getByRole("button", { name: /blue/i });
    expect(elementButton).toHaveClass("red");
});

test("Button starts with correct text", () => {

});

test("Button has correct color after click", () => {

});

test("Button has correct text after click", () => {

});

