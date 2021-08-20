import React from "react";
import ModalWindowBase from "@components/modal-window-base";
import { fireEvent, render } from "@testing-library/react";

it("should be open", () => {
    const { asFragment } = render(<ModalWindowBase isOpen={true} onClose={jest.fn} />)
    expect(asFragment()).toMatchSnapshot()
});

it("should be closed", () => {
    const { asFragment } = render(<ModalWindowBase isOpen={false} onClose={jest.fn} />)
    expect(asFragment()).toMatchSnapshot()
});

it("should call callback if user click on close button", () => {
    const callback = jest.fn()
    const { getByAltText } = render(<ModalWindowBase isOpen={false} onClose={callback} />)
    fireEvent.click(getByAltText("close"))
    expect(callback).toHaveBeenCalledTimes(1)
});
