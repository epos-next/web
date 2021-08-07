import { createAction } from "@reduxjs/toolkit";
import { Lesson } from "../../models/lesson";

export const setLessons = createAction<Lesson[]>("setLessons");
export const setLessonLoading = createAction<boolean>("setLessonLoading")
export const setNextLesson = createAction<SetNextLessonAction>("setNextLesson")

export type SetNextLessonAction = {
    nextLesson: Lesson | null,
    timeLeftToNextLesson: string, // 22:55
    nextLessonType: string, // до конца 5 урока
}
