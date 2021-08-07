import { AnyAction } from "redux";
import { setUserIdleState } from "@redux/actions/user-actions";
import { User } from "../../models/user";

export type UserState = LoadingUserState | IdleUserState | NotAuthorizedUserState | ErrorUserState

export type LoadingUserState = { loading: true, user: null }
export type IdleUserState = { loading: false, user: User }
export type NotAuthorizedUserState = { loading: false, user: null }
export type ErrorUserState = { loading: false, error: string }

export const initialState: LoadingUserState = {
    loading: true,
    user: null,
};

export default (state: UserState = initialState, action: AnyAction): UserState => {
    if (setUserIdleState.match(action)) {
        return {
            loading: false,
            user: action.payload,
        }
    }

    return state;
}
