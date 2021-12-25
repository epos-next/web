import { RootState } from "@redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lesson } from "../../models/lesson";

export type ScheduleState = LoadingScheduleState | DateScheduleState | FullScheduleState;

export type LoadingScheduleState = {
    type: "loading",
    loading: true,
    schedule: undefined,
    selectedDate: undefined,
}

export type DateScheduleState = {
    type: "date",
    loading: false,
    schedule: undefined,
    selectedDate: Date,
}

export type FullScheduleState = {
    type: "full",
    loading: false,
    schedule: Lesson[],
    selectedDate: Date,
}

export const initialState: ScheduleState = {
    type: "loading",
    loading: true,
    schedule: undefined,
    selectedDate: undefined,
}

export const scheduleSlice = createSlice({
    name: "lessons",
    initialState: initialState as ScheduleState,
    reducers: {
        selectNewDate: (state, action: PayloadAction<Date>) => {
            state.type = "date";
            state.loading = false;
            state.selectedDate = action.payload;
            state.schedule = undefined;
        },
        setNewSchedule: (state, action: PayloadAction<SetNewSchedulePayload>) => {
            state.type = "full";
            state.loading = false;
            state.selectedDate = action.payload.date;
            state.schedule = action.payload.schedule;
        },
        setLoadingState: (state) => {
            state.type = "loading";
            state.loading = true;
            state.schedule = undefined;
        }
    }
})

export const setNewSchedule = scheduleSlice.actions.setNewSchedule;
export const selectNewDate = scheduleSlice.actions.selectNewDate;
export const setLoadingState = scheduleSlice.actions.setLoadingState;

export const selectSchedule = (state: RootState) => state.schedule.schedule;
export const selectIsScheduleLoading = (state: RootState) => state.schedule.loading;
export const selectSelectedDate = (state: RootState) => state.schedule.selectedDate;

const scheduleReducer = scheduleSlice.reducer;
export default scheduleReducer;

type SetNewSchedulePayload = {
    schedule: Lesson[],
    date: Date,
}
