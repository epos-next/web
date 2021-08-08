import CreateAdModalWindow, { CreateAdData } from "@layouts/modal-windows/create-ad-modal-window";
import CreateControlWorkModalWindow, { CreateControlWorkData } from "@layouts/modal-windows/create-control-work-modal-window";
import TimeLeft from "@layouts/time-left";
import lodash from "lodash";
import React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import UiHelper from "@helpers/ui-helper";
import LessonTodo from "@components/lesson-todo";
import LessonSkeleton from "@components/lesson-skeleton";
import LessonWithDate from "@components/lesson-with-date";
import LessonWithRoomAndTime from "@components/lesson-with-room-and-time";
import AdvertisementComponent from "@components/advertisement";
import { ControlWork } from "../models/control-work";
import { Homework } from "../models/homework";
import { Advertisement } from "../models/advertisement";
import { Lesson } from "../models/lesson";
import DateHelper from "@helpers/date-helper";
import SummerMainContent from "@layouts/summer-main-content";

export type Props = {
    /** control works will display in 3th cell */
    homework: Homework[],

    /** control works will display in 4th cell */
    controlWorks: ControlWork[],

    /** advertisements will display in 5th cell */
    advertisements: Advertisement[],

    /** something on this layout loading */
    loading: boolean

    /** Triggering while user click on homework tile */
    onHomeworkClick: (id: number, done: boolean) => any;

    /** Show reminder about next lesson or when current lesson will end */
    nextLesson: {
        lesson: Lesson | null,
        timeTo: string,
        type: string,
    }

    /**
     * Triggering while user clicking on "+" icon near control work or on "x" in modal window
     * Should open ControlWorkCreator if true else close ControlWorkCreator
     */
    onClickOnControlWorkCreator: (open: boolean) => any,

    /** Is modal window where user can create new control work open or not */
    isControlWorkCreatorOpen: boolean,

    /** Need to construct options in control work creator window */
    lessonNames: string[],

    /** Calling while user successfully create control work */
    onCreateControlWork: (data: CreateControlWorkData) => any,

    /**
     * Triggering while user clicking on "+" icon near ad or on "x" in modal window
     * Should open AdCreator if true else close AdCreator
     */
    onClickOnAdCreator: (open: boolean) => any,

    /** Is modal window where user can create new advertisement open or not */
    isAdCreatorOpen: boolean,

    /** Calling while user successfully create advertisement */
    onCreateAd: (data: CreateAdData) => any,
}

const MainContentLayout: React.FC<Props> = (props) => {
    if (DateHelper.isSummer()) {
        return <SummerMainContent/>
    }

    return <MainContent>
        {/* time left */ }
        <TimeLeft/>

        {/* Next lesson */ }
        {
            props.nextLesson.lesson || props.loading
                ? <GridComponentContainer id="next_lesson-desktop">
                    <h4>Следующий урок</h4>
                    {
                        props.nextLesson.lesson
                            ? <LessonWithRoomAndTime
                                subject={ props.nextLesson.lesson.subject }
                                room="209"
                                time="13:00 – 13:45"/>
                            : <LessonSkeleton key={ `nextLesson-skeleton` }/>
                    }

                </GridComponentContainer>
                : props.nextLesson.timeTo === ""
                    ? <React.Fragment/>
                    : <span/>
        }

        {/* Homework */ }
        {
            props.homework.length !== 0 || props.loading
                ? <GridComponentContainer>
                    <h4>Домашнее задание</h4>
                    {
                        props.loading
                            ? lodash.times(2).map((_, i) => {
                                return <LessonSkeleton key={ `homework-skeleton-${ i }` }/>
                            })
                            : props.homework.map(({ content, done, lesson, id }, i) => {
                                return <LessonTodo
                                    onClick={ (done) => props.onHomeworkClick(id, done) }
                                    key={ `homework-lesson-${ i }` }
                                    done={ done }
                                    subject={ lesson }
                                    subtitle={ content }/>
                            })
                    }
                </GridComponentContainer>
                : <React.Fragment/>
        }

        {/* Control works */ }
        <GridComponentContainer>
            <TitleHeader>
                <h4>Контрольные работы</h4>
                <AddIcon onClick={ () => props.onClickOnControlWorkCreator(true) } src="/icons/plus-icon.png"/>
            </TitleHeader>
            {
                props.loading
                    ? lodash.times(2).map((_, i) => {
                        return <LessonSkeleton key={ `control-work-skeleton-${ i }` }/>
                    })
                    : props.controlWorks.map(({ lesson, date, name }, i) => {
                        return <LessonWithDate
                            key={ `control-work-${ i }` }
                            date={ date }
                            subject={ UiHelper.formatSubjectName(lesson) }
                            subtitle={ name }/>
                    })
            }
        </GridComponentContainer>
        <CreateControlWorkModalWindow
            onConfirm={ props.onCreateControlWork }
            lessonNames={ props.lessonNames }
            onClose={ () => props.onClickOnControlWorkCreator(false) }
            isOpen={ props.isControlWorkCreatorOpen }/>

        {/* Advertisements */ }
        <GridComponentContainer>
            <TitleHeader>
                <h4>Объявления</h4>
                <AddIcon onClick={ () => props.onClickOnAdCreator(true) } src="/icons/plus-icon.png"/>
            </TitleHeader>
            {
                props.loading
                    ? <ContentLoader>
                        <rect x={ 0 } y={ 0 } rx={ 5 } ry={ 5 } width={ 200 } height={ 14 }/>
                        <rect x={ 0 } y={ 24 } rx={ 5 } ry={ 5 } width={ 250 } height={ 14 }/>
                        <rect x={ 0 } y={ 48 } rx={ 5 } ry={ 5 } width={ 210 } height={ 14 }/>
                    </ContentLoader>
                    : props.advertisements.map(({ content }, i) => {
                        const key = `ads-${ i }`;
                        return <AdvertisementComponent key={ key }>{ content }</AdvertisementComponent>
                    })
            }
        </GridComponentContainer>
        <CreateAdModalWindow
            onConfirm={ props.onCreateAd }
            isOpen={ props.isAdCreatorOpen }
            onClose={ () => props.onClickOnAdCreator(false) }
            />
    </MainContent>
}

export default MainContentLayout;

const AddIcon = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const TitleHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const GridComponentContainer = styled.div`
  h4 {
    margin-bottom: 15px;
  }

  .lesson-todo:not(:nth-child(1)):not(:nth-child(2)),
  .lesson-with-date:not(:nth-child(1)):not(:nth-child(2)),
  .lesson-skeleton:not(:nth-child(1)):not(:nth-child(2)),
  .advertisement-component:not(:nth-child(1)):not(:nth-child(2)) {
    margin-top: 20px;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 50px;
  grid-row-gap: 35px;
  padding-bottom: 30px;

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(1, 1fr);
    grid-row: 2;

    #time_left-desktop, #next_lesson-desktop {
      display: none;
    }
  }
`;
