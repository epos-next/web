import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ControlWork } from "../../models/control-work";

export type ControlWorkState = {
    controlWorks: ControlWork[],
    loading: boolean,
    isControlWorkCreatorOpen: boolean,
}

export const initialState: ControlWorkState = {
    controlWorks: [],
    loading: true,
    isControlWorkCreatorOpen: false,
}

export const controlWorkSlice = createSlice({
    name: "control-work",
    initialState,
    reducers: {
        addControlWork: (state, action: PayloadAction<ControlWork>) => {
            state.controlWorks.push(action.payload);
        },
        setControlWorks: (state, action: PayloadAction<ControlWork[]>) => {
            state.controlWorks = action.payload;
        },
        setIsControlWorkCreatorOpen: (state, action: PayloadAction<boolean>) => {
            state.isControlWorkCreatorOpen = action.payload;
        },
        setControlWorksLoading: (state, action: PayloadAction<boolean>) => {
            state.isControlWorkCreatorOpen = action.payload;
        },
    },
})

export const {
    setIsControlWorkCreatorOpen,
    addControlWork,
    setControlWorksLoading,
    setControlWorks
} = controlWorkSlice.actions;

const controlWorkReducer = controlWorkSlice.reducer;
export default controlWorkReducer;
