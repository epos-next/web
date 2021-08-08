import LessonSkeleton from "@components/lesson-skeleton";
import LessonWithRoomAndTime from "@components/lesson-with-room-and-time";
import { GridComponentContainer } from "@layouts/main-content";
import { LessonsState } from "@redux/reducers/lesson-reducer";
import { State } from "@redux/reducers/root";
import React from "react";
import ContentLoader from "react-content-loader";
import { useSelector } from "react-redux";
import styled from "styled-components";


const NextLessonComponent: React.FC = () => {
    const state = useSelector<State, LessonsState>(state => state.lessonReducer);

    return <React.Fragment>
        {/* time left */ }
        {
            state.timeLeftToNextLesson !== "" || state.loading
                ? <GridComponentContainer id="time_left-desktop">
                    <h4>Осталось</h4>
                    {
                        state.timeLeftToNextLesson !== ""
                            ? <TimeLeftContainer>
                                <TimeLeftText>{ state.timeLeftToNextLesson }</TimeLeftText>
                                <TimeLeftHint>{ state.nextLessonType }</TimeLeftHint>
                            </TimeLeftContainer>
                            : <ContentLoader width={ 242 } height={ 42 }>
                                <rect width={ 242 } height={ 42 } rx={ 5 } ry={ 5 }/>
                            </ContentLoader>
                    }
                </GridComponentContainer>
                : <React.Fragment/>
        }

        {/* Next lesson */ }
        {
            state.nextLesson !== null || state.loading
                ? <GridComponentContainer id="next_lesson-desktop">
                    <h4>Следующий урок</h4>
                    {
                        state.nextLesson != null
                            ? <LessonWithRoomAndTime
                                subject={ state.nextLesson.subject }
                                room="209"
                                time="13:00 – 13:45"/>
                            : <LessonSkeleton key={ `nextLesson-skeleton` }/>
                    }

                </GridComponentContainer>
                : state.timeLeftToNextLesson === ""
                ? <React.Fragment/>
                : <span/>
        }
    </React.Fragment>
}

export default NextLessonComponent;

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
