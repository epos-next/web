<<<<<<< Updated upstream
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
=======
import renderOnClient from "@components/render-on-client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
>>>>>>> Stashed changes

export type Props = {
    /** Will display in greetings message: "hello, { name }" */
    name: string;

    /** Triggering while user clicking on close button */
    onClose?: () => any;

    /** Use for a transition. Default to true */
    show?: boolean;
}


<<<<<<< Updated upstream
const WelcomeTile: React.FC<Props> = (props: Props) => {
    // used to don't show if show initially false
    const [shouldRender] = useState(props.show ?? true);
    if (!shouldRender) return <React.Fragment/>
=======
const WelcomeTile: React.FC<Props> = React.memo((props: Props) => {
    const shouldRender = props.show ?? true;

    console.log(props.show, shouldRender);

    if (!shouldRender) return <Wrapper show={ shouldRender }/>
>>>>>>> Stashed changes

    // handlers
    const handleClose = () => {
        if (props.onClose) props.onClose();
    }

    return <Wrapper show={ shouldRender } className="welcome-tile">
        <Container>
            <StudentGirlImage
                width={ 142 }
                height={ 220 }
                src="/images/girl-student.png"
                draggable={ false }/>
            <Content>
                <GreetingMessage>Привет, { props.name }!</GreetingMessage>
                <Title>Добро пожаловать в Эпос Next</Title>
                <Subtitle>Новый многофункциональный клиент<br/>для электронного дневника Эпос</Subtitle>
            </Content>
            <AbstractRect w={ 84 } h={ 100 } r={ 70 } t={ -20 } i={ 0 }/>
            <AbstractRect w={ 95 } h={ 110 } r={ 100 } t={ 50 } i={ 1 }/>
            <AbstractRect w={ 50 } h={ 50 } r={ 30 } t={ 130 } i={ 2 }/>
            <CloseButton
                alt="close"
                onClick={ handleClose }
                width={ 20 }
                height={ 20 }
                src="/icons/close-icon.png"/>
        </Container>
    </Wrapper>
})

export default renderOnClient(WelcomeTile);

const AbstractRectAnimation = keyframes`
  from {
    transform: translateX(30px) translateY(-50px) rotate(10deg);
  }
  to {
    transform: translateX(0) translateY(0) rotate(0deg);
  }
`;

const AbstractRect = styled.div<{ t: number, r: number; w: number, h: number, i: number }>`
  position: absolute;
  width: ${ props => props.w }px;
  height: ${ props => props.h }px;
  top: ${ props => props.t }px;
  right: ${ props => props.r }px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  animation: ${ AbstractRectAnimation } 1.5s ease;
  animation-delay: ${ props => props.i * 200 }ms;
  animation-fill-mode: both;
`;

const Subtitle = styled.h2`
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 10px;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
  margin-top: 5px;
`;

const GreetingMessage = styled.span`
  font-size: 17px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.75);
`;

const Content = styled.div`
  margin-left: 220px;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const StudentGirlImage = styled.img`
  position: absolute;
  height: 220px;
  bottom: 0;
  left: 30px;
`;

const Container = styled.div`
  background: linear-gradient(270deg, #9665FD 0%, #8C96FF 100%);
  border-radius: 16px;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  position: relative;
  transition: 700ms transform ease-in-out;
`;

const Wrapper = styled.div<{ show: boolean }>`
  padding-top: ${ props => props.show ? "20px" : "0" };
  height: ${ props => props.show ? "220px" : "0" };
  transition: 700ms ease-in-out;
  overflow: hidden;
  margin-bottom: ${ props => props.show ? "35px" : "0px" };

  ${ Container } {
    transform: translateY(${ props => props.show ? "20px" : "0px" };);
  }
  
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
