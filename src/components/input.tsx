import lodash from "lodash";
import React, { PropsWithChildren, useState } from "react";
import styled, { css } from "styled-components";

export type Props = {
    /** Will show red border if true. Default to false */
    error?: boolean;

    /** Will display this text if error is true */
    errorText?: string;

    /** Will triggering while user tap "Enter" */
    onEnterPressed?: (e: React.KeyboardEvent<HTMLInputElement>) => any;

    /** Will show password button if true. Default to false */
    password?: boolean;
} & React.ComponentPropsWithoutRef<"input">

const Input: React.FC<Props> = (props: PropsWithChildren<Props>) => {
    // state
    const [isPasswordEyeOpened, setIsPasswordEyeOpened] = useState(false);

    // props
    const error = props.error ?? false;
    const className = `input ${ props.className ?? "" }`;

    // attrs
    let type = "text";
    if (props.password && !isPasswordEyeOpened) type = "password";

    // OnEnterPressed handler
    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter' && props.onEnterPressed) props.onEnterPressed(event);
    }

    return <Container data-testid="container" className={ className }>
        {/* Password eye */ }
        {
            props.password
                ? <PasswordEye
                    data-testid="password-eye"
                    data-open={isPasswordEyeOpened}
                    onClick={ () => setIsPasswordEyeOpened(!isPasswordEyeOpened) }
                    src={ isPasswordEyeOpened ? "/icons/eye-icon_opened.png" : "/icons/eye-icon_closed.png" }/>
                : <React.Fragment/>
        }

        <InputBase
            data-testid="input-base"
            data-error={ error }
            type={type}
            onKeyDown={ handleKeyPress }
            { ...lodash.omit(props, "onEnterPressed")  }/>

        {/* Error text */ }
        {
            props.errorText
                ? <ErrorText data-testid="error">{ props.errorText }</ErrorText>
                : <React.Fragment/>
        }
    </Container>
}

export default Input;

const ErrorText = styled.p`
  font-size: 14px;
  line-height: 17px;
  color: var(--error);
  margin-top: 7px;
`;

const PasswordEye = styled.img`
  position: absolute;
  top: 16px;
  right: 14px;
  cursor: pointer;
`;

// Will use this styles later in textarea component
export const styles = css`
  width: 100%;
  border: 2px solid var(--light-primary);
  border-radius: 10px;
  outline: none;
  padding: 14px;
  font-size: 18px;
  color: var(--primary);

  transition: 150ms border;
  

  &::placeholder {
    color: var(--light-primary);
  }

  &:focus {
    border: 2px solid var(--contrast);
  }

  // Error state
  &[data-error=true] {
    color: var(--error);
    border: 2px solid var(--error);

    &:focus {
      border: 2px solid var(--error);
    }
  }
  
  @media screen and (max-width: 768px) {
      padding: 13px;
  }
`;

const InputBase = styled.input`${ styles }`;

const Container = styled.div`
  width: 100%;
  position: relative;
  
  ${PasswordEye}[data-open=false] ~ ${InputBase}:not(:placeholder-shown) {
    letter-spacing: 10px;
    font-size: 14px;
    height: 52px;
  }
`;
