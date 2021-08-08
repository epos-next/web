import { combineReducers } from "redux";
import lessonReducer, { LessonsState as LessonReducerState } from "@redux/reducers/lesson-reducer";
import controlWorkReducer, { ControlWorkState as ControlWorkState } from "@redux/reducers/control-work-reducer";
import homeworkReducer, { HomeworkState as HomeworkState } from "@redux/reducers/homework-reducer";
import advertisementReducer, { AdvertisementState as AdvertisementState } from "@redux/reducers/advertisement-reducer";
import userReducer, { UserState as UserState } from "@redux/reducers/user-reducer";
import marksReducer, { State as MarksState } from "@redux/reducers/marks-reducer";

const rootReducer = combineReducers({
    lessonReducer,
    controlWorkReducer,
    homeworkReducer,
    advertisementReducer,
    userReducer,
    marksReducer
});

export type State = {
    lessonReducer: LessonReducerState,
    controlWorkReducer: ControlWorkState,
    homeworkReducer: HomeworkState,
    advertisementReducer: AdvertisementState,
    userReducer: UserState,
    marksReducer: MarksState,
}

export default rootReducer;
