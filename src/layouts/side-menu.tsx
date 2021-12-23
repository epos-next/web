import { useAppSelector } from "@redux/hooks";
import { selectLessonLoading } from "@redux/reducers/lesson-reducer";
import { useSelect } from "downshift";
import React, { CSSProperties } from "react";
import lodash from "lodash";
import styled, { keyframes } from "styled-components";
import UiHelper from "@helpers/ui-helper";
import FormatHelper from "@helpers/format-helper";
import CalendarComponent from "@components/calendar";
import LessonSkeleton from "@components/lesson-skeleton";
import LessonWithRoomAndTime from "@components/lesson-with-room-and-time";
import useIsLoading from "../hooks/useIsLoading";
import useSideMenu from "../hooks/useSideMenu";


const SideMenuLayout: React.FC = () => {
    // Side menu
    const { lessons, onDateChanged, selectedDate } = useSideMenu();
    const loading = useAppSelector(selectLessonLoading);

    const isNowSummer = selectedDate.getMonth() >= 5 && selectedDate.getMonth() <= 7;

    return <SideMenu className="side_menu-layout">
        { typeof  window !== "undefined" && <CalendarComponent onDayChanged={ onDateChanged }/> }
        <Lessons>
            <h3>Уроки</h3>

            {/* Lessons list */ }
            {
                loading
                    ? lodash.times(6).map((e, i) => {
                        return <LessonSkeleton key={ `lesson-skeleton-${ i }` }/>
                    })
                    : lessons.map((lesson, i) => {
                        // transition animations
                        const style: CSSProperties = {
                            animationDelay: `${ i * 50 }ms`,
                        }

                        return <LessonWithRoomAndTime
                            style={ style }
                            key={ `lesson-${ lesson.date }-${ lesson.subject }` }
                            subject={ UiHelper.formatSubjectName(lesson.subject) }
                            room={ lesson.room }
                            time={ FormatHelper.formatLessonTime(lesson) }/>
                    })
            }

            {/* Showing "No lesson found" message  */ }
            {
                isNowSummer && !loading
                    ? <NoFoundText>Сейчас лето, дурачек)<br/>Иди отдыхай</NoFoundText>
                    : lessons.length === 0 && !loading
                    ? <NoFoundText>
                        Уроков в этот день нет
                    </NoFoundText>
                    : <React.Fragment/>
            }
        </Lessons>
    </SideMenu>
}

export default SideMenuLayout;

const LessonsAnimation = keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const NoFoundText = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  color: var(--secondary);
  font-size: 16px;
  line-height: 24px;
  padding: 30px;
  text-align: center;
`;

const Lessons = styled.section`
  margin-top: 40px;

  h3 {
    margin-bottom: 15px;
  }

  .lesson-with-room-and-time, .lesson-with-room-time-mark, .lesson-skeleton {
    margin-bottom: 20px;
  }

  .lesson-with-room-and-time, .lesson-with-room-time-mark {
    animation: ${ LessonsAnimation } 400ms ease;
    animation-fill-mode: backwards;
  }
`;

const SideMenu = styled.menu`
  margin-top: 40px;

  @media screen and (max-width: 960px) {
    grid-row: 1;
  }
`;
