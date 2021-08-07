import LoadingIndicator from "@components/loading-indicator";
import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import Ripples from 'react-ripples'

type Props = {
    /** Button role. The appearance depends on this. Default to "primary" */
    type?: "primary" | "secondary" | "disabled",

    /** Will show loading indicator if true. Default to false */
    loading?: boolean,

    /** Use if u need to change button type as a html element */
    htmlType?: React.ComponentPropsWithoutRef<'button'>["type"]
} & Omit<React.ComponentPropsWithoutRef<"button">, "type">;


const Button: React.FC<Props> = (props: PropsWithChildren<Props>) => {
    const type = props.type ?? "primary";
    const loading = props.loading ?? false;

    // for ripples
    let splashColor;
    switch (type) {
        case "primary":
            splashColor = "rgba(255, 255, 255, 0.3)";
            break;
        case "secondary":
            splashColor = "rgba(149, 105, 253, 0.15)";
            break;
        case "disabled":
            splashColor = "rgba(0, 0, 0, 0)";
            break;
    }


    // loading
    if (loading) {
        let dotsColor;
        switch (type) {
            case "primary":
                dotsColor = "white";
                break;
            case "secondary":
                dotsColor = "var(--contrast)";
                break;
            case "disabled":
                dotsColor = "var(--light-primary)";
                break;
        }

        return <ButtonFake data-type={ type } className="button">
            <LoadingIndicator color={ dotsColor }/>
        </ButtonFake>
    }

    return <Ripples color={ splashColor } className={ `button-ripple button-type-${ type } button` }>
        <ButtonBase
            className="button-base"
            data-type={ type }
            data-loading={ loading }
            disabled={ type === "disabled" || loading }
            { ...props }
            type={ props.htmlType }>
            { props.children }
        </ButtonBase>
    </Ripples>;
}

export default Button;

const styles = css`
  border-radius: 10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  min-width: 150px;
  min-height: 55px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  outline: none;
  width: 100%;

  // Primary button type
  &[data-type=primary] {
    background-color: var(--contrast);
    color: white;
  }

  // Secondary button type
  &[data-type=secondary] {
    background-color: var(--light-contrast);
    color: var(--contrast);
  }

  // Disabled button type
  &[data-type=disabled] {
    background-color: var(--disable);
    color: var(--light-primary);
    cursor: initial;
  }

  @media screen and (max-width: 768px) {
    padding: 13px 30px;
    font-size: 18px;
    height: 50px;
  }
`;

const ButtonBase = styled.button`${ styles }`;
const ButtonFake = styled.div`${ styles }`;

