import React from "react"
import Advertisement from "@components/advertisement";
import { render } from "@testing-library/react";
import "jest-styled-components"

it("should match snapshot", () => {
    const { asFragment } = render(<Advertisement/>)
    expect(asFragment()).toMatchSnapshot()
});
