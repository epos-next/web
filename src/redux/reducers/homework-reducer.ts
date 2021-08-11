import { RootState } from "@redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Homework } from "../../models/homework";

export type HomeworkState = {
    homework: Homework[],
    loading: boolean,
}

export const initialState: HomeworkState = {
    homework: [],
    loading: true,
}

export const homeworkSlice = createSlice({
    name: "homework",
    initialState,
    reducers: {
        setHomework: (state, action: PayloadAction<Homework[]>) => {
            state.homework = action.payload;
        },
        invertHomeworkDone: (state, action: PayloadAction<number>) => {
            // find index of this homework
            const index = state.homework.findIndex(x => x.id === action.payload);

            // flip done value
            if (index !== -1) {
                state.homework[index].done = !state.homework[index].done;
            }
        },
        setHomeworkLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
});

export const { invertHomeworkDone, setHomework, setHomeworkLoading } = homeworkSlice.actions;

export const selectHomework = (state: RootState) => state.homeworkState.homework;
export const selectHomeworkLoading = (state: RootState) => state.homeworkState.loading;

const homeworkReducer = homeworkSlice.reducer;
export default homeworkReducer;
