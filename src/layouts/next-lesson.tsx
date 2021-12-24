import LessonSkeleton from "@components/lesson-skeleton";
import LessonWithRoomAndTime from "@components/lesson-with-room-and-time";
import LessonWithTimeLeft from "@components/lesson-with-time-left";
import FormatHelper from "@helpers/format-helper";
import UiHelper from "@helpers/ui-helper";
import { GridComponentContainer } from "@layouts/main-content";
import { useAppSelector } from "@redux/hooks";
import {
    selectNextLesson,
    selectNextLessonType,
    selectTimeLeftToNextLesson
} from "@redux/reducers/lesson-reducer";
import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import useIsLoading from "../hooks/useIsLoading";

const NextLessonComponent: React.FC = () => {
    const nextLesson = useAppSelector(selectNextLesson)
    const nextLessonType = useAppSelector(selectNextLessonType)
    const timeLeftToNextLesson = useAppSelector(selectTimeLeftToNextLesson)
    const isLoading = useIsLoading()

    return <React.Fragment>
        {/* time left */ }
        {
            timeLeftToNextLesson !== "" || isLoading
                ? <GridComponentContainer id="time_left-desktop">
                    <h4>Осталось</h4>
                    {
                        !isLoading && timeLeftToNextLesson !== ""
                            ? <TimeLeftContainer>
                                <TimeLeftText>{ timeLeftToNextLesson }</TimeLeftText>
                                <TimeLeftHint>{ nextLessonType }</TimeLeftHint>
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
            nextLesson !== null || isLoading
                ? <GridComponentContainer id="next_lesson-desktop">
                    <h4>Следующий урок</h4>
                    {
                        !isLoading && nextLesson != null
                            ? <LessonWithRoomAndTime
                                subject={ UiHelper.formatSubjectName(nextLesson.subject) }
                                room={ nextLesson.room }
                                time={ FormatHelper.formatLessonTime(nextLesson) }/>
                            : <LessonSkeleton key={ `nextLesson-skeleton` }/>
                    }

                </GridComponentContainer>
                : timeLeftToNextLesson === ""
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

export const NextLessonMobileComponent: React.FC = () => {
    const nextLesson = useAppSelector(selectNextLesson)
    const timeLeftToNextLesson = useAppSelector(selectTimeLeftToNextLesson)
    const isLoading = useIsLoading()

    return nextLesson !== null && timeLeftToNextLesson !== "" || isLoading
        ? <GridComponentContainer id="next_lesson-mobile">
            <h4>Следующий урок</h4>
            {
                !isLoading && nextLesson != null && timeLeftToNextLesson !== ""
                    ? <LessonWithTimeLeft
                        subject={ UiHelper.formatSubjectName(nextLesson.subject) }
                        room={ nextLesson.room }
                        timeLeft={ timeLeftToNextLesson }
                        time={ FormatHelper.formatLessonTime(nextLesson) }/>
                    : <LessonSkeleton key={ `nextLesson-mobile` }/>
            }

        </GridComponentContainer>
        : timeLeftToNextLesson === ""
            ? <React.Fragment/>
            : <span/>

}
