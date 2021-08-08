import { applyMiddleware, createStore as reduxCreateStore } from "redux";
import thunk from "redux-thunk";
import rootReducer, { State } from "./reducers/root";
import { initialState as lessonState } from "@redux/reducers/lesson-reducer";
import { initialState as controlWorkState } from "@redux/reducers/control-work-reducer";
import { initialState as homeworkState } from "@redux/reducers/homework-reducer";
import { initialState as advertisementState } from "@redux/reducers/advertisement-reducer";
import { initialState as userState } from "@redux/reducers/user-reducer";
import { initialState as marksState } from "@redux/reducers/marks-reducer";

const initialState: State = {
    lessonReducer: lessonState,
    controlWorkReducer: controlWorkState,
    homeworkReducer: homeworkState,
    advertisementReducer: advertisementState,
    userReducer: userState,
    marksReducer: marksState,
};

const createStore = () => reduxCreateStore(rootReducer, initialState, applyMiddleware(thunk));
export default createStore;


