import { RootState } from "@redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export type State = {
    user: User | null,
}

export const initialState: State = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        }
    }
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.userState.user;
export const selectUserLoading = (state: RootState) => state.userState.user === null;

const userReducer = userSlice.reducer;
export default userReducer;
