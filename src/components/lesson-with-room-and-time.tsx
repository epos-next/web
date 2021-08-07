import React, { CSSProperties, PropsWithChildren } from "react";
import styled from "styled-components";
import Lesson, { Props as LessonProps } from "@components/lesson";

export type Props = {
    /** Room will show first */
    room: string;

    /** Time will show after the dot symbol */
    time: string;

    /** will override default class "lesson-with-room-and-time" */
    className?: string;

    /** will used for animations */
    style?: CSSProperties;
} & LessonProps

const LessonWithRoomAndTime: React.FC<Props> = (props: PropsWithChildren<Props>) => {
    const Subtitle = () => {
        return <Container>
                { props.room }
                <DotSymbol/>
                { props.time }
            </Container>
    };

    return <OverflowContainer>
        <Lesson
            { ...props }
            subtitle={ <Subtitle/> }
            className={ props.className ?? "lesson-with-room-and-time" }/>
    </OverflowContainer>
}

export default LessonWithRoomAndTime;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const OverflowContainer = styled.div`
  overflow: hidden;
`;

const DotSymbol = styled.div`
  width: 3px;
  height: 3px;
  background: #696969;
  border-radius: 50%;
  margin: 0 10px;
`;
