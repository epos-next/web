import DateHelper from "@helpers/date-helper";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { months, weekdays } from "@utils/constants";

export type Props = {
    /** Triggers when user select new day */
    onDayChanged?: (date: Date) => any,
}

const CalendarComponent: React.FC<Props> = (props) => {
    const { values, handlers } = useCalendar(props.onDayChanged);

    return <Container>
        {/* Header */ }
        <Header>
            <Title>Календарь</Title>
            <Month dir="rtl" onChange={ handlers.onMonthChanged } value={ values.selectedMonth }>
                {
                    months.map((e, i) => <option
                        key={ `calendar-month_option-${ e }` }
                        value={ i }>
                        { e }
                    </option>)
                }
            </Month>
        </Header>

        {/* Calendar */ }
        <Grid>
            <WeekDayElement>Пн</WeekDayElement>
            <WeekDayElement>Вт</WeekDayElement>
            <WeekDayElement>Ср</WeekDayElement>
            <WeekDayElement>Чт</WeekDayElement>
            <WeekDayElement>Пт</WeekDayElement>
            <WeekDayElement>Сб</WeekDayElement>
            <WeekDayElement>Вс</WeekDayElement>

            {
                values.days.map((date) => {
                    if (date.date.getDate() === values.selectedDate && date.date.getMonth() === values.selectedMonth) {
                        return <SelectedGridElement
                            key={ `calendar-date-${ date.date }` }>
                            { date.date.getDate() }
                        </SelectedGridElement>
                    }

                    if (date.disable || date.weekday === weekdays[6]) {
                        return <DisabledGridElement
                            onClick={ handlers.onDateChanged(date.date) }
                            key={ `calendar-date-${ date.date }` }>
                            { date.date.getDate() }
                        </DisabledGridElement>
                    }

                    return <PrimaryGridElement
                        onClick={ handlers.onDateChanged(date.date) }
                        key={ `calendar-date-${ date.date }` }>
                        { date.date.getDate() }
                    </PrimaryGridElement>
                })
            }
        </Grid>
    </Container>
}

export default CalendarComponent;

export const useCalendar = (onDayChanged?: Props["onDayChanged"]) => {
    const [selectedMonth, setSelectedMonth] = useState(DateHelper.now.getMonth());
    const [selectedDate, setSelectedDate] = useState(DateHelper.now.getDate());

    useEffect(() => {
        const now = DateHelper.now;
        if (onDayChanged) {
            onDayChanged(new Date(now.getFullYear(), selectedMonth, selectedDate));
        }
    }, [selectedMonth, selectedDate]);

    return {
        values: {
            selectedMonth,
            selectedDate,
            days: getDates(DateHelper.now.getFullYear(), selectedMonth),
        },
        handlers: {
            onDateChanged: (day: Date) => () => {
                setSelectedDate(day.getDate());
                if (day.getMonth() !== selectedMonth) setSelectedMonth(day.getMonth());
            },
            onMonthChanged: (event: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedMonth(parseInt(event.target.value))
            },
        }
    }
}

const getDates = (year: number, month: number): Array<DateObj> => {
    const dates: DateObj[] = [];
    const firstDay = new Date(year, month, 1);

    // Before
    const need = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
    const dayInLastMonth = new Date(year, month, 0).getDate();
    for (let i = dayInLastMonth - need + 2; i <= dayInLastMonth; i++) {
        const date = new Date(year, month - 1, i);
        const obj: DateObj = {
            date: date,
            disable: true,
            weekday: weekdays[date.getDay()],
        }
        dates.push(obj)
    }

    // This month
    const dayAmount = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= dayAmount; i++) {
        const date = new Date(year, month, i);
        const obj: DateObj = {
            date: date,
            disable: false,
            weekday: weekdays[date.getDay() === 0 ? 6 : date.getDate() % 7 - 1],
        }
        dates.push(obj);
    }

    // After
    const lastDay = dates[dates.length - 1].date;
    if (lastDay.getDay() !== 0) {
        const need2 = 7 - lastDay.getDay();
        for (let i = 1; i <= need2; i++) {
            const date = new Date(year, month + 1, i);
            const obj: DateObj = {
                date: date,
                disable: true,
                weekday: weekdays[date.getDay()],
            }
            dates.push(obj);
        }
    }

    return dates;
}

type DateObj = {
    disable: boolean;
    weekday: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | string;
    date: Date;
}

const GridElementStyles = css`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  line-height: 18px;
  user-select: none;
`;

const SelectedGridElement = styled.div`
  ${ GridElementStyles };
  position: relative;
  color: white;
  
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 50%;
    background: linear-gradient(328.45deg, #656DFD 11.68%, #949EFD 85.36%);
    width: 36px;
    height: 36px;
    z-index: -1;
  }
`;

const PrimaryGridElement = styled.div`
  ${ GridElementStyles };
  color: var(--primary);
  cursor: pointer;
`;

const DisabledGridElement = styled.div`
  ${ GridElementStyles };
  color: var(--light-primary);
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 5px;
`;

const WeekDayElement = styled.div`
  font-size: 15px;
  line-height: 18px;
  color: var(--secondary);
  ${ GridElementStyles };
`;

const Title = styled.h5`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: var(--primary);
`;

const Month = styled.select`
  font-size: 18px;
  line-height: 22px;
  color: var(--primary);
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
  outline: none;
  text-align: right;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc((100% / 7 - 18px) / 2);
`;

const Container = styled.div`
  width: 282px;
  
  @media screen and (max-width: 960px) {
    width: calc(100%);
  }
`;
