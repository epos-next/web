import React  from "react";
import WelcomeTile from "@components/welcome-tile";
import { fireEvent, render } from "@testing-library/react";

const name = "Максим"

it("should match snapshot", () => {
    const { asFragment } = render(<WelcomeTile name={name}/>)
    expect(asFragment()).toMatchSnapshot()
});

it("shouldn't show anything if show=false", () => {
    const { asFragment } = render(<WelcomeTile name={name} show={false}/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should call callback if user clicking on close button", () => {
    const callback = jest.fn()
    const { getByAltText } = render(<WelcomeTile name={name} onClose={callback} />)
    fireEvent.click(getByAltText("close"))
    expect(callback).toBeCalledTimes(1)
});

