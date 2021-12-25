import React, { useState } from "react";
import styled from "styled-components";

export type Props = {
    /** Will display in greetings message: "hello, { name }" */
    name: string;

    /** Triggering while user clicking on close button */
    onClose?: () => any;

    /** Use for a transition. Default to true */
    show?: boolean;
}


const WelcomeTile: React.FC<Props> = (props: Props) => {
    // used to don't show if show initially false
    const [shouldRender] = useState(props.show ?? true);
    if (!shouldRender) return <React.Fragment/>

    // handlers
    const handleClose = () => {
        if (props.onClose) props.onClose();
    }

    // props
    const show = props.show ?? true;

    return <Wrapper data-show={ show } className="welcome-tile">
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
            <AbstractRect w={ 84 } h={ 100 } r={ 70 } t={ -20 }/>
            <AbstractRect w={ 95 } h={ 110 } r={ 100 } t={ 50 }/>
            <AbstractRect w={ 50 } h={ 50 } r={ 30 } t={ 130 }/>
            <CloseButton
                alt="close"
                onClick={ handleClose }
                width={ 20 }
                height={ 20 }
                src="/icons/close-icon.png"/>
        </Container>
    </Wrapper>
}

export default WelcomeTile;

const AbstractRect = styled.div <{ t: number, r: number; w: number, h: number }>`
  position: absolute;
  width: ${ props => props.w }px;
  height: ${ props => props.h }px;
  top: ${ props => props.t }px;
  right: ${ props => props.r }px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
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

const Wrapper = styled.div`
  padding-top: 20px;
  height: 220px;
  transition: 700ms ease-in-out;
  overflow: hidden;

  &[data-show=false] {
    padding: 0;
    height: 0;
    margin-bottom: 0;

    ${ Container } {
      transform: translateY(20px);
    }
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
