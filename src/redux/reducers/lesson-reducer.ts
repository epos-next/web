import { AnyAction } from "redux";
import { setLessonLoading, setLessons, setNextLesson } from "@redux/actions/lesson-actions";
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

export default (state: LessonsState = initialState, action: AnyAction) => {

    if (setLessons.match(action)) {
        return {
            ...state,
            lessons: action.payload,
        }
    }

    if (setNextLesson.match(action)) {
        return {
            ...state,
            ...action.payload,
        }
    }

    if (setLessonLoading.match(action)) {
        return {
            ...state,
            loading: action.payload,
        }
    }

    return state;
}
