import React from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import useProfilePage from "../../hooks/useProfilePage";

export type Props = {
    /** Will show slide if true */
    open: boolean;

    /** Calling when need to close slide */
    onClose: () => any,
}

const Slide: React.FC<Props> = (props) => {
    const { handlers } = useSlide(props.onClose);

    return <Container>
        <SlideBase data-open={ props.open }>
            <Tab onClick={ handlers.profile }>Профиль</Tab>
            <Tab onClick={ handlers.home }>Главная</Tab>
            <Tab onClick={ handlers.marks }>Оценки</Tab>
            <Tab onClick={ handlers.logout }>Выйти</Tab>
        </SlideBase>
    </Container>
}

export default Slide;

const useSlide = (onClose: () => any) => {
    const profilePage = useProfilePage();

    const baseHandler = (path: string) => {
        navigate(path);
        onClose();
    }

    return {
        handlers: {
            profile: () => baseHandler("/profile"),
            home: () => baseHandler("/"),
            marks: () => baseHandler("/?tab=marks"),
            logout: profilePage.handlers.logout,
        }
    }
}

const Tab = styled.h4`
  font-size: 18px;
  font-weight: normal;
  text-align: center;
  margin: 10px 0;
`;

const SlideBase = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 100;
  transition: 500ms transform ease;
  pointer-events: all;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &[data-open=false] {
    transform: translateX(100vw);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  z-index: 10001;
`;
