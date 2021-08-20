import React, { CSSProperties } from "react";
import styled from "styled-components";
import UiHelper, { LessonColor } from "../helpers/ui-helper";

export type Props = {
    /** Lesson name. Will display as a title */
    subject: string;

    /** Can be a homework, control work name, cabinet etc
        React.ReactNode used to pass more complex subtitle.
        For example cabinet + lesson time */
    subtitle?: string | React.ReactNode;

    /** will override default class "lesson" */
    className?: string;

    /** will used for animations */
    style?: CSSProperties;
}

const Lesson: React.FC<Props> = (props) => {
    const colors = UiHelper.getLessonColor(props.subject);

    return <Container data-testid="lesson-container" className={props.className ?? "lesson"} {...props}>
        <Avatar data-testid="avatar" {...colors}>{ props.subject[0] }</Avatar>
        <Information>
            <LessonName data-testid="lesson-name">{ props.subject }</LessonName>
            <Subtitle data-testid="lesson-subtitle">{ props.subtitle }</Subtitle>
        </Information>
    </Container>
}

export default Lesson;

const LessonName = styled.span`
  font-size: 17px;
  line-height: 20px;
  color: var(--primary);
`;

const Subtitle = styled.span`
  font-size: 15px;
  line-height: 18px;
  color: var(--secondary);
`;

const Avatar = styled.div<LessonColor>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${ props => props.color };
  color: ${ props => props.colorAccent };
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-weight: 500;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;
