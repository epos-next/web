import React from "react"
import FormatHelper from "@helpers/format-helper";
import LessonWithDate from "@components/lesson-with-date";
import { render } from "@testing-library/react";

const date = new Date(2021, 10, 21)

beforeEach(() => {
    jest.spyOn(FormatHelper, "formatDate").mockReturnValue("11 Ноября")
})
afterEach(() => {
    jest.clearAllMocks()
})

it("should match snapshot", () => {
    const { asFragment } = render(<LessonWithDate date={date} subject="Алгебра" />)
    expect(asFragment()).toMatchSnapshot()
});
it("should use date prop", () => {
    const { getByTestId } = render(<LessonWithDate date={date} subject="Алгебра" />)
    expect(getByTestId("date")).toHaveTextContent("11 Ноября")
    expect(FormatHelper.formatDate).toHaveBeenCalledWith(date)
});

it("should show subject", () => {
    const subject = "Физика"
    const { getByTestId } = render(<LessonWithDate date={date} subject={subject}/>)
    expect(getByTestId("lesson-name")).toHaveTextContent(subject)
});

it("should show subtitle", () => {
    const subtitle = "prodolshaem nochami videt cvetnye sny"
    const { getByTestId } = render(<LessonWithDate date={date} subject={"Физика"} subtitle={subtitle}/>)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent(subtitle)
});
