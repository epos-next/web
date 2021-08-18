import React from "react";
import CalendarComponent, { getDates } from "@components/calendar";
import DateHelper from "@helpers/date-helper";
import { fireEvent, render } from "@testing-library/react";
import "jest-styled-components"
import { getDatesAnswers } from "../../../test/fixtures";

describe("testing calendar component", () => {
    const now = new Date(2021, 11, 21)

    beforeEach(() => {
        jest.spyOn(DateHelper, "now", "get").mockReturnValue(now)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it("should match snapshot", () => {
        const { asFragment } = render(<CalendarComponent/>)
        expect(asFragment()).toMatchSnapshot()
    });

    it("should handle day change", () => {
        const callback = jest.fn()
        const { getByTestId } = render(<CalendarComponent onDayChanged={ callback }/>)
        const date = new Date(2021, 11, 11)
        fireEvent.click(getByTestId(`date-${ date.toISOString() }`))
        expect(callback).toBeCalledWith(date)
    })

    it("should call callback with today date on initialize", () => {
        const callback = jest.fn()
        render(<CalendarComponent onDayChanged={ callback }/>)
        expect(callback).toBeCalledTimes(1)
        expect(callback).toBeCalledWith(now)
    });

    it("should change month on if user select date with another month", () => {
        const callback = jest.fn()
        const { getByTestId } = render(<CalendarComponent onDayChanged={ callback }/>)
        const date = new Date(2021, 10, 30)
        fireEvent.click(getByTestId(`date-${ date.toISOString() }`))
        expect(callback).toBeCalledWith(date)
        expect(getByTestId("month")).toHaveProperty("value", "10")
    });

    it("should change month on on user select", () => {
        const callback = jest.fn()
        const { getByTestId } = render(<CalendarComponent onDayChanged={ callback }/>)
        fireEvent.change(getByTestId("month"), { target: { value: 3 } })
        expect(callback).toBeCalledWith(new Date(2021, 3, 21))
        expect(getByTestId("month")).toHaveProperty("value", "3")
    });

    describe("testing getDates()", () => {
        it("should return correct dates array (2021-12-21)", () => {
            const date = new Date(2021, 11, 21)
            const answer = getDatesAnswers[0]
            const received = getDates(date.getFullYear(), date.getMonth())
            expect(received).toEqual(answer)
            expect(received.length % 7).toEqual(0)
        })

        it("should return correct dates array (2021-02-09)", () => {
            const date = new Date(2021, 1, 9)
            const answer = getDatesAnswers[1]
            const received = getDates(date.getFullYear(), date.getMonth())
            expect(received).toEqual(answer)
            expect(received.length % 7).toEqual(0)
        })

        it("should return correct dates array (2021-05-17)", () => {
            const date = new Date(2021, 4, 17)
            const answer = getDatesAnswers[2]
            const received = getDates(date.getFullYear(), date.getMonth())
            expect(received).toEqual(answer)
            expect(received.length % 7).toEqual(0)
        })

        it("should return correct dates array (2021-01-01)", () => {
            const date = new Date(2021, 1, 1)
            const answer = getDatesAnswers[3]
            const received = getDates(date.getFullYear(), date.getMonth())
            expect(received).toEqual(answer)
            expect(received.length % 7).toEqual(0)
        })
    })
})
