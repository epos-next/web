import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Marks } from "../../models/marks";

export type MarksState = IdleMarksState | LoadingMarksState

export type IdleMarksState = {
    marks: Marks,
    loading: false,
}

export type LoadingMarksState = {
    marks: null,
    loading: true,
}

export const initialState: MarksState = {
    marks: null,
    loading: true,
}

export const marksSlice = createSlice({
    name: "marks",
    initialState,
    reducers: {
        setMarks: (state: Draft<MarksState>, action: PayloadAction<Marks>) => {
            state.loading = false;
            state.marks = action.payload;
        }
    }
})

export const { setMarks } = marksSlice.actions;

const marksReducer = marksSlice.reducer;
export default marksReducer;

