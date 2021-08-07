import React, { CSSProperties } from "react";
import styled from "styled-components";
import Lesson, { Props as LessonProps } from "@components/lesson";
import FormatHelper from "../helpers/format-helper";

export type Props = {
    /** Date which will display next to lesson */
    date: Date,

    /** will used for animations */
    style?: CSSProperties;
} & LessonProps

const LessonWithDate: React.FC<Props> = (props) => {
    const formattedDate = FormatHelper.formatDate(props.date);

    return <Container className="lesson-with-date" style={props.style}>
        <Lesson {...props} />
        <DateText>{ formattedDate }</DateText>
    </Container>
}

export default LessonWithDate;

const DateText = styled.span`
  font-size: 15px;
  line-height: 18px;
  color: var(--secondary);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
