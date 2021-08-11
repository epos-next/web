import { RootState } from "@redux/store";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Marks } from "../../models/marks";

export type MarksState = {
    marks: Marks | null,
    loading: boolean,
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

export const selectMarks = (state: RootState) => state.marksState.marks;
export const selectMarksLoading = (state: RootState) => state.marksState.loading;
export const selectMarksLessons = (state: RootState) => Object.keys(state.marksState ?? {});

const marksReducer = marksSlice.reducer;
export default marksReducer;

