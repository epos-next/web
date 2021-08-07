import {
    UserState,
    LoadingUserState,
    IdleUserState,
    NotAuthorizedUserState,
    ErrorUserState
} from "@redux/reducers/user-reducer";
import { isUser } from "./user-model-type-guard";

export function isLoadingUserState(state: UserState): state is LoadingUserState {
    return (state as LoadingUserState).loading &&
        ((state as LoadingUserState).user === null || typeof (state as LoadingUserState).user === "undefined")
}

export function isIdleUserState(state: UserState): state is IdleUserState {
    return !(state as IdleUserState).loading && isUser((state as LoadingUserState).user)
}

export function isNotAuthorizedUserState(state: UserState): state is NotAuthorizedUserState {
    return !state.loading && (state as NotAuthorizedUserState).user === null
}

export function isErrorUserState(state: UserState): state is ErrorUserState {
    return !state.loading && (state as ErrorUserState).error === null
}

type WhenMapper<T> = {
    onLoading: (state: LoadingUserState) => T
    onIdle: (state: IdleUserState) => T
    onNotAuthorized: (state: NotAuthorizedUserState) => T
    onError: (state: ErrorUserState) => T
}

export function whenUserState<T = any>(state: UserState, mapper: WhenMapper<T>): T {
    if (isLoadingUserState(state)) return mapper.onLoading(state);
    else if (isIdleUserState(state)) return mapper.onIdle(state);
    else if (isNotAuthorizedUserState(state)) return mapper.onNotAuthorized(state);
    else return mapper.onError(state);
}

