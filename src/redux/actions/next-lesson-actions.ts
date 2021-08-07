import { createAction } from "@reduxjs/toolkit";
import { Lesson } from "../../models/lesson";

export const setIdleNextLesson = createAction<SetNextLessonAction>("setIdleNextLesson")
export const setLoadingNextLesson = createAction("setLoadingNextLesson")

export type SetNextLessonAction = {
    nextLesson: Lesson,
    timeLeftToNextLesson: string, // 22:55
    nextLessonType: string, // до конца 5 урока
}
