import LessonWithRoomTimeMark from "@components/lesson-with-room-time-mark";
import { render } from "@testing-library/react";
import React from "react";

const props = {
    mark: 5,
    room: "202",
    time: "11:00 - 11:45",
    subject: "Алгебра"
}

it("should match snapshot", () => {
    const { asFragment } = render(<LessonWithRoomTimeMark {...props} />)
    expect(asFragment()).toMatchSnapshot()
})

it("should use mark prop", () => {
    const { getByTestId, rerender } = render(<LessonWithRoomTimeMark {...props} mark={5} />)
    expect(getByTestId("mark")).toHaveTextContent("5")

    rerender(<LessonWithRoomTimeMark {...props} mark={4} />)
    expect(getByTestId("mark")).toHaveTextContent("4")

    rerender(<LessonWithRoomTimeMark {...props} mark={3} />)
    expect(getByTestId("mark")).toHaveTextContent("3")

    rerender(<LessonWithRoomTimeMark {...props} mark={2} />)
    expect(getByTestId("mark")).toHaveTextContent("2")

    rerender(<LessonWithRoomTimeMark {...props} mark={1} />)
    expect(getByTestId("mark")).toHaveTextContent("1")
});

it("should use room prop", () => {
    const { getByTestId, rerender } = render(<LessonWithRoomTimeMark {...props} />)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("202")

    rerender(<LessonWithRoomTimeMark {...props} room="101"/>)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("101")

    rerender(<LessonWithRoomTimeMark {...props} room="1234567890"/>)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("1234567890")
})

it("should use time prop", () => {
    const { getByTestId, rerender } = render(<LessonWithRoomTimeMark {...props} time="11:00 - 12:00" />)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("11:00 - 12:00")

    rerender(<LessonWithRoomTimeMark {...props} time="9:00 - 15:00"/>)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("9:00 - 15:00")

    rerender(<LessonWithRoomTimeMark {...props} time="valabuday"/>)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("valabuday")
})

it("should remove class from inner lesson", () => {
    const { getByTestId } = render(<LessonWithRoomTimeMark {...props} />)
    expect(getByTestId("lesson-container")).not.toHaveAttribute("className")
});

