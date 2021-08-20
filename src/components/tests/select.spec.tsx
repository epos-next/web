import Select from "@components/select";
import { fireEvent, render } from "@testing-library/react";
import React from "react";

it("should match snapshot", () => {
    const { asFragment } = render(<Select/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should display error state", () => {
    const { asFragment } = render(<Select error={ true }/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should select values", () => {
    const callback = jest.fn()
    const { getByRole } = render(
        <Select onChange={ callback }>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </Select>
    )

    fireEvent.change(getByRole("combobox"), { target: { value: "2" } })
    expect(getByRole("combobox")).toHaveValue("2")
})

it("should have default selected value", () => {
    const callback = jest.fn()
    const { getByRole } = render(
        <Select onChange={ callback }>
            <option value="1">1</option>
            <option value="2" defaultChecked disabled hidden>2</option>
            <option value="3">3</option>
        </Select>
    )

    expect(getByRole("combobox")).toHaveValue("1")
})

describe("testing native select props", () => {
    it("should pass placeholder", () => {
        const placeholder = "heey what's up brrrr"
        const { getByRole } = render(<Select placeholder={ placeholder }/>)
        expect(getByRole("combobox")).toHaveAttribute("placeholder", placeholder)
    });

    it("should pass custom attribute", () => {
        const { getByRole } = render(<Select data-attribute="123"/>)
        expect(getByRole("combobox")).toHaveAttribute("data-attribute", "123")
    });
})


