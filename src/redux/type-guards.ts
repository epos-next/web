import {
    FullScheduleState,
    LoadingScheduleState,
    ScheduleState
} from "@redux/reducers/schedule-reducer";

export function isFullScheduleState(state: ScheduleState): state is FullScheduleState {
    return state.type == "full"
        && !state.loading
        && Array.isArray(state.schedule)
        && typeof state.selectedDate != "undefined";
}

export function isLoadingScheduleState(state: ScheduleState): state is LoadingScheduleState {
    return state.type == "loading" && state.loading && typeof state.schedule === "undefined";
}
