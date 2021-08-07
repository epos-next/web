import DateInput from "@components/date-input";
import DateHelper from "@helpers/date-helper";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "@components/button";
import Input from "@components/input";
import Select from "@components/select";
import ModalWindowBase, {
    ButtonRow,
    CancelText,
    Props as BaseProps,
    Title,
    Subtitle
} from "@components/modal-window-base";

type Props = {
    /** Need to construct options in control work creator window */
    lessonNames: string[],

    /** Calling it when user passed correct data and clicked on confirm button */
    onConfirm: (data: CreateControlWorkData) => any,
} & BaseProps;

const CreateControlWorkModalWindow: React.FC<Props> = (props) => {
    const { handlers, values, errors } = useCreateControlWorkModalWindow(props.onConfirm, props.onClose);

    return <ModalWindowBase { ...props }>
        <Title>Создать контрольную работу</Title>
        <Subtitle>
            Создайте напонимание о контрольной или проверочной работе,
            которое будет видно всем вашим одноклассникам
        </Subtitle>
        <InputRow>
            <Select value={ values.lesson } required onChange={ handlers.lessonChange } error={ errors.lesson }>
                <option value="" disabled hidden>Предмет</option>
                {
                    props.lessonNames.map(
                        e => <option value={ e } key={ `CreateControlWorkModalWindow-${ e }` }>{ e }</option>
                    )
                }
            </Select>
            <DateInput value={ values.date } placeholder="Дата" onChange={ handlers.dateChange } error={ errors.date }/>
        </InputRow>
        <Input placeholder="Название" value={ values.name } onChange={ handlers.nameChange } error={ errors.name }/>
        <ButtonRow>
            <Button onClick={ handlers.confirm }>Создать</Button>
            <CancelText onClick={ props.onClose }>Отмена</CancelText>
        </ButtonRow>
    </ModalWindowBase>
}

export default CreateControlWorkModalWindow;

const useCreateControlWorkModalWindow = (
    confirm: (data: CreateControlWorkData) => any,
    close: () => any,
) => {
    const [lesson, setLesson] = useState("");
    const [date, setDate] = useState(DateHelper.now);
    const [name, setName] = useState("");

    const [lessonError, setLessonError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [nameError, setNameError] = useState(false);

    return {
        errors: {
            lesson: lessonError,
            date: dateError,
            name: nameError,
        },
        values: {
            lesson,
            date,
            name,
        },
        handlers: {
            lessonChange: (e: React.ChangeEvent<HTMLSelectElement>) => setLesson(e.target.value),
            dateChange: (date: Date) => setDate(date),
            nameChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
            confirm() {
                // setting all errors to false
                setLessonError(false);
                setDateError(false);
                setNameError(false);

                // checking data
                let anyError = false;
                if (lesson.length === 0) {
                    anyError = true;
                    setLessonError(true);
                }
                if (date.getTime() < DateHelper.now.getTime()) {
                    anyError = true;
                    setDateError(true);
                }
                if (name.length === 0) {
                    anyError = true;
                    setNameError(true);
                }

                // exit if there is some error
                if (anyError) return;

                // clear all inputs
                setLesson("");
                setDate(DateHelper.now);
                setName("");

                confirm({ lesson, date, name });
                close();
            }
        }
    }
}

export type CreateControlWorkData = {
    lesson: string,
    date: Date,
    name: string,
}

const InputRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  margin-bottom: 15px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    row-gap: 15px;
  }
`;

