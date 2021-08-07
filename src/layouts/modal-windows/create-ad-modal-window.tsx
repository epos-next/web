import React, { useState } from "react";
import styled from "styled-components";
import Button from "@components/button";
import DateInput from "@components/date-input";
import Textarea from "@components/textarea";
import ModalWindowBase, {
    Props as BaseProps,
    Title,
    Subtitle,
    ButtonRow,
    CancelText
} from "@components/modal-window-base";
import DateHelper from "@helpers/date-helper";

export type Props = BaseProps & {
    /** Calling it when user passed correct data and clicked on confirm button */
    onConfirm: (data: CreateAdData) => any,
}

const CreateAdModalWindow: React.FC<Props> = (props) => {
    const { handlers, values, errors } = useCreateAdModalWindow(props.onConfirm, props.onClose);

    return <ModalWindowBase { ...props }>
        <Title>Создать объявление</Title>
        <Subtitle>
            Создайте объявление, которое будет видно всем вашим одноклассникам. Вы можете
            напомнить сделать что-то, поделиться или объявить информацию.
        </Subtitle>
        <DateInputContainer>
            <DateInput
                value={ values.date }
                error={ errors.date }
                onChange={ handlers.change.date }/>
        </DateInputContainer>
        <Textarea
            rows={ 10 }
            value={ values.content }
            error={ errors.content }
            onChange={ handlers.change.content }
            placeholder="Введите ваше объявление"/>
        <ButtonRow>
            <Button onClick={ handlers.confirm }>Создать объявление</Button>
            <CancelText onClick={ props.onClose }>Отмена</CancelText>
        </ButtonRow>
    </ModalWindowBase>
}

const useCreateAdModalWindow = (
    confirm: (data: CreateAdData) => any,
    close: () => any,
) => {
    const [content, setContent] = useState("");
    const [date, setDate] = useState(DateHelper.now);

    const [contentError, setContentError] = useState(false);
    const [dateError, setDateError] = useState(false);

    return {
        values: {
            content,
            date,
        },
        errors: {
            content: contentError,
            date: dateError,
        },
        handlers: {
            change: {
                content: (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
                date: (value: Date) => setDate(value),
            },
            confirm() {
                setContentError(false);
                setDateError(false);

                let anyError = false;
                if (content.length === 0) {
                    anyError = true;
                    setContentError(true);
                }
                if (date.getTime() < DateHelper.now.getTime()) {
                    anyError = true;
                    setDateError(true);
                }

                if (anyError) return;

                setContent("")
                setDate(DateHelper.now)
                confirm({
                    content,
                    targetDate: date,
                });
                close();
            },
        }
    }
}

export type CreateAdData = {
    content: string,
    targetDate: Date,
}

export default CreateAdModalWindow;

const DateInputContainer = styled.div`
  margin-bottom: 15px;
`;
