import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Advertisement } from "../../models/advertisement";

export type AdvertisementState = {
    advertisements: Advertisement[],
    loading: boolean,
    isCreatorOpen: boolean,
}

export const initialState: AdvertisementState = {
    advertisements: [],
    loading: true,
    isCreatorOpen: false,
}

const advertisementSlice = createSlice({
    name: "advertisement",
    initialState,
    reducers: {
        setAdvertisementsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        addAdvertisement: (state, action: PayloadAction<Advertisement>) => {
            state.advertisements.push(action.payload);
        },
        setIsAdCreatorOpen: (state, action: PayloadAction<boolean>) => {
            state.isCreatorOpen = action.payload;
        },
        setAdvertisements: (state, action: PayloadAction<Advertisement[]>) => {
            state.advertisements = action.payload;
        },
    },
});

export const {
    setIsAdCreatorOpen,
    addAdvertisement,
    setAdvertisements,
    setAdvertisementsLoading
} = advertisementSlice.actions;

const advertisementReducer = advertisementSlice.reducer;
export default advertisementReducer;

