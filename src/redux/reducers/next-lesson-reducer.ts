import { setIdleNextLesson, setLoadingNextLesson } from "@redux/actions/next-lesson-actions";
import { AnyAction } from "redux";
import { Lesson } from "../../models/lesson";

export type NextLessonsState = LoadingNextLessonsState | IdleNextLessonsState

export type IdleNextLessonsState = {
    loading: false,
    nextLesson: Lesson,
    timeLeftToNextLesson: string, // 22:55
    nextLessonType: string, // до конца 5 урока
}
export type LoadingNextLessonsState = { loading: true }

export const initialState: NextLessonsState = {
    loading: true,
}

export default (state: NextLessonsState = initialState, action: AnyAction): NextLessonsState => {
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
