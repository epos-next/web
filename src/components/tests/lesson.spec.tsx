import Lesson from "@components/lesson";
import UiHelper from "@helpers/ui-helper";
import { render } from "@testing-library/react";
import React from "react";

beforeEach(() => {
    jest.spyOn(UiHelper, "getLessonColor").mockReturnValue({
        colorAccent: "#123123",
        color: "#456456"
    })
})

afterEach(() => {
    jest.clearAllMocks()
})

it("should match snapshot", () => {
    const { asFragment } = render(<Lesson subject="Физика" />)
    expect(asFragment()).toMatchSnapshot()
});

it("should use subject prop", () => {
    const { getByTestId, rerender } = render(<Lesson subject="Английский Язык" />)
    expect(getByTestId("lesson-name")).toHaveTextContent("Английский Язык")

    rerender(<Lesson subject="Геометрия" />)
    expect(getByTestId("lesson-name")).toHaveTextContent("Геометрия")

    rerender(<Lesson subject="Какая-то фигня" />)
    expect(getByTestId("lesson-name")).toHaveTextContent("Какая-то фигня")
});

it("should use subtitle prop", () => {
    const { getByTestId, rerender } = render(<Lesson subject="ИЗО" subtitle="123" />)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("123")

    rerender(<Lesson subject="ИЗО" subtitle="hello my brooo" />)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("hello my brooo")

    rerender(<Lesson subject="ИЗО" subtitle="4 параграф упр 23" />)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("4 параграф упр 23")
});

it("should use className prop", () => {
    const { getByTestId, rerender } = render(<Lesson subject="ИЗО" className="123" />)
    expect(getByTestId("lesson-container")).toHaveClass("123")

    rerender(<Lesson subject="ИЗО" className="hello my brooo" />)
    expect(getByTestId("lesson-container")).toHaveClass("hello my brooo")

    rerender(<Lesson subject="ИЗО" className="4 параграф упр 23" />)
    expect(getByTestId("lesson-container")).toHaveClass("4 параграф упр 23")
});

it("should use correct letter avatar", () => {
    const { getByTestId, rerender } = render(<Lesson subject="Английский Язык" />)
    expect(getByTestId("avatar")).toHaveTextContent("А")
    expect(UiHelper.getLessonColor).toHaveBeenCalledWith("Английский Язык")

    rerender(<Lesson subject="Геометрия" />)
    expect(getByTestId("avatar")).toHaveTextContent("Г")
    expect(UiHelper.getLessonColor).toHaveBeenCalledWith("Геометрия")

    rerender(<Lesson subject="Какая-то фигня" />)
    expect(getByTestId("avatar")).toHaveTextContent("К")
    expect(UiHelper.getLessonColor).toHaveBeenCalledWith("Какая-то фигня")
});
