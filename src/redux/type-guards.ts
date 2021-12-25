import {
    DateScheduleState,
    FullScheduleState,
    LoadingScheduleState,
    ScheduleState
} from "@redux/reducers/schedule-reducer";

export function isDateScheduleState(state: ScheduleState): state is DateScheduleState {
    return state.type == "date"
        && !state.loading
        && typeof state.schedule == "undefined"
        && typeof state.selectedDate != "undefined";
}

export function isFullScheduleState(state: ScheduleState): state is FullScheduleState {
    return state.type == "full"
        && !state.loading
        && Array.isArray(state.schedule)
        && typeof state.selectedDate != "undefined";
}

export function isLoadingScheduleState(state: ScheduleState): state is LoadingScheduleState {
    return state.type == "loading" && state.loading && typeof state.schedule === "undefined";
}
