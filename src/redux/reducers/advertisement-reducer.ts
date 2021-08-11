import { RootState } from "@redux/store";
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

// selectors
export const selectAds = (state: RootState) => state.advertisementState.advertisements;
export const selectAdsLoading = (state: RootState) => state.advertisementState.loading;
export const selectIsAdCreatorOpen = (state: RootState) => state.advertisementState.isCreatorOpen;

const advertisementReducer = advertisementSlice.reducer;
export default advertisementReducer;

