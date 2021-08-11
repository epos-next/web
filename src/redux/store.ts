import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import lessonReducer from "@redux/reducers/lesson-reducer";
import homeworkReducer from "@redux/reducers/homework-reducer";
import controlWorkReducer from "@redux/reducers/control-work-reducer";
import userReducer from "@redux/reducers/user-reducer";
import marksReducer from "@redux/reducers/marks-reducer";

export const store = configureStore({
    reducer: {
        userState: userReducer,
        lessonsState: lessonReducer,
        marksState: marksReducer,
        homeworkState: homeworkReducer,
        controlWorkState: controlWorkReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;



