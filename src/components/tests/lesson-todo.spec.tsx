import React from "react"
import LessonTodo from "@components/lesson-todo";
import { fireEvent, render } from "@testing-library/react";

it("should match snapshot", () => {
    const { asFragment } = render(<LessonTodo done={false} subject="Алгебра" />)
    expect(asFragment()).toMatchSnapshot()
});

it("should use done prop", () => {
    const { getByRole, rerender } = render(<LessonTodo done={false} subject="Алгебра" />)
    expect(getByRole("checkbox")).not.toBeChecked()
    rerender(<LessonTodo done={true} subject="Алгебра" />)
    expect(getByRole("checkbox")).toBeChecked()
});

it("should handle click", () => {
    const callback = jest.fn()
    const { getByTestId, rerender } = render(<LessonTodo done={false} onClick={callback} subject="Алгебра" />)
    fireEvent.click(getByTestId("container"))
    expect(callback).toHaveBeenCalledWith(true)

    rerender(<LessonTodo done={true} onClick={callback} subject="Алгебра" />)
    fireEvent.click(getByTestId("container"))
    expect(callback).toHaveBeenCalledWith(false)
});

it("shouldn't throw error on click if callback is null", () => {
    const { getByTestId } = render(<LessonTodo done={false} subject="Алгебра" />)
    fireEvent.click(getByTestId("container"))
});

it("should show subject", () => {
    const subject = "Физика"
    const { getByTestId } = render(<LessonTodo done={false} subject={subject}/>)
    expect(getByTestId("lesson-name")).toHaveTextContent(subject)
});

it("should show subtitle", () => {
    const subtitle = "prodolshaem nochami videt cvetnye sny"
    const { getByTestId } = render(<LessonTodo done={false} subject={"Физика"} subtitle={subtitle}/>)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent(subtitle)
});
