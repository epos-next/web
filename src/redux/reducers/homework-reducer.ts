import { invertHomeworkDone, setHomework, setHomeworkLoading } from "@redux/actions/homework-actions";
import { AnyAction } from "redux";
import { Homework } from "../../models/homework";

export type HomeworkState = {
    homework: Homework[],
    loading: boolean,
}

export const initialState: HomeworkState = {
    homework: [],
    loading: true,
}

export default (state: HomeworkState = initialState, action: AnyAction) => {

    if (setHomework.match(action)) {
        return {
            ...state,
            homework: action.payload,
        }
    }

    if (invertHomeworkDone.match(action)) {
        const homework = [...state.homework];

        // find index of this homework
        const index = homework.findIndex(x => x.id === action.payload);

        // flip done value
        if (index !== -1) {
            homework[index].done = !homework[index].done;
        }

        return {
            ...state,
            homework,
        }
    }

    if (setHomeworkLoading.match(action)) {
        return {
            ...state,
            loading: action.payload,
        }
    }

    return state;
}
