import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 25px;
    position: relative;
    transform: rotate(0deg);
    transition: .5s ease-in-out;
    cursor: pointer;
    z-index: 10002;
    flex: 0 0 34px;
  
    span {
        display: block;
        position: absolute;
        height: 4px;
        width: 100%;
        background: var(--light-primary);
        border-radius: 3px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
    }
    span:nth-child(1) {
        top: 0px;
    }
    span:nth-child(2), span:nth-child(3) {
        top: 10px;
    }
    span:nth-child(4) {
        top: 20px;
    }
    &.open span:nth-child(1) {
        top: 18px;
        width: 0%;
        left: 50%;
    }
    &.open span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    &.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
    &.open span:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
    }
    @media screen and (min-width: 769px) {
        display: none;
    }
`;

export type Props = {
    open: boolean;
    onClick?: (status: boolean) => any;
}

const BurgerMenu: React.FC<Props> = (props) => {

    return <div className={ "burger-outside-container " + (props.open ? "open" : "") } style={ { flex: "0 0 34px" } }>
        <Container
            data-testid="burger-menu"
            onClick={ () => {
                if (props.onClick) props.onClick(!props.open);
            } }
            className={ (props.open ? "open" : "") + " burger" }>
            <span/>
            <span/>
            <span/>
            <span/>
        </Container>
    </div>
}

export default BurgerMenu;
