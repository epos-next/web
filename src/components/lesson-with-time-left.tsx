import React, { CSSProperties } from "react";
import styled from "styled-components";
import LessonWithRoomAndTime, { Props as LessonProps } from "@components/./lesson-with-room-and-time";

export type Props = {
    /** User friendly duration string. Like 22:55 */
    timeLeft: string,

    /** will used for animations */
    style?: CSSProperties;
} & LessonProps

const LessonWithTimeLeft: React.FC<Props> = (props) => {
    return <Container className="lesson-with-time-left" style={props.style}>
        <LessonWithRoomAndTime {...props} />
        <TimeLeftText data-testid={"time-left"}>{ props.timeLeft }</TimeLeftText>
    </Container>
}

export default LessonWithTimeLeft;

const TimeLeftText = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: var(--contrast);
  
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
