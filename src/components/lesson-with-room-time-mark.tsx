import React from "react";
import styled from "styled-components";
import LessonWithRoomAndTime, { Props as LessonProps } from "@components/lesson-with-room-and-time";

export type Props = {
    /** Mark which will display next to lesson */
    mark: number
} & LessonProps

const LessonWithRoomTimeMark: React.FC<Props> = (props) => {
    return <Container className="lesson-with-room-time-mark">
        <LessonWithRoomAndTime {...props} className="" />
        <Mark>{ props.mark }</Mark>
    </Container>
}

export default LessonWithRoomTimeMark;

const Mark = styled.span`
  font-size: 15px;
  line-height: 18px;
  font-weight: 500;
  color: var(--primary);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
