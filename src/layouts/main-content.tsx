import AdvertisementList from "@layouts/advertisement-list";
import ControlWorkList from "@layouts/control-work-list";
import HomeworkList from "@layouts/homework-list";
import CreateAdModalWindow, { CreateAdData } from "@layouts/modal-windows/create-ad-modal-window";
import CreateControlWorkModalWindow, { CreateControlWorkData } from "@layouts/modal-windows/create-control-work-modal-window";
import NextLessonComponent from "@layouts/next-lesson";
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
        <NextLessonComponent/>
        <HomeworkList/>
        <ControlWorkList/>
        <AdvertisementList/>
    </MainContent>
}

export default MainContentLayout;

export const AddIcon = styled.img`
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
