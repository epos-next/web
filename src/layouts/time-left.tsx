import { GridComponentContainer } from "@layouts/main-content";
import React from "react";
import ContentLoader from "react-content-loader";
import { useSelector } from "react-redux";
import { State } from "@redux/reducers/root";
import { NextLessonState } from "@redux/reducers/next-lesson-reducer";
import styled from "styled-components";
import { isIdleNextLessonState, whenNextLessonState } from "../type-guards/reducers";

const TimeLeft: React.FC = () => {
    const state = useSelector<State, NextLessonState>((state) => state.nextLessonReducer);

    if (state.loading || isIdleNextLessonState(state) && state.timeLeftToNextLesson !== "") {
        return <GridComponentContainer id="time_left-desktop">
            <h4>Осталось</h4>
            {
                whenNextLessonState(state, {
                    onIdle: (state) => <TimeLeftContainer>
                        <TimeLeftText>{ state.timeLeftToNextLesson }</TimeLeftText>
                        <TimeLeftHint>{ state.nextLessonType }</TimeLeftHint>
                    </TimeLeftContainer>,
                    onLoading: () => <ContentLoader width={ 242 } height={ 42 }>
                        <rect width={ 242 } height={ 42 } rx={ 5 } ry={ 5 }/>
                    </ContentLoader>
                })
            }
        </GridComponentContainer>
    }

    return <React.Fragment/>
}

const TimeLeftHint = styled.span`
  font-size: 15px;
  line-height: 18px;
  color: #696969;
`;

const TimeLeftText = styled.h5`
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  color: var(--contrast);
  margin-right: 30px;
`;

const TimeLeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default TimeLeft;
