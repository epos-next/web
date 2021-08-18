import Button from "@components/button";
import { render } from "@testing-library/react";
import React from "react";
import "jest-styled-components"

it("should renders correctly with default props", () => {
    const { asFragment } = render(<Button/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should render secondary button", () => {
    const { asFragment } = render(<Button type="secondary"/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should render disabled button", () => {
    const { asFragment } = render(<Button type="disabled"/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should render loading primary button", () => {
    const { asFragment } = render(<Button loading={ true }/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should render loading secondary button", () => {
    const { asFragment } = render(<Button type="secondary" loading={ true }/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should render loading disabled button", () => {
    const { asFragment } = render(<Button type="disabled" loading={ true }/>)
    expect(asFragment()).toMatchSnapshot()
});


