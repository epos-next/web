import { AnyAction } from "redux";
import { setUser } from "@redux/actions/user-actions";
import { User } from "../../models/user";

export type State = {
    user: User | null,
}

export const initialState: State = {
    user: null,
};

export default (state: State = initialState, action: AnyAction) => {

    if (setUser.match(action)) {
        return {
            ...state,
            user: action.payload,
        }
    }

    return state;
}
