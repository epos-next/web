import { invertHomeworkDone, setLoadingHomeworkState, setIdleHomeworkState } from "@redux/actions/homework-actions";
import { AnyAction } from "redux";
import { Homework } from "../../models/homework";
import { isIdleHomeworkState } from "../../type-guards/reducers";

export type HomeworkState = IdleHomeworkState | LoadingHomeworkState

export type IdleHomeworkState = { loading: false, homework: Homework[] }
export type LoadingHomeworkState = { loading: true }

export const initialState: HomeworkState = {
    loading: true,
}

export default (state: HomeworkState = initialState, action: AnyAction) => {

    if (setIdleHomeworkState.match(action)) {
        return {
            ...state,
            loading: false,
            homework: action.payload,
        }
    }

    if (invertHomeworkDone.match(action) && isIdleHomeworkState(state)) {
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

    if (setLoadingHomeworkState.match(action)) {
        return {
            ...state,
            loading: true,
        }
    }

    return state;
}
