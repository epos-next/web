import React from "react";
import styled from "styled-components";
import Lesson, { Props as LessonProps } from "@components/lesson";

export type Props = {
    /** Mark which will display next to lesson */
    mark: number
} & LessonProps

const LessonWithMark: React.FC<Props> = (props) => {
    return <Container className="lesson-with-mark">
        <Lesson {...props} />
        <Mark data-testid="mark">{ props.mark }</Mark>
    </Container>
}

export default LessonWithMark;

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
