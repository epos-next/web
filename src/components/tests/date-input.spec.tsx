import DateInput, { formatSelectedDate } from "@components/date-input";
import DateHelper from "@helpers/date-helper";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import "jest-styled-components"
import '@testing-library/jest-dom'


it("should math snapshot", () => {
    const { asFragment } = render(<DateInput/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should show calendar if user focus input field", () => {
    const { getByTestId } = render(<DateInput/>)
    fireEvent.focus(getByTestId("input-base"))
    expect(getByTestId("calendar-container")).toHaveAttribute("data-show", "true")
});

it("should call callback if user click on date field", () => {
    const callback = jest.fn()
    const now = new Date(2021, 11, 21)
    jest.spyOn(DateHelper, "now", "get").mockReturnValue(now)

    const { getByTestId } = render(<DateInput onChange={ callback }/>)
    fireEvent.focus(getByTestId("input-base"))

    const date = new Date(2021, 10, 30)
    fireEvent.click(getByTestId(`date-${ date.toISOString() }`))

    expect(callback).toHaveBeenCalledWith(date)

    jest.clearAllMocks()
});

it("should call close calendar if user click on date field", () => {
    const callback = jest.fn()
    const now = new Date(2021, 11, 21)
    jest.spyOn(DateHelper, "now", "get").mockReturnValue(now)

    const { getByTestId } = render(<DateInput onChange={ callback }/>)
    fireEvent.focus(getByTestId("input-base"))

    const date = new Date(2021, 10, 30)
    fireEvent.click(getByTestId(`date-${ date.toISOString() }`))

    expect(getByTestId("calendar-container")).toHaveAttribute("data-show", "false")

    jest.clearAllMocks()
});

it("should use state date value to display in input if no props value", () => {
    const callback = jest.fn()
    const now = new Date(2021, 11, 21)
    jest.spyOn(DateHelper, "now", "get").mockReturnValue(now)

    const { getByTestId } = render(<DateInput onChange={ callback }/>)

    expect(getByTestId("input-base")).toHaveValue("21.12.2021")

    fireEvent.focus(getByTestId("input-base"))

    const date = new Date(2021, 10, 30)
    fireEvent.click(getByTestId(`date-${ date.toISOString() }`))

    expect(getByTestId("input-base")).toHaveValue("30.11.2021")

    jest.clearAllMocks()
});

it("should use props value", () => {
    const propValue = new Date(2021, 8, 1);
    const now = new Date(2021, 11, 21)
    jest.spyOn(DateHelper, "now", "get").mockReturnValue(now)

    const { getByTestId } = render(<DateInput value={propValue}/>)

    expect(getByTestId("input-base")).toHaveValue("01.09.2021")

    fireEvent.focus(getByTestId("input-base"))

    const date = new Date(2021, 10, 30)
    fireEvent.click(getByTestId(`date-${ date.toISOString() }`))

    expect(getByTestId("input-base")).toHaveValue("01.09.2021")

    jest.clearAllMocks()
});

describe("testing formatSelectedDate function", () => {
    it("should format simple date", () => {
        const date = new Date(2021, 10, 15)
        expect(formatSelectedDate(date)).toEqual("15.11.2021")
    });

    it("should add \"0\" before one symbol month and date", () => {
        const date = new Date(2021, 1, 4)
        expect(formatSelectedDate(date)).toEqual("04.02.2021")
    });

    it("should return empty string if input is null", () => {
        expect(formatSelectedDate(null)).toEqual("")
    });
})




