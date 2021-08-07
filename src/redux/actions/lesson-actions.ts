import { createAction } from "@reduxjs/toolkit";
import { Lesson } from "../../models/lesson";

export const setIdleLessonState = createAction<Lesson[]>("setIdleLessonState");
export const setLoadingLessonState = createAction("setLoadingLessonState")
