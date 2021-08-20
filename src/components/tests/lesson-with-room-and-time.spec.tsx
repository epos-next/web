import LessonWithRoomAndTime from "@components/lesson-with-room-and-time";
import React from "react";
import { render } from "@testing-library/react";

const props = {
    room: "202",
    time: "11:00 - 12:00",
    subject: "Физика"
}

it("should match snapshot", () => {
    const { asFragment } = render(<LessonWithRoomAndTime {...props}/>)
    expect(asFragment()).toMatchSnapshot()
});

it("should use room prop", () => {
    const { getByTestId, rerender } = render(<LessonWithRoomAndTime {...props} />)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("202")

    rerender(<LessonWithRoomAndTime {...props} room="101"/>)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("101")

    rerender(<LessonWithRoomAndTime {...props} room="1234567890"/>)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("1234567890")
})

it("should use time prop", () => {
    const { getByTestId, rerender } = render(<LessonWithRoomAndTime {...props} />)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("11:00 - 12:00")

    rerender(<LessonWithRoomAndTime {...props} time="9:00 - 15:00"/>)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("9:00 - 15:00")

    rerender(<LessonWithRoomAndTime {...props} time="valabuday"/>)
    expect(getByTestId("lesson-subtitle")).toHaveTextContent("valabuday")
})

it("should have \"lesson-with-room-and-time\" class", () => {
    const { getByTestId } = render(<LessonWithRoomAndTime {...props} />)
    expect(getByTestId("lesson-container")).toHaveClass("lesson-with-room-and-time")
});

it("should override default \"lesson-with-room-and-time\" class", () => {
    const { getByTestId } = render(<LessonWithRoomAndTime {...props} className="hello-123" />)
    expect(getByTestId("lesson-container")).toHaveClass("hello-123")
})

it("should show subject", () => {
    const subject = "Физика"
    const { getByTestId } = render(<LessonWithRoomAndTime {...props} subject={subject}/>)
    expect(getByTestId("lesson-name")).toHaveTextContent(subject)
});

