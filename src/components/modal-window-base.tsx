import React from "react";
import styled from "styled-components";

export type Props = {
    /** Will show window if true */
    isOpen: boolean;

    /** Triggering while user clicking on X in top right corner */
    onClose: () => any;
}

const ModalWindowBase: React.FC<Props> = (props) => {
    return <Container data-open={ props.isOpen }>
        <Window>
            <CloseButton
                alt=""
                width={ 28 }
                height={ 28 }
                onClick={ props.onClose }
                src="/icons/close-28x28.png"/>
            { props.children }
        </Window>
    </Container>
}

export default ModalWindowBase;

const CloseButton = styled.img`
  position: absolute;
  right: 35px;
  top: 35px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Window = styled.div`
  width: 100%;
  max-width: 822px;
  background-color: white;
  border-radius: 25px;
  padding: 35px;
  position: relative;
  transition: 400ms cubic-bezier(0.83, 0, 0.17, 1);

  @media screen and (max-width: 768px) {
    max-width: initial;
    height: 100vh;
    border-radius: 0;
    transition: 400ms ease;
    padding: 20px;
    max-height: 100vh;
    overflow-y: auto;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 100000000;
  background-color: rgba(0, 0, 0, 0.35);
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 400ms ease, background-color 400ms;

  &[data-open=false] {
    pointer-events: none;
    opacity: 0;

    @media screen and (max-width: 768px) {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0);
    }

    ${ Window } {
      transform: translateY(300px);
      opacity: 0;

      @media screen and (max-width: 768px) {
        opacity: 1;
        transform: translateX(100vw);
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const Title = styled.h3`
  font-weight: 500;
  font-size: 28px;
  line-height: 34px;
  color: var(--primary);
`;

export const Subtitle = styled.p`
  font-size: 18px;
  line-height: 22px;
  color: var(--secondary);
  margin-top: 20px;
  margin-bottom: 15px;
`;


export const CancelText = styled.span`
  font-size: 18px;
  line-height: 22px;
  color: var(--secondary);
  cursor: pointer;
`;

export const ButtonRow = styled.div`
  margin-top: 20px;

  .button {
    margin-right: 50px;

    @media screen and (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 10px;
      width: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;
