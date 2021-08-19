import React from "react"
import { fireEvent, render } from "@testing-library/react";
import Input from "@components/input";

it("should match snapshot", () => {
    const { asFragment } = render(<Input/>)
    expect(asFragment()).toMatchSnapshot()
});

describe("testing main logic", () => {
    it("should pass props to input-base", () => {
        const placeholder = "placeholder..."
        const myOwnProperty = "hello there"

        const { getByTestId } = render(<Input placeholder={ placeholder } data-myownproperty={ myOwnProperty }/>)

        expect(getByTestId("input-base")).toHaveAttribute("placeholder", placeholder)
        expect(getByTestId("input-base")).toHaveAttribute("data-myownproperty", myOwnProperty)
    });

    it("should use password icon if password=true", () => {
        const { asFragment } = render(<Input password={ true }/>)
        expect(asFragment()).toMatchSnapshot()
    });

    it("should show password if user click on eye icon", () => {
        const { getByTestId } = render(<Input password={ true }/>)
        fireEvent.click(getByTestId("password-eye"))
        expect(getByTestId("input-base")).toHaveAttribute("type", "text")
        expect(getByTestId("password-eye")).toHaveAttribute("src", "/icons/eye-icon_opened.png")
        fireEvent.click(getByTestId("password-eye"))
        expect(getByTestId("input-base")).toHaveAttribute("type", "password")
        expect(getByTestId("password-eye")).toHaveAttribute("src", "/icons/eye-icon_closed.png")
    });

    it("should render error text", () => {
        const error = "yooo this is my error::)"
        const { getByTestId } = render(<Input error={ true } errorText={ error }/>)
        expect(getByTestId("error")).toHaveTextContent(error)
    });

    it("shouldn't show error text if error=false and errorText != undefined", () => {
        const error = "yooo this is my error::)"
        const { getByTestId } = render(<Input error={ false } errorText={ error }/>)
        expect(getByTestId("input-base")).toHaveAttribute("data-error", "false")
    });
})

describe("testing props", () => {
    it("should use error", () => {
        const { getByTestId, rerender } = render(<Input error={ true }/>)
        expect(getByTestId("input-base")).toHaveAttribute("data-error", "true")
        rerender(<Input error={ false }/>)
        expect(getByTestId("input-base")).toHaveAttribute("data-error", "false")
    });

    it("should use errorText", () => {
        const { getByTestId, rerender } = render(<Input error={ true } errorText={ "text1" }/>)
        expect(getByTestId("error")).toHaveTextContent("text1")
        rerender(<Input error={ true } errorText={ "vchera ya govoril s bogom on menya ne ponyal" }/>)
        expect(getByTestId("error")).toHaveTextContent("vchera ya govoril s bogom on menya ne ponyal")
    });

    it("should use onEnterPressed", () => {
        const callback = jest.fn()
        const { getByTestId } = render(<Input onEnterPressed={ callback }/>)
        fireEvent.change(getByTestId("input-base"), { target: { value: "bump" } })
        fireEvent.keyDown(getByTestId("input-base"), { key: 'Enter', code: 'Enter' })
        expect(callback).toBeCalledTimes(1)
    });
})

it("should have input class", () => {
    const { getByTestId } = render(<Input/>)
    expect(getByTestId("container")).toHaveClass("input")
});
