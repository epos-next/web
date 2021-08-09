import { setMarks } from "@redux/actions/marks-actions";
import { AnyAction } from "redux";
import { Marks } from "../../models/marks";

export type MarksState = {
    marks: Marks,
    loading: false,
} | {
    marks: null,
    loading: true,
}

export const initialState: MarksState = {
    marks: null,
    loading: true,
}

export default (state: MarksState = initialState, action: AnyAction): MarksState => {

    if (setMarks.match(action)) {
        return {
            ...state,
            marks: action.payload,
            loading: false,
        }
    }

    return state;
}

