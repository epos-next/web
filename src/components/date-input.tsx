import CalendarComponent from "@components/calendar";
import moment from "moment";
import React, { PropsWithChildren, useState } from "react";
import styled from "styled-components";
import Input, { Props as BaseProps } from "@components/input";

export type Props = {
    /** When user select new date state will call this callback with new date inside */
    onChange?: (date: Date) => any,

    /** A date which will displayed as a value inside input */
    value?: Date,
} & Omit<Omit<BaseProps, "onChange">, "value">

const DateInput: React.FC<Props> = (props: PropsWithChildren<Props>) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleChange = (date: Date) => {
        if (props.onChange) props.onChange(date);
        setSelectedDate(date)
        setShowCalendar(false)
    }

    return <Container>
        <Input
            { ...props }
            readOnly={ true }
            onChange={ undefined }
            value={ formatSelectedDate(props.value ?? selectedDate) }
            onFocus={ () => setShowCalendar(true) }/>
        <CalendarIcon src="/icons/calendar.png"/>
        <CalendarContainer data-testid="calendar-container" data-show={ showCalendar }>
            <CalendarComponent onDayChanged={ handleChange }/>
        </CalendarContainer>
    </Container>
}

// export for testing
export const formatSelectedDate = (date: Date | null) => {
    if (date === null) return "";
    return moment(date).format("DD.MM.yyyy");
}

export default DateInput;

const CalendarContainer = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid var(--light-primary);
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  z-index: 100000;
  transition: transform 300ms ease, opacity 300ms ease;
  transform-origin: top left;

  &[data-show=false] {
    opacity: 0;
    transform: scale(0);
    transition-delay: 400ms;
  }
`;

const CalendarIcon = styled.img`
  position: absolute;
  top: 14px;
  right: 14px;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
`;
