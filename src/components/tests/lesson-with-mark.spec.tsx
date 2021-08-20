import LessonWithMark from "@components/lesson-with-mark";
import { render } from "@testing-library/react";
import React from "react"

it("should match snapshot", () => {
    const { asFragment } = render(<LessonWithMark mark={5} subject={"Физика"}/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should use mark prop", () => {
    const { getByTestId, rerender } = render(<LessonWithMark mark={5} subject={"Физика"}/>)
    expect(getByTestId("mark")).toHaveTextContent("5")

    rerender(<LessonWithMark mark={4} subject={"Физика"}/>)
    expect(getByTestId("mark")).toHaveTextContent("4")

    rerender(<LessonWithMark mark={3} subject={"Физика"}/>)
    expect(getByTestId("mark")).toHaveTextContent("3")

    rerender(<LessonWithMark mark={2} subject={"Физика"}/>)
    expect(getByTestId("mark")).toHaveTextContent("2")

    rerender(<LessonWithMark mark={1} subject={"Физика"}/>)
    expect(getByTestId("mark")).toHaveTextContent("1")
});

it("should show subject", () => {
    const subject = "Физика"
    const { getByTestId } = render(<LessonWithMark mark={2} subject={subject}/>)
    expect(getByTestId("lesson-name")).toHaveTextContent(subject)
});

it("should show subtitle", () => {
    const subtitle = "prodolshaem nochami videt cvetnye sny"
    const { getByTestId } = render(<LessonWithMark mark={2} subject={"Физика"} subtitle={subtitle}/>)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent(subtitle)
});
