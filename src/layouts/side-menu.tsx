import React, { CSSProperties } from "react";
import lodash from "lodash";
import styled, { keyframes } from "styled-components";
import UiHelper from "@helpers/ui-helper";
import FormatHelper from "@helpers/format-helper";
import { BigDataObject } from "@services/api-service";
import CalendarComponent from "@components/calendar";
import LessonSkeleton from "@components/lesson-skeleton";
import LessonWithRoomAndTime from "@components/lesson-with-room-and-time";

export type Props = {
    /** Lessons which will be displaying next to calendar */
    lessons: BigDataObject["lessons"] & { mark?: number },

    /** Triggering while user change the date */
    onDateChanged: (date: Date) => any,

    /** will show skeleton loading */
    loading: boolean;

    /** will used to show message like "No is summer, go take a rest" */
    date: Date,
}

// TODO: need to stop using props
const SideMenuLayout: React.FC<Props> = (props) => {
    const isNowSummer = props.date.getMonth() >= 5 && props.date.getMonth() <= 7;

    return <SideMenu className="side_menu-layout">
        <CalendarComponent onDayChanged={ props.onDateChanged }/>
        <Lessons>
            <h3>Уроки</h3>

            {/* Lessons list */ }
            {
                props.loading
                    ? lodash.times(6).map((e, i) => {
                        return <LessonSkeleton key={ `lesson-skeleton-${ i }` }/>
                    })
                    : props.lessons.map(({ subject, room, date, duration }, i) => {
                        const startDate = new Date(date);
                        const endDate = new Date(startDate.getTime() + duration * 60000);
                        const time = `${ FormatHelper.formatTime(startDate) } – ${ FormatHelper.formatTime(endDate) }`;

                        // transition animations
                        const style: CSSProperties = {
                            animationDelay: `${ i * 50 }ms`,
                        }

                        return <LessonWithRoomAndTime
                            style={ style }
                            key={ `lesson-${ date }-${ subject }` }
                            subject={ UiHelper.formatSubjectName(subject) }
                            room={ room }
                            time={ time }/>
                    })
            }

            {/* Showing "No lesson found" message  */ }
            {
                isNowSummer && !props.loading
                    ? <NoFoundText>Сейчас лето, дурачек)<br/>Иди отдыхай</NoFoundText>
                    : props.lessons.length === 0 && !props.loading
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
