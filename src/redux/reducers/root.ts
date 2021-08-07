import { combineReducers } from "redux";
import lessonReducer, { State as LessonReducerState } from "@redux/reducers/lesson-reducer";
import controlWorkReducer, { State as ControlWorkState } from "@redux/reducers/control-work-reducer";
import homeworkReducer, { State as HomeworkState } from "@redux/reducers/homework-reducer";
import advertisementReducer, { State as AdvertisementState } from "@redux/reducers/advertisement-reducer";
import userReducer, { State as UserState } from "@redux/reducers/user-reducer";
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
