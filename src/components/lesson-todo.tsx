import Lesson, { Props as LessonProps } from "@components/lesson";
import React from "react";
import styled from "styled-components";

export type Props = {
    /** Is lesson task currently done. Will display tick ✓ */
    done: boolean;

    /** Triggering while user click on lesson task */
    onClick?: (state: boolean) => any;
} & LessonProps;

const LessonTodo: React.FC<Props> = (props) => {
    // handlers
    const handleClick = () => {
        if (props.onClick) props.onClick(!props.done);
    }

    return <Container onClick={ handleClick } className="lesson-todo">
        <Lesson
            subject={ props.subject }
            subtitle={ props.subtitle }
            className={ props.className }
            style={ props.style }/>
        <Checkbox type="checkbox" checked={ props.done } onChange={ () => null }/>
    </Container>
}

export default LessonTodo;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Checkbox = styled.input`
  --active: #68D676;
  --active-inner: white;
  --focus: transparent;
  --border: var(--light-primary);
  --border-hover: var(--light-primary);
  --background: white;
  --disabled: #F6F8FF;
  --disabled-inner: #E1E6F9;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 25px;
  outline: none;
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin: 0;
  cursor: pointer;
  border: 1px solid var(--bc, var(--border));
  background: var(--b, var(--background));
  transition: background .3s, border-color .3s, box-shadow .2s;

  &:after {
    content: '';
    display: block;
    left: 0;
    top: 0;
    position: absolute;
    transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
  }

  &:checked {
    --b: var(--active);
    --bc: var(--active);
    --d-o: .3s;
    --d-t: .6s;
    --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
  }

  &:disabled {
    --b: var(--disabled);
    cursor: not-allowed;
    opacity: .9;

    &:checked {
      --b: var(--disabled-inner);
      --bc: var(--border);
    }

    & + label {
      cursor: not-allowed;
    }
  }

  &:hover {
    &:not(:checked) {
      &:not(:disabled) {
        --bc: var(--border-hover);
      }
    }
  }

  &:focus {
    box-shadow: 0 0 0 var(--focus);
  }

  &:not(.switch) {
    width: 25px;

    &:after {
      opacity: var(--o, 0);
    }

    &:checked {
      --o: 1;
    }
  }

  border-radius: 7px;

  &:after {
    width: 5px;
    height: 9px;
    border: 2px solid var(--active-inner);
    border-top: 0;
    border-left: 0;
    left: 8px;
    top: 4px;
    transform: rotate(var(--r, 20deg));
  }

  &:checked {
    --r: 43deg;
  }
`;
