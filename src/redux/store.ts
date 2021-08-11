import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import lessonReducer from "@redux/reducers/lesson-reducer";
import userReducer from "@redux/reducers/user-reducer";

export const store = configureStore({
    reducer: {
        userState: userReducer,
        lessonsState: lessonReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;



