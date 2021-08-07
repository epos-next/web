import { AnyAction } from "redux";
import { setIdleLessonState, setLoadingLessonState } from "@redux/actions/lesson-actions";
import { Lesson } from "../../models/lesson";

export type LessonsState = LoadingLessonsState | IdleLessonsState

export type IdleLessonsState = { loading: false, lessons: Lesson[] }
export type LoadingLessonsState = { loading: true }

export const initialState: LessonsState = {
    loading: true,
}

export default (state: LessonsState = initialState, action: AnyAction): LessonsState => {
    if (setIdleLessonState.match(action)) {
        return {
            ...state,
            loading: false,
            lessons: action.payload,
        }
    }

    if (setLoadingLessonState.match(action)) {
        return {
            ...state,
            loading: true,
        }
    }

    return state;
}
