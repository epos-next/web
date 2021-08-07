import { setMarks } from "@redux/actions/marks-actions";
import { AnyAction } from "redux";
import { Marks } from "../../models/marks";

export type State = {
    marks: Marks,
    loading: false,
} | {
    marks: null,
    loading: true,
}

export const initialState: State = {
    marks: null,
    loading: true,
}

export default (state: State = initialState, action: AnyAction): State => {

    if (setMarks.match(action)) {
        return {
            ...state,
            marks: action.payload,
            loading: false,
        }
    }

    return state;
}

