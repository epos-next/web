import React from "react";
import styled from "styled-components";

export type Props = {
    /** Radius of non selected round. Default to 10 */
    radius?: number;

    /** Background color of loading dots. Default to var(--disabled) */
    color?: string;
}

const LoadingIndicator: React.FC<Props> = (props) => {
    const radius = props.radius ?? 10;
    const color = props.color ?? "var(--disabled)";


    return <Container radius={radius} color={color}>
        {/* Copy paste from css library, so easier to create div except component */}
        <div className="dot-stretching"/>
    </Container>
}

export default LoadingIndicator;

const Container = styled.div<{radius: number, color: string}>`
  .dot-stretching {
    position: relative;
    width: ${props => props.radius}px;
    height: ${props => props.radius}px;
    border-radius: 5px;
    background-color: ${props => props.color};
    color: ${props => props.color};
    transform: scale(1.25, 1.25);
    animation: dotStretching 2s infinite ease-in;
  }

  .dot-stretching::before, .dot-stretching::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  .dot-stretching::before {
    width: ${props => props.radius}px;
    height: ${props => props.radius}px;
    border-radius: 50%;
    background-color: ${props => props.color};
    color: ${props => props.color};
    animation: dotStretchingBefore 2s infinite ease-in;
  }

  .dot-stretching::after {
    width: ${props => props.radius}px;
    height: ${props => props.radius}px;
    border-radius: 50%;
    background-color: ${props => props.color};
    color: ${props => props.color};
    animation: dotStretchingAfter 2s infinite ease-in;
  }

  @keyframes dotStretching {
    0% {
      transform: scale(1.25, 1.25);
    }
    50%,
    60% {
      transform: scale(0.8, 0.8);
    }
    100% {
      transform: scale(1.25, 1.25);
    }
  }

  @keyframes dotStretchingBefore {
    0% {
      transform: translate(0) scale(0.7, 0.7);
    }
    50%,
    60% {
      transform: translate(-20px) scale(1, 1);
    }
    100% {
      transform: translate(0) scale(0.7, 0.7);
    }
  }

  @keyframes dotStretchingAfter {
    0% {
      transform: translate(0) scale(0.7, 0.7);
    }
    50%,
    60% {
      transform: translate(20px) scale(1, 1);
    }
    100% {
      transform: translate(0) scale(0.7, 0.7);
    }
  }
`;

