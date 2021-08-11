import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lesson } from "../../models/lesson";

export type LessonsState = {
    lessons: Lesson[],
    nextLesson: Lesson | null,
    timeLeftToNextLesson: string, // 22:55
    nextLessonType: string, // до конца 5 урока
    loading: boolean,
}

export const initialState: LessonsState = {
    lessons: [],
    nextLesson: null,
    nextLessonType: "",
    timeLeftToNextLesson: "",
    loading: true,
}

export const lessonSlice = createSlice({
    name: "lessons",
    initialState,
    reducers: {
        setLessons: (state, action: PayloadAction<Lesson[]>) => {
            state.lessons = action.payload;
        },
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

export const { setNextLesson, setLessons, setLessonsLoading } = lessonSlice.actions;

const lessonReducer = lessonSlice.reducer;
export default lessonReducer;

export type SetNextLessonAction = {
    nextLesson: Lesson | null,
    timeLeftToNextLesson: string, // 22:55
    nextLessonType: string, // до конца 5 урока
}
