import LoadingIndicator from "@components/loading-indicator";
import { render } from "@testing-library/react";
import React from "react";

it("should match snapshot", () => {
    const { asFragment } = render(<LoadingIndicator/>)
    expect(asFragment()).toMatchSnapshot()
})

it("should use radius", () => {
    const { asFragment } = render(<LoadingIndicator radius={2000}/>)
    expect(asFragment()).toMatchSnapshot()
})

it("should use color", () => {
    const { asFragment } = render(<LoadingIndicator color="#ccc123"/>)
    expect(asFragment()).toMatchSnapshot()
});
