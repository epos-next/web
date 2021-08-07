import LessonSkeleton from "@components/lesson-skeleton";
import LessonWithRoomAndTime from "@components/lesson-with-room-and-time";
import FormatHelper from "@helpers/format-helper";
import { GridComponentContainer } from "@layouts/main-content";
import { NextLessonState } from "@redux/reducers/next-lesson-reducer";
import { State } from "@redux/reducers/root";
import React from "react";
import { useSelector } from "react-redux";
import { isIdleNextLessonState, whenNextLessonState } from "../type-guards/reducers";


const NextLesson: React.FC = () => {
    const state = useSelector<State, NextLessonState>((state) => state.nextLessonReducer);

    if (state.loading || isIdleNextLessonState(state) && state.timeLeftToNextLesson !== "") {
        return <GridComponentContainer id="next_lesson-desktop">
            <h4>Следующий урок</h4>
            {
                whenNextLessonState(state, {
                    onIdle: (state) => <LessonWithRoomAndTime
                        subject={ state.nextLesson.subject }
                        room={ state.nextLesson.room }
                        time={ FormatHelper.formatLessonTime(state.nextLesson) } />,
                    onLoading: () => <LessonSkeleton key={ `nextLesson-skeleton` }/>
                })
            }
        </GridComponentContainer>
    }

    if (isIdleNextLessonState(state) && state.timeLeftToNextLesson !== "") {
        return <React.Fragment/>
    } else {
        return <span/>
    }

}

export default NextLesson;
