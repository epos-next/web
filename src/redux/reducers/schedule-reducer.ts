import { RootState } from "@redux/store";
import { isFullScheduleState } from "@redux/type-guards";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isTheSameDate, sortSchedule } from "@utils/functions";
import { Lesson } from "../../models/lesson";

export type ScheduleState = LoadingScheduleState  | FullScheduleState;

export type LoadingScheduleState = {
    type: "loading",
    loading: true,
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
    selectedDate: new Date(),
}

export const scheduleSlice = createSlice({
    name: "schedule",
    initialState: initialState as ScheduleState,
    reducers: {
        setSelectedDate: (state, action: PayloadAction<Date>) => {
            state.type = "loading";
            state.loading = false;
            state.selectedDate = action.payload;
            state.schedule = undefined;
        },
        setNewSchedule: (state, action: PayloadAction<SetNewSchedulePayload>) => {
            // ignoring action if have already selected date and this selected date is not the same date with payload
            // in other words: ignore if user managed to change selected date while api request was running
            if (!isFullScheduleState(state) || !isTheSameDate(state.selectedDate, action.payload.date)) {
                state.type = "full";
                state.loading = false;
                state.selectedDate = action.payload.date;
                state.schedule = sortSchedule(action.payload.schedule);
            }

        },
        setLoadingState: (state) => {
            state.type = "loading";
            state.loading = true;
            state.schedule = undefined;
        }
    }
})

export const setNewSchedule = scheduleSlice.actions.setNewSchedule;
export const setSelectedDate = scheduleSlice.actions.setSelectedDate;
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
