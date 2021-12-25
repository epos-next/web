import { RootState } from "@redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lesson } from "../../models/lesson";

export type LessonsState = {
    nextLesson: Lesson | null,
    timeLeftToNextLesson: string, // 22:55
    nextLessonType: string, // до конца 5 урока
    loading: boolean,
}

export const initialState: LessonsState = {
    nextLesson: null,
    nextLessonType: "",
    timeLeftToNextLesson: "",
    loading: true,
}

export const lessonSlice = createSlice({
    name: "lessons",
    initialState,
    reducers: {
        setNextLesson: (state, action: PayloadAction<SetNextLessonAction>) => {
            state.nextLesson = action.payload.nextLesson;
            state.timeLeftToNextLesson = action.payload.timeLeftToNextLesson;
            state.nextLessonType = action.payload.nextLessonType;
        },
        setLessonsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
})

export const { setNextLesson, setLessonsLoading } = lessonSlice.actions;


export const selectLessonLoading = (state: RootState) => state.lessonsState.loading;
export const selectNextLesson = (state: RootState) => state.lessonsState.nextLesson;
export const selectTimeLeftToNextLesson = (state: RootState) => state.lessonsState.timeLeftToNextLesson;
export const selectNextLessonType = (state: RootState) => state.lessonsState.nextLessonType;

const lessonReducer = lessonSlice.reducer;
export default lessonReducer;

export type SetNextLessonAction = {
    nextLesson: Lesson | null,
    timeLeftToNextLesson: string, // 22:55
    nextLessonType: string, // до конца 5 урока
}
