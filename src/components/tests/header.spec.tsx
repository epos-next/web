import React from "react"
import Header from "@components/header";
import { fireEvent, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import "jest-styled-components"
import AppRouter from "../../hooks/app-router";

describe("testing rendering", () => {
    it("should renders correctly with default props", () => {
        const { asFragment } = render(<Header/>)
        expect(asFragment()).toMatchSnapshot()
    });

    it("should renders correctly with user name", () => {
        const { asFragment } = render(<Header userName="Ярослав Зотов"/>)
        expect(asFragment()).toMatchSnapshot()
    });

    it("should renders correctly with marks tab", () => {
        const { asFragment } = render(<Header tab="marks"/>)
        expect(asFragment()).toMatchSnapshot()
    })
})

it("should handle tab changed", () => {
    const callback = jest.fn()
    const { getAllByText } = render(<Header onTabClick={callback} userName="Ярослав Зотов"/>)
    fireEvent.click(getAllByText("Оценки")[0])
    expect(callback).toBeCalledWith("marks")
});

it("should navigate to profile page on click", () => {
    jest.spyOn(AppRouter, "goProfile")
    const usualMock = AppRouter.goProfile
    AppRouter.goProfile = jest.fn()
    const { getAllByText } = render(<Header userName="Ярослав Зотов"/>)
    fireEvent.click(getAllByText("Ярослав Зотов")[0])
    expect(AppRouter.goProfile).toBeCalledTimes(1)
    AppRouter.goProfile = usualMock
})

