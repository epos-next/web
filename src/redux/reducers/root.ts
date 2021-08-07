import { combineReducers } from "redux";
import lessonReducer, { LessonsState  } from "@redux/reducers/lesson-reducer";
import nextLessonReducer, { NextLessonsState  } from "@redux/reducers/next-lesson-reducer";
import controlWorkReducer, { ControlWorkState } from "@redux/reducers/control-work-reducer";
import homeworkReducer, { HomeworkState  } from "@redux/reducers/homework-reducer";
import advertisementReducer, { AdvertisementState } from "@redux/reducers/advertisement-reducer";
import userReducer, { UserState } from "@redux/reducers/user-reducer";
import marksReducer, { MarksState  } from "@redux/reducers/marks-reducer";

const rootReducer = combineReducers({
    lessonReducer,
    controlWorkReducer,
    homeworkReducer,
    advertisementReducer,
    userReducer,
    marksReducer,
    nextLessonReducer,
});

export type State = {
    lessonReducer: LessonsState,
    controlWorkReducer: ControlWorkState,
    homeworkReducer: HomeworkState,
    advertisementReducer: AdvertisementState,
    userReducer: UserState,
    marksReducer: MarksState,
    nextLessonReducer: NextLessonsState,
}

export default rootReducer;
