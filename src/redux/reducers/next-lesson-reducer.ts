import { setIdleNextLesson, setLoadingNextLesson } from "@redux/actions/next-lesson-actions";
import { AnyAction } from "redux";
import { Lesson } from "../../models/lesson";

export type NextLessonState = LoadingNextLessonState | IdleNextLessonState

export type IdleNextLessonState = {
    loading: false,
    nextLesson: Lesson,
    timeLeftToNextLesson: string, // 22:55
    nextLessonType: string, // до конца 5 урока
}
export type LoadingNextLessonState = { loading: true }

export const initialState: NextLessonState = {
    loading: true,
}

export default (state: NextLessonState = initialState, action: AnyAction): NextLessonState => {
    if (setIdleNextLesson.match(action)) {
        return {
            ...state,
            loading: false,
            nextLesson: action.payload.nextLesson,
            nextLessonType: action.payload.nextLessonType,
            timeLeftToNextLesson: action.payload.timeLeftToNextLesson,
        }
    }

    if (setLoadingNextLesson.match(action)) {
        return {
            ...state,
            loading: true,
        }
    }

    return state;
}
