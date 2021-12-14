import AdvertisementList from "@layouts/advertisement-list";
import ControlWorkList from "@layouts/control-work-list";
import HomeworkList from "@layouts/homework-list";
import NextLessonComponent from "@layouts/next-lesson";
import React from "react";
import styled from "styled-components";
import SummerMainContent from "@layouts/summer-main-content";

const MainContentLayout: React.FC = () => {
    if (new Date().getMonth() <= 7 && new Date().getMonth() >= 5) {
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
