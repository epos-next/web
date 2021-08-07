import { setIdleMarksState, setLoadingMarksState } from "@redux/actions/marks-actions";
import { AnyAction } from "redux";
import { Marks } from "../../models/marks";

export type MarksState = LoadingMarksState | IdleMarksState

export type IdleMarksState = { loading: false, marks: Marks }
export type LoadingMarksState = { loading: true }

export const initialState: MarksState = {
    loading: true,
}

export default (state: MarksState = initialState, action: AnyAction): MarksState => {

    if (setIdleMarksState.match(action)) {
        return {
            ...state,
            marks: action.payload,
            loading: false,
        }
    }

    if (setLoadingMarksState.match(action)) {
        return {
            ...state,
            loading: true,
        }
    }

    return state;
}

