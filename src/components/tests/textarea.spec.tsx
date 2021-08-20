import Textarea from "@components/textarea";
import { render } from "@testing-library/react";
import React from "react"

it("should match snapshot", () => {
    const { asFragment } = render(<Textarea/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should use error state", () => {
    const { asFragment } = render(<Textarea error={true} />)
    expect(asFragment()).toMatchSnapshot()
});
