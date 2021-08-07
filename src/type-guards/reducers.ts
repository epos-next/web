import { AdvertisementState, IdleAdvertisementState } from "@redux/reducers/advertisement-reducer";
import { ControlWorkState, IdleControlWorkState } from "@redux/reducers/control-work-reducer";
import { HomeworkState, IdleHomeworkState } from "@redux/reducers/homework-reducer";
import { IdleLessonsState, LessonsState } from "@redux/reducers/lesson-reducer";
import { IdleNextLessonState, LoadingNextLessonState, NextLessonState } from "@redux/reducers/next-lesson-reducer";
import { Homework } from "../models/homework";
import { isAdvertisement, isControlWork, isHomework, isLesson, isUser } from "./models";
import {
    UserState,
    LoadingUserState,
    IdleUserState,
    NotAuthorizedUserState,
    ErrorUserState
} from "@redux/reducers/user-reducer";

export function isIdleAdvertisementState(state: AdvertisementState): state is IdleAdvertisementState {
    return !(state as IdleAdvertisementState).loading
        && Array.isArray((state as IdleAdvertisementState).advertisements)
        && (state as IdleAdvertisementState).advertisements.every(e => isAdvertisement(e))
}

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

type WhenUserMapper<T> = {
    onLoading: (state: LoadingUserState) => T
    onIdle: (state: IdleUserState) => T
    onNotAuthorized: (state: NotAuthorizedUserState) => T
    onError: (state: ErrorUserState) => T
}

export function whenUserState<T = any>(state: UserState, mapper: WhenUserMapper<T>): T {
    if (isLoadingUserState(state)) return mapper.onLoading(state);
    else if (isIdleUserState(state)) return mapper.onIdle(state);
    else if (isNotAuthorizedUserState(state)) return mapper.onNotAuthorized(state);
    else return mapper.onError(state);
}

export function isIdleControlWorkState(state: ControlWorkState): state is IdleControlWorkState {
    return !(state as ControlWorkState).loading &&
        Array.isArray(state as IdleControlWorkState) &&
        (state as IdleControlWorkState).controlWorks.every(e => isControlWork(e))
}

export function isIdleHomeworkState(state: HomeworkState): state is IdleHomeworkState {
    return !state.loading && Array.isArray(state.homework) && state.homework.every(e => isHomework(e));
}

export function isIdleLessonsState(state: LessonsState): state is IdleLessonsState {
    return !state.loading && Array.isArray(state.lessons);
}

export function isLoadingNextLessonState(state: NextLessonState): state is LoadingNextLessonState {
    return state.loading
}

export function isIdleNextLessonState(state: NextLessonState): state is IdleNextLessonState {
    return !state.loading && isLesson(state.nextLesson);
}

type WhenNextLessonMapper<T> = {
    onLoading: (state: LoadingNextLessonState) => T
    onIdle: (state: IdleNextLessonState) => T
}

export function whenNextLessonState<T = any>(state: NextLessonState, mapper: WhenNextLessonMapper<T>): T {
    if (isIdleNextLessonState(state)) return mapper.onIdle(state);
    else return mapper.onLoading(state);
}
